const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name: String, brand: String, wattage: Number, efficiency: String, formFactor: String, length: Number, connectors: Object, modular: String, price: Number, image: String, description: String, specSource: String, category: { type: String, default: 'PSU' } }, { timestamps: true });
schema.set('toJSON', { virtuals: true, transform: (doc, ret) => { ret.id = ret._id; delete ret._id; delete ret.__v; return ret; } });
module.exports = mongoose.model('PSU', schema);