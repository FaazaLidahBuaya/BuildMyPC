const CPU = require('../models/CPU');
const GPU = require('../models/GPU');
const Motherboard = require('../models/Motherboard');
const RAM = require('../models/RAM');
const Storage = require('../models/Storage');
const PSU = require('../models/PSU');
const Case = require('../models/Case');

const generateRecommendation = async ({ budget, usage, resolution }) => {
  // Basic recommendation logic distributing budget
  const budgetSplit = {
    cpu: budget * 0.20,
    gpu: budget * 0.35,
    motherboard: budget * 0.15,
    ram: budget * 0.10,
    storage: budget * 0.08,
    psu: budget * 0.07,
    pcCase: budget * 0.05
  };

  try {
    const cpu = await CPU.findOne({ price: { $lte: budgetSplit.cpu } }).sort({ price: -1 });
    let motherboard = null;
    let ram = null;
    let gpu = null;
    let storage = null;
    let psu = null;
    let pcCase = null;

    if (cpu) {
      motherboard = await Motherboard.findOne({ socket: cpu.socket, price: { $lte: budgetSplit.motherboard } }).sort({ price: -1 });
    }
    
    if (motherboard) {
      ram = await RAM.findOne({ type: motherboard.ramType, price: { $lte: budgetSplit.ram } }).sort({ price: -1 });
      pcCase = await Case.findOne({ formFactors: motherboard.formFactor, price: { $lte: budgetSplit.pcCase } }).sort({ price: -1 });
    }

    gpu = await GPU.findOne({ price: { $lte: budgetSplit.gpu } }).sort({ price: -1 });
    storage = await Storage.findOne({ price: { $lte: budgetSplit.storage } }).sort({ price: -1 });
    psu = await PSU.findOne({ price: { $lte: budgetSplit.psu } }).sort({ price: -1 });

    return {
      cpu, motherboard, gpu, ram, storage, psu, pcCase
    };
  } catch (error) {
    throw new Error('Gagal menghasilkan rekomendasi: ' + error.message);
  }
};

module.exports = { generateRecommendation };
