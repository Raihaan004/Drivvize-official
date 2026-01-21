"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { VehicleShowcase } from "@/components/ui/vehicle-showcase";
import { FloatingDock } from "@/components/ui/floating-dock";
import { HomeIcon } from "@/components/icons/home";
import { UsersIcon } from "@/components/icons/users";
import { CircleHelpIcon } from "@/components/icons/circle-help";
import { ArchiveIcon } from "@/components/icons/archive";
import { FileTextIcon } from "@/components/icons/file-text";
import { DownloadIcon } from "@/components/icons/download";
import { PartyPopperIcon } from "@/components/icons/party-popper";
import { MailCheckIcon } from "@/components/icons/mail-check";
import { Cover } from "@/components/ui/cover";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage({ isIntroFinished = true }: { isIntroFinished?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgOrb1Ref = useRef<HTMLDivElement>(null);
  const bgOrb2Ref = useRef<HTMLDivElement>(null);
  const bgOrb3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states via GSAP instead of CSS to avoid conflicts
      gsap.set([".hero-text", ".nav-brand", ".nav-link", ".nav-pill"], { opacity: 0 });
      gsap.set(".nav-pill", { y: 50 });

      // Animated gradient background
      gsap.to(".animated-bg", {
        backgroundPosition: "100% 100%",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating orbs animation
      gsap.to(bgOrb1Ref.current, {
        y: 30,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(bgOrb2Ref.current, {
        y: -40,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      gsap.to(bgOrb3Ref.current, {
        y: 25,
        x: 30,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      gsap.to(".hero-text", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 3.2, 
      });

      gsap.to(".nav-brand", {
        opacity: 1,
        duration: 0.1,
        delay: 3.8,
      });

      gsap.to(".nav-pill", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        delay: 4.0,
      });

      gsap.to(".nav-link", {
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        delay: 4.2,
      });

      // Coordinator Timeline for the scene transition
      const sceneTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=45%", // Balanced scroll distance
          scrub: 0.5, // Faster feedback to avoid stuck blur
          pin: true,
          pinSpacing: false,
        }
      });

      sceneTl
        .to(heroRef.current, {
          opacity: 0,
          filter: "blur(50px)",
          y: -80,
          duration: 1
        })
        .to(".vehicle-overlay", {
          opacity: 0,
          duration: 1
        }, "-=1")
        .to(".vehicle-bg", {
          opacity: 1,
          duration: 1
        }, "-=1")
        .fromTo(".vision-section", 
          { 
            y: 150, 
            opacity: 0, 
            filter: "blur(20px)" 
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "none"
          }, 
          "-=0.8"
        );


    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-zinc-950 text-zinc-50 selection:bg-blue-500/30">
      {/* Animated Gradient Background */}
      <div 
        className="animated-bg fixed inset-0 -z-20"
        style={{
          background: "linear-gradient(-45deg, #09090b, #18181b, #09090b, #171717, #09090b)",
          backgroundSize: "400% 400%",
        }}
      />
      
      {/* Vehicle Background Layer */}
      <div className="fixed inset-0 top-0 h-screen w-full -z-10 bg-zinc-900/50 vehicle-showcase-container">
        <VehicleShowcase className="h-full w-full object-cover opacity-30 vehicle-bg" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent vehicle-overlay" />
      </div>

      {/* Floating Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          ref={bgOrb1Ref}
          className="absolute top-20 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"
        />
        <div
          ref={bgOrb2Ref}
          className="absolute top-40 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"
        />
        <div
          ref={bgOrb3Ref}
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-[130px] pointer-events-none"
        />
      </div>

      {/* Top Header - Logo Only */}
      <header className="fixed top-0 w-full z-40 px-8 py-6 pointer-events-none">
        <div className="flex items-center nav-brand pointer-events-auto">
          <div className="relative h-14 w-56 overflow-hidden">
            <Image src="/Drivvize_logo.jpeg" alt="Logo" fill className="object-contain grayscale invert" />
          </div>
        </div>
      </header>

      {/* Floating Bottom Navigation - FloatingDock */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 nav-pill">
        <FloatingDock
          items={[
            {
              title: "Home",
              icon: <HomeIcon className="h-full w-full text-blue-500" size="100%" />,
              href: "#",
            },
            {
              title: "About Us",
              icon: <UsersIcon className="h-full w-full text-zinc-400" size="100%" />,
              href: "#",
            },
            {
              title: "FAQs",
              icon: <CircleHelpIcon className="h-full w-full text-zinc-400" size="100%" />,
              href: "#",
            },
            {
              title: "Services",
              icon: <ArchiveIcon className="h-full w-full text-zinc-400" size="100%" />,
              href: "#",
            },
            {
              title: "Blog",
              icon: <FileTextIcon className="h-full w-full text-zinc-400" size="100%" />,
              href: "#",
            },
            {
              title: "Downloads",
              icon: <DownloadIcon className="h-full w-full text-zinc-400" size="100%" />,
              href: "#",
            },
            {
              title: "Careers",
              icon: <PartyPopperIcon className="h-full w-full text-zinc-400" size="100%" />,
              href: "#",
            },
            {
              title: "Contact Us",
              icon: (
                <div className="h-full w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white p-1">
                  <MailCheckIcon className="h-full w-full" size="100%" />
                </div>
              ),
              href: "#",
            },
          ]}
        />
      </div>

      {/* Sections Container */}
      <div className="relative">
        {/* Hero Section */}
        <section className="hero-section relative h-screen flex flex-col items-center justify-center px-8 text-center overflow-hidden z-20">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-40 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

          <div ref={heroRef} className="relative z-10 space-y-8 max-w-7xl mx-auto">
            <div className="inline-block px-5 py-2 rounded-full border border-blue-900/30 bg-blue-900/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] hero-text">
              Automotive Functional Safety
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter hero-text leading-[0.9] uppercase italic relative z-20 py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
                The Future Of <br />
                <Cover>Safety</Cover> Is Here
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-200 hero-text max-w-4xl mx-auto tracking-tight">
                <EncryptedText 
                  text="Discover the safest self-driving experience with Drivvize"
                  encryptedClassName="text-zinc-500"
                  revealedClassName="text-zinc-200"
                  revealDelayMs={50}
                  animate={isIntroFinished}
                />
              </h2>
            </div>

            <div className="max-w-2xl mx-auto hero-text">
              <TextGenerateEffect
                words="We are an Automotive Functional Safety Consultancy who provide very high-quality services to meet the ISO 26262 needs of your organization. We have a holistic view about safety and we use that to help companies develop very safe products."
                className="text-zinc-500 text-base md:text-lg leading-relaxed font-medium opacity-90"
              />
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="vision-section min-h-screen flex items-center justify-center px-8 relative z-30 -mt-[30vh]">
          <div className="max-w-7xl mx-auto w-full">
            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start w-full">
              <div className="flex-1 space-y-8 text-left">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full border border-blue-900/30 bg-blue-900/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    Our Philosophy
                  </div>
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-zinc-100 uppercase italic">
                    Our Vision
                  </h2>
                </div>
                
                <p className="text-zinc-400 text-lg md:text-2xl leading-relaxed font-medium">
                  At Drivvize, we believe the future of mobility lies in the seamless integration of cutting-edge technology with the highest levels of safety and security.
                </p>

                <div className="pl-6 border-l-4 border-blue-600 py-1">
                  <p className="text-zinc-500 text-base md:text-xl italic font-medium leading-relaxed">
                    "Our solutions are designed to enable our clients to achieve this vision and stay ahead of the curve."
                  </p>
                </div>
              </div>

              <div className="flex-1 w-full grid grid-cols-1 gap-4">
                {[
                  "Uncompromising safety standards",
                  "Future-ready mobility solutions",
                  "Strategic client partnerships"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-950/60 backdrop-blur-md border border-zinc-800/50 hover:border-blue-500/20 transition-all duration-500 group shadow-lg">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-zinc-950 group-hover:scale-110 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span className="text-lg md:text-2xl font-bold text-zinc-100/90 tracking-tight group-hover:text-white transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="px-8 py-20 border-t border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3 font-bold text-2xl tracking-tighter text-zinc-100">
              <div className="relative h-8 w-8 overflow-hidden rounded-md border border-zinc-800">
                <Image src="/Drivvize_logo.jpeg" alt="Logo" fill className="object-contain grayscale invert" />
              </div>
              DRIVVIZE
            </div>
            <div className="text-zinc-500 text-sm font-medium">© 2026 Drivvize Automotive Safety. All rights reserved.</div>
            <div className="flex gap-10">
                {["LinkedIn", "Twitter", "Email"].map(social => (
                    <a key={social} href="#" className="text-sm font-bold text-zinc-400 hover:text-blue-500 transition-colors uppercase tracking-widest">
                        {social}
                    </a>
                ))}
            </div>
        </div>
      </footer>
    </div>
  );
}
