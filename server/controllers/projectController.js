const Project = require('../models/Project');
const { getDBStatus } = require('../config/db');
const store = require('../services/memoryStore');

const getProjects = async (req, res) => {
  try {
    if (getDBStatus()) {
      const projects = await Project.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: projects.length, data: projects });
    } else {
      return res.status(200).json({ success: true, count: store.projects.length, data: store.projects });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProjectBySlugOrId = async (req, res) => {
  try {
    const { identifier } = req.params;
    if (getDBStatus()) {
      let project = await Project.findOne({ slug: identifier });
      if (!project) project = await Project.findById(identifier).catch(() => null);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.status(200).json({ success: true, data: project });
    } else {
      const project = store.projects.find(p => p.slug === identifier || p._id === identifier);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.status(200).json({ success: true, data: project });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const projectData = req.body;
    if (!projectData.slug) {
      projectData.slug = projectData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    if (getDBStatus()) {
      const newProj = await Project.create(projectData);
      return res.status(201).json({ success: true, data: newProj });
    } else {
      const newProj = { _id: 'proj-' + Date.now(), ...projectData, createdAt: new Date() };
      store.projects.unshift(newProj);
      return res.status(201).json({ success: true, data: newProj });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.status(200).json({ success: true, data: updated });
    } else {
      const idx = store.projects.findIndex(p => p._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Project not found' });
      store.projects[idx] = { ...store.projects[idx], ...req.body };
      return res.status(200).json({ success: true, data: store.projects[idx] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (getDBStatus()) {
      const deleted = await Project.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.status(200).json({ success: true, message: 'Project deleted' });
    } else {
      const idx = store.projects.findIndex(p => p._id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Project not found' });
      store.projects.splice(idx, 1);
      return res.status(200).json({ success: true, message: 'Project deleted' });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectBySlugOrId,
  createProject,
  updateProject,
  deleteProject
};
