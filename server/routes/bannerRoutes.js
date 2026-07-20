const express = require('express');
const router = express.Router();
const { 
  getBanners, 
  createBanner, 
  updateBanner, 
  deleteBanner 
} = require('../controllers/bannerController');
const { protectAdmin } = require('../middleware/auth');

router.get('/', getBanners);

// Protected Admin CRUD
router.post('/', protectAdmin, createBanner);
router.put('/:id', protectAdmin, updateBanner);
router.delete('/:id', protectAdmin, deleteBanner);

module.exports = router;
