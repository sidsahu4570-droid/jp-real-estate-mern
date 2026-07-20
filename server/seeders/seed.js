const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });

const Admin = require('../models/Admin');
const Property = require('../models/Property');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Testimonial = require('../models/Testimonial');
const Banner = require('../models/Banner');
const Enquiry = require('../models/Enquiry');

const { 
  sampleProperties, 
  sampleProjects, 
  sampleBlogs, 
  sampleTestimonials, 
  sampleBanners, 
  sampleEnquiries 
} = require('../services/initialData');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jprealestate';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for Seeding...');

    // Clear collections
    await Admin.deleteMany({});
    await Property.deleteMany({});
    await Project.deleteMany({});
    await Blog.deleteMany({});
    await Testimonial.deleteMany({});
    await Banner.deleteMany({});
    await Enquiry.deleteMany({});

    // Seed Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@realestate.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await Admin.create({
      name: 'Surabhi Super Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'superadmin'
    });
    console.log(`Admin user seeded (${adminEmail})`);

    // Clean IDs for Mongo insert
    const cleanItems = (items) => items.map(item => {
      const copy = { ...item };
      delete copy._id;
      return copy;
    });

    await Property.insertMany(cleanItems(sampleProperties));
    console.log(`Seeded ${sampleProperties.length} Properties`);

    await Project.insertMany(cleanItems(sampleProjects));
    console.log(`Seeded ${sampleProjects.length} Projects`);

    await Blog.insertMany(cleanItems(sampleBlogs));
    console.log(`Seeded ${sampleBlogs.length} Blogs`);

    await Testimonial.insertMany(cleanItems(sampleTestimonials));
    console.log(`Seeded ${sampleTestimonials.length} Testimonials`);

    await Banner.insertMany(cleanItems(sampleBanners));
    console.log(`Seeded ${sampleBanners.length} Banners`);

    await Enquiry.insertMany(cleanItems(sampleEnquiries));
    console.log(`Seeded ${sampleEnquiries.length} Enquiries`);

    console.log('Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Failed:', error);
    process.exit(1);
  }
};

seedData();
