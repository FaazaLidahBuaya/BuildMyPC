const { checkCompatibility } = require('../services/compatibilityEngine');

const runTest = (name, components, expectedStatus, checkFunction = null) => {
  const result = checkCompatibility(components);
  let passed = result.status === expectedStatus;
  
  if (checkFunction) {
    passed = passed && checkFunction(result);
  }

  if (passed) {
    console.log(`✅ PASS: ${name}`);
  } else {
    console.error(`❌ FAIL: ${name}`);
    console.error(`   Expected: ${expectedStatus}, Got: ${result.status}`);
    console.error(`   Details:`, result.errors, result.warnings);
  }
  return passed;
};

const runAllTests = () => {
  console.log('--- Menjalankan Pengujian Kompatibilitas ---');
  let passedCount = 0;
  let totalTests = 13;

  // 1. AM5 CPU + AM5 MB → compatible
  const t1_cpu = { socket: 'AM5', tdp: 105 };
  const t1_mb = { socket: 'AM5' };
  if (runTest('AM5 CPU + AM5 MB', { cpu: t1_cpu, motherboard: t1_mb }, 'compatible')) passedCount++;

  // 2. AM5 CPU + LGA1700 MB → incompatible
  const t2_mb = { socket: 'LGA1700' };
  if (runTest('AM5 CPU + LGA1700 MB', { cpu: t1_cpu, motherboard: t2_mb }, 'incompatible')) passedCount++;

  // 3. DDR5 MB + DDR5 RAM → compatible
  const t3_mb = { ramType: 'DDR5', ramSlots: 4, maxRam: 128, supportedRamSpeeds: [6000] };
  const t3_ram = { type: 'DDR5', capacity: 32, modules: 2, speed: 6000 };
  if (runTest('DDR5 MB + DDR5 RAM', { motherboard: t3_mb, ram: t3_ram }, 'compatible')) passedCount++;

  // 4. DDR5 MB + DDR4 RAM → incompatible
  const t4_ram = { type: 'DDR4', capacity: 32, modules: 2, speed: 3200 };
  if (runTest('DDR5 MB + DDR4 RAM', { motherboard: t3_mb, ram: t4_ram }, 'incompatible')) passedCount++;

  // 5. GPU 340mm + Case max 320mm → incompatible
  const t5_gpu = { length: 340 };
  const t5_case = { maxGpuLength: 320 };
  if (runTest('GPU 340mm + Case max 320mm', { gpu: t5_gpu, pcCase: t5_case }, 'incompatible')) passedCount++;

  // 6. GPU 450W TDP + system 550W total + 600W PSU → insufficient (incompatible)
  // Base power = 30(MB)+15(fans) = 45. CPU say 105. GPU = 450. Total = 600W. 
  // Estimated power 600 > PSU 600? Wait, 600 > 600 is false. But wait, we need > psu.wattage.
  // Let's make it 550W total. Say CPU 100W, MB 30W, fans 15W. GPU = 450W. Total 595W.
  // Let's just set the test up so estimatedPower > 600.
  const t6_gpu = { tdp: 500 }; 
  const t6_cpu = { tdp: 105 }; // total estimated: 105 + 500 + 30 + 15 = 650
  const t6_psu = { wattage: 600 };
  if (runTest('Estimated Power > PSU', { cpu: t6_cpu, gpu: t6_gpu, psu: t6_psu }, 'incompatible')) passedCount++;

  // 7. PSU borderline (just at estimated but below recommended) → warning
  // estimated: 105 + 200 + 30 + 15 = 350. Recommended = 455.
  const t7_gpu = { tdp: 200 };
  const t7_psu = { wattage: 400 }; // 400 > 350 (ok), 400 < 455 (warning)
  if (runTest('PSU borderline', { cpu: t1_cpu, gpu: t7_gpu, psu: t7_psu }, 'warning')) passedCount++;

  // 8. ATX MB + Mini-ITX only case → incompatible
  const t8_mb = { formFactor: 'ATX' };
  const t8_case = { formFactors: ['Mini-ITX'] };
  if (runTest('ATX MB + Mini-ITX case', { motherboard: t8_mb, pcCase: t8_case }, 'incompatible')) passedCount++;

  // 9. Cooler doesn't support CPU socket → incompatible
  const t9_cooler = { socketSupport: ['LGA1700'] };
  const t9_cpu = { socket: 'AM5', tdp: 65 };
  if (runTest('Cooler incompatible socket', { cooler: t9_cooler, cpu: t9_cpu }, 'incompatible')) passedCount++;

  // 10. Cooler 170mm height + case max 165mm → incompatible
  const t10_cooler = { type: 'air', height: 170 };
  const t10_case = { maxCpuCoolerHeight: 165 };
  if (runTest('Air cooler too tall', { cooler: t10_cooler, pcCase: t10_case }, 'incompatible')) passedCount++;

  // 11. GPU PCIe 5.0 + MB PCIe 4.0 → warning NOT incompatible
  const t11_gpu = { pcieGeneration: 'PCIe 5.0' };
  const t11_mb = { pcieVersion: 'PCIe 4.0', pcieX16Slots: 1 };
  if (runTest('GPU PCIe 5.0 + MB PCIe 4.0', { gpu: t11_gpu, motherboard: t11_mb }, 'warning')) passedCount++;

  // 12. RAM 6400MHz + MB supports up to 6000MHz → warning NOT incompatible
  const t12_ram = { type: 'DDR5', capacity: 32, modules: 2, speed: 6400 };
  const t12_mb = { ramType: 'DDR5', ramSlots: 4, maxRam: 128, supportedRamSpeeds: [5200, 5600, 6000] };
  if (runTest('RAM speed > MB support', { motherboard: t12_mb, ram: t12_ram }, 'warning')) passedCount++;

  // 13. Multiple errors → all errors returned
  if (runTest('Multiple errors', { cpu: t1_cpu, motherboard: t2_mb, pcCase: t8_case, gpu: t5_gpu }, 'incompatible', (res) => res.errors.length > 1)) passedCount++;

  console.log(`\nRingkasan: ${passedCount}/${totalTests} Pengujian Lulus`);
};

runAllTests();
