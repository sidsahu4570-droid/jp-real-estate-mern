const Banner = require('../models/Banner');
const { getDBStatus } = require('../config/db');
const store = require('../services/memoryStore');

const getBanners = async (req, res) => {
  try {
    if (getDBStatus()) {
      const banners = await Banner.find({ active: true }).sort({ order: 1 });
      return res.status(200).json({ success: true, count: banners.length, data: banners });
    } else {
      const activeBanners = store.banners.filter(b => b.active !== false);
      return res.status(200).json({ success: true, count: activeBanners.length, data: activeBanners });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createBanner = async (req, res) => {
  try {
    if (getDBStatus()) {
      const newBanner = await Banner.create(req.body);
      return res.status(201).json({ success: true, data: newBanner });
    } else {
      const newBanner = { _id: 'ban-' + Date.now(), ...req.body, createdAt: new Date() };
      store.banners.push(newBanner);
      return res.status(201).json({ success: true, data: newBanner });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const updated = await Banner.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Banner not found' });
      return res.status(200).json({ success: true, data: updated });
    } else {
      const idx = store.banners.findIndex(b => b._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Banner not found' });
      store.banners[idx] = { ...store.banners[idx], ...req.body };
      return res.status(200).json({ success: true, data: store.banners[idx] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const deleted = await Banner.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Banner not found' });
      return res.status(200).json({ success: true, message: 'Banner deleted' });
    } else {
      const idx = store.banners.findIndex(b => b._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Banner not found' });
      store.banners.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Banner deleted' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner
};
