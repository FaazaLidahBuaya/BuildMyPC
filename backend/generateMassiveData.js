const fs = require('fs');
const path = require('path');

function getFilePath(filename) {
  return path.join(__dirname, 'seed-json', filename);
}

function readJson(filename) {
  const filePath = getFilePath(filename);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  return [];
}

function writeJson(filename, data) {
  fs.writeFileSync(getFilePath(filename), JSON.stringify(data, null, 2));
}

function randomPrice(base, variance) {
  const mod = (Math.random() * variance * 2) - variance;
  const price = base + (base * mod);
  return Math.round(price / 10000) * 10000; // Round to nearest 10k
}

// ==========================================
// 1. GENERATE CPUs (Adding Gen 8/9/10/11 & Ryzen 1000/2000/3000)
// ==========================================
const cpus = readJson('cpus.json');
const newCpus = [
  // Intel Gen 10
  { name: 'Intel Core i3-10100F', brand: 'Intel', socket: 'LGA1200', cores: 4, threads: 8, baseClock: 3.6, boostClock: 4.3, tdp: 65, integratedGraphics: false, architecture: 'Comet Lake', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 950000 },
  { name: 'Intel Core i5-10400F', brand: 'Intel', socket: 'LGA1200', cores: 6, threads: 12, baseClock: 2.9, boostClock: 4.3, tdp: 65, integratedGraphics: false, architecture: 'Comet Lake', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 1350000 },
  { name: 'Intel Core i7-10700K', brand: 'Intel', socket: 'LGA1200', cores: 8, threads: 16, baseClock: 3.8, boostClock: 5.1, tdp: 125, integratedGraphics: true, architecture: 'Comet Lake', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 3200000 },
  { name: 'Intel Core i9-10900K', brand: 'Intel', socket: 'LGA1200', cores: 10, threads: 20, baseClock: 3.7, boostClock: 5.3, tdp: 125, integratedGraphics: true, architecture: 'Comet Lake', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 4800000 },
  // Intel Gen 11
  { name: 'Intel Core i5-11400F', brand: 'Intel', socket: 'LGA1200', cores: 6, threads: 12, baseClock: 2.6, boostClock: 4.4, tdp: 65, integratedGraphics: false, architecture: 'Rocket Lake', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 4.0', price: 1650000 },
  { name: 'Intel Core i7-11700K', brand: 'Intel', socket: 'LGA1200', cores: 8, threads: 16, baseClock: 3.6, boostClock: 5.0, tdp: 125, integratedGraphics: true, architecture: 'Rocket Lake', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 4.0', price: 3800000 },
  // Ryzen 1000/2000/3000
  { name: 'AMD Ryzen 3 1200', brand: 'AMD', socket: 'AM4', cores: 4, threads: 4, baseClock: 3.1, boostClock: 3.4, tdp: 65, integratedGraphics: false, architecture: 'Zen', memoryType: 'DDR4', maxMemory: 64, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 600000 },
  { name: 'AMD Ryzen 5 1600', brand: 'AMD', socket: 'AM4', cores: 6, threads: 12, baseClock: 3.2, boostClock: 3.6, tdp: 65, integratedGraphics: false, architecture: 'Zen', memoryType: 'DDR4', maxMemory: 64, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 850000 },
  { name: 'AMD Ryzen 5 2600', brand: 'AMD', socket: 'AM4', cores: 6, threads: 12, baseClock: 3.4, boostClock: 3.9, tdp: 65, integratedGraphics: false, architecture: 'Zen+', memoryType: 'DDR4', maxMemory: 64, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 1100000 },
  { name: 'AMD Ryzen 7 2700X', brand: 'AMD', socket: 'AM4', cores: 8, threads: 16, baseClock: 3.7, boostClock: 4.3, tdp: 105, integratedGraphics: false, architecture: 'Zen+', memoryType: 'DDR4', maxMemory: 64, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 1600000 },
  { name: 'AMD Ryzen 3 3100', brand: 'AMD', socket: 'AM4', cores: 4, threads: 8, baseClock: 3.6, boostClock: 3.9, tdp: 65, integratedGraphics: false, architecture: 'Zen 2', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 4.0', price: 1200000 },
  { name: 'AMD Ryzen 5 3600', brand: 'AMD', socket: 'AM4', cores: 6, threads: 12, baseClock: 3.6, boostClock: 4.2, tdp: 65, integratedGraphics: false, architecture: 'Zen 2', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 4.0', price: 1400000 },
  { name: 'AMD Ryzen 7 3700X', brand: 'AMD', socket: 'AM4', cores: 8, threads: 16, baseClock: 3.6, boostClock: 4.4, tdp: 65, integratedGraphics: false, architecture: 'Zen 2', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 4.0', price: 2300000 },
  { name: 'AMD Ryzen 9 3900X', brand: 'AMD', socket: 'AM4', cores: 12, threads: 24, baseClock: 3.8, boostClock: 4.6, tdp: 105, integratedGraphics: false, architecture: 'Zen 2', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 4.0', price: 4200000 }
];
cpus.push(...newCpus);
writeJson('cpus.json', cpus);


// ==========================================
// 2. GENERATE MOTHERBOARDS (Multiply brands across chipsets)
// ==========================================
const motherboards = readJson('motherboards.json');
const mbBrands = ['ASUS', 'MSI', 'Gigabyte', 'ASRock', 'Biostar'];
const baseChipsets = [
  { s: 'LGA1200', c: 'H410', f: 'mATX', rt: 'DDR4', rs: 2, p: 'PCIe 3.0', spd: [2133, 2666, 2933], price: 800000 },
  { s: 'LGA1200', c: 'B460', f: 'mATX', rt: 'DDR4', rs: 4, p: 'PCIe 3.0', spd: [2666, 2933], price: 1200000 },
  { s: 'LGA1200', c: 'Z490', f: 'ATX', rt: 'DDR4', rs: 4, p: 'PCIe 3.0', spd: [3200, 3600, 4000], price: 2500000 },
  { s: 'LGA1200', c: 'H510', f: 'mATX', rt: 'DDR4', rs: 2, p: 'PCIe 4.0', spd: [2133, 2666, 3200], price: 1000000 },
  { s: 'LGA1200', c: 'B560', f: 'mATX', rt: 'DDR4', rs: 4, p: 'PCIe 4.0', spd: [3200, 3600, 4000], price: 1600000 },
  { s: 'LGA1200', c: 'Z590', f: 'ATX', rt: 'DDR4', rs: 4, p: 'PCIe 4.0', spd: [3600, 4000, 4800], price: 3000000 },
  { s: 'AM4', c: 'A320', f: 'mATX', rt: 'DDR4', rs: 2, p: 'PCIe 3.0', spd: [2666, 3200], price: 700000 },
  { s: 'AM4', c: 'B450', f: 'mATX', rt: 'DDR4', rs: 4, p: 'PCIe 3.0', spd: [3200, 3466, 3600], price: 1100000 },
  { s: 'AM4', c: 'X470', f: 'ATX', rt: 'DDR4', rs: 4, p: 'PCIe 3.0', spd: [3200, 3600], price: 2100000 },
  { s: 'AM4', c: 'X570', f: 'ATX', rt: 'DDR4', rs: 4, p: 'PCIe 4.0', spd: [3200, 3600, 4000, 4400], price: 3500000 }
];

const brandPrefixes = {
  'ASUS': ['PRIME', 'TUF GAMING', 'ROG STRIX'],
  'MSI': ['PRO', 'MAG', 'MPG'],
  'Gigabyte': ['Ultra Durable', 'AORUS ELITE', 'AORUS PRO'],
  'ASRock': ['HDV', 'Steel Legend', 'Taichi'],
  'Biostar': ['Racing', 'Valkyrie']
};

baseChipsets.forEach(bc => {
  mbBrands.forEach(brand => {
    // Generate 1-2 boards per brand per chipset
    const prefix = brandPrefixes[brand][Math.floor(Math.random() * brandPrefixes[brand].length)];
    motherboards.push({
      name: `${brand} ${prefix} ${bc.c}M`,
      brand: brand,
      socket: bc.s,
      chipset: bc.c,
      formFactor: bc.f,
      ramType: bc.rt,
      ramSlots: bc.rs,
      maxRam: bc.rs === 4 ? 128 : 64,
      supportedRamSpeeds: bc.spd,
      pcieVersion: bc.p,
      pcieX16Slots: bc.f === 'ATX' ? 2 : 1,
      m2Slots: bc.f === 'ATX' ? 3 : 1,
      sataPorts: 4,
      wifi: Math.random() > 0.7,
      bluetooth: Math.random() > 0.7,
      price: randomPrice(bc.price, 0.2)
    });
  });
});
writeJson('motherboards.json', motherboards);


// ==========================================
// 3. GENERATE RAM (Massive variations)
// ==========================================
const rams = readJson('rams.json');
const ramBrands = ['Corsair', 'G.Skill', 'Kingston', 'ADATA', 'TeamGroup', 'Crucial', 'Patriot', 'V-GeN'];
const ramConfigs = [
  { type: 'DDR3', cap: 4, mod: 1, spd: 1333, v: 1.5, p: 90000 },
  { type: 'DDR3', cap: 8, mod: 1, spd: 1600, v: 1.5, p: 180000 },
  { type: 'DDR3', cap: 16, mod: 2, spd: 1600, v: 1.5, p: 350000 },
  { type: 'DDR4', cap: 8, mod: 1, spd: 2666, v: 1.2, p: 250000 },
  { type: 'DDR4', cap: 16, mod: 2, spd: 2666, v: 1.2, p: 500000 },
  { type: 'DDR4', cap: 8, mod: 1, spd: 3200, v: 1.35, p: 320000 },
  { type: 'DDR4', cap: 16, mod: 2, spd: 3200, v: 1.35, p: 620000 },
  { type: 'DDR4', cap: 32, mod: 2, spd: 3200, v: 1.35, p: 1200000 },
  { type: 'DDR4', cap: 16, mod: 2, spd: 3600, v: 1.35, p: 750000 },
  { type: 'DDR4', cap: 32, mod: 2, spd: 3600, v: 1.35, p: 1400000 },
  { type: 'DDR5', cap: 16, mod: 1, spd: 4800, v: 1.1, p: 700000 },
  { type: 'DDR5', cap: 32, mod: 2, spd: 5200, v: 1.25, p: 1500000 },
  { type: 'DDR5', cap: 32, mod: 2, spd: 5600, v: 1.25, p: 1700000 },
  { type: 'DDR5', cap: 32, mod: 2, spd: 6000, v: 1.35, p: 1900000 },
  { type: 'DDR5', cap: 64, mod: 2, spd: 6000, v: 1.35, p: 3800000 }
];

const ramLines = {
  'Corsair': ['Vengeance LPX', 'Vengeance RGB', 'Dominator Platinum'],
  'G.Skill': ['Aegis', 'Ripjaws V', 'Trident Z'],
  'Kingston': ['ValueRAM', 'FURY Beast', 'FURY Renegade'],
  'ADATA': ['Premier', 'XPG Spectrix', 'XPG Lancer'],
  'TeamGroup': ['Elite', 'T-Force Vulcan', 'T-Force Delta RGB'],
  'Crucial': ['Basics', 'Ballistix'],
  'Patriot': ['Signature', 'Viper Steel'],
  'V-GeN': ['Platinum', 'Tsunami']
};

ramConfigs.forEach(rc => {
  ramBrands.forEach(brand => {
    // Only generate modern lines for DDR4/5, budget lines for DDR3
    let lines = ramLines[brand];
    let line = lines[Math.floor(Math.random() * lines.length)];
    if (rc.type === 'DDR3') line = lines[0]; // Budget line for DDR3
    
    rams.push({
      name: `${brand} ${line} ${rc.cap}GB (${rc.mod}x${rc.cap/rc.mod}GB) ${rc.type}-${rc.spd}`,
      brand: brand,
      type: rc.type,
      capacity: rc.cap,
      modules: rc.mod,
      speed: rc.spd,
      formFactor: 'DIMM',
      voltage: rc.v,
      price: randomPrice(rc.p, 0.15)
    });
  });
});
writeJson('rams.json', rams);


// ==========================================
// 4. GENERATE GPUs (A LOT of them)
// ==========================================
const gpus = readJson('gpus.json');
const gpuVendors = ['ASUS', 'MSI', 'Gigabyte', 'Zotac', 'Galax', 'Colorful', 'Palit', 'Sapphire', 'PowerColor', 'ASRock'];
const gpuBaseModels = [
  // Budget / Older
  { n: 'GT 1030', v: 2, mt: 'GDDR5', l: 150, h: 111, t: 30, req: 300, pcie: 'PCIe 3.0', pc: [], price: 1100000 },
  { n: 'GTX 1060', v: 6, mt: 'GDDR5', l: 240, h: 111, t: 120, req: 400, pcie: 'PCIe 3.0', pc: ['6pin'], price: 1800000 },
  { n: 'GTX 1650 SUPER', v: 4, mt: 'GDDR6', l: 200, h: 111, t: 100, req: 350, pcie: 'PCIe 3.0', pc: ['6pin'], price: 2300000 },
  { n: 'GTX 1660 SUPER', v: 6, mt: 'GDDR6', l: 240, h: 111, t: 125, req: 450, pcie: 'PCIe 3.0', pc: ['8pin'], price: 3200000 },
  { n: 'RX 550', v: 4, mt: 'GDDR5', l: 170, h: 111, t: 50, req: 300, pcie: 'PCIe 3.0', pc: [], price: 1000000 },
  { n: 'RX 5500 XT', v: 8, mt: 'GDDR6', l: 220, h: 111, t: 130, req: 450, pcie: 'PCIe 4.0', pc: ['8pin'], price: 2500000 },
  { n: 'RX 6500 XT', v: 4, mt: 'GDDR6', l: 200, h: 111, t: 107, req: 400, pcie: 'PCIe 4.0', pc: ['6pin'], price: 2600000 },
  // Midrange
  { n: 'RTX 2060', v: 6, mt: 'GDDR6', l: 240, h: 111, t: 160, req: 500, pcie: 'PCIe 3.0', pc: ['8pin'], price: 3500000 },
  { n: 'RTX 3050', v: 8, mt: 'GDDR6', l: 242, h: 112, t: 130, req: 450, pcie: 'PCIe 4.0', pc: ['8pin'], price: 4000000 },
  { n: 'RTX 3060 Ti', v: 8, mt: 'GDDR6', l: 242, h: 112, t: 200, req: 600, pcie: 'PCIe 4.0', pc: ['8pin'], price: 5800000 },
  { n: 'RTX 4060', v: 8, mt: 'GDDR6', l: 240, h: 115, t: 115, req: 550, pcie: 'PCIe 4.0', pc: ['8pin'], price: 4900000 },
  { n: 'RX 6600 XT', v: 8, mt: 'GDDR6', l: 240, h: 115, t: 160, req: 500, pcie: 'PCIe 4.0', pc: ['8pin'], price: 4500000 },
  { n: 'RX 6700 XT', v: 12, mt: 'GDDR6', l: 267, h: 120, t: 230, req: 650, pcie: 'PCIe 4.0', pc: ['8pin', '6pin'], price: 5600000 },
  // High End
  { n: 'RTX 3080', v: 10, mt: 'GDDR6X', l: 285, h: 112, t: 320, req: 750, pcie: 'PCIe 4.0', pc: ['8pin', '8pin'], price: 10500000 },
  { n: 'RTX 4070', v: 12, mt: 'GDDR6X', l: 242, h: 112, t: 200, req: 650, pcie: 'PCIe 4.0', pc: ['12V-2x6'], price: 10000000 },
  { n: 'RX 7900 XT', v: 20, mt: 'GDDR6', l: 276, h: 115, t: 315, req: 750, pcie: 'PCIe 4.0', pc: ['8pin', '8pin'], price: 14500000 }
];

gpuBaseModels.forEach(gb => {
  // Select a subset of vendors based on AMD/NVIDIA
  const isAMD = gb.n.includes('RX');
  const validVendors = gpuVendors.filter(v => {
    if (isAMD) return ['ASUS', 'MSI', 'Gigabyte', 'Sapphire', 'PowerColor', 'ASRock'].includes(v);
    return ['ASUS', 'MSI', 'Gigabyte', 'Zotac', 'Galax', 'Colorful', 'Palit'].includes(v);
  });
  
  // Pick 3 random vendors for this chip
  const selectedVendors = validVendors.sort(() => 0.5 - Math.random()).slice(0, 3);
  
  selectedVendors.forEach(vendor => {
    let suffix = ['Gaming OC', 'Dual', 'Ventus 2X', 'Eagle', 'Twin Edge', 'Pulse', 'Fighter', 'Challenger'][Math.floor(Math.random() * 8)];
    gpus.push({
      name: `${vendor} GeForce ${gb.n} ${suffix}`.replace('GeForce RX', 'Radeon RX'),
      brand: vendor,
      vram: gb.v,
      memoryType: gb.mt,
      length: gb.l + Math.floor(Math.random()*20), // slight variation
      height: gb.h,
      slotWidth: 2,
      tdp: gb.t,
      recommendedPsu: gb.req,
      powerConnectors: gb.pc,
      interface: 'PCIe x16',
      pcieGeneration: gb.pcie,
      price: randomPrice(gb.price, 0.1)
    });
  });
});
writeJson('gpus.json', gpus);


// ==========================================
// 5. GENERATE STORAGE (HDDs, SATA SSDs, NVMe Gen 3/4)
// ==========================================
const storages = readJson('storages.json');
const storageBrands = ['Western Digital', 'Seagate', 'Kingston', 'Crucial', 'ADATA', 'Samsung', 'TeamGroup', 'V-GeN'];
const storageBases = [
  // HDD
  { type: 'HDD', iface: 'SATA', ff: '3.5"', caps: [500, 1000, 2000, 4000], rs: 150, ws: 150, baseP: 1000 }, // price per GB approx
  // SATA SSD
  { type: 'SSD', iface: 'SATA', ff: '2.5"', caps: [128, 256, 512, 1000, 2000], rs: 520, ws: 480, baseP: 1500 },
  // NVMe Gen3
  { type: 'NVMe', iface: 'PCIe 3.0 NVMe', ff: 'M.2 2280', caps: [256, 512, 1000, 2000], rs: 3000, ws: 2500, baseP: 2000 },
  // NVMe Gen4
  { type: 'NVMe', iface: 'PCIe 4.0 NVMe', ff: 'M.2 2280', caps: [500, 1000, 2000, 4000], rs: 7000, ws: 6000, baseP: 3000 }
];

storageBases.forEach(sb => {
  storageBrands.forEach(brand => {
    // Only some brands make HDDs
    if (sb.type === 'HDD' && !['Western Digital', 'Seagate'].includes(brand)) return;
    
    // Pick 2 random capacities for this brand/type
    const caps = [...sb.caps].sort(() => 0.5 - Math.random()).slice(0, 2);
    caps.forEach(cap => {
      let lineName = sb.type === 'HDD' ? 'Blue' : sb.type === 'SSD' ? 'SATA' : 'PRO';
      storages.push({
        name: `${brand} ${lineName} ${cap}GB ${sb.type}`,
        brand: brand,
        type: sb.type,
        capacity: cap,
        interface: sb.iface,
        formFactor: sb.ff,
        readSpeed: sb.rs,
        writeSpeed: sb.ws,
        price: randomPrice(cap * sb.baseP, 0.15)
      });
    });
  });
});
writeJson('storages.json', storages);


// ==========================================
// 6. GENERATE PSUs
// ==========================================
const psus = readJson('psus.json');
const psuBrands = ['Corsair', 'Cooler Master', 'Seasonic', 'Deepcool', 'Aerocool', 'FSP', 'Thermaltake', 'be quiet!'];
const psuWatts = [400, 450, 500, 550, 600, 650, 750, 850, 1000];
psuWatts.forEach(watt => {
  // Pick 3 random brands per wattage
  const brands = [...psuBrands].sort(() => 0.5 - Math.random()).slice(0, 3);
  brands.forEach(brand => {
    let eff = '80+ White';
    let mod = 'Non';
    let baseP = 1500 * watt;
    
    if (watt >= 550) { eff = '80+ Bronze'; baseP = 1800 * watt; }
    if (watt >= 750) { eff = '80+ Gold'; mod = 'Full'; baseP = 2200 * watt; }
    
    psus.push({
      name: `${brand} ${watt}W ${eff}`,
      brand: brand,
      wattage: watt,
      efficiency: eff,
      formFactor: 'ATX',
      length: 150,
      connectors: { cpu8pin: watt>=750?2:1, pcie8pin: Math.floor(watt/300)*2, pcie12v2x6: watt>=850?1:0, sata: 6, molex: 2 },
      modular: mod,
      price: randomPrice(baseP, 0.1)
    });
  });
});
writeJson('psus.json', psus);


// ==========================================
// 7. GENERATE CASES & COOLERS
// ==========================================
const cases = readJson('cases.json');
const caseBrands = ['Corsair', 'NZXT', 'Cooler Master', 'Thermaltake', 'Deepcool', 'Cube Gaming', 'Paradox', 'Armaggeddon', 'Fractal Design', 'Lian Li'];
caseBrands.forEach(brand => {
  // Generate 2 cases per brand
  for(let i=0; i<2; i++) {
    const isBudget = ['Cube Gaming', 'Paradox', 'Armaggeddon'].includes(brand);
    cases.push({
      name: `${brand} Model ${Math.floor(Math.random()*900)+100}`,
      brand: brand,
      formFactors: i===0 ? ['ATX', 'mATX', 'Mini-ITX'] : ['mATX', 'Mini-ITX'],
      type: i===0 ? 'Mid Tower' : 'Mini Tower',
      maxGpuLength: i===0 ? 360 : 300,
      maxCpuCoolerHeight: 165,
      maxPsuLength: 180,
      radiatorSupport: i===0 ? [120, 240, 360] : [120, 240],
      driveBays: { threePointFive: 2, twoPointFive: 2 },
      price: randomPrice(isBudget ? 350000 : 1200000, 0.2)
    });
  }
});
writeJson('cases.json', cases);

const coolers = readJson('coolers.json');
const coolerBrands = ['Deepcool', 'Cooler Master', 'Thermalright', 'ID-COOLING', 'Noctua', 'be quiet!', 'PCCooler'];
coolerBrands.forEach(brand => {
  // Air coolers
  coolers.push({
    name: `${brand} Single Tower Air Cooler`,
    brand: brand,
    type: 'air',
    socketSupport: ['AM4', 'AM5', 'LGA1150', 'LGA1200', 'LGA1700'],
    height: 155,
    radiatorSize: null,
    tdpRating: 150,
    fanCount: 1,
    noise: 28.0,
    price: randomPrice(brand === 'Noctua' ? 900000 : 300000, 0.1)
  });
  // Dual tower or AIO
  if (Math.random() > 0.5) {
    coolers.push({
      name: `${brand} 240mm AIO Liquid Cooler`,
      brand: brand,
      type: 'aio',
      socketSupport: ['AM4', 'AM5', 'LGA1150', 'LGA1200', 'LGA1700'],
      height: null,
      radiatorSize: 240,
      tdpRating: 250,
      fanCount: 2,
      noise: 32.0,
      price: randomPrice(brand === 'Noctua' ? 2000000 : 900000, 0.1)
    });
  }
});
writeJson('coolers.json', coolers);

console.log('Massive component generation complete!');
