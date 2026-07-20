const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  interest: { type: String, default: 'General Enquiry' }, // Buy, Rent, Sell, Advisory
  message: { type: String },
  propertyTitle: { type: String },
  propertyId: { type: String },
  preferredTime: { type: String },
  status: { 
    type: String, 
    enum: ['New Lead', 'Contacted', 'In Progress', 'Site Visit Scheduled', 'Closed'],
    default: 'New Lead'
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
