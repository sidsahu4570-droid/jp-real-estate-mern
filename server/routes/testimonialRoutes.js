const express = require('express');
const router = express.Router();
const { 
  getTestimonials, 
  createTestimonial, 
  updateTestimonial, 
  deleteTestimonial 
} = require('../controllers/testimonialController');
const { protectAdmin } = require('../middleware/auth');

router.get('/', getTestimonials);

// Protected Admin CRUD
router.post('/', protectAdmin, createTestimonial);
router.put('/:id', protectAdmin, updateTestimonial);
router.delete('/:id', protectAdmin, deleteTestimonial);

module.exports = router;
