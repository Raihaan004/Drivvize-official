"use client";

import React, { useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ArchiveIcon } from "@/components/icons/archive";
import { FileTextIcon } from "@/components/icons/file-text";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SparklesCore } from "@/components/ui/sparkles";
import { Cover } from "@/components/ui/cover";
import { FileText, Download } from "lucide-react";

const downloadItems = [
  {
    id: "01",
    title: "V2X White paper",
    description: "V2X is a revolutionary technology that lets us reimagine a new world where cars don't just move but also think, predict and communicate - alerting each other of dangers.",
    fileSize: "2.4 MB",
    icon: <FileTextIcon size={40} />,
  },
  {
    id: "02",
    title: "SEOOC Training material",
    description: "Safety Element out of Context (SEooC) is one of the most essential topics when it comes to implementing Functional Safety (FuSa) from a Tier-1 perspective.",
    fileSize: "4.8 MB",
    icon: <ArchiveIcon size={40} />,
  },
  {
    id: "03",
    title: "FuSa Compliance Guide",
    description: "A comprehensive guide on ISO 26262 compliance for automotive software development, covering ASIL levels and verification strategies.",
    fileSize: "3.1 MB",
    icon: <FileTextIcon size={40} />,
  },
];

export default function DownloadsPage() {
  useLayoutEffect(() => {
    gsap.to(".nav-link", {
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
    });
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesdownloads"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center gap-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Digital <Cover>Resources</Cover>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Access our specialized technical documentation, whitepapers, and implementation guides for professional functional safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full h-112.5">
          {downloadItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative h-full group"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="relative h-full bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden group-hover:border-blue-500/30 transition-colors">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20">
                      {item.icon}
                    </div>
                    <span className="text-4xl font-black text-white/5 tracking-tighter">
                      {item.id}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between border-t border-white/5">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    {item.fileSize} • PDF
                  </span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-blue-600 rounded-xl text-white text-xs font-bold transition-all transform active:scale-95 group/btn">
                    <Download size={14} className="group-hover/btn:animate-bounce" />
                    DOWNLOAD
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
