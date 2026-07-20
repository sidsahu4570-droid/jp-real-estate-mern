const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  getProjectBySlugOrId, 
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/projectController');
const { protectAdmin } = require('../middleware/auth');

router.get('/', getProjects);
router.get('/:identifier', getProjectBySlugOrId);

// Protected Admin CRUD
router.post('/', protectAdmin, createProject);
router.put('/:id', protectAdmin, updateProject);
router.delete('/:id', protectAdmin, deleteProject);

module.exports = router;
