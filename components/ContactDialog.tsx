"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, Send, Linkedin } from "lucide-react";
import { teamMembers } from "@/lib/team-data";

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-0.5"
          >
            {/* Rainbow Animated Border */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
              <div className="absolute -inset-full animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)] opacity-30 blur-sm" />
            </div>

            <div className="relative z-10 w-full bg-slate-900 rounded-[calc(2.5rem-2px)] overflow-hidden flex flex-col md:flex-row">
              {/* Left Side: Contact Info */}
              <div className="w-full md:w-2/5 p-8 md:p-12 bg-slate-950/50 border-r border-white/5 space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Contact Us</h2>
                  <p className="text-zinc-500 text-sm font-medium">Reach out to us via any of these channels.</p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                      <Phone size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Call Us</p>
                      <p className="text-white font-medium">+91 96770 19689</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                      <Mail size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Email Us</p>
                      <p className="text-white font-medium">consult@drivvize.com</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-8 border-t border-white/5">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Connect with Experts</p>
                  <div className="flex flex-wrap gap-3">
                    {teamMembers.map((member) => (
                      <a
                        key={member.name}
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                        title={`${member.name} (${member.role})`}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-blue-500 transition-colors">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 border border-slate-900">
                          <Linkedin size={10} className="text-white" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="flex-1 p-8 md:p-12 relative">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5"
                >
                  <X size={18} />
                </button>

                <form className="space-y-6 pr-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">First Name</label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-blue-500 transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Last Name</label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-blue-500 transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-blue-500 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Your Message</label>
                    <textarea
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:border-blue-500 transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-widest text-sm transition-all transform active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                  >
                    Send Message
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
