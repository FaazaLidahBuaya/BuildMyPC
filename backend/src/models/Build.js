const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name: String, components: String, totalPrice: Number, estimatedPower: Number, recommendedPsu: Number, compatibilityStatus: String, compatibilityScore: Number, compatibilityDetails: String }, { timestamps: true });
schema.set('toJSON', { virtuals: true, transform: (doc, ret) => { ret.id = ret._id; delete ret._id; delete ret.__v; return ret; } });
module.exports = mongoose.model('Build', schema);