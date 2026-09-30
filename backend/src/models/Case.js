const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name: String, brand: String, formFactors: [String], type: String, maxGpuLength: Number, maxCpuCoolerHeight: Number, maxPsuLength: Number, radiatorSupport: [Number], driveBays: Object, price: Number, image: String, description: String, specSource: String, category: { type: String, default: 'CASE' } }, { timestamps: true });
schema.set('toJSON', { virtuals: true, transform: (doc, ret) => { ret.id = ret._id; delete ret._id; delete ret.__v; return ret; } });
module.exports = mongoose.model('Case', schema);