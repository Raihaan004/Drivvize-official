"use client";

import React, { useLayoutEffect } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { SparklesCore } from "@/components/ui/sparkles";
import { Cover } from "@/components/ui/cover";
import { Button } from "@/components/ui/moving-border";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { MapPin, Mail, Send } from "lucide-react";
import Image from "next/image";

export default function CareersPage() {
  useLayoutEffect(() => {
    gsap.to(".nav-link", {
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
    });
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlescareers"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 lg:px-20 py-20">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="space-y-10 order-2 lg:order-1">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-blue-500 font-bold tracking-widest uppercase text-sm"
              >
                <MapPin size={16} />
                <span>Chennai, India</span>
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
                <Cover>JOIN US</Cover>
              </h1>
            </div>

            <div className="space-y-6 text-zinc-400 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white font-medium"
              >
                We&apos;re based in Chennai, India, a bustling city in the heart of Tamil Nadu known for its thriving automotive industry.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                We are always looking for talented and passionate individuals to join our team. If you are interested in working in a dynamic and innovative environment, we encourage you to get in touch with us.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Send us your CV and we&apos;ll be in touch if a relevant position becomes available.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4"
            >
              <Button
                duration={3000}
                className="bg-slate-900 border-white/10 text-white font-bold uppercase tracking-widest text-sm flex items-center gap-3 px-8 py-4"
              >
                Submit CV
                <Send size={18} className="text-blue-500" />
              </Button>
            </motion.div>
          </div>

          {/* Right Side: Visual Element */}
          <div className="relative h-100 lg:h-150 order-1 lg:order-2">
            <div className="absolute inset-0">
               <GlowingEffect
                spread={60}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <div className="w-full h-full bg-slate-900/50 backdrop-blur-3xl rounded-[3rem] border border-white/10 overflow-hidden relative group">
                <Image
                  src="/Mustang-frames/frame_068.webp"
                  alt="Future of Automotive"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/10 to-transparent" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
