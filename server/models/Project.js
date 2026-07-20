const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  developer: { type: String, required: true },
  location: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['Upcoming', 'Under Construction', 'Ready to Move', 'Completed'] 
  },
  priceRange: { type: String, required: true }, // e.g., "₹ 1.5 Cr - ₹ 4.2 Cr"
  type: { type: String, default: 'Luxury Residential & Commercial Hub' },
  completionYear: { type: String },
  totalUnits: { type: Number },
  acres: { type: Number },
  overview: { type: String, required: true },
  highlights: [{ type: String }],
  coverImage: { type: String, required: true },
  gallery: [{ type: String }],
  bhkTypes: [{ type: String }], // e.g. ["2 BHK", "3 BHK", "4 BHK Duplex"]
  amenities: [{ type: String }],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
