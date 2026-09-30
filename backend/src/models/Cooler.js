const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name: String, brand: String, type: String, socketSupport: [String], height: Number, radiatorSize: Number, tdpRating: Number, fanCount: Number, noise: Number, price: Number, image: String, description: String, specSource: String, category: { type: String, default: 'COOLER' } }, { timestamps: true });
schema.set('toJSON', { virtuals: true, transform: (doc, ret) => { ret.id = ret._id; delete ret._id; delete ret.__v; return ret; } });
module.exports = mongoose.model('Cooler', schema);