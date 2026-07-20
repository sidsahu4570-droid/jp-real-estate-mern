import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { ArrowLeft, User, Clock, Calendar, Tag, Share2, PhoneCall } from 'lucide-react';
import { useApp } from '../context/AppContext';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openEnquiryModal, showToast } = useApp();

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const res = await API.get(`/blogs/${slug}`);
        if (res.data.success) {
          setBlog(res.data.data);
        }
      } catch (err) {
        console.error('Error loading blog detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Article URL copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 space-y-6">
        <div className="h-10 w-40 shimmer rounded-lg"></div>
        <div className="h-[400px] w-full shimmer rounded-3xl"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-navy-900">Article Not Found</h2>
        <Link to="/blogs" className="px-6 py-2 rounded-lg gold-gradient-bg text-navy-900 font-bold inline-block">
          Return to Blog Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pearl pb-20">
      
      {/* Top Banner Header */}
      <div className="bg-navy-900 text-white py-12 border-b border-gold-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <Link to="/blogs" className="inline-flex items-center gap-1.5 text-xs text-gold-400 font-medium hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Articles
          </Link>
          <span className="inline-block px-3 py-1 rounded-full gold-gradient-bg text-navy-900 text-xs font-bold shadow-md">
            {blog.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-slate-300 border-t border-white/10">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-gold-400" /> {blog.author}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gold-400" /> {blog.readTime}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gold-400" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-gold-400 font-medium hover:underline"
            >
              <Share2 className="w-4 h-4" /> Share Article
            </button>
          </div>
        </div>
      </div>

      {/* Main Blog Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        
        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl h-[420px] bg-navy-900">
          <img
            src={blog.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <article className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg font-sans">
          <p className="font-serif text-xl text-navy-900 font-semibold italic border-l-4 border-gold-500 pl-4 py-1">
            {blog.excerpt}
          </p>

          <div className="whitespace-pre-line space-y-4">
            {blog.content}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
              <span className="font-semibold text-slate-500 uppercase">Tags:</span>
              {blog.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>

        {/* Consultation Callout */}
        <div className="bg-navy-900 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl border border-gold-500/30">
          <h3 className="font-serif text-2xl font-bold">Have Questions About Luxury Real Estate Investments?</h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Speak directly with our senior market advisors for bespoke guidance on high-yield property transactions.
          </p>
          <button
            onClick={() => openEnquiryModal()}
            className="px-6 py-3 rounded-xl gold-gradient-bg text-navy-900 font-bold text-sm shadow-md"
          >
            <PhoneCall className="w-4 h-4 inline mr-2" /> Request Advisory Call
          </button>
        </div>

      </div>

    </div>
  );
};

export default BlogDetailPage;
