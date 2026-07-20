const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { getDBStatus } = require('../config/db');

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@realestate.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    let adminFound = null;

    if (getDBStatus()) {
      adminFound = await Admin.findOne({ email: email.toLowerCase() });
    }

    let isValidPassword = false;
    if (adminFound) {
      isValidPassword = await bcrypt.compare(password, adminFound.password);
    } else {
      // Fallback check against config / default credentials
      if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPass) {
        isValidPassword = true;
        adminFound = {
          _id: 'admin-1',
          name: 'Super Admin',
          email: adminEmail,
          role: 'superadmin'
        };
      }
    }

    if (!isValidPassword || !adminFound) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    const token = jwt.sign(
      { id: adminFound._id, email: adminFound.email, role: adminFound.role || 'superadmin' },
      process.env.JWT_SECRET || 'jp_real_estate_jwt_secret_key_2026_super_secure',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin login successful',
      token,
      admin: {
        id: adminFound._id,
        name: adminFound.name || 'Super Admin',
        email: adminFound.email,
        role: adminFound.role || 'superadmin'
      }
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAdminProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    admin: req.admin
  });
};

module.exports = { loginAdmin, getAdminProfile };
