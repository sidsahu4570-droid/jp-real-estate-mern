const express = require('express');
const router = express.Router();
const { 
  createEnquiry, 
  getEnquiries, 
  updateEnquiryStatus, 
  deleteEnquiry 
} = require('../controllers/enquiryController');
const { protectAdmin } = require('../middleware/auth');

// Public lead submission
router.post('/', createEnquiry);

// Protected Admin lead management
router.get('/', protectAdmin, getEnquiries);
router.patch('/:id', protectAdmin, updateEnquiryStatus);
router.delete('/:id', protectAdmin, deleteEnquiry);

module.exports = router;
