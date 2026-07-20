const { 
  sampleProperties, 
  sampleProjects, 
  sampleBlogs, 
  sampleTestimonials, 
  sampleBanners, 
  sampleEnquiries 
} = require('./initialData');

const store = {
  properties: [...sampleProperties],
  projects: [...sampleProjects],
  blogs: [...sampleBlogs],
  testimonials: [...sampleTestimonials],
  banners: [...sampleBanners],
  enquiries: [...sampleEnquiries]
};

module.exports = store;
