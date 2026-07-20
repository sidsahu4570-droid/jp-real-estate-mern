const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['Apartment', 'Villa', 'Penthouse', 'Commercial', 'Plot/Land', 'Independent House'] 
  },
  purpose: { type: String, required: true, enum: ['For Sale', 'For Rent'], default: 'For Sale' },
  price: { type: Number, required: true },
  priceDisplay: { type: String }, // e.g. "₹ 2.45 Cr" or "₹ 85,000 / mo"
  location: {
    city: { type: String, required: true },
    locality: { type: String, required: true },
    address: { type: String },
    zipcode: { type: String },
    mapCoordinates: { lat: Number, lng: Number }
  },
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  areaSqFt: { type: Number, required: true },
  furnishing: { type: String, enum: ['Furnished', 'Semi-Furnished', 'Unfurnished'], default: 'Semi-Furnished' },
  images: [{ type: String }],
  coverImage: { type: String },
  featured: { type: Boolean, default: false },
  verified: { type: Boolean, default: true },
  possessionStatus: { type: String, default: 'Ready to Move' }, // e.g. "Ready to Move", "Under Construction"
  description: { type: String, required: true },
  amenities: [{ type: String }],
  floorPlan: { type: String },
  agent: {
    name: { type: String, default: 'Surabhi Luxury Real Estate Advisory' },
    phone: { type: String, default: '+91 98765 43210' },
    email: { type: String, default: 'advisory@surabhigroup.com' }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Property || mongoose.model('Property', PropertySchema);
