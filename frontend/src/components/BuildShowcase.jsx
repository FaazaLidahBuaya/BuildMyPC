import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BuildCard = ({ title, price, delay, specs, presetId }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="group relative flex flex-col gap-0 border border-white/5 bg-[#0a0a0a] hover:border-white/10 transition-colors"
  >
    <div className="aspect-[4/3] bg-surface relative flex flex-col items-center justify-center border-b border-white/5 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Abstract Tech Icon */}
      <div className="w-16 h-16 rounded-full border border-accent/20 flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-500">
        <div className="w-8 h-8 border border-accent/40 rotate-45 group-hover:bg-accent/10 transition-colors"></div>
      </div>
      
      <div className="absolute bottom-4 left-4 text-gray-600 font-mono text-[9px] uppercase tracking-[0.2em] z-10">
        SYS.REQ // {title}
      </div>
    </div>
    
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h3 className="text-white font-mono uppercase tracking-widest text-lg mb-1 group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-accent font-mono text-sm">{price}</p>
      </div>
      
      <div className="flex flex-col gap-3 flex-1">
        {specs.map((spec, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider">{spec.label}</span>
            <span className="text-[11px] text-gray-300 font-mono">{spec.value}</span>
          </div>
        ))}
      </div>
      
      <Link 
        to={`/build?preset=${presetId}`}
        className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center cursor-pointer group/btn"
      >
        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest group-hover/btn:text-white transition-colors">View Config</span>
        <span className="text-accent group-hover/btn:translate-x-2 transition-transform">→</span>
      </Link>
    </div>
  </motion.div>
);

const BuildShowcase = () => {
  const systems = [
    {
      presetId: "entry",
      title: "ENTRY",
      price: "Rp 8.500.000",
      specs: [
        { label: "Processor", value: "Intel Core i3-12100" },
        { label: "Graphics", value: "Radeon RX 6600 8GB" },
        { label: "Memory", value: "16GB DDR5-4800MHz" },
        { label: "Storage", value: "500GB NVMe M.2 SSD" }
      ]
    },
    {
      presetId: "balanced",
      title: "BALANCED",
      price: "Rp 15.200.000",
      specs: [
        { label: "Processor", value: "AMD Ryzen 5 7600" },
        { label: "Graphics", value: "GeForce RTX 4060 8GB" },
        { label: "Memory", value: "32GB DDR5-5200MHz" },
        { label: "Storage", value: "1TB NVMe Gen4 SSD" }
      ]
    },
    {
      presetId: "high-end",
      title: "HIGH-END",
      price: "Rp 32.500.000",
      specs: [
        { label: "Processor", value: "Intel Core i7-14700K" },
        { label: "Graphics", value: "GeForce RTX 4070 Ti SUPER" },
        { label: "Memory", value: "32GB DDR5-6000MHz" },
        { label: "Storage", value: "2TB NVMe Gen4 SSD" }
      ]
    }
  ];

  return (
    <section id="builds" className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px bg-accent w-12"></div>
              <h2 className="text-accent text-[10px] font-mono tracking-[0.3em] uppercase">Pre-Configured</h2>
            </div>
            <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tighter text-white">
              CURATED<br/>SYSTEMS.
            </h3>
          </div>
          <p className="text-gray-400 font-sans max-w-sm text-sm leading-relaxed mb-2 md:text-right">
            Start with our optimized configurations tailored for every budget, or build completely from scratch in the Configurator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systems.map((sys, i) => (
            <BuildCard 
              key={sys.title}
              presetId={sys.presetId}
              title={sys.title} 
              price={sys.price} 
              specs={sys.specs}
              delay={i * 0.15} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BuildShowcase;
