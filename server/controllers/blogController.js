const Blog = require('../models/Blog');
const { getDBStatus } = require('../config/db');
const store = require('../services/memoryStore');

const getBlogs = async (req, res) => {
  try {
    if (getDBStatus()) {
      const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: blogs.length, data: blogs });
    } else {
      const published = store.blogs.filter(b => b.published !== false);
      return res.status(200).json({ success: true, count: published.length, data: published });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (getDBStatus()) {
      const blog = await Blog.findOne({ slug });
      if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
      return res.status(200).json({ success: true, data: blog });
    } else {
      const blog = store.blogs.find(b => b.slug === slug || b._id === slug);
      if (!blog) return res.status(404).json({ success: false, message: 'Blog post not found' });
      return res.status(200).json({ success: true, data: blog });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const blogData = req.body;
    if (!blogData.slug) {
      blogData.slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    if (getDBStatus()) {
      const newBlog = await Blog.create(blogData);
      return res.status(201).json({ success: true, data: newBlog });
    } else {
      const newBlog = { _id: 'blog-' + Date.now(), ...blogData, createdAt: new Date() };
      store.blogs.unshift(newBlog);
      return res.status(201).json({ success: true, data: newBlog });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const updated = await Blog.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Blog post not found' });
      return res.status(200).json({ success: true, data: updated });
    } else {
      const idx = store.blogs.findIndex(b => b._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Blog post not found' });
      store.blogs[idx] = { ...store.blogs[idx], ...req.body };
      return res.status(200).json({ success: true, data: store.blogs[idx] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const deleted = await Blog.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Blog post not found' });
      return res.status(200).json({ success: true, message: 'Blog deleted' });
    } else {
      const idx = store.blogs.findIndex(b => b._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Blog post not found' });
      store.blogs.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Blog deleted' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog
};
