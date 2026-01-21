"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface VehicleShowcaseProps {
  className?: string;
}

export function VehicleShowcase({ className }: VehicleShowcaseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const frameCount = 192;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const renderLoop = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const onImageLoad = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / frameCount) * 100));
      if (loadedCount === frameCount) {
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Prefix with 0s to match frame_000.webp format
      const frameIndex = i.toString().padStart(3, "0");
      img.src = `/Mustang-frames/frame_${frameIndex}.webp`;
      img.onload = onImageLoad;
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      images.forEach((img) => (img.onload = null));
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions based on first image
    const firstImage = imagesRef.current[0];
    canvas.width = firstImage.naturalWidth;
    canvas.height = firstImage.naturalHeight;

    const frameObj = { frame: 0 };

    // GSAP Scroll Animation
    renderLoop.current = gsap.to(frameObj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
      onUpdate: () => {
        const img = imagesRef.current[frameObj.frame];
        if (img) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        }
      },
    });

    return () => {
      renderLoop.current?.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full flex items-center justify-center overflow-hidden",
        className
      )}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
          <div className="text-slate-500 font-bold text-sm tracking-widest uppercase">
            Loading {loadProgress}%
          </div>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
      
      {/* Overlay Gradient for integration */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent" />
      
      {/* Interactive Hint */}
      {isLoaded && (
        <div className="absolute bottom-6 right-6 text-slate-400 text-xs font-black uppercase tracking-widest bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
          360° Safety View
        </div>
      )}
    </div>
  );
}
