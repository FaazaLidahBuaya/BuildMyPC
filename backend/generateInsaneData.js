const fs = require('fs');
const path = require('path');

function getFilePath(filename) {
  return path.join(__dirname, 'seed-json', filename);
}

function writeJson(filename, data) {
  fs.writeFileSync(getFilePath(filename), JSON.stringify(data, null, 2));
}

function randomPrice(base, variance) {
  const mod = (Math.random() * variance * 2) - variance;
  const price = base + (base * mod);
  return Math.round(price / 10000) * 10000;
}

// ==========================================
// 1. CPUs
// ==========================================
const cpus = [];
// LGA1150
cpus.push({ name: 'Intel Core i7-4790K', brand: 'Intel', socket: 'LGA1150', cores: 4, threads: 8, baseClock: 4.0, boostClock: 4.4, tdp: 88, integratedGraphics: true, architecture: 'Haswell', memoryType: 'DDR3', maxMemory: 32, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 850000 });
cpus.push({ name: 'Intel Core i5-4590', brand: 'Intel', socket: 'LGA1150', cores: 4, threads: 4, baseClock: 3.3, boostClock: 3.7, tdp: 84, integratedGraphics: true, architecture: 'Haswell', memoryType: 'DDR3', maxMemory: 32, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 400000 });

// LGA1151 (Gen 6/7/8/9)
cpus.push({ name: 'Intel Core i7-7700K', brand: 'Intel', socket: 'LGA1151', cores: 4, threads: 8, baseClock: 4.2, boostClock: 4.5, tdp: 91, integratedGraphics: true, architecture: 'Kaby Lake', memoryType: 'DDR4', maxMemory: 64, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 1500000 });
cpus.push({ name: 'Intel Core i5-8400', brand: 'Intel', socket: 'LGA1151', cores: 6, threads: 6, baseClock: 2.8, boostClock: 4.0, tdp: 65, integratedGraphics: true, architecture: 'Coffee Lake', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 1100000 });
cpus.push({ name: 'Intel Core i9-9900K', brand: 'Intel', socket: 'LGA1151', cores: 8, threads: 16, baseClock: 3.6, boostClock: 5.0, tdp: 95, integratedGraphics: true, architecture: 'Coffee Lake', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 3500000 });

// LGA1200 (Gen 10/11)
cpus.push({ name: 'Intel Core i3-10100F', brand: 'Intel', socket: 'LGA1200', cores: 4, threads: 8, baseClock: 3.6, boostClock: 4.3, tdp: 65, integratedGraphics: false, architecture: 'Comet Lake', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 950000 });
cpus.push({ name: 'Intel Core i5-11400F', brand: 'Intel', socket: 'LGA1200', cores: 6, threads: 12, baseClock: 2.6, boostClock: 4.4, tdp: 65, integratedGraphics: false, architecture: 'Rocket Lake', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 4.0', price: 1650000 });

// LGA1700 (Gen 12/13/14)
cpus.push({ name: 'Intel Core i3-12100F', brand: 'Intel', socket: 'LGA1700', cores: 4, threads: 8, baseClock: 3.3, boostClock: 4.3, tdp: 58, integratedGraphics: false, architecture: 'Alder Lake', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 4.0', price: 1300000 });
cpus.push({ name: 'Intel Core i5-12400F', brand: 'Intel', socket: 'LGA1700', cores: 6, threads: 12, baseClock: 2.5, boostClock: 4.4, tdp: 65, integratedGraphics: false, architecture: 'Alder Lake', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 4.0', price: 1800000 });
cpus.push({ name: 'Intel Core i5-13400F', brand: 'Intel', socket: 'LGA1700', cores: 10, threads: 16, baseClock: 2.5, boostClock: 4.6, tdp: 65, integratedGraphics: false, architecture: 'Raptor Lake', memoryType: 'DDR5', maxMemory: 192, memoryChannels: 2, pcieVersion: 'PCIe 5.0', price: 3200000 });
cpus.push({ name: 'Intel Core i7-13700K', brand: 'Intel', socket: 'LGA1700', cores: 16, threads: 24, baseClock: 3.4, boostClock: 5.4, tdp: 125, integratedGraphics: true, architecture: 'Raptor Lake', memoryType: 'DDR5', maxMemory: 192, memoryChannels: 2, pcieVersion: 'PCIe 5.0', price: 6500000 });
cpus.push({ name: 'Intel Core i9-14900K', brand: 'Intel', socket: 'LGA1700', cores: 24, threads: 32, baseClock: 3.2, boostClock: 6.0, tdp: 125, integratedGraphics: true, architecture: 'Raptor Lake Refresh', memoryType: 'DDR5', maxMemory: 192, memoryChannels: 2, pcieVersion: 'PCIe 5.0', price: 10500000 });

// AM4
cpus.push({ name: 'AMD Athlon 3000G', brand: 'AMD', socket: 'AM4', cores: 2, threads: 4, baseClock: 3.5, boostClock: 3.5, tdp: 35, integratedGraphics: true, architecture: 'Zen', memoryType: 'DDR4', maxMemory: 64, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 650000 });
cpus.push({ name: 'AMD Ryzen 5 3600', brand: 'AMD', socket: 'AM4', cores: 6, threads: 12, baseClock: 3.6, boostClock: 4.2, tdp: 65, integratedGraphics: false, architecture: 'Zen 2', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 4.0', price: 1400000 });
cpus.push({ name: 'AMD Ryzen 5 5600', brand: 'AMD', socket: 'AM4', cores: 6, threads: 12, baseClock: 3.5, boostClock: 4.4, tdp: 65, integratedGraphics: false, architecture: 'Zen 3', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 4.0', price: 1900000 });
cpus.push({ name: 'AMD Ryzen 7 5700X3D', brand: 'AMD', socket: 'AM4', cores: 8, threads: 16, baseClock: 3.0, boostClock: 4.1, tdp: 105, integratedGraphics: false, architecture: 'Zen 3', memoryType: 'DDR4', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 4.0', price: 3800000 });

// AM5
cpus.push({ name: 'AMD Ryzen 5 7600', brand: 'AMD', socket: 'AM5', cores: 6, threads: 12, baseClock: 3.8, boostClock: 5.1, tdp: 65, integratedGraphics: true, architecture: 'Zen 4', memoryType: 'DDR5', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 5.0', price: 3200000 });
cpus.push({ name: 'AMD Ryzen 7 7800X3D', brand: 'AMD', socket: 'AM5', cores: 8, threads: 16, baseClock: 4.2, boostClock: 5.0, tdp: 120, integratedGraphics: true, architecture: 'Zen 4', memoryType: 'DDR5', maxMemory: 128, memoryChannels: 2, pcieVersion: 'PCIe 5.0', price: 6500000 });


// ==========================================
// 2. MOTHERBOARDS
// ==========================================
const motherboards = [];
const mbBrands = ['ASUS', 'MSI', 'Gigabyte', 'ASRock', 'Biostar', 'Colorful'];
const mbBases = [
  // LGA1150
  { s: 'LGA1150', c: 'H81', f: 'mATX', rt: 'DDR3', rs: 2, p: 'PCIe 2.0', spd: [1600], price: 350000 },
  { s: 'LGA1150', c: 'Z97', f: 'ATX', rt: 'DDR3', rs: 4, p: 'PCIe 3.0', spd: [2400], price: 900000 },
  // LGA1151
  { s: 'LGA1151', c: 'H310', f: 'mATX', rt: 'DDR4', rs: 2, p: 'PCIe 3.0', spd: [2666], price: 700000 },
  { s: 'LGA1151', c: 'Z390', f: 'ATX', rt: 'DDR4', rs: 4, p: 'PCIe 3.0', spd: [3600], price: 1800000 },
  // LGA1200
  { s: 'LGA1200', c: 'H410', f: 'mATX', rt: 'DDR4', rs: 2, p: 'PCIe 3.0', spd: [2933], price: 900000 },
  { s: 'LGA1200', c: 'B560', f: 'mATX', rt: 'DDR4', rs: 4, p: 'PCIe 4.0', spd: [3200, 3600], price: 1500000 },
  // LGA1700 (DDR4 & DDR5 variants)
  { s: 'LGA1700', c: 'H610', f: 'mATX', rt: 'DDR4', rs: 2, p: 'PCIe 4.0', spd: [3200], price: 1200000 },
  { s: 'LGA1700', c: 'B760', f: 'mATX', rt: 'DDR5', rs: 4, p: 'PCIe 5.0', spd: [5600, 6000], price: 2200000 },
  { s: 'LGA1700', c: 'Z790', f: 'ATX', rt: 'DDR5', rs: 4, p: 'PCIe 5.0', spd: [6000, 7200], price: 4500000 },
  // AM4
  { s: 'AM4', c: 'A320', f: 'mATX', rt: 'DDR4', rs: 2, p: 'PCIe 3.0', spd: [3200], price: 650000 },
  { s: 'AM4', c: 'B450', f: 'mATX', rt: 'DDR4', rs: 4, p: 'PCIe 3.0', spd: [3200, 3600], price: 1100000 },
  { s: 'AM4', c: 'B550', f: 'mATX', rt: 'DDR4', rs: 4, p: 'PCIe 4.0', spd: [3600, 4000], price: 1800000 },
  { s: 'AM4', c: 'X570', f: 'ATX', rt: 'DDR4', rs: 4, p: 'PCIe 4.0', spd: [3600, 4400], price: 3200000 },
  // AM5
  { s: 'AM5', c: 'A620', f: 'mATX', rt: 'DDR5', rs: 2, p: 'PCIe 4.0', spd: [5200, 6000], price: 1500000 },
  { s: 'AM5', c: 'B650', f: 'mATX', rt: 'DDR5', rs: 4, p: 'PCIe 4.0', spd: [6000, 6400], price: 2500000 },
  { s: 'AM5', c: 'X670E', f: 'ATX', rt: 'DDR5', rs: 4, p: 'PCIe 5.0', spd: [6000, 7600], price: 5800000 }
];

const brandPrefixes = {
  'ASUS': ['PRIME', 'TUF GAMING', 'ROG STRIX', 'PRO'],
  'MSI': ['PRO', 'MAG MORTAR', 'MAG TOMAHAWK', 'MPG EDGE'],
  'Gigabyte': ['Ultra Durable', 'AORUS ELITE', 'AORUS PRO', 'AORUS MASTER'],
  'ASRock': ['HDV', 'Pro4', 'Steel Legend', 'Taichi'],
  'Biostar': ['Racing', 'Valkyrie'],
  'Colorful': ['BATTLE-AX', 'CVN']
};

mbBases.forEach(bc => {
  mbBrands.forEach(brand => {
    const prefixes = brandPrefixes[brand];
    // Generate 3 random boards per brand per chipset
    for(let i=0; i<3; i++) {
      const prefix = prefixes[i % prefixes.length];
      motherboards.push({
        name: `${brand} ${prefix} ${bc.c}${bc.f==='mATX'?'M':''}`,
        brand: brand,
        socket: bc.s,
        chipset: bc.c,
        formFactor: bc.f,
        ramType: bc.rt,
        ramSlots: bc.rs,
        maxRam: bc.rs === 4 ? (bc.rt==='DDR5'?192:128) : (bc.rt==='DDR3'?16:64),
        supportedRamSpeeds: bc.spd,
        pcieVersion: bc.p,
        pcieX16Slots: bc.f === 'ATX' ? 2 : 1,
        m2Slots: bc.f === 'ATX' ? 3 : 1,
        sataPorts: 4,
        wifi: Math.random() > 0.5,
        bluetooth: Math.random() > 0.5,
        price: randomPrice(bc.price, 0.25)
      });
    }
  });
});


// ==========================================
// 3. RAM
// ==========================================
const rams = [];
const ramBrands = ['Corsair', 'G.Skill', 'Kingston', 'ADATA', 'TeamGroup', 'Crucial', 'Patriot', 'V-GeN', 'Lexar', 'Klevv'];
const ramConfigs = [
  { type: 'DDR3', cap: 4, mod: 1, spd: 1333, v: 1.5, p: 90000 },
  { type: 'DDR3', cap: 8, mod: 1, spd: 1600, v: 1.5, p: 180000 },
  { type: 'DDR3', cap: 16, mod: 2, spd: 1600, v: 1.5, p: 350000 },
  { type: 'DDR4', cap: 8, mod: 1, spd: 2666, v: 1.2, p: 250000 },
  { type: 'DDR4', cap: 16, mod: 2, spd: 2666, v: 1.2, p: 500000 },
  { type: 'DDR4', cap: 8, mod: 1, spd: 3200, v: 1.35, p: 320000 },
  { type: 'DDR4', cap: 16, mod: 2, spd: 3200, v: 1.35, p: 600000 },
  { type: 'DDR4', cap: 32, mod: 2, spd: 3200, v: 1.35, p: 1100000 },
  { type: 'DDR4', cap: 16, mod: 2, spd: 3600, v: 1.35, p: 700000 },
  { type: 'DDR4', cap: 32, mod: 2, spd: 3600, v: 1.35, p: 1300000 },
  { type: 'DDR5', cap: 16, mod: 1, spd: 4800, v: 1.1, p: 650000 },
  { type: 'DDR5', cap: 32, mod: 2, spd: 5200, v: 1.25, p: 1400000 },
  { type: 'DDR5', cap: 32, mod: 2, spd: 5600, v: 1.25, p: 1600000 },
  { type: 'DDR5', cap: 32, mod: 2, spd: 6000, v: 1.35, p: 1800000 },
  { type: 'DDR5', cap: 64, mod: 2, spd: 6000, v: 1.35, p: 3600000 },
  { type: 'DDR5', cap: 64, mod: 2, spd: 7200, v: 1.4, p: 4800000 }
];

const ramLines = {
  'Corsair': ['Vengeance LPX', 'Vengeance RGB', 'Dominator Platinum', 'ValueSelect'],
  'G.Skill': ['Aegis', 'Ripjaws V', 'Trident Z RGB', 'Trident Z5 Neo'],
  'Kingston': ['ValueRAM', 'FURY Beast', 'FURY Renegade'],
  'ADATA': ['Premier', 'XPG Spectrix D41', 'XPG Lancer RGB'],
  'TeamGroup': ['Elite', 'T-Force Vulcan Z', 'T-Force Delta RGB'],
  'Crucial': ['Basics', 'Pro', 'Ballistix MAX'],
  'Patriot': ['Signature Line', 'Viper Steel', 'Viper Venom'],
  'V-GeN': ['Platinum', 'Tsunami', 'Tsunami RGB'],
  'Lexar': ['THOR', 'ARES RGB'],
  'Klevv': ['BOLT X', 'CRAS X RGB', 'CRAS V']
};

ramConfigs.forEach(rc => {
  ramBrands.forEach(brand => {
    const lines = ramLines[brand];
    // Generate 2 variations per config
    for(let i=0; i<2; i++) {
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
        price: randomPrice(rc.p, 0.2)
      });
    }
  });
});


// ==========================================
// 4. GPUs
// ==========================================
const gpus = [];
const gpuVendors = ['ASUS', 'MSI', 'Gigabyte', 'Zotac', 'Galax', 'Colorful', 'Palit', 'Sapphire', 'PowerColor', 'ASRock', 'XFX', 'Inno3D'];
const gpuBaseModels = [
  // Super Budget / Old
  { n: 'GT 730', v: 2, mt: 'GDDR5', l: 150, h: 111, t: 38, req: 300, pcie: 'PCIe 2.0', pc: [], price: 600000 },
  { n: 'GTX 750 Ti', v: 2, mt: 'GDDR5', l: 150, h: 111, t: 60, req: 300, pcie: 'PCIe 3.0', pc: [], price: 500000 },
  { n: 'GTX 1050 Ti', v: 4, mt: 'GDDR5', l: 150, h: 111, t: 75, req: 300, pcie: 'PCIe 3.0', pc: [], price: 1100000 },
  { n: 'RX 570', v: 4, mt: 'GDDR5', l: 240, h: 111, t: 150, req: 450, pcie: 'PCIe 3.0', pc: ['8pin'], price: 900000 },
  { n: 'RX 580', v: 8, mt: 'GDDR5', l: 240, h: 111, t: 185, req: 500, pcie: 'PCIe 3.0', pc: ['8pin'], price: 1200000 },
  { n: 'GTX 1660 SUPER', v: 6, mt: 'GDDR6', l: 240, h: 111, t: 125, req: 450, pcie: 'PCIe 3.0', pc: ['8pin'], price: 2800000 },
  
  // RTX 20 / 30 / 40 Series
  { n: 'RTX 2060', v: 6, mt: 'GDDR6', l: 240, h: 111, t: 160, req: 500, pcie: 'PCIe 3.0', pc: ['8pin'], price: 3200000 },
  { n: 'RTX 3060', v: 12, mt: 'GDDR6', l: 242, h: 112, t: 170, req: 550, pcie: 'PCIe 4.0', pc: ['8pin'], price: 4500000 },
  { n: 'RTX 3060 Ti', v: 8, mt: 'GDDR6', l: 242, h: 112, t: 200, req: 600, pcie: 'PCIe 4.0', pc: ['8pin'], price: 5800000 },
  { n: 'RTX 4060', v: 8, mt: 'GDDR6', l: 240, h: 115, t: 115, req: 550, pcie: 'PCIe 4.0', pc: ['8pin'], price: 4900000 },
  { n: 'RTX 4070 SUPER', v: 12, mt: 'GDDR6X', l: 285, h: 112, t: 220, req: 650, pcie: 'PCIe 4.0', pc: ['12V-2x6'], price: 10500000 },
  { n: 'RTX 4090', v: 24, mt: 'GDDR6X', l: 336, h: 140, t: 450, req: 850, pcie: 'PCIe 4.0', pc: ['12V-2x6'], price: 35000000 },

  // RX 6000 / 7000 Series
  { n: 'RX 6600', v: 8, mt: 'GDDR6', l: 200, h: 111, t: 132, req: 450, pcie: 'PCIe 4.0', pc: ['8pin'], price: 3200000 },
  { n: 'RX 6700 XT', v: 12, mt: 'GDDR6', l: 267, h: 120, t: 230, req: 650, pcie: 'PCIe 4.0', pc: ['8pin', '6pin'], price: 5600000 },
  { n: 'RX 7600', v: 8, mt: 'GDDR6', l: 204, h: 115, t: 165, req: 550, pcie: 'PCIe 4.0', pc: ['8pin'], price: 4500000 },
  { n: 'RX 7900 XTX', v: 24, mt: 'GDDR6', l: 287, h: 120, t: 355, req: 800, pcie: 'PCIe 4.0', pc: ['8pin', '8pin'], price: 16500000 }
];

gpuBaseModels.forEach(gb => {
  const isAMD = gb.n.includes('RX');
  const validVendors = gpuVendors.filter(v => {
    if (isAMD) return ['ASUS', 'MSI', 'Gigabyte', 'Sapphire', 'PowerColor', 'ASRock', 'XFX'].includes(v);
    return ['ASUS', 'MSI', 'Gigabyte', 'Zotac', 'Galax', 'Colorful', 'Palit', 'Inno3D'].includes(v);
  });
  
  // Every valid vendor makes 2 variants of this GPU
  validVendors.forEach(vendor => {
    for(let i=0; i<2; i++) {
      let suffix = ['Gaming OC', 'Dual', 'Ventus 2X', 'Eagle', 'Twin Edge', 'Pulse', 'Fighter', 'Challenger', 'iGame', 'Super JetStream', 'Ichill'][Math.floor(Math.random() * 11)];
      gpus.push({
        name: `${vendor} GeForce ${gb.n} ${suffix}`.replace('GeForce RX', 'Radeon RX'),
        brand: vendor,
        vram: gb.v,
        memoryType: gb.mt,
        length: gb.l + Math.floor(Math.random()*40),
        height: gb.h,
        slotWidth: gb.t > 250 ? 3 : 2,
        tdp: gb.t,
        recommendedPsu: gb.req,
        powerConnectors: gb.pc,
        interface: 'PCIe x16',
        pcieGeneration: gb.pcie,
        price: randomPrice(gb.price, 0.15)
      });
    }
  });
});


// ==========================================
// 5. STORAGE
// ==========================================
const storages = [];
const storageBrands = ['Western Digital', 'Seagate', 'Kingston', 'Crucial', 'ADATA', 'Samsung', 'TeamGroup', 'V-GeN', 'Lexar', 'PNY'];
const storageBases = [
  { type: 'HDD', iface: 'SATA', ff: '3.5"', caps: [500, 1000, 2000, 4000], rs: 150, ws: 150, baseP: 600 }, 
  { type: 'SSD', iface: 'SATA', ff: '2.5"', caps: [128, 256, 512, 1000, 2000], rs: 520, ws: 480, baseP: 1100 },
  { type: 'NVMe', iface: 'PCIe 3.0 NVMe', ff: 'M.2 2280', caps: [256, 512, 1000, 2000], rs: 3000, ws: 2500, baseP: 1500 },
  { type: 'NVMe', iface: 'PCIe 4.0 NVMe', ff: 'M.2 2280', caps: [500, 1000, 2000, 4000], rs: 7000, ws: 6000, baseP: 2500 },
  { type: 'NVMe', iface: 'PCIe 5.0 NVMe', ff: 'M.2 2280', caps: [1000, 2000, 4000], rs: 12000, ws: 11000, baseP: 4500 }
];

storageBases.forEach(sb => {
  storageBrands.forEach(brand => {
    if (sb.type === 'HDD' && !['Western Digital', 'Seagate'].includes(brand)) return;
    
    sb.caps.forEach(cap => {
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
        price: randomPrice(cap * sb.baseP, 0.2)
      });
    });
  });
});


// ==========================================
// 6. PSUs
// ==========================================
const psus = [];
const psuBrands = ['Corsair', 'Cooler Master', 'Seasonic', 'Deepcool', 'Aerocool', 'FSP', 'Thermaltake', 'be quiet!', 'NZXT', 'SilverStone', 'MSI', 'ASUS'];
const psuWatts = [400, 450, 500, 550, 600, 650, 750, 850, 1000, 1200];
psuWatts.forEach(watt => {
  psuBrands.forEach(brand => {
    // Generate 1-2 per brand per wattage
    for(let i=0; i < (Math.random() > 0.5 ? 2 : 1); i++) {
      let eff = '80+ White';
      let mod = 'Non';
      let baseP = 1200 * watt;
      
      if (watt >= 550) { eff = '80+ Bronze'; baseP = 1500 * watt; }
      if (watt >= 750) { eff = '80+ Gold'; mod = 'Full'; baseP = 2200 * watt; }
      if (watt >= 1000) { eff = '80+ Platinum'; baseP = 3000 * watt; }
      
      psus.push({
        name: `${brand} Series ${watt}W ${eff}`,
        brand: brand,
        wattage: watt,
        efficiency: eff,
        formFactor: 'ATX',
        length: 150,
        connectors: { cpu8pin: watt>=750?2:1, pcie8pin: Math.floor(watt/250)*2, pcie12v2x6: watt>=850?1:0, sata: 6, molex: 2 },
        modular: mod,
        price: randomPrice(baseP, 0.15)
      });
    }
  });
});


// ==========================================
// 7. CASES & COOLERS
// ==========================================
const cases = [];
const caseBrands = ['Corsair', 'NZXT', 'Cooler Master', 'Thermaltake', 'Deepcool', 'Cube Gaming', 'Paradox', 'Armaggeddon', 'Fractal Design', 'Lian Li', 'Phanteks', 'Tecware', 'Montech'];
caseBrands.forEach(brand => {
  // Generate 5 cases per brand
  for(let i=0; i<5; i++) {
    const isBudget = ['Cube Gaming', 'Paradox', 'Armaggeddon', 'Tecware'].includes(brand);
    cases.push({
      name: `${brand} Model ${Math.floor(Math.random()*900)+100}`,
      brand: brand,
      formFactors: i%2===0 ? ['ATX', 'mATX', 'Mini-ITX'] : ['mATX', 'Mini-ITX'],
      type: i%2===0 ? 'Mid Tower' : 'Mini Tower',
      maxGpuLength: i%2===0 ? 360 : 300,
      maxCpuCoolerHeight: 165,
      maxPsuLength: 180,
      radiatorSupport: i%2===0 ? [120, 240, 360] : [120, 240],
      driveBays: { threePointFive: 2, twoPointFive: 2 },
      price: randomPrice(isBudget ? 400000 : 1500000, 0.3)
    });
  }
});


const coolers = [];
const coolerBrands = ['Deepcool', 'Cooler Master', 'Thermalright', 'ID-COOLING', 'Noctua', 'be quiet!', 'PCCooler', 'NZXT', 'Corsair', 'Arctic'];
// EVERY COOLER MUST HAVE EVERY SOCKET to prevent "not found/incompatible" user complaints
const allSockets = ['AM3', 'AM3+', 'AM4', 'AM5', 'LGA1150', 'LGA1151', 'LGA1200', 'LGA1700'];

coolerBrands.forEach(brand => {
  // Generate 5 Air coolers and 5 Liquid coolers per brand
  for(let i=0; i<5; i++) {
    coolers.push({
      name: `${brand} Single Tower Air V${i}`,
      brand: brand,
      type: 'air',
      socketSupport: allSockets,
      height: 155,
      radiatorSize: null,
      tdpRating: 150 + (i*20),
      fanCount: i%2===0 ? 2 : 1,
      noise: 28.0,
      price: randomPrice(brand === 'Noctua' ? 1000000 : 350000, 0.2)
    });
    
    coolers.push({
      name: `${brand} Liquid AIO ${i%2===0 ? '240mm' : '360mm'} V${i}`,
      brand: brand,
      type: 'aio',
      socketSupport: allSockets,
      height: null,
      radiatorSize: i%2===0 ? 240 : 360,
      tdpRating: i%2===0 ? 250 : 350,
      fanCount: i%2===0 ? 2 : 3,
      noise: 32.0,
      price: randomPrice(brand === 'Noctua' || brand === 'NZXT' ? 2500000 : 1200000, 0.2)
    });
  }
});


writeJson('cpus.json', cpus);
writeJson('motherboards.json', motherboards);
writeJson('rams.json', rams);
writeJson('gpus.json', gpus);
writeJson('storages.json', storages);
writeJson('psus.json', psus);
writeJson('cases.json', cases);
writeJson('coolers.json', coolers);

console.log(`Generated insane data payload!
CPUs: ${cpus.length}
Motherboards: ${motherboards.length}
RAMs: ${rams.length}
GPUs: ${gpus.length}
Storages: ${storages.length}
PSUs: ${psus.length}
Cases: ${cases.length}
Coolers: ${coolers.length}
Total: ${cpus.length+motherboards.length+rams.length+gpus.length+storages.length+psus.length+cases.length+coolers.length}
`);
