"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Uncompromising safety standards",
    description: "Our vehicles are engineered with the highest safety benchmarks, ensuring protection for every journey and peace of mind for every passenger.",
  },
  {
    title: "Innovative security systems",
    description: "Our vehicles feature the latest security technology, ensuring that your vehicle is always protected from theft and other security threats.",
  },
  {
    title: "State-of-the-art autonomy",
    description: "Our vehicles feature the latest autonomous technology, ensuring that your vehicle is always safe and secure on the road.",
  },
];

export function FeaturesScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="feature-card hidden opacity-0 flex-col items-center">
            <div className="w-full h-full p-4 md:p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 shadow-xl hover:border-blue-500/30 transition-all duration-700 group relative overflow-hidden text-center flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex flex-col items-center gap-2 relative z-10 w-full">
                <div className="h-1 w-10 bg-blue-500/40 rounded-full group-hover:w-20 group-hover:bg-blue-500/80 transition-all duration-700" />
                
                <h3 className="text-lg md:text-xl lg:text-2xl font-black tracking-tight text-white uppercase italic leading-tight transition-transform duration-700 group-hover:scale-105">
                  {feature.title}
                </h3>

                <div className="h-1 w-10 bg-blue-500/40 rounded-full group-hover:w-20 group-hover:bg-blue-500/80 transition-all duration-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



