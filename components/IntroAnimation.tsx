"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Character animation for the text
      const nameChars = "DRIVVIZE".split("");
      if (textRef.current) {
        textRef.current.innerHTML = nameChars
          .map((char) => `<span class="inline-block">${char}</span>`)
          .join("");
      }

      // 1. Initial State
      gsap.set(containerRef.current, { yPercent: 0 });
      gsap.set(logoRef.current, { opacity: 0, scale: 0.8, y: 20 });
      gsap.set(".inline-block", { opacity: 0, scale: 0.5, y: 10 });
      gsap.set(subtitleRef.current, { opacity: 0, y: 10 });

      // 2. Background Animation (moving gradient)
      gsap.to(bgRef.current, {
        backgroundPosition: "0% 50%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Animation Sequence
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
      })
      .to(".inline-block", {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.4")
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.3")
      // Step A: Slide the entire container up to reveal LandingPage
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1.5,
        ease: "power4.inOut",
        delay: 1.2,
        onStart: () => {
          onComplete();
        },
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = 'none';
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden pointer-events-none bg-[#020617]"
    >
      {/* Background Wrapper */}
      <div 
        ref={bgRef}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 opacity-30 blur-3xl bg-gradient-to-tr from-blue-900/40 to-[#020617]" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-8 pointer-events-auto">
        {/* Company Logo - Medium Size, No Box */}
        <div
          ref={logoRef}
          className="relative h-40 w-40 sm:h-56 sm:w-56"
        >
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
          <Image 
            src="/Drivvize_logo.jpeg" 
            alt="Drivvize Logo" 
            width={224} 
            height={224}
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(56,189,248,0.5)]"
            priority
          />
        </div>

        {/* Text Animation */}
        <div className="flex flex-col items-center gap-4">
          <div
            ref={textRef}
            className="text-5xl sm:text-7xl font-black text-zinc-50 tracking-[0.25em] z-20"
            style={{ perspective: "1000px" }}
          >
            DRIVVIZE
          </div>
          <div 
            ref={subtitleRef}
            className="text-lg sm:text-xl font-semibold text-blue-400/80 tracking-[0.4em] uppercase opacity-0"
          >
            Automotive Functional Safety
          </div>
        </div>
      </div>
    </div>
  );
}
