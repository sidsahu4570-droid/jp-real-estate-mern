const Property = require('../models/Property');
const { getDBStatus } = require('../config/db');
const store = require('../services/memoryStore');

const getProperties = async (req, res) => {
  try {
    const { search, type, purpose, city, minPrice, maxPrice, bedrooms, featured } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (type && type !== 'All') query.type = type;
      if (purpose && purpose !== 'All') query.purpose = purpose;
      if (city && city !== 'All') query['location.city'] = city;
      if (featured === 'true') query.featured = true;
      if (bedrooms) query.bedrooms = { $gte: Number(bedrooms) };
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { 'location.locality': { $regex: search, $options: 'i' } },
          { 'location.city': { $regex: search, $options: 'i' } }
        ];
      }

      const properties = await Property.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: properties.length, data: properties });
    } else {
      let filtered = [...store.properties];
      if (type && type !== 'All') filtered = filtered.filter(p => p.type === type);
      if (purpose && purpose !== 'All') filtered = filtered.filter(p => p.purpose === purpose);
      if (city && city !== 'All') filtered = filtered.filter(p => p.location.city.toLowerCase() === city.toLowerCase());
      if (featured === 'true') filtered = filtered.filter(p => p.featured);
      if (bedrooms) filtered = filtered.filter(p => p.bedrooms >= Number(bedrooms));
      if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
      if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(q) || 
          p.location.locality.toLowerCase().includes(q) || 
          p.location.city.toLowerCase().includes(q)
        );
      }

      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPropertyBySlugOrId = async (req, res) => {
  try {
    const { identifier } = req.params;
    if (getDBStatus()) {
      let property = await Property.findOne({ slug: identifier });
      if (!property) {
        property = await Property.findById(identifier).catch(() => null);
      }
      if (!property) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
      return res.status(200).json({ success: true, data: property });
    } else {
      const property = store.properties.find(p => p.slug === identifier || p._id === identifier);
      if (!property) {
        return res.status(404).json({ success: false, message: 'Property not found' });
      }
      return res.status(200).json({ success: true, data: property });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createProperty = async (req, res) => {
  try {
    const propertyData = req.body;
    if (!propertyData.slug) {
      propertyData.slug = propertyData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    if (getDBStatus()) {
      const newProperty = await Property.create(propertyData);
      return res.status(201).json({ success: true, data: newProperty });
    } else {
      const newProperty = {
        _id: 'prop-' + Date.now(),
        ...propertyData,
        createdAt: new Date()
      };
      store.properties.unshift(newProperty);
      return res.status(201).json({ success: true, data: newProperty });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const updated = await Property.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Property not found' });
      return res.status(200).json({ success: true, data: updated });
    } else {
      const index = store.properties.findIndex(p => p._id === id);
      if (index === -1) return res.status(404).json({ success: false, message: 'Property not found' });
      store.properties[index] = { ...store.properties[index], ...req.body };
      return res.status(200).json({ success: true, data: store.properties[index] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const deleted = await Property.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Property not found' });
      return res.status(200).json({ success: true, message: 'Property deleted successfully' });
    } else {
      const index = store.properties.findIndex(p => p._id === id);
      if (index === -1) return res.status(404).json({ success: false, message: 'Property not found' });
      store.properties.splice(index, 1);
      return res.status(200).json({ success: true, message: 'Property deleted successfully' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProperties,
  getPropertyBySlugOrId,
  createProperty,
  updateProperty,
  deleteProperty
};
