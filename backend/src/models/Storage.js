const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name: String, brand: String, type: String, capacity: Number, interface: String, formFactor: String, readSpeed: Number, writeSpeed: Number, price: Number, image: String, description: String, specSource: String, category: { type: String, default: 'STORAGE' } }, { timestamps: true });
schema.set('toJSON', { virtuals: true, transform: (doc, ret) => { ret.id = ret._id; delete ret._id; delete ret.__v; return ret; } });
module.exports = mongoose.model('Storage', schema);