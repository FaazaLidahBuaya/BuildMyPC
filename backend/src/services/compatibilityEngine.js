const { calculatePower } = require('./powerCalculator');

const checkCompatibility = (components) => {
  const { cpu, motherboard, gpu, ram, storage, psu, pcCase, cooler } = components;
  
  let score = 100;
  const errors = [];
  const warnings = [];
  const checks = [];

  // 1. CPU ↔ Motherboard
  if (cpu && motherboard) {
    if (cpu.socket !== motherboard.socket) {
      errors.push(`CPU menggunakan socket ${cpu.socket}, motherboard menggunakan socket ${motherboard.socket}.`);
      checks.push({ category: 'CPU-Motherboard', status: 'incompatible', message: `Socket tidak cocok (${cpu.socket} vs ${motherboard.socket})` });
      score -= 20;
    } else {
      checks.push({ category: 'CPU-Motherboard', status: 'compatible', message: `Socket ${cpu.socket} cocok.` });
    }
  }

  // 2. CPU ↔ RAM type
  if (cpu && ram) {
    if (cpu.memoryType !== ram.type) {
      errors.push(`CPU mendukung ${cpu.memoryType}, tetapi RAM adalah ${ram.type}.`);
      checks.push({ category: 'CPU-RAM', status: 'incompatible', message: 'Tipe memori CPU dan RAM tidak cocok' });
      score -= 20;
    } else {
      checks.push({ category: 'CPU-RAM', status: 'compatible', message: `Tipe memori ${ram.type} cocok.` });
    }
  }

  // 3. Motherboard ↔ RAM
  if (motherboard && ram) {
    if (motherboard.ramType !== ram.type) {
      errors.push(`Motherboard mendukung ${motherboard.ramType}, RAM adalah ${ram.type}.`);
      checks.push({ category: 'Motherboard-RAM', status: 'incompatible', message: 'Tipe memori tidak cocok' });
      score -= 20;
    } else {
      let isCompatible = true;
      if (ram.capacity > motherboard.maxRam) {
        errors.push(`Kapasitas RAM (${ram.capacity}GB) melebihi batas motherboard (${motherboard.maxRam}GB).`);
        isCompatible = false;
        score -= 20;
      }
      if (ram.modules > motherboard.ramSlots) {
        errors.push(`Jumlah modul RAM (${ram.modules}) melebihi slot motherboard (${motherboard.ramSlots}).`);
        isCompatible = false;
        score -= 20;
      }
      if (!motherboard.supportedRamSpeeds.includes(ram.speed)) {
        warnings.push(`RAM ${ram.speed}MHz mungkin berjalan di kecepatan lebih rendah.`);
        if(isCompatible) {
           checks.push({ category: 'Motherboard-RAM', status: 'warning', message: `RAM ${ram.speed}MHz mungkin berjalan di kecepatan lebih rendah` });
        }
        score -= 5;
      }
      if (isCompatible && !warnings.some(w => w.includes('RAM'))) {
        checks.push({ category: 'Motherboard-RAM', status: 'compatible', message: 'RAM cocok dengan Motherboard' });
      }
    }
  }

  // 4. GPU ↔ Motherboard (PCIe)
  if (gpu && motherboard) {
    if (!motherboard.pcieX16Slots || motherboard.pcieX16Slots < 1) {
      errors.push('Motherboard tidak memiliki slot PCIe x16 untuk GPU.');
      checks.push({ category: 'GPU-Motherboard', status: 'incompatible', message: 'Tidak ada slot PCIe x16' });
      score -= 20;
    } else if (gpu.pcieGeneration !== motherboard.pcieVersion) {
      warnings.push(`GPU menggunakan ${gpu.pcieGeneration} sedangkan motherboard ${motherboard.pcieVersion}. Performa mungkin tidak maksimal.`);
      checks.push({ category: 'GPU-Motherboard', status: 'warning', message: 'Versi PCIe berbeda' });
      score -= 5;
    } else {
      checks.push({ category: 'GPU-Motherboard', status: 'compatible', message: 'Versi PCIe cocok' });
    }
  }

  // 5. GPU ↔ Case
  if (gpu && pcCase) {
    if (gpu.length > pcCase.maxGpuLength) {
      errors.push(`GPU ${gpu.length}mm melebihi batas case ${pcCase.maxGpuLength}mm.`);
      checks.push({ category: 'GPU-Case', status: 'incompatible', message: 'GPU terlalu panjang' });
      score -= 20;
    } else {
      checks.push({ category: 'GPU-Case', status: 'compatible', message: 'Ukuran GPU muat di dalam Case' });
    }
  }

  // 6. Motherboard ↔ Case (form factor)
  if (motherboard && pcCase) {
    if (!pcCase.formFactors.includes(motherboard.formFactor)) {
      errors.push(`Case tidak mendukung motherboard ukuran ${motherboard.formFactor}.`);
      checks.push({ category: 'Motherboard-Case', status: 'incompatible', message: 'Form factor motherboard tidak didukung case' });
      score -= 20;
    } else {
      checks.push({ category: 'Motherboard-Case', status: 'compatible', message: 'Form factor cocok' });
    }
  }

  // 7. PSU power check
  const power = calculatePower(components);
  if (psu) {
    if (power.estimatedPower > psu.wattage) {
      errors.push(`Estimasi daya (${power.estimatedPower}W) melebihi kapasitas PSU (${psu.wattage}W).`);
      checks.push({ category: 'Power-PSU', status: 'incompatible', message: 'Kapasitas PSU tidak cukup' });
      score -= 20;
    } else if (power.recommendedPower > psu.wattage) {
      warnings.push(`Kapasitas PSU (${psu.wattage}W) di bawah rekomendasi (${power.recommendedPower}W) untuk keamanan.`);
      checks.push({ category: 'Power-PSU', status: 'warning', message: 'Kapasitas PSU pas-pasan' });
      score -= 5;
    } else {
      checks.push({ category: 'Power-PSU', status: 'compatible', message: `PSU ${psu.wattage}W mencukupi (Estimasi: ${power.estimatedPower}W)` });
    }

    // 8. GPU ↔ PSU connectors
    if (gpu && gpu.powerConnectors && gpu.powerConnectors.length > 0) {
      const required = {};
      gpu.powerConnectors.forEach(conn => {
        let key = conn === '8pin' ? 'pcie8pin' : (conn === '12V-2x6' ? 'pcie12v2x6' : (conn === '6pin' ? 'pcie8pin' : null));
        if (key) {
          required[key] = (required[key] || 0) + 1;
        }
      });
      
      let psuOk = true;
      for (const [key, val] of Object.entries(required)) {
        if (!psu.connectors || (psu.connectors[key] || 0) < val) {
          psuOk = false;
        }
      }
      if (!psuOk) {
        errors.push(`PSU tidak memiliki konektor yang cukup untuk GPU.`);
        checks.push({ category: 'GPU-PSU', status: 'incompatible', message: 'Konektor PSU tidak cukup' });
        score -= 20;
      } else {
        checks.push({ category: 'GPU-PSU', status: 'compatible', message: 'Konektor PSU mencukupi' });
      }
    }
  }

  // 9. Cooler ↔ CPU socket
  if (cooler && cpu) {
    if (!cooler.socketSupport.includes(cpu.socket)) {
      errors.push(`Cooler tidak mendukung socket ${cpu.socket}.`);
      checks.push({ category: 'Cooler-CPU', status: 'incompatible', message: 'Socket cooler tidak cocok' });
      score -= 20;
    } else {
      checks.push({ category: 'Cooler-CPU', status: 'compatible', message: 'Socket cooler cocok' });
    }
  }

  // 10. Cooler ↔ Case height/radiator
  if (cooler && pcCase) {
    if (cooler.type === 'air' && cooler.height > pcCase.maxCpuCoolerHeight) {
      errors.push(`Tinggi Cooler (${cooler.height}mm) melebihi batas Case (${pcCase.maxCpuCoolerHeight}mm).`);
      checks.push({ category: 'Cooler-Case', status: 'incompatible', message: 'Cooler terlalu tinggi' });
      score -= 20;
    } else if (cooler.type === 'aio') {
      if (!pcCase.radiatorSupport.includes(cooler.radiatorSize)) {
        errors.push(`Case tidak mendukung radiator AIO ukuran ${cooler.radiatorSize}mm.`);
        checks.push({ category: 'Cooler-Case', status: 'incompatible', message: 'Radiator tidak didukung Case' });
        score -= 20;
      } else {
        checks.push({ category: 'Cooler-Case', status: 'compatible', message: 'Ukuran AIO didukung Case' });
      }
    } else {
       checks.push({ category: 'Cooler-Case', status: 'compatible', message: 'Ukuran Cooler muat di Case' });
    }
  }

  // 11. Storage ↔ Motherboard
  if (storage && motherboard) {
    if (storage.interface.includes('NVMe')) {
      if (motherboard.m2Slots < 1) {
        errors.push('Motherboard tidak memiliki slot M.2 untuk NVMe SSD.');
        checks.push({ category: 'Storage-Motherboard', status: 'incompatible', message: 'Tidak ada slot M.2' });
        score -= 20;
      } else {
        checks.push({ category: 'Storage-Motherboard', status: 'compatible', message: 'Slot M.2 tersedia' });
      }
    } else if (storage.interface === 'SATA') {
      if (motherboard.sataPorts < 1) {
        errors.push('Motherboard tidak memiliki port SATA.');
        checks.push({ category: 'Storage-Motherboard', status: 'incompatible', message: 'Tidak ada port SATA' });
        score -= 20;
      } else {
        checks.push({ category: 'Storage-Motherboard', status: 'compatible', message: 'Port SATA tersedia' });
      }
    }
  }

  if (score < 0) score = 0;
  
  let status = 'compatible';
  if (errors.length > 0) status = 'incompatible';
  else if (warnings.length > 0) status = 'warning';

  return {
    compatible: errors.length === 0,
    status,
    score,
    errors,
    warnings,
    checks
  };
};

module.exports = { checkCompatibility };
