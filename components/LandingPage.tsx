"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// @ts-ignore - GSAP types can have casing conflicts on Windows
import { Observer } from "gsap/Observer";
import Image from "next/image";
import { VehicleShowcase } from "@/components/ui/vehicle-showcase";
import { Cover } from "@/components/ui/cover";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { SparklesCore } from "@/components/ui/sparkles";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { FeaturesScroll } from "@/components/FeaturesScroll";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { teamMembers } from "@/lib/team-data";
import { ContactDialog } from "@/components/ContactDialog";

gsap.registerPlugin(ScrollTrigger, Observer);

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

      if (isIntroFinished) {
        gsap.to(".hero-text", {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          delay: 0.2, 
        });

        gsap.to(".nav-brand", {
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power3.out"
        });

        gsap.to(".nav-pill", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          delay: 0.7,
        });

        gsap.to(".nav-link", {
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.8,
        });
      }

      // Transition logic using Observer for a "slide show" feel
      let animating = false;
      let currentIndex = 0; // 0 for hero, 1 for vision
      let visionPointIndex = -1; // -1 for intro text, 0, 1, 2 for features
      const totalVisionPoints = 3;

      gsap.set(".vision-section", { y: "-100%", autoAlpha: 0 });
      gsap.set(".why-choose-section", { y: "-100%", autoAlpha: 0 });

      const updateVisionPoints = (index: number) => {
        const cards = gsap.utils.toArray(".feature-card");
        const introText = document.querySelector(".vision-intro-text");
        
        animating = true;
        
        // Handle Intro Text (index === -1)
        if (index === -1) {
          gsap.to(introText, { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => { animating = false; }
          });
          cards.forEach((card: any) => {
            gsap.to(card, { opacity: 0, y: 50, scale: 0.9, display: "none", duration: 0.5 });
          });
          return;
        }

        // Keep Intro Text visible but maybe slightly faded
        gsap.to(introText, { 
          opacity: 0.6, 
          scale: 0.98,
          duration: 0.6
        });

        // Handle Feature Cards - Progressive Reveal
        cards.forEach((card: any, i: number) => {
          if (i <= index) {
            // Already shown or being shown
            if (gsap.getProperty(card, "display") === "none") {
              gsap.set(card, { display: "flex" });
              gsap.fromTo(card, 
                { opacity: 0, scale: 0.8, y: 50, filter: "blur(10px)" },
                { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0, 
                  filter: "blur(0px)",
                  duration: 1, 
                  ease: "back.out(1.2)", 
                  onComplete: () => { animating = false; } 
                }
              );
            } else {
              // Ensure it stays visible if it was already shown
              gsap.to(card, { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 0.5 });
              if (i === index) animating = false;
            }
          } else {
            // Should be hidden (if user scrolls back down)
            gsap.to(card, { 
              opacity: 0, 
              scale: 0.8, 
              y: 50, 
              filter: "blur(10px)",
              display: "none", 
              duration: 0.6,
              ease: "power2.in"
            });
            if (i === index) animating = false;
          }
        });
      };

      const gotoSection = (index: number) => {
        if (animating || index === currentIndex) return;
        animating = true;

        const sections = [".hero-section", ".vision-section", ".why-choose-section", ".leadership-section", ".cta-section"];
        
        const currentTarget = sections[currentIndex];
        const targetSection = sections[index];

        // Sequence: Hide current, show next
        const tl = gsap.timeline({
          onComplete: () => {
            currentIndex = index;
            animating = false;
            if (index === 1) updateVisionPoints(-1);
            
            // Trigger internal animations for target section
            if (index === 3) {
              gsap.fromTo(".leadership-card", 
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
              );
            }
            if (index === 4) {
              gsap.fromTo(".cta-text", 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
              );
            }
          }
        });

        // Direction logic
        const isMovingDown = index > currentIndex;
        
        tl.to(currentTarget, {
          y: isMovingDown ? "-100%" : "100%",
          scale: isMovingDown ? 0.9 : 1.1,
          filter: "blur(10px)",
          autoAlpha: 0,
          duration: 1.2,
          ease: "power2.inOut"
        });

        tl.fromTo(targetSection,
          { 
            y: isMovingDown ? "100%" : "-100%", 
            scale: isMovingDown ? 1.1 : 0.9,
            filter: "blur(10px)",
            autoAlpha: 0 
          },
          { 
            y: "0%", 
            scale: 1,
            filter: "blur(0px)",
            autoAlpha: 1, 
            duration: 1.2, 
            ease: "power2.inOut"
          }, 
          "<" // Start at the same time as the first tween
        );
      };

      Observer.create({
        target: window,
        type: "wheel,touch",
        onDown: () => {
          if (!isIntroFinished || animating) return;
          
          if (currentIndex === 0) {
            gotoSection(1);
          } else if (currentIndex === 1) {
            if (visionPointIndex < totalVisionPoints - 1) {
              visionPointIndex++;
              updateVisionPoints(visionPointIndex);
            } else {
              gotoSection(2);
            }
          } else if (currentIndex < 4) {
            gotoSection(currentIndex + 1);
          }
        },
        onUp: () => {
          if (!isIntroFinished || animating) return;

          if (currentIndex === 1) {
            if (visionPointIndex > -1) {
              visionPointIndex--;
              updateVisionPoints(visionPointIndex);
            } else {
              gotoSection(0);
            }
          } else if (currentIndex === 2) {
            // Specialized transition for scrolling UP from Why Choose Us back to last vision point
            gotoSection(1);
            visionPointIndex = totalVisionPoints - 1;
            setTimeout(() => updateVisionPoints(visionPointIndex), 1200);
          } else if (currentIndex > 0) {
            gotoSection(currentIndex - 1);
          }
        },
        tolerance: 10,
        preventDefault: true
      });


    }); // Removed scope to allow targeting global navigation

    return () => ctx.revert();
  }, [isIntroFinished]);

  return (
    <div ref={containerRef} className="bg-[#020617] text-zinc-50 selection:bg-blue-500/30 overflow-x-hidden">
      {/* Premium Animated Background Layer */}
      <div className="fixed inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#3b82f6"
        />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-[0.15] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }} 
      />
      
      {/* Vehicle Background Layer */}
      <div className="fixed inset-0 top-0 h-screen w-full -z-10 bg-slate-950/20 vehicle-showcase-container">
        <VehicleShowcase className="h-full w-full object-cover opacity-20 vehicle-bg" />
        <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-[#020617]/50 vehicle-overlay" />
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
        <div className="flex items-center nav-brand pointer-events-auto opacity-0">
          <div className="relative h-14 w-56">
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full" />
            <Image 
              src="/Drivvi.png" 
              alt="Logo" 
              fill 
              className="object-contain relative z-10 hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]" 
            />
          </div>
        </div>
      </header>

      {/* Sections Container */}
      <div className="relative main-sections-container h-screen overflow-hidden">
        {/* Hero Section */}
        <section className="hero-section absolute inset-0 flex flex-col items-center justify-center px-8 text-center z-20 overflow-hidden">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-40 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

          <div ref={heroRef} className="relative z-10 space-y-2 max-w-7xl mx-auto">
            <div className="z-10 flex items-center justify-center hero-text opacity-0 pt-8">
              <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
                <span
                  className={cn(
                    "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-linear-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-size-[300%_100%] p-px"
                  )}
                  style={{
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "destination-out",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "subtract",
                    WebkitClipPath: "padding-box",
                  }}
                />
                <AnimatedGradientText className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Automotive Functional Safety
                </AnimatedGradientText>
                <ChevronRight className="ml-1 size-3 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tight hero-text leading-[1.2] uppercase italic relative z-20 py-8 px-12 bg-clip-text text-transparent bg-linear-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white overflow-visible opacity-0">
                The Future Of <br />
                <Cover>Safety</Cover> Is Here
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-bold text-zinc-200 hero-text max-w-4xl mx-auto tracking-tight opacity-0">
                <EncryptedText 
                  text="Discover the safest self-driving experience with Drivvize"
                  encryptedClassName="text-zinc-500"
                  revealedClassName="text-zinc-200"
                  revealDelayMs={50}
                  animate={isIntroFinished}
                />
              </h2>
            </div>

            <div className="max-w-2xl mx-auto hero-text opacity-0">
              <TextGenerateEffect
                words="We are an Automotive Functional Safety Consultancy who provide high-quality services to meet the ISO 26262 needs of your organization. We use a holistic view to develop products that are not just safe, but revolutionary."
                className="text-zinc-500 text-base md:text-lg leading-relaxed font-medium opacity-90"
              />
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-center gap-3 pt-12 hero-text opacity-0">
              <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Scroll to Explore</span>
              <div className="w-px h-12 bg-linear-to-b from-blue-500 to-transparent animate-pulse" />
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="vision-section h-screen flex flex-col items-center justify-center px-8 absolute top-0 left-0 w-full z-30 invisible overflow-hidden">
          {/* Large Background Text Effect */}
          <div className="fixed inset-0 flex items-center justify-center z-0 pointer-events-none">
            <div className="w-full h-full scale-[1.2] md:scale-[1.7] lg:scale-[4] opacity-30 transition-opacity duration-500 flex items-center justify-center">
              <TextHoverEffect text="VISION" automatic={true} />
            </div>
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center justify-center">
            {/* Heading stays visible */}
            <div className="mb-6 text-center pointer-events-auto">
              <h2 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-100 uppercase italic">
                Our Vision
              </h2>
            </div>

            <div className="relative w-full flex flex-col items-center">
              {/* Intro Text Block */}
              <div className="vision-intro-text w-full flex flex-col items-center space-y-6 text-center pointer-events-auto transition-all duration-700">
                <div className="max-w-5xl mx-auto">
                  <TextGenerateEffect
                    words="At Drivvize, we believe the future of mobility lies in the seamless integration of cutting-edge technology with the highest levels of safety and security."
                    className="text-zinc-400 text-xl md:text-2xl leading-relaxed font-medium"
                  />
                </div>

                <div className="mx-auto border-l-4 border-blue-600 py-2 max-w-3xl px-8 bg-slate-900/20 backdrop-blur-sm rounded-r-2xl">
                  <TypewriterEffect
                    words={[
                      { text: '"Our', className: "text-zinc-500" },
                      { text: "solutions", className: "text-zinc-500" },
                      { text: "are", className: "text-zinc-500" },
                      { text: "designed", className: "text-zinc-500" },
                      { text: "to", className: "text-zinc-500" },
                      { text: "enable", className: "text-zinc-500" },
                      { text: "our", className: "text-zinc-500" },
                      { text: "clients", className: "text-zinc-500" },
                      { text: "to", className: "text-zinc-500" },
                      { text: "achieve", className: "text-zinc-500" },
                      { text: "this", className: "text-zinc-500" },
                      { text: "vision", className: "text-blue-500 font-bold" },
                      { text: "and", className: "text-zinc-500" },
                      { text: "stay", className: "text-zinc-500" },
                      { text: "ahead", className: "text-zinc-500" },
                      { text: "of", className: "text-zinc-500" },
                      { text: "the", className: "text-zinc-500" },
                      { text: 'curve."', className: "text-blue-500 font-bold" },
                    ]}
                    className="text-lg md:text-xl italic font-medium text-center"
                    cursorClassName="bg-blue-500 h-6 md:h-8 w-[2px]"
                  />
                </div>
              </div>

              {/* Points Showcase Area */}
              <div className="w-full flex items-center justify-center pointer-events-auto">
                <FeaturesScroll />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="why-choose-section h-screen flex flex-col items-center justify-center px-8 absolute top-0 left-0 w-full z-30 invisible overflow-hidden">
          <WhyChooseUs />
        </section>

        {/* Leadership Section */}
        <section className="leadership-section h-screen flex flex-col items-center justify-center px-8 absolute top-0 left-0 w-full z-30 invisible overflow-hidden">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-100 uppercase italic mb-12 text-center leadership-title">
              Our Leadership
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, i) => (
                <div key={i} className="leadership-card group relative overflow-hidden rounded-2xl bg-slate-900/40 border border-white/10 p-6 backdrop-blur-md transition-all duration-500 hover:border-blue-500/50">
                  <div className="relative h-64 w-full mb-6 overflow-hidden rounded-xl">
                     <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-semibold mb-4 text-sm tracking-wider uppercase">{member.role}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="cta-section h-screen flex flex-col items-center justify-center px-8 absolute top-0 left-0 w-full z-30 invisible overflow-hidden">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic cta-text">
              Ready to <br />
              <Cover>Accelerate</Cover> Safety?
            </h2>
            <p className="text-zinc-400 text-xl md:text-2xl font-medium cta-text">
              Partner with the world leaders in automotive safety engineering.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8 cta-text">
              <ContactDialog trigger={
                <button className="px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] hover:scale-105">
                  Get In Touch
                </button>
              } />
              <a href="/services" className="px-12 py-5 border border-white/20 hover:bg-white/10 text-white rounded-full font-bold text-lg transition-all duration-300 backdrop-blur-sm">
                View Services
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
