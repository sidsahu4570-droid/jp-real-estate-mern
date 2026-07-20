const express = require('express');
const router = express.Router();
const { 
  getProperties, 
  getPropertyBySlugOrId, 
  createProperty, 
  updateProperty, 
  deleteProperty 
} = require('../controllers/propertyController');
const { protectAdmin } = require('../middleware/auth');

router.get('/', getProperties);
router.get('/:identifier', getPropertyBySlugOrId);

// Protected Admin CRUD
router.post('/', protectAdmin, createProperty);
router.put('/:id', protectAdmin, updateProperty);
router.delete('/:id', protectAdmin, deleteProperty);

module.exports = router;
