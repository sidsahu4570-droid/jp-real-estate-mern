import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Sparkles, ArrowRight, Clock, User, Tag } from 'lucide-react';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get('/blogs');
        if (res.data.success) {
          setBlogs(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-pearl pb-20">
      
      {/* Header Banner */}
      <div className="bg-navy-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Real Estate Intelligence & Analysis
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Market Insights & Advisory Journal
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Stay informed with expert opinions on high-value property trends, RERA legal guides, and luxury lifestyle investments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="h-80 rounded-2xl shimmer"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <div 
                key={blog._id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={blog.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full gold-gradient-bg text-navy-900 text-xs font-bold shadow-md">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-4 text-slate-400 text-xs font-medium mb-2">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-gold-600" /> {blog.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold-600" /> {blog.readTime}</span>
                    </div>

                    <Link to={`/blogs/${blog.slug || blog._id}`}>
                      <h3 className="font-serif text-xl font-bold text-navy-900 group-hover:text-gold-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                    </Link>

                    <p className="text-slate-600 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Tag className="w-3.5 h-3.5 text-gold-600" />
                        <span>{blog.tags[0]}</span>
                      </div>
                    )}

                    <Link
                      to={`/blogs/${blog.slug || blog._id}`}
                      className="px-4 py-2 rounded-lg bg-navy-900 text-white font-semibold text-xs hover:bg-navy-800 transition-colors flex items-center gap-1"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default BlogsPage;
