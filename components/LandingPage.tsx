"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { FloatingDock } from "@/components/ui/floating-dock";
import { HomeIcon } from "@/components/icons/home";
import { UsersIcon } from "@/components/icons/users";
import { CircleHelpIcon } from "@/components/icons/circle-help";
import { ArchiveIcon } from "@/components/icons/archive";
import { FileTextIcon } from "@/components/icons/file-text";
import { DownloadIcon } from "@/components/icons/download";
import { PartyPopperIcon } from "@/components/icons/party-popper";
import { MailCheckIcon } from "@/components/icons/mail-check";

export default function LandingPage() {
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500/30 overflow-hidden">
      {/* Animated Gradient Background */}
      <div 
        className="animated-bg fixed inset-0 -z-10"
        style={{
          background: "linear-gradient(-45deg, #f0f9ff, #e0f2fe, #dbeafe, #f8fafc, #e0f2fe)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Floating Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          ref={bgOrb1Ref}
          className="absolute top-20 left-10 w-80 h-80 bg-blue-300/20 rounded-full blur-[120px] pointer-events-none"
        />
        <div
          ref={bgOrb2Ref}
          className="absolute top-40 -right-20 w-96 h-96 bg-indigo-300/15 rounded-full blur-[150px] pointer-events-none"
        />
        <div
          ref={bgOrb3Ref}
          className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-200/20 rounded-full blur-[130px] pointer-events-none"
        />
      </div>

      {/* Top Header - Logo Only */}
      <header className="fixed top-0 w-full z-40 px-8 py-6 pointer-events-none">
        <div className="flex items-center nav-brand pointer-events-auto">
          <div className="relative h-14 w-56 overflow-hidden">
            <Image src="/Drivvize_logo.jpeg" alt="Logo" fill className="object-contain" />
          </div>
        </div>
      </header>

      {/* Floating Bottom Navigation - FloatingDock */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 nav-pill">
        <FloatingDock
          items={[
            {
              title: "Home",
              icon: <HomeIcon className="h-full w-full text-blue-600" size="100%" />,
              href: "#",
            },
            {
              title: "About Us",
              icon: <UsersIcon className="h-full w-full text-slate-600" size="100%" />,
              href: "#",
            },
            {
              title: "FAQs",
              icon: <CircleHelpIcon className="h-full w-full text-slate-600" size="100%" />,
              href: "#",
            },
            {
              title: "Services",
              icon: <ArchiveIcon className="h-full w-full text-slate-600" size="100%" />,
              href: "#",
            },
            {
              title: "Blog",
              icon: <FileTextIcon className="h-full w-full text-slate-600" size="100%" />,
              href: "#",
            },
            {
              title: "Downloads",
              icon: <DownloadIcon className="h-full w-full text-slate-600" size="100%" />,
              href: "#",
            },
            {
              title: "Careers",
              icon: <PartyPopperIcon className="h-full w-full text-slate-600" size="100%" />,
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

      {/* Hero Section */}
      <main className="relative pt-48 pb-32 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div ref={heroRef} className="relative z-10 space-y-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50/50 text-blue-600 text-xs font-bold uppercase tracking-widest hero-text">
            Automotive Functional Safety Experts
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight hero-text lg:max-w-5xl mx-auto leading-[1.1] text-slate-900">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Compliance</span> & Safety.
          </h1>
          <p className="text-slate-600 text-lg md:text-2xl max-w-3xl mx-auto hero-text leading-relaxed font-medium">
            We provide expert Functional Safety (ISO 26262) and Cyber Security (ISO 21434) services for the next generation of software-defined vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center hero-text pt-6">
            <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl hover:-translate-y-1">
              Explore Our Services
            </button>
            <button className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm">
              View Case Studies
            </button>
          </div>
        </div>

        {/* Feature Grid Reveal */}
        <section className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8 w-full hero-text">
          {[
            { title: "ISO 26262 Compliance", desc: "End-to-end safety lifecycle management for automotive systems." },
            { title: "Safety Analysis", desc: "Expert FHA, HARA, FMEA, and FTA services using industry-leading tools." },
            { title: "Embedded Solutions", desc: "Safe and secure firmware development for critical automotive ECUs." }
          ].map((feature, i) => (
            <div key={i} className="p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all text-left group">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl mb-6 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 18l-7-3.9V8.9l7 3.9 7-3.9v7.2l-7 3.9z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="px-8 py-20 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-3 font-bold text-2xl tracking-tighter">
              <div className="relative h-8 w-8 overflow-hidden rounded-md">
                <Image src="/Drivvize_logo.jpeg" alt="Logo" fill className="object-contain" />
              </div>
              DRIVVIZE
            </div>
            <div className="text-slate-500 text-sm font-medium">© 2026 Drivvize Automotive Safety. All rights reserved.</div>
            <div className="flex gap-10">
                {["LinkedIn", "Twitter", "Email"].map(social => (
                    <a key={social} href="#" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors uppercase tracking-widest">
                        {social}
                    </a>
                ))}
            </div>
        </div>
      </footer>
    </div>
  );
}
