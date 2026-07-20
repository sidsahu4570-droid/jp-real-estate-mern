import React, { useState, useEffect } from 'react';
import API from '../services/api';
import ProjectCard from '../components/ProjectCard';
import { Sparkles, Building } from 'lucide-react';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/projects');
        if (res.data.success) {
          setProjects(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (statusFilter === 'All') return true;
    return p.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-pearl pb-20">
      
      {/* Header Banner */}
      <div className="bg-navy-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Architectural Icons & Landmarks
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Flagship Developments & Projects
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Discover upcoming skyscrapers, oceanfront villa enclaves, and Grade-A commercial hubs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {['All', 'Under Construction', 'Upcoming', 'Ready to Move'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                statusFilter === status
                  ? 'gold-gradient-bg text-navy-900 shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {status === 'All' ? 'All Projects' : status}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="space-y-8 max-w-5xl mx-auto">
            {[1, 2].map((n) => (
              <div key={n} className="h-72 rounded-2xl shimmer"></div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 max-w-md mx-auto space-y-3">
            <Building className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-navy-900">No Projects Found</h3>
            <p className="text-sm text-slate-500">There are currently no projects matching status "{statusFilter}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default ProjectsPage;
