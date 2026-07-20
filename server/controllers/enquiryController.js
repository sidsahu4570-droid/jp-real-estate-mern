const Enquiry = require('../models/Enquiry');
const { getDBStatus } = require('../config/db');
const store = require('../services/memoryStore');

const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email, and phone number are required' });
    }

    if (getDBStatus()) {
      const newEnquiry = await Enquiry.create(req.body);
      return res.status(201).json({ 
        success: true, 
        message: 'Your enquiry has been received successfully! Our luxury real estate advisor will contact you shortly.',
        data: newEnquiry 
      });
    } else {
      const newEnquiry = {
        _id: 'enq-' + Date.now(),
        ...req.body,
        status: 'New Lead',
        createdAt: new Date()
      };
      store.enquiries.unshift(newEnquiry);
      return res.status(201).json({ 
        success: true, 
        message: 'Your enquiry has been received successfully! Our luxury real estate advisor will contact you shortly.',
        data: newEnquiry 
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getEnquiries = async (req, res) => {
  try {
    const { status } = req.query;
    if (getDBStatus()) {
      let query = {};
      if (status && status !== 'All') query.status = status;
      const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
    } else {
      let filtered = [...store.enquiries];
      if (status && status !== 'All') filtered = filtered.filter(e => e.status === status);
      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (getDBStatus()) {
      const updated = await Enquiry.findByIdAndUpdate(id, { status, notes }, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Enquiry lead not found' });
      return res.status(200).json({ success: true, data: updated });
    } else {
      const idx = store.enquiries.findIndex(e => e._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Enquiry lead not found' });
      if (status) store.enquiries[idx].status = status;
      if (notes !== undefined) store.enquiries[idx].notes = notes;
      return res.status(200).json({ success: true, data: store.enquiries[idx] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const deleted = await Enquiry.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Enquiry not found' });
      return res.status(200).json({ success: true, message: 'Enquiry lead deleted' });
    } else {
      const idx = store.enquiries.findIndex(e => e._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Enquiry not found' });
      store.enquiries.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Enquiry lead deleted' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
};
