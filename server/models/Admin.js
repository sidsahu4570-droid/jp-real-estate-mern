const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true, default: 'Admin User' },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'superadmin' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
