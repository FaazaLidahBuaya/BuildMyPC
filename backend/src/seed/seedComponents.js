const fs = require('fs');
const path = require('path');
const { connectDB } = require('../config/database');
const mongoose = require('mongoose');

const CPU = require('../models/CPU');
const GPU = require('../models/GPU');
const Motherboard = require('../models/Motherboard');
const RAM = require('../models/RAM');
const Storage = require('../models/Storage');
const PSU = require('../models/PSU');
const Case = require('../models/Case');
const Cooler = require('../models/Cooler');
const Build = require('../models/Build');

const seedData = async () => {
  await connectDB();

  console.log('Clearing database...');
  await CPU.deleteMany({});
  await GPU.deleteMany({});
  await Motherboard.deleteMany({});
  await RAM.deleteMany({});
  await Storage.deleteMany({});
  await PSU.deleteMany({});
  await Case.deleteMany({});
  await Cooler.deleteMany({});
  await Build.deleteMany({});

  const readJson = (file) => {
    const p = path.join(__dirname, '../../seed-json', file);
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8'));
    return [];
  };

  const cpus = readJson('cpus.json');
  const gpus = readJson('gpus.json');
  const mbs = readJson('motherboards.json');
  const rams = readJson('rams.json');
  const storages = readJson('storages.json');
  const psus = readJson('psus.json');
  const cases = readJson('cases.json');
  const coolers = readJson('coolers.json');

  console.log('Inserting data...');
  if (cpus.length) await CPU.insertMany(cpus);
  if (gpus.length) await GPU.insertMany(gpus);
  if (mbs.length) await Motherboard.insertMany(mbs);
  if (rams.length) await RAM.insertMany(rams);
  if (storages.length) await Storage.insertMany(storages);
  if (psus.length) await PSU.insertMany(psus);
  if (cases.length) await Case.insertMany(cases);
  if (coolers.length) await Cooler.insertMany(coolers);

  console.log(`✅ Seed complete! Inserted:
- CPUs: ${cpus.length}
- GPUs: ${gpus.length}
- Motherboards: ${mbs.length}
- RAMs: ${rams.length}
- Storage: ${storages.length}
- PSUs: ${psus.length}
- Cases: ${cases.length}
- Coolers: ${coolers.length}`);

  mongoose.connection.close();
  process.exit(0);
};

seedData().catch(console.error);
