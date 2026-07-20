const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: 'Property Investor' },
  location: { type: String, default: 'Mumbai' },
  rating: { type: Number, default: 5 },
  quote: { type: String, required: true },
  avatar: { type: String },
  propertyName: { type: String },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
