const express = require('express');
const router = express.Router();
const { 
  getBlogs, 
  getBlogBySlug, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} = require('../controllers/blogController');
const { protectAdmin } = require('../middleware/auth');

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

// Protected Admin CRUD
router.post('/', protectAdmin, createBlog);
router.put('/:id', protectAdmin, updateBlog);
router.delete('/:id', protectAdmin, deleteBlog);

module.exports = router;
