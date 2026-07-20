const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, default: 'Real Estate Advice' },
  author: { type: String, default: 'Surabhi Insights Team' },
  readTime: { type: String, default: '5 min read' },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  coverImage: { type: String, required: true },
  tags: [{ type: String }],
  published: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
