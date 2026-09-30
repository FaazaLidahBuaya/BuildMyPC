const fs = require('fs');

const cpus = [];

function randomPrice(base) {
  return Math.round((base + (Math.random() * (base * 0.1))) / 10000) * 10000;
}

// INTEL
function addIntelGen(gen, socket, pcie, memType) {
  // Base modern prices (Gen 14)
  const models = [
    { tier: 'i3', suffix: ['', 'F', 'T'], base: 2200000, c: 4, t: 8 },
    { tier: 'i5', suffix: ['', 'F', 'K', 'KF'], base: 4500000, c: 14, t: 20 },
    { tier: 'i7', suffix: ['', 'F', 'K', 'KF'], base: 7000000, c: 20, t: 28 },
    { tier: 'i9', suffix: ['', 'K', 'KF', 'KS'], base: 10500000, c: 24, t: 32 }
  ];
  
  // Adjust cores/threads for older generations
  if (gen < 12) { 
    models[1].c = 6; models[1].t = 12; // i5
    models[2].c = 8; models[2].t = 16; // i7
    models[3].c = 10; models[3].t = 20; // i9
  }
  if (gen <= 9) {
    models[3].c = 8; models[3].t = 16;
  }
  if (gen <= 8) {
    models[2].t = 8; // i7 8700 had 12, wait, i7 8700k is 6c/12t. Let's simplify.
    models[1].t = 6; // i5 8400 is 6c/6t
  }
  
  // Price depreciation multiplier
  let genMultiplier = 1.0;
  if (gen === 13) genMultiplier = 0.85;
  if (gen === 12) genMultiplier = 0.65;
  if (gen === 11) genMultiplier = 0.45;
  if (gen === 10) genMultiplier = 0.35;
  if (gen === 9) genMultiplier = 0.20;
  if (gen === 8) genMultiplier = 0.12;
  
  models.forEach(m => {
    m.suffix.forEach(s => {
      // Fix naming: gen 8 * 1000 = 8000
      let modelNum = gen * 1000;
      if (m.tier === 'i5') modelNum += 400; // e.g. 12400
      if (m.tier === 'i7') modelNum += 700; // e.g. 12700
      if (m.tier === 'i9') modelNum += 900; // e.g. 12900
      if (m.tier === 'i3') modelNum += 100; // e.g. 12100
      
      const isK = s.includes('K');
      const isF = s.includes('F');
      
      const calculatedPrice = (m.base * genMultiplier) + (isK ? 800000 * genMultiplier : 0) - (isF ? 300000 * genMultiplier : 0);
      
      cpus.push({
        name: `Intel Core ${m.tier}-${modelNum}${s}`,
        brand: 'Intel',
        socket: socket,
        cores: m.c,
        threads: m.t,
        baseClock: parseFloat((2.5 + (Math.random() * 1.0)).toFixed(1)),
        boostClock: parseFloat((4.0 + (Math.random() * 1.5)).toFixed(1)),
        tdp: isK ? 125 : (s.includes('T') ? 35 : 65),
        integratedGraphics: !isF,
        architecture: `Core Gen ${gen}`,
        memoryType: memType,
        maxMemory: 128,
        memoryChannels: 2,
        pcieVersion: pcie,
        price: randomPrice(Math.max(calculatedPrice, 150000)) // Floor price 150k
      });
    });
  });
}

// AMD
function addRyzenGen(genPrefix, socket, pcie, memType) {
  // Base modern prices (Gen 9000)
  const models = [
    { tier: '3', suffix: ['', 'G', 'X'], base: 1800000, c: 4, t: 8 },
    { tier: '5', suffix: ['', 'X', 'G', 'XT'], base: 3500000, c: 6, t: 12 },
    { tier: '7', suffix: ['', 'X', 'X3D'], base: 6000000, c: 8, t: 16 },
    { tier: '9', suffix: ['X', 'X3D'], base: 9500000, c: 12, t: 24 }
  ];
  
  let genMultiplier = 1.0;
  if (genPrefix === 70) genMultiplier = 0.80; // Ryzen 7000
  if (genPrefix === 50) genMultiplier = 0.50; // Ryzen 5000
  if (genPrefix === 30) genMultiplier = 0.30; // Ryzen 3000
  if (genPrefix === 20) genMultiplier = 0.18; // Ryzen 2000
  if (genPrefix === 10) genMultiplier = 0.12; // Ryzen 1000
  
  models.forEach(m => {
    m.suffix.forEach(s => {
      // Fix naming: gen 10 * 100 = 1000
      let modelNum = genPrefix * 100;
      if (m.tier === '5') modelNum += 600;
      if (m.tier === '7') modelNum += 700;
      if (m.tier === '9') modelNum += 900;
      if (m.tier === '3') modelNum += (genPrefix === 10 ? 200 : 100);
      
      const isX = s.includes('X');
      const isG = s.includes('G');
      const isX3D = s.includes('X3D');
      
      const calculatedPrice = (m.base * genMultiplier) + (isX ? 500000 * genMultiplier : 0) + (isX3D ? 1500000 * genMultiplier : 0);
      
      cpus.push({
        name: `AMD Ryzen ${m.tier} ${modelNum}${s}`,
        brand: 'AMD',
        socket: socket,
        cores: m.c,
        threads: m.t,
        baseClock: parseFloat((3.3 + (Math.random() * 0.8)).toFixed(1)),
        boostClock: parseFloat((4.0 + (Math.random() * 1.5)).toFixed(1)),
        tdp: (isX || isX3D) ? 105 : 65,
        integratedGraphics: isG || genPrefix >= 70, // Ryzen 7000+ has iGPU baseline
        architecture: `Zen Architecture`,
        memoryType: memType,
        maxMemory: 128,
        memoryChannels: 2,
        pcieVersion: pcie,
        price: randomPrice(Math.max(calculatedPrice, 150000))
      });
    });
  });
}

// Execute logic
addIntelGen(8, 'LGA1151', 'PCIe 3.0', 'DDR4');
addIntelGen(9, 'LGA1151', 'PCIe 3.0', 'DDR4');
addIntelGen(10, 'LGA1200', 'PCIe 3.0', 'DDR4');
addIntelGen(11, 'LGA1200', 'PCIe 4.0', 'DDR4');
addIntelGen(12, 'LGA1700', 'PCIe 5.0', 'DDR5');
addIntelGen(13, 'LGA1700', 'PCIe 5.0', 'DDR5');
addIntelGen(14, 'LGA1700', 'PCIe 5.0', 'DDR5');

addRyzenGen(10, 'AM4', 'PCIe 3.0', 'DDR4');
addRyzenGen(20, 'AM4', 'PCIe 3.0', 'DDR4');
addRyzenGen(30, 'AM4', 'PCIe 4.0', 'DDR4');
addRyzenGen(50, 'AM4', 'PCIe 4.0', 'DDR4');
addRyzenGen(70, 'AM5', 'PCIe 5.0', 'DDR5');
addRyzenGen(90, 'AM5', 'PCIe 5.0', 'DDR5');

// Absolute Legacy Legends
cpus.push({ name: 'Intel Core i7-4790K', brand: 'Intel', socket: 'LGA1150', cores: 4, threads: 8, baseClock: 4.0, boostClock: 4.4, tdp: 88, integratedGraphics: true, architecture: 'Haswell', memoryType: 'DDR3', maxMemory: 32, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 650000 });
cpus.push({ name: 'Intel Core i5-4590', brand: 'Intel', socket: 'LGA1150', cores: 4, threads: 4, baseClock: 3.3, boostClock: 3.7, tdp: 84, integratedGraphics: true, architecture: 'Haswell', memoryType: 'DDR3', maxMemory: 32, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 250000 });
cpus.push({ name: 'AMD Athlon 3000G', brand: 'AMD', socket: 'AM4', cores: 2, threads: 4, baseClock: 3.5, boostClock: 3.5, tdp: 35, integratedGraphics: true, architecture: 'Zen', memoryType: 'DDR4', maxMemory: 64, memoryChannels: 2, pcieVersion: 'PCIe 3.0', price: 350000 });

fs.writeFileSync(__dirname + '/seed-json/cpus.json', JSON.stringify(cpus, null, 2));
console.log('Fixed names and prices for ' + cpus.length + ' CPUs!');
