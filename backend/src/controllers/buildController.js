const Build = require('../models/Build');
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
const { parseJsonFields } = require('../utils/modelHelpers');

const fetchComponents = async (componentIds) => {
  const components = {};
  if (componentIds.cpu) components.cpu = parseJsonFields(await CPU.findById(componentIds.cpu));
  if (componentIds.motherboard) components.motherboard = parseJsonFields(await Motherboard.findById(componentIds.motherboard));
  if (componentIds.gpu) components.gpu = parseJsonFields(await GPU.findById(componentIds.gpu));
  if (componentIds.ram) components.ram = parseJsonFields(await RAM.findById(componentIds.ram));
  if (componentIds.storage) components.storage = parseJsonFields(await Storage.findById(componentIds.storage));
  if (componentIds.psu) components.psu = parseJsonFields(await PSU.findById(componentIds.psu));
  if (componentIds.case) components.case = parseJsonFields(await Case.findById(componentIds.case));
  if (componentIds.cooler) components.cooler = parseJsonFields(await Cooler.findById(componentIds.cooler));
  return components;
};

exports.createBuild = async (req, res) => {
  try {
    const { name, components: componentIds } = req.body;
    if (!name || !componentIds) return res.status(400).json({ success: false, message: 'Name and components required' });

    const components = await fetchComponents(componentIds);
    const compResult = checkCompatibility(components);
    const powerResult = calculatePower(components);

    let totalPrice = 0;
    Object.values(components).forEach(c => { if (c && c.price) totalPrice += c.price; });

    const build = await Build.create({
      name,
      components: JSON.stringify(componentIds),
      totalPrice,
      estimatedPower: powerResult.estimatedPower,
      recommendedPsu: powerResult.recommendedPsu,
      compatibilityStatus: compResult.compatible ? 'compatible' : 'incompatible',
      compatibilityScore: compResult.score || 0,
      compatibilityDetails: JSON.stringify(compResult)
    });

    res.status(201).json({ success: true, data: parseJsonFields(build) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBuilds = async (req, res) => {
  try {
    const builds = await Build.find();
    res.json({ success: true, data: builds.map(parseJsonFields) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBuildById = async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);
    if (!build) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: parseJsonFields(build) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBuild = async (req, res) => {
  try {
    const { name, components: componentIds } = req.body;
    const build = await Build.findById(req.params.id);
    if (!build) return res.status(404).json({ success: false, message: 'Not found' });

    if (name) build.name = name;
    if (componentIds) {
      const components = await fetchComponents(componentIds);
      const compResult = checkCompatibility(components);
      const powerResult = calculatePower(components);
      let totalPrice = 0;
      Object.values(components).forEach(c => { if (c && c.price) totalPrice += c.price; });

      build.components = JSON.stringify(componentIds);
      build.totalPrice = totalPrice;
      build.estimatedPower = powerResult.estimatedPower;
      build.recommendedPsu = powerResult.recommendedPsu;
      build.compatibilityStatus = compResult.compatible ? 'compatible' : 'incompatible';
      build.compatibilityScore = compResult.score || 0;
      build.compatibilityDetails = JSON.stringify(compResult);
    }

    await build.save();
    res.json({ success: true, data: parseJsonFields(build) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBuild = async (req, res) => {
  try {
    const build = await Build.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
