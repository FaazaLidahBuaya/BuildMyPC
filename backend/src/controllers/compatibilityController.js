const CPU = require('../models/CPU');
const GPU = require('../models/GPU');
const Motherboard = require('../models/Motherboard');
const RAM = require('../models/RAM');
const Storage = require('../models/Storage');
const PSU = require('../models/PSU');
const Case = require('../models/Case');
const Cooler = require('../models/Cooler');
const { checkCompatibility } = require('../services/compatibilityEngine');
const { calculatePower } = require('../services/powerCalculator');
const { 
  parseJsonFields, 
  GPU_JSON_FIELDS, 
  MB_JSON_FIELDS, 
  CASE_JSON_FIELDS, 
  COOLER_JSON_FIELDS, 
  PSU_JSON_FIELDS 
} = require('../utils/modelHelpers');

exports.checkCompatibility = async (req, res) => {
  try {
    const { cpu, motherboard, gpu, ram, storage, psu, case: pcCase, cooler } = req.body;
    
    const components = {};
    
    if (cpu) {
      const doc = await CPU.findByPk(cpu);
      if (doc) components.cpu = doc.toJSON();
    }
    if (motherboard) {
      const doc = await Motherboard.findByPk(motherboard);
      if (doc) components.motherboard = parseJsonFields(doc, MB_JSON_FIELDS);
    }
    if (gpu) {
      const doc = await GPU.findByPk(gpu);
      if (doc) components.gpu = parseJsonFields(doc, GPU_JSON_FIELDS);
    }
    if (ram) {
      const doc = await RAM.findByPk(ram);
      if (doc) components.ram = doc.toJSON();
    }
    if (storage) {
      const doc = await Storage.findByPk(storage);
      if (doc) components.storage = doc.toJSON();
    }
    if (psu) {
      const doc = await PSU.findByPk(psu);
      if (doc) components.psu = parseJsonFields(doc, PSU_JSON_FIELDS);
    }
    if (pcCase) {
      const doc = await Case.findByPk(pcCase);
      if (doc) components.case = parseJsonFields(doc, CASE_JSON_FIELDS);
    }
    if (cooler) {
      const doc = await Cooler.findByPk(cooler);
      if (doc) components.cooler = parseJsonFields(doc, COOLER_JSON_FIELDS);
    }

    const compResult = checkCompatibility(components);
    const powerResult = calculatePower(components);

    let totalPrice = 0;
    Object.values(components).forEach(c => {
      if (c && c.price) totalPrice += c.price;
    });

    res.json({
      success: true,
      compatible: compResult.compatible,
      status: compResult.compatible ? 'compatible' : 'incompatible',
      score: compResult.score || 0,
      totalPrice,
      estimatedPower: powerResult.estimatedPower,
      recommendedPsu: powerResult.recommendedPsu,
      errors: compResult.errors || [],
      warnings: compResult.warnings || [],
      checks: compResult.checks || {}
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
