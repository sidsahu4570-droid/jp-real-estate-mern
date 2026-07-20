import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { useApp } from '../context/AppContext';

import HeroSlider from '../components/HeroSlider';
import SearchFilter from '../components/SearchFilter';
import PropertyCard from '../components/PropertyCard';
import ProjectCard from '../components/ProjectCard';
import Testimonials from '../components/Testimonials';

import { 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall,
  Calendar,
  FileText
} from 'lucide-react';

const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const { openEnquiryModal } = useApp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [banRes, propRes, projRes, blogRes, testRes] = await Promise.allSettled([
          API.get('/banners'),
          API.get('/properties?featured=true'),
          API.get('/projects'),
          API.get('/blogs'),
          API.get('/testimonials')
        ]);

        if (banRes.status === 'fulfilled' && banRes.value.data.success) {
          setBanners(banRes.value.data.data);
        }
        if (propRes.status === 'fulfilled' && propRes.value.data.success) {
          setFeaturedProperties(propRes.value.data.data);
        }
        if (projRes.status === 'fulfilled' && projRes.value.data.success) {
          setProjects(projRes.value.data.data);
        }
        if (blogRes.status === 'fulfilled' && blogRes.value.data.success) {
          setBlogs(blogRes.value.data.data);
        }
        if (testRes.status === 'fulfilled' && testRes.value.data.success) {
          setTestimonials(testRes.value.data.data);
        }
      } catch (err) {
        console.error('Home data load error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-pearl text-slate-800">
      
      {/* 1. Hero Carousel Banner */}
      <HeroSlider banners={banners} />

      {/* 2. Floating Search Filter Component */}
      <div className="px-4">
        <SearchFilter />
      </div>

      {/* 3. Stats Highlight Strip */}
      <section className="py-8 sm:py-12 bg-white border-y border-slate-200/60 pt-4 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
          {[
            { label: 'Curated Asset Volume', value: '₹ 4,800+ Cr', icon: TrendingUp },
            { label: 'Off-Market Assets', value: '350+ Assets', icon: Building2 },
            { label: 'Clients Represented', value: '1,200+ HNWIs', icon: Users },
            { label: 'Legal Clearance', value: '100% RERA', icon: ShieldCheck },
          ].map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div key={idx} className="flex flex-col justify-between p-3.5 sm:p-5 rounded-2xl bg-slate-50/80 sm:bg-transparent border border-slate-200/60 sm:border-none hover:bg-slate-50 transition-colors shadow-sm sm:shadow-none">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl gold-gradient-bg flex items-center justify-center shrink-0 shadow-sm mb-2 sm:mb-3">
                  <IconComp className="w-4 h-4 sm:w-6 sm:h-6 text-navy-900" />
                </div>
                <div>
                  <h4 className="font-serif text-base sm:text-2xl font-bold text-navy-900 leading-tight">{stat.value}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight mt-1">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Luxury Listings Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Flagship Collection
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              Featured Luxury Residences
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Explore sea-front penthouses, beachfront villas, and executive golf suites.
            </p>
          </div>

          <Link
            to="/properties"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-navy-900 text-navy-900 font-semibold text-sm hover:bg-navy-900 hover:text-white transition-all self-start md:self-auto"
          >
            <span>View All Listings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 rounded-2xl shimmer"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 6).map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

      </section>

      {/* 5. Ongoing & Flagship Developments Section */}
      <section className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" /> Architectural Landmarks
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ongoing & Landmark Developments
            </h2>
            <p className="text-slate-400 text-sm">
              Pre-launch opportunities and iconic developments backed by top tier builders.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. Why Choose Surabhi Advisory Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Real Estate Advisory"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-navy-900/30"></div>
            </div>

            {/* Floating Experience Box */}
            <div className="absolute -bottom-6 -right-6 bg-navy-900 text-white p-6 rounded-2xl shadow-2xl border border-gold-500/40 hidden sm:block max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gold-gradient-bg flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-navy-900" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-white">18+ Years</h4>
                  <p className="text-xs text-gold-400 font-medium">Bespoke Real Estate Advisory</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> Unrivaled Reputation
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 leading-tight">
              Why High Net Worth Individuals Choose Surabhi Luxury Realty
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              We operate at the pinnacle of luxury real estate representation. Our clients receive confidential access to off-market properties, thorough legal due diligence, and tailored wealth protection strategies.
            </p>

            <div className="space-y-4 pt-2">
              {[
                { title: 'Confidential Off-Market Access', desc: 'Direct representation for prime penthouses & estates before public listing.' },
                { title: '360-Degree Title & Legal Due Diligence', desc: 'RERA verification, 30-year clear title searches, and legal closing support.' },
                { title: 'Bespoke Portfolio Management', desc: 'Tailored investment advice prioritizing capital preservation and rental yields.' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm font-serif">{item.title}</h4>
                    <p className="text-slate-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => openEnquiryModal()}
                className="px-6 py-3.5 rounded-xl gold-gradient-bg text-navy-900 font-bold text-sm shadow-xl hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Book Private Advisory Call
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Client Testimonials Carousel */}
      <Testimonials items={testimonials} />

      {/* 8. Recent Real Estate Insights / Blogs Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 text-xs font-semibold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" /> Market Intelligence
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
              Latest Market Insights & Trends
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Expert articles on luxury property investments, legal guides, and design trends.
            </p>
          </div>

          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-navy-900 text-navy-900 font-semibold text-sm hover:bg-navy-900 hover:text-white transition-all self-start md:self-auto"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.slice(0, 2).map((blog) => (
            <div key={blog._id} className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col sm:flex-row group">
              <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden bg-slate-900">
                <img
                  src={blog.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-gold-600 uppercase tracking-wider block mb-1">
                    {blog.category} • {blog.readTime}
                  </span>
                  <Link to={`/blogs/${blog.slug || blog._id}`}>
                    <h3 className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>{blog.author}</span>
                  <Link to={`/blogs/${blog.slug || blog._id}`} className="text-gold-600 font-semibold hover:underline flex items-center gap-1">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 9. Final Call-To-Action Banner */}
      <section className="py-16 bg-navy-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Ready to Acquire or List a Luxury Property?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Schedule a private consultation with our principal advisors today for confidential property representation across India.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => openEnquiryModal()}
              className="px-8 py-4 rounded-xl gold-gradient-bg text-navy-900 font-bold text-base shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
            >
              <PhoneCall className="w-5 h-5" /> Request Private Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
