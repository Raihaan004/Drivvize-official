"use client";

import React, { useLayoutEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { SparklesCore } from "@/components/ui/sparkles";
import { Cover } from "@/components/ui/cover";
import { X, Linkedin, ExternalLink } from "lucide-react";
import { teamMembers } from "@/lib/team-data";

export default function AboutUsPage() {
  const [selectedMember, setSelectedMember] = React.useState<typeof teamMembers[0] | null>(null);

  useLayoutEffect(() => {
    // Reveal navigation links
    gsap.to(".nav-link", {
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
    });
  }, []);

  return (
    <main className="h-screen bg-[#020617] text-zinc-50 relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Sparkles */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesabout"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-360 mx-auto gap-2 md:gap-6">
        {/* Page Title with Cover */}
        <div className="w-full text-center relative pt-4 md:pt-0">
          <div className="absolute inset-x-0 -top-12 h-40 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
            <div className="w-full h-full scale-[1.2] md:scale-[1.8] flex items-center justify-center">
              <TextHoverEffect text="OUR TEAM" automatic={true} />
            </div>
          </div>
          
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black italic tracking-tighter uppercase text-white leading-none">
              Meet <Cover className="rounded-xl px-4 py-1">Leadership</Cover>
            </h1>
          </div>
          
          <div className="mt-2 md:mt-4">
            <p className="text-zinc-400 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] opacity-60">
              Transforming automotive safety through expert consultancy
            </p>
          </div>
        </div>

        {/* Team Grid - Expanded to use more width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-10 w-full px-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
              className="relative group h-full cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="absolute inset-0 rounded-[2rem] border border-white/5 p-1">
                <GlowingEffect
                  blur={0}
                  borderWidth={1.5}
                  spread={45}
                  glow={true}
                  disabled={false}
                  proximity={80}
                  inactiveZone={0.01}
                  variant="default"
                />
              </div>

              <div className="relative h-full flex flex-col gap-4 overflow-hidden rounded-[1.8rem] bg-slate-900/20 backdrop-blur-xl p-5 border border-white/5 transition-all duration-700 group-hover:bg-slate-900/40 group-hover:border-white/10 group-hover:-translate-y-1">
                <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>

                <div className="flex flex-col gap-2 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 overflow-visible">
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-blue-400 transition-colors whitespace-nowrap">
                      {member.name}
                    </h3>
                    <span className="text-blue-500 font-black uppercase tracking-widest text-[10px] italic">
                      {member.role}
                    </span>
                  </div>
                  
                  <div className="h-0.5 w-12 bg-blue-600/50 group-hover:w-full transition-all duration-500" />
                  
                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-medium group-hover:text-zinc-200 transition-colors md:line-clamp-3">
                    {member.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Member Detail Dialog */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl p-[2px]"
            >
              <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
                <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)] opacity-40 blur-sm" />
              </div>
              
              <div className="relative z-10 w-full h-full bg-slate-900 rounded-[calc(2.5rem-2px)] overflow-hidden">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-6 right-6 z-10 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 transition-colors text-white"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="relative w-full md:w-2/5 aspect-square md:aspect-auto">
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />
                  </div>

                  {/* Info Section */}
                  <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center gap-6">
                    <div className="space-y-2">
                      <span className="text-blue-500 font-black uppercase tracking-[0.2em] text-xs">
                        {selectedMember.role}
                      </span>
                      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">
                        {selectedMember.name}
                      </h2>
                    </div>

                    <div className="h-0.5 w-20 bg-blue-600" />

                    <p className="text-zinc-300 text-lg leading-relaxed font-medium">
                      {selectedMember.bio}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95"
                      >
                        <Linkedin size={18} />
                        LinkedIn Profile
                      </a>
                      <button className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors border border-white/10">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
