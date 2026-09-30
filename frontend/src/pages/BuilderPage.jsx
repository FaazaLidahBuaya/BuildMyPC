import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { id: 'CPU', label: 'CPU' },
  { id: 'MOTHERBOARD', label: 'Motherboard' },
  { id: 'RAM', label: 'Memory' },
  { id: 'GPU', label: 'Graphics Card' },
  { id: 'STORAGE', label: 'Storage' },
  { id: 'PSU', label: 'Power Supply' },
  { id: 'CASE', label: 'Case' },
  { id: 'COOLER', label: 'CPU Cooler' },
];

const FilterGroup = ({ label, options, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{label}</label>
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 text-xs font-mono border transition-all ${
            value === opt.value
              ? 'border-accent text-accent bg-accent/10'
              : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white bg-surface'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

const BuilderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [availableComponents, setAvailableComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Filter States
  const [maxPrice, setMaxPrice] = useState(15000000);
  
  // RAM Filters
  const [ramTypeFilter, setRamTypeFilter] = useState('ALL');
  const [ramCapFilter, setRamCapFilter] = useState('ALL');
  const [ramSpeedFilter, setRamSpeedFilter] = useState('ALL');
  
  // Storage Filters
  const [storageTypeFilter, setStorageTypeFilter] = useState('ALL');
  
  // Cooler Filters
  const [coolerTypeFilter, setCoolerTypeFilter] = useState('ALL');
  
  const [visibleCount, setVisibleCount] = useState(10);
  
  const [build, setBuild] = useState({
    CPU: null,
    MOTHERBOARD: null,
    RAM: null,
    GPU: null,
    STORAGE: null,
    PSU: null,
    CASE: null,
    COOLER: null
  });

  const [compatibility, setCompatibility] = useState({
    status: 'unchecked',
    estimatedPower: 0,
    totalPrice: 0,
    checks: [],
    errors: [],
    warnings: []
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const preset = params.get('preset');
    if (preset) {
      setLoading(true);
      fetch(`http://localhost:5000/api/components/preset/${preset}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data) {
            setBuild(data.data);
            checkCompatibility(data.data);
            navigate('/build', { replace: true });
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [location.search, navigate]);

  const currentCategory = CATEGORIES[activeStep];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchComponentsForCategory(currentCategory.id);
    // Reset category-specific filters on tab change
    setSearchQuery('');
    setRamTypeFilter('ALL');
    setRamCapFilter('ALL');
    setRamSpeedFilter('ALL');
    setStorageTypeFilter('ALL');
    setCoolerTypeFilter('ALL');
  }, [activeStep]);

  // Reset pagination when filters or tab changes
  useEffect(() => {
    setVisibleCount(10);
  }, [activeStep, searchQuery, maxPrice, ramTypeFilter, ramCapFilter, ramSpeedFilter, storageTypeFilter, coolerTypeFilter]);

  const fetchComponentsForCategory = async (category) => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/api/components?category=${category}`;
      if (build.CPU && category === 'MOTHERBOARD') {
        url = `http://localhost:5000/api/components/${category}/compatible?with=${build.CPU.id}`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setAvailableComponents(data.data);
      }
    } catch (err) {
      console.error('Error fetching components:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkCompatibility = async (newBuild) => {
    try {
      const payload = {
        cpu: newBuild.CPU?.id,
        motherboard: newBuild.MOTHERBOARD?.id,
        gpu: newBuild.GPU?.id,
        ram: newBuild.RAM?.id,
        storage: newBuild.STORAGE?.id,
        psu: newBuild.PSU?.id,
        case: newBuild.CASE?.id,
        cooler: newBuild.COOLER?.id
      };

      const res = await fetch('http://localhost:5000/api/compatibility/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (data.success) {
        setCompatibility({
          status: data.status,
          estimatedPower: data.estimatedPower,
          totalPrice: data.totalPrice,
          checks: data.checks,
          errors: data.errors,
          warnings: data.warnings
        });
      }
    } catch (err) {
      console.error('Error checking compatibility:', err);
    }
  };

  const handleSelectComponent = (component) => {
    const newBuild = { ...build, [currentCategory.id]: component };
    setBuild(newBuild);
    checkCompatibility(newBuild);
    if (activeStep < CATEGORIES.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleRemoveComponent = (categoryId, e) => {
    e.stopPropagation();
    const newBuild = { ...build, [categoryId]: null };
    setBuild(newBuild);
    checkCompatibility(newBuild);
  };

  // -------------------------------------------------------------
  // Filter Logic
  // -------------------------------------------------------------
  const filteredComponents = availableComponents.filter(item => {
    // 0. Search Filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      if (!item.name.toLowerCase().includes(q) && !item.brand?.toLowerCase().includes(q)) {
        return false;
      }
    }

    // 1. Price Filter
    if (item.price > maxPrice) return false;
    
    // 2. RAM Filters
    if (currentCategory.id === 'RAM') {
      if (ramTypeFilter !== 'ALL' && item.type !== ramTypeFilter) return false;
      if (ramCapFilter !== 'ALL' && item.capacity !== parseInt(ramCapFilter)) return false;
      if (ramSpeedFilter !== 'ALL' && item.speed !== parseInt(ramSpeedFilter)) return false;
    }
    
    // 3. Storage Filters
    if (currentCategory.id === 'STORAGE') {
      if (storageTypeFilter !== 'ALL' && item.type !== storageTypeFilter) return false;
    }
    
    // 4. Cooler Filters
    if (currentCategory.id === 'COOLER') {
      if (coolerTypeFilter !== 'ALL' && item.type !== coolerTypeFilter) return false;
    }

    return true;
  });

  const visibleComponents = filteredComponents.slice(0, visibleCount);

  return (
    <div className="pt-32 px-[24px] md:px-[60px] pb-24 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-display font-semibold mb-2">SYSTEM BUILDER</h1>
        <p className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-12">
          Configure your components
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            
            {/* Steps / Tabs */}
            <div className="flex overflow-x-auto gap-4 pb-4 border-b border-white/5">
              {CATEGORIES.map((cat, index) => {
                const isSelected = !!build[cat.id];
                const isActive = activeStep === index;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveStep(index)}
                    className={`whitespace-nowrap px-1 py-2 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                      isActive 
                        ? 'text-white border-b border-accent relative after:absolute after:-bottom-[17px] after:left-0 after:w-full after:h-[2px] after:bg-accent' 
                        : isSelected 
                          ? 'text-gray-400' 
                          : 'text-gray-600 hover:text-gray-300'
                    }`}
                  >
                    {cat.label}
                    {isSelected && <span className="ml-2 text-accent">✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Filters Section */}
            <div className="flex flex-col gap-6">

              {/* Search Bar */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Search {currentCategory.label}</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Type brand or model..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-background border border-white/10 text-white font-mono text-sm px-4 py-3 focus:outline-none focus:border-accent transition-colors pl-11"
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Max Price Slider (Always Visible) */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Max Price</label>
                  <span className="text-xs font-mono text-white">Rp {maxPrice.toLocaleString('id-ID')}</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="35000000" 
                  step="100000" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Dynamic Filters */}
              {currentCategory.id === 'RAM' && (
                <div className="flex flex-wrap gap-x-10 gap-y-6">
                  <FilterGroup 
                    label="Type" 
                    value={ramTypeFilter} 
                    onChange={setRamTypeFilter}
                    options={[{label: 'ALL', value: 'ALL'}, {label: 'DDR3', value: 'DDR3'}, {label: 'DDR4', value: 'DDR4'}, {label: 'DDR5', value: 'DDR5'}]}
                  />
                  <FilterGroup 
                    label="Capacity" 
                    value={ramCapFilter} 
                    onChange={setRamCapFilter}
                    options={[{label: 'ALL', value: 'ALL'}, {label: '4GB', value: '4'}, {label: '8GB', value: '8'}, {label: '16GB', value: '16'}, {label: '32GB', value: '32'}, {label: '64GB', value: '64'}]}
                  />
                  <FilterGroup 
                    label="Speed" 
                    value={ramSpeedFilter} 
                    onChange={setRamSpeedFilter}
                    options={[{label: 'ALL', value: 'ALL'}, {label: '1066', value: '1066'}, {label: '1333', value: '1333'}, {label: '1600', value: '1600'}, {label: '3200', value: '3200'}, {label: '3600', value: '3600'}, {label: '4800', value: '4800'}, {label: '5200', value: '5200'}, {label: '5600', value: '5600'}, {label: '6000', value: '6000'}, {label: '6400', value: '6400'}]}
                  />
                </div>
              )}

              {currentCategory.id === 'STORAGE' && (
                <div className="flex flex-wrap gap-x-10 gap-y-6">
                  <FilterGroup 
                    label="Storage Type" 
                    value={storageTypeFilter} 
                    onChange={setStorageTypeFilter}
                    options={[{label: 'ALL', value: 'ALL'}, {label: 'HDD', value: 'HDD'}, {label: 'SATA SSD', value: 'SSD'}, {label: 'NVMe M.2', value: 'NVMe'}]}
                  />
                </div>
              )}

              {currentCategory.id === 'COOLER' && (
                <div className="flex flex-wrap gap-x-10 gap-y-6">
                  <FilterGroup 
                    label="Cooler Type" 
                    value={coolerTypeFilter} 
                    onChange={setCoolerTypeFilter}
                    options={[{label: 'ALL', value: 'ALL'}, {label: 'Air Cooler', value: 'air'}, {label: 'AIO Liquid', value: 'aio'}, {label: 'Stock (Bawaan)', value: 'stock'}]}
                  />
                </div>
              )}
            </div>

            {/* Component List */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-mono text-gray-400 uppercase tracking-[0.1em]">Select {currentCategory.label}</h2>
                {build[currentCategory.id] && (
                  <button 
                    onClick={(e) => handleRemoveComponent(currentCategory.id, e)}
                    className="text-[10px] font-mono text-red-500 hover:text-red-400 transition-colors uppercase tracking-wider"
                  >
                    Clear Selection
                  </button>
                )}
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-32 border-y border-white/5">
                  <p className="text-gray-500 font-mono text-xs">Loading components...</p>
                </div>
              ) : (
                <div className="flex flex-col border-t border-white/5">
                  <AnimatePresence>
                    {visibleComponents.map(item => {
                      const isSelected = build[currentCategory.id]?.id === item.id;
                      const compatStatus = item.compatibilityStatus; 
                      
                      return (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={item.id} 
                          onClick={() => handleSelectComponent(item)}
                          className={`flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 px-2 border-b transition-colors cursor-pointer group ${
                            isSelected 
                              ? 'border-b-accent bg-accent/[0.03]' 
                              : 'border-b-white/5 hover:bg-white/[0.02]'
                          }`}
                        >
                          <div className="flex-1 pr-4">
                            <div className="flex items-center gap-3">
                              <h3 className={`text-[15px] font-medium transition-colors ${isSelected ? 'text-accent' : 'text-gray-200 group-hover:text-white'}`}>
                                {item.name}
                              </h3>
                              {compatStatus === 'incompatible' && (
                                <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 text-[9px] font-mono uppercase tracking-wider border border-red-500/20">Incompatible</span>
                              )}
                            </div>
                            <p className="text-[11px] text-gray-500 font-mono mt-1.5 leading-relaxed">
                              {item.category === 'CPU' && `Socket: ${item.socket} • TDP: ${item.tdp}W • ${item.cores} Cores • ${item.integratedGraphics ? 'iGPU' : 'No iGPU'}`}
                              {item.category === 'MOTHERBOARD' && `${item.socket} • ${item.formFactor} • ${item.ramType}`}
                              {item.category === 'GPU' && `VRAM: ${item.vram}GB • TDP: ${item.tdp}W • ${item.length}mm`}
                              {item.category === 'RAM' && `${item.type} • ${item.capacity}GB • ${item.speed}MHz`}
                              {item.category === 'STORAGE' && `${item.capacity}GB • ${item.interface}`}
                              {item.category === 'PSU' && `${item.wattage}W • ${item.efficiency} • ${item.formFactor}`}
                              {item.category === 'CASE' && `${item.type} • Max GPU: ${item.maxGpuLength}mm`}
                              {item.category === 'COOLER' && `${item.type.toUpperCase()} • TDP: ${item.tdpRating}W`}
                            </p>
                          </div>
                          
                          <div className="mt-2 sm:mt-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                            <p className="font-mono text-sm text-gray-300">Rp {item.price.toLocaleString('id-ID')}</p>
                            <button className={`text-[10px] font-mono uppercase tracking-widest mt-1 transition-opacity ${
                              isSelected ? 'text-accent opacity-100' : 'text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-white'
                            }`}>
                              {isSelected ? 'Selected' : 'Select'}
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  
                  {visibleCount < filteredComponents.length && (
                    <button
                      onClick={() => setVisibleCount(prev => prev + 10)}
                      className="w-full py-4 mt-2 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-gray-400 hover:text-white text-[10px] font-mono uppercase tracking-[0.2em] transition-colors"
                    >
                      Show More ({filteredComponents.length - visibleCount} remaining)
                    </button>
                  )}
                  
                  {filteredComponents.length === 0 && !loading && (
                    <div className="py-12 text-center border-b border-white/5">
                      <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">No components match your filters.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Build Summary Panel */}
          <div>
            <div className="bg-surface border border-white/5 p-6 sticky top-32">
              <h2 className="text-[11px] text-gray-500 font-mono uppercase tracking-[0.15em] mb-6">Build Summary</h2>
              
              <div className="space-y-4 mb-8">
                {CATEGORIES.map(cat => {
                  const part = build[cat.id];
                  return (
                    <div key={cat.id} className="flex justify-between items-start text-[13px]">
                      <span className="text-gray-600 w-24 flex-shrink-0 font-mono text-[10px] uppercase tracking-wider mt-0.5">{cat.id}</span>
                      <span className={`text-right leading-tight ${part ? 'text-gray-200' : 'text-gray-700'}`}>
                        {part ? part.name : '—'}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-full my-6"></div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 text-[10px] font-mono uppercase tracking-wider">Total Price</span>
                  <span className="font-mono text-lg text-accent leading-none">Rp {compatibility.totalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 text-[10px] font-mono uppercase tracking-wider">Est. Power</span>
                  <span className="font-mono text-sm leading-none text-gray-300">{compatibility.estimatedPower} W</span>
                </div>
              </div>
              
              <div className="p-4 bg-[#0a0a0a] border border-white/5">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Status</span>
                  <span className={`px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${
                    compatibility.status === 'compatible' ? 'text-green-400 bg-green-400/10 border border-green-500/20' :
                    compatibility.status === 'warning' ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-500/20' :
                    compatibility.status === 'incompatible' ? 'text-red-400 bg-red-400/10 border border-red-500/20' :
                    'text-gray-500 bg-white/5 border border-white/10'
                  }`}>
                    {compatibility.status}
                  </span>
                </div>
                
                {compatibility.errors.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {compatibility.errors.map((err, i) => (
                      <p key={i} className="text-[11px] leading-relaxed text-red-400 flex gap-2"><span className="text-red-500 mt-0.5">×</span> {err}</p>
                    ))}
                  </div>
                )}
                
                {compatibility.warnings.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {compatibility.warnings.map((warn, i) => (
                      <p key={i} className="text-[11px] leading-relaxed text-yellow-400 flex gap-2"><span className="text-yellow-500 mt-0.5">!</span> {warn}</p>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BuilderPage;
