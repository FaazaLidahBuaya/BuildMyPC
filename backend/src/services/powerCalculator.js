const calculatePower = (components) => {
  const { cpu, gpu, motherboard, ram, storage, cooler } = components;
  
  let estimatedPower = 0;
  
  if (cpu) estimatedPower += cpu.tdp;
  if (gpu) estimatedPower += (gpu.tdp ?? 0);
  if (motherboard) estimatedPower += 30; // base 30W
  if (ram) estimatedPower += (ram.modules ?? 2) * 3; // 3W per module
  if (storage) estimatedPower += 10; // 10W per drive
  if (cooler) estimatedPower += 5; // 5W cooler
  
  estimatedPower += 15; // base system fans 15W
  
  const recommendedPower = estimatedPower * 1.30;
  const warningPower = estimatedPower * 1.10;
  
  return {
    estimatedPower: Math.round(estimatedPower),
    recommendedPower: Math.round(recommendedPower),
    warningPower: Math.round(warningPower)
  };
};

module.exports = { calculatePower };
