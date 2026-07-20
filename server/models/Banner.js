const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  badge: { type: String, default: 'EXCLUIVE REALTY' },
  image: { type: String, required: true },
  ctaText: { type: String, default: 'Explore Properties' },
  ctaLink: { type: String, default: '/properties' },
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
