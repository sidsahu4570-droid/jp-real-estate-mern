const Property = require('../models/Property');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Enquiry = require('../models/Enquiry');
const { getDBStatus } = require('../config/db');
const store = require('../services/memoryStore');

const getDashboardStats = async (req, res) => {
  try {
    if (getDBStatus()) {
      const totalProperties = await Property.countDocuments();
      const featuredProperties = await Property.countDocuments({ featured: true });
      const totalProjects = await Project.countDocuments();
      const totalBlogs = await Blog.countDocuments();
      const totalEnquiries = await Enquiry.countDocuments();
      const newLeadsCount = await Enquiry.countDocuments({ status: 'New Lead' });

      return res.status(200).json({
        success: true,
        stats: {
          totalProperties,
          featuredProperties,
          totalProjects,
          totalBlogs,
          totalEnquiries,
          newLeadsCount
        }
      });
    } else {
      return res.status(200).json({
        success: true,
        stats: {
          totalProperties: store.properties.length,
          featuredProperties: store.properties.filter(p => p.featured).length,
          totalProjects: store.projects.length,
          totalBlogs: store.blogs.length,
          totalEnquiries: store.enquiries.length,
          newLeadsCount: store.enquiries.filter(e => e.status === 'New Lead').length
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboardStats };
