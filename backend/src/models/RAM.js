const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name: String, brand: String, type: String, capacity: Number, modules: Number, speed: Number, formFactor: String, voltage: Number, ecc: Boolean, price: Number, image: String, description: String, specSource: String, category: { type: String, default: 'RAM' } }, { timestamps: true });
schema.set('toJSON', { virtuals: true, transform: (doc, ret) => { ret.id = ret._id; delete ret._id; delete ret.__v; return ret; } });
module.exports = mongoose.model('RAM', schema);