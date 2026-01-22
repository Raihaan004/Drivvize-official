"use client";

import React from "react";
import Image from "next/image";
import { TextHoverEffect } from "./ui/text-hover-effect";
import { LayoutTextFlip } from "./ui/layout-text-flip";
import { motion } from "motion/react";
import { GlowingEffect } from "./ui/glowing-effect";

const reasons = [
  {
    title: "Concept to Reality",
    description: "Hands-on experience in delivering Functional Safety Products from Concept to Manufacturing.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Global Expertise",
    description: "Experience with European, US and Asian OEMs, navigating practical implementation challenges.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Specialized Knowledge",
    description: "Leveraging deep understanding of the latest technologies in automotive safety and cybersecurity.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
];

export function WhyChooseUs() {
  return (
    <div className="relative w-full overflow-hidden h-screen flex flex-col items-center justify-center px-6 md:px-12 pb-24">
      <div className="absolute inset-x-0 top-0 bottom-0 -z-10 flex items-center justify-center pointer-events-none select-none overflow-hidden h-full w-full opacity-30">
        <div className="w-full h-full scale-[1.5] md:scale-[2] lg:scale-[1.6] flex items-center justify-center">
          <TextHoverEffect text="WHY CHOOSE US ?" automatic={true} />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row">
            <LayoutTextFlip
              text="Curated "
              words={["Excellence", "Why Choose Us ?"]}
              className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white drop-shadow-2xl"
              wordClassName="text-4xl md:text-7xl font-black uppercase tracking-tighter bg-white text-black dark:bg-zinc-900 dark:text-white border-none py-4 px-6"
            />
          </motion.div>
          
          <p className="text-zinc-400 text-sm md:text-lg font-medium max-w-2xl mx-auto leading-relaxed uppercase tracking-widest">
            Specialized attention through deep domain awareness.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full mt-4">
          {reasons.map((reason, index) => (
            <div key={index} className="relative h-full rounded-2xl border border-white/5 p-2 md:rounded-3xl md:p-3 group">
              <GlowingEffect
                blur={0}
                borderWidth={2}
                spread={60}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                variant="default"
              />
              <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-slate-900/40 backdrop-blur-md p-6 border border-white/5 transition-colors duration-500 group-hover:bg-slate-900/60">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl border border-white/5 group-hover:border-white/20 mb-4">
                  <Image 
                    src={reason.image} 
                    alt={reason.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                <div className="relative flex flex-1 flex-col justify-center items-center gap-3 text-center">
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white group-hover:text-blue-400 transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed font-medium line-clamp-3 group-hover:text-zinc-300 transition-colors uppercase tracking-tight">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
