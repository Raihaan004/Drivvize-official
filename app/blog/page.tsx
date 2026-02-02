"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Tag, 
  Share2,
  ChevronLeft,
  ChevronRight,
  User
} from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    featured: true,
    title: "Navigating ISO 26262: The 2024 Compliance Landscape",
    excerpt: "As automotive systems become increasingly complex, staying compliant with ISO 26262 is more challenging than ever. We break down the latest updates and what they mean for Tier-1 suppliers.",
    date: "Jan 15, 2026",
    readTime: "12 min read",
    category: "Compliance",
    author: "Nayeemur Rahman",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=2072"
  },
  {
    id: 2,
    title: "The Rise of SOTIF in Autonomous Systems",
    excerpt: "Functional safety isn't enough for level 3+ automation. Explore why Safety of the Intended Functionality (SOTIF) is the new frontier in automotive engineering.",
    date: "Jan 10, 2026",
    readTime: "8 min read",
    category: "Safety & Tech",
    author: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 3,
    title: "Mastering FMEA for Complex Hardware",
    excerpt: "Learn our proven methodology for conducting Failure Mode and Effects Analysis that actually catches critical design flaws early in the development cycle.",
    date: "Jan 05, 2026",
    readTime: "6 min read",
    category: "Technical",
    author: "Marco Rossi",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 4,
    title: "Automotive Cybersecurity: Beyond ISO 21434",
    excerpt: "Safety and security are two sides of the same coin. Understanding how to integrate cybersecurity requirements into your functional safety lifecycle.",
    date: "Dec 28, 2025",
    readTime: "10 min read",
    category: "Security",
    author: "James Wilson",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 5,
    title: "SEooC: A Practical Guide for Component Suppliers",
    excerpt: "How to develop safety elements out of context without drowning in documentation. Best practices for defining valid context assumptions.",
    date: "Dec 20, 2025",
    readTime: "7 min read",
    category: "Compliance",
    author: "Nayeemur Rahman",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072"
  },
  {
    id: 6,
    title: "Integrating ASPICE and Functional Safety",
    excerpt: "Bridging the gap between process quality and safety engineering. Why ASPICE Level 3 is the foundation for ASIL D development.",
    date: "Dec 12, 2025",
    readTime: "9 min read",
    category: "Technical",
    author: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070"
  }
];

const categories = ["All", "Compliance", "Safety & Tech", "Technical", "Security"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <SparklesCore
          id="tsparticlesblog"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <div className="space-y-4">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-blue-500 font-bold uppercase tracking-[0.3em] text-sm"
            >
              Industry Insights
            </motion.h3>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none"
            >
              The Drivvize <br />
              <span className="text-white/20 outline-text">Journal</span>
            </motion.h1>
            <style jsx>{`
              .outline-text {
                -webkit-text-stroke: 1.5px rgba(255,255,255,0.15);
                color: transparent;
              }
            `}</style>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-80 relative"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-zinc-500" />
            </div>
            <input 
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-zinc-200 placeholder:text-zinc-600 focus:outline-hidden focus:border-blue-500/50 transition-all backdrop-blur-sm"
            />
          </motion.div>
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === "All" && searchQuery === "" && (
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-24 group"
          >
            <div className="relative aspect-21/9 rounded-[2.5rem] overflow-hidden border border-white/5 bg-zinc-900/30">
              <img 
                src={featuredPost.image} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60" 
                alt={featuredPost.title} 
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg">
                    Featured Article
                  </span>
                  <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Calendar size={14} className="text-blue-500" /> {featuredPost.date}
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-tight max-w-4xl">
                  {featuredPost.title}
                </h2>
                <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden flex items-center justify-center">
                      <User size={20} className="text-zinc-500" />
                    </div>
                    <span className="font-bold text-zinc-300">{featuredPost.author}</span>
                  </div>
                  <button className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                    Read Article <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                activeCategory === cat 
                  ? "bg-white text-black shadow-xl" 
                  : "bg-zinc-900/50 border border-white/5 text-zinc-500 hover:text-white hover:border-white/10"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts
              .filter(post => !post.featured || activeCategory !== "All" || searchQuery !== "")
              .map((post, index) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex flex-col group h-full bg-zinc-900/20 border border-white/5 rounded-[2rem] overflow-hidden hover:border-blue-500/30 transition-all duration-500"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <img 
                      src={post.image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-80" 
                      alt={post.title} 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold text-blue-400 uppercase tracking-widest border border-white/5">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1 space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-blue-500" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-blue-500" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-zinc-500 text-sm font-medium line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-blue-400 group-hover:border-blue-500/30 transition-all">
                          <User size={14} />
                        </div>
                        <span className="text-[11px] font-bold text-zinc-400">{post.author}</span>
                      </div>
                      <button className="p-2 rounded-full border border-white/5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 bg-zinc-900/10 rounded-[3rem] border border-dashed border-white/5"
          >
            <Search className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-sm">
              No articles match your search criteria.
            </p>
          </motion.div>
        )}

        {/* Newsletter / CTA Area */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 md:p-20 rounded-[3rem] bg-linear-to-br from-blue-600 to-indigo-700 relative overflow-hidden group shadow-2xl shadow-blue-500/20"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Share2 size={200} className="rotate-12" />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-white/80 font-bold uppercase tracking-[0.3em] text-sm mb-4">
              Stay in the loop
            </h3>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight mb-8">
              Expert safety tips <br />
              <span className="text-blue-200">delivered monthly.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl py-5 px-6 text-white placeholder:text-white/40 focus:outline-hidden focus:bg-white/20 transition-all backdrop-blur-md"
              />
              <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-100 transition-colors shadow-xl">
                Subscribe
              </button>
            </div>
            <p className="text-blue-100/50 text-[10px] font-bold uppercase tracking-widest mt-6">
              * By subscribing, you agree to receive technical updates from Drivvize.
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

