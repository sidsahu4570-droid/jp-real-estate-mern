const Testimonial = require('../models/Testimonial');
const { getDBStatus } = require('../config/db');
const store = require('../services/memoryStore');

const getTestimonials = async (req, res) => {
  try {
    if (getDBStatus()) {
      const items = await Testimonial.find({ active: true }).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: items.length, data: items });
    } else {
      const activeItems = store.testimonials.filter(t => t.active !== false);
      return res.status(200).json({ success: true, count: activeItems.length, data: activeItems });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createTestimonial = async (req, res) => {
  try {
    if (getDBStatus()) {
      const newItem = await Testimonial.create(req.body);
      return res.status(201).json({ success: true, data: newItem });
    } else {
      const newItem = { _id: 'test-' + Date.now(), ...req.body, createdAt: new Date() };
      store.testimonials.unshift(newItem);
      return res.status(201).json({ success: true, data: newItem });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const updated = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Testimonial not found' });
      return res.status(200).json({ success: true, data: updated });
    } else {
      const idx = store.testimonials.findIndex(t => t._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Testimonial not found' });
      store.testimonials[idx] = { ...store.testimonials[idx], ...req.body };
      return res.status(200).json({ success: true, data: store.testimonials[idx] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const deleted = await Testimonial.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Testimonial not found' });
      return res.status(200).json({ success: true, message: 'Testimonial deleted' });
    } else {
      const idx = store.testimonials.findIndex(t => t._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Testimonial not found' });
      store.testimonials.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Testimonial deleted' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
