const CPU = require('../models/CPU');
const GPU = require('../models/GPU');
const Motherboard = require('../models/Motherboard');
const RAM = require('../models/RAM');
const Storage = require('../models/Storage');
const PSU = require('../models/PSU');
const Case = require('../models/Case');
const Cooler = require('../models/Cooler');
const { checkCompatibility } = require('../services/compatibilityEngine');
const { parseJsonFields } = require('../utils/modelHelpers');

const models = {
  CPU, GPU, MOTHERBOARD: Motherboard, RAM, STORAGE: Storage, PSU, CASE: Case, COOLER: Cooler
};

exports.getComponents = async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice } = req.query;
    if (!category || !models[category.toUpperCase()]) {
      return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    const Model = models[category.toUpperCase()];
    const query = {};
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const components = await Model.find(query);
    res.json({ success: true, data: components.map(parseJsonFields) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getComponentById = async (req, res) => {
  try {
    for (const Model of Object.values(models)) {
      const found = await Model.findById(req.params.id);
      if (found) return res.json({ success: true, data: parseJsonFields(found) });
    }
    res.status(404).json({ success: false, message: 'Component not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCompatibleComponents = async (req, res) => {
  try {
    const { category } = req.params;
    const { with: referenceId } = req.query;
    if (!models[category.toUpperCase()]) return res.status(400).json({ success: false, message: 'Invalid category' });

    let referenceComponent = null;
    let referenceCategory = null;

    if (referenceId) {
      for (const [cat, Model] of Object.entries(models)) {
        const found = await Model.findById(referenceId);
        if (found) {
          referenceComponent = parseJsonFields(found);
          referenceCategory = cat;
          break;
        }
      }
    }

    const candidates = await models[category.toUpperCase()].find();
    const parsedCandidates = candidates.map(parseJsonFields);

    if (!referenceComponent) {
      return res.json({ success: true, data: parsedCandidates.map(c => ({ ...c, compatibilityStatus: 'unknown' })) });
    }

    const results = parsedCandidates.map(candidate => {
      const build = {};
      build[referenceCategory.toLowerCase()] = referenceComponent;
      build[category.toLowerCase()] = candidate;
      const compResult = checkCompatibility(build);
      return { ...candidate, compatibilityStatus: compResult.compatible ? 'compatible' : 'incompatible', compatibilityDetails: compResult };
    });

    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPresetBuild = async (req, res) => {
  try {
    const { tier } = req.params;
    let queryArgs = {};

    if (tier.toUpperCase() === 'ENTRY') {
      queryArgs = { cpu: '12100', gpu: '6600', motherboard: 'B760', ram: 'DDR5', storage: '500GB', psu: '550W', case: 'Mid Tower', cooler: 'air' };
    } else if (tier.toUpperCase() === 'BALANCED') {
      queryArgs = { cpu: '7600', gpu: '4060', motherboard: 'B650', ram: 'DDR5', storage: '1000GB', psu: '650W', case: 'Mid Tower', cooler: 'aio' };
    } else if (tier.toUpperCase() === 'HIGH-END') {
      queryArgs = { cpu: '14700', gpu: '4070', motherboard: 'Z790', ram: 'DDR5', storage: '2000GB', psu: '850W', case: 'Mid Tower', cooler: 'aio' };
    } else {
      return res.status(404).json({ success: false, message: 'Preset tier not found' });
    }

    const findFirst = async (Model, nameLike, fallbackWhere = {}) => {
      let found = await Model.findOne({ name: { $regex: nameLike, $options: 'i' } });
      if (!found) found = await Model.findOne(fallbackWhere);
      return found;
    };

    const cpu = await findFirst(CPU, queryArgs.cpu);
    const mbWhere = cpu ? { socket: cpu.socket, ramType: cpu.memoryType } : {};
    const motherboard = await findFirst(Motherboard, queryArgs.motherboard, mbWhere);
    const gpu = await findFirst(GPU, queryArgs.gpu);
    const ramWhere = cpu ? { type: cpu.memoryType } : {};
    const ram = await findFirst(RAM, queryArgs.ram, ramWhere);
    const storage = await findFirst(Storage, queryArgs.storage);
    const psu = await findFirst(PSU, queryArgs.psu);
    const caseDoc = await findFirst(Case, queryArgs.case);
    const cooler = await Cooler.findOne({ socketSupport: { $regex: cpu ? cpu.socket : 'AM5', $options: 'i' } });

    res.json({
      success: true,
      data: {
        CPU: parseJsonFields(cpu),
        GPU: parseJsonFields(gpu),
        MOTHERBOARD: parseJsonFields(motherboard),
        RAM: parseJsonFields(ram),
        STORAGE: parseJsonFields(storage),
        PSU: parseJsonFields(psu),
        CASE: parseJsonFields(caseDoc),
        COOLER: parseJsonFields(cooler)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
