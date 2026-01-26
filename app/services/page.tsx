"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Target, 
  Search, 
  Zap, 
  ClipboardCheck, 
  Award, 
  Settings,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Workflow,
  CheckCircle2,
  FileCode2,
  Activity,
  Box,
  GraduationCap,
  BookOpen,
  Check
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const services = [
  {
    id: "safety-concept",
    title: "Safety Concept",
    icon: <Target className="w-8 h-8" />,
    shortDesc: "Architectural safety planning from HARA to Technical Concepts.",
    fullDesc: "Starting from Item definition, HARA until Technical Safety Concept and System Safety Analysis using FMEA/FTA, we create robust, really safe concepts. We specialize in translating high-level safety goals into implementable system architectures.",
    features: ["HARA & Item Definition", "Technical Safety Concept (TSC)", "FMEA / FTA Analysis", "SG-to-ASIL Mapping"],
    standards: ["ISO 26262-3", "ISO 26262-4"],
    color: "from-blue-500 to-cyan-400",
    video: "/Services-background-video/8345627-uhd_3840_2160_25fps.mp4"
  },
  {
    id: "safety-analysis",
    title: "Safety Analysis",
    icon: <Activity className="w-8 h-8" />,
    shortDesc: "In-depth HW/SW analysis to identify and mitigate critical gaps.",
    fullDesc: "From System Safety analysis, to HW and SW Safety analysis, we go deep to find gaps. We perform Dependent Failure Analysis (DFA) to ensure independence of safety-critical paths and functional redundancy.",
    features: ["HW/SW Safety Analysis", "Dependent Failure Analysis", "Quantitative FMEDA", "Diagnostic Coverage Check"],
    standards: ["ISO 26262-5", "ISO 26262-6"],
    color: "from-indigo-500 to-blue-400",
    video: "/Services-background-video/14514398-uhd_3840_2160_25fps.mp4"
  },
  {
    id: "seooc",
    title: "SEooC",
    icon: <Cpu className="w-8 h-8" />,
    shortDesc: "Safety Element out of Context development and integration.",
    fullDesc: "With the increasing need to develop HW, SW and Systems as Safety Element out of Context, we have the expertise to do it the right way. We specialize in Safety Manual analysis and defining valid context assumptions.",
    features: ["SEooC Lifecycle Management", "Safety Manual Creation", "Assumption Validation", "Generic Safety Interface"],
    standards: ["ISO 26262-10"],
    color: "from-cyan-500 to-teal-400",
    video: "/Services-background-video/14514406-uhd_3840_2160_25fps.mp4"
  },
  {
    id: "audits",
    title: "Audits & Assessments",
    icon: <ClipboardCheck className="w-8 h-8" />,
    shortDesc: "Process audits and technical assessments for all ASIL levels.",
    fullDesc: "We perform Process Audits and Technical Assessments for Programs of all ASIL levels. We also support confirmation reviews and independent peer reviews to ensure total compliance with safety processes.",
    features: ["Independent Assessments", "ASIL Verification", "Process Compliance Audits", "Confirmation Reviews"],
    standards: ["ISO 26262-2", "ASPICE"],
    color: "from-blue-600 to-indigo-500",
    video: "/Services-background-video/18101989-uhd_3840_2160_30fps.mp4"
  },
  {
    id: "qualification",
    title: "Qualification",
    icon: <Award className="w-8 h-8" />,
    shortDesc: "Comprehensive SW/HW component and tool qualification.",
    fullDesc: "We support Qualification activities like SW Component Qualification, HW Element Evaluation and Tools Qualification. We define the qualification criteria and execute the necessary tests to ensure reliability.",
    features: ["Tool Qualification (TCL/ASIL)", "SW Component Qualification", "HW Element Evaluation", "Reliability Testing"],
    standards: ["ISO 26262-8", "ISO 26262-11"],
    color: "from-indigo-600 to-blue-500",
    video: "/Services-background-video/20693186-uhd_3840_2160_25fps.mp4"
  },
  {
    id: "process-setup",
    title: "ISO 26262 Setup",
    icon: <Workflow className="w-8 h-8" />,
    shortDesc: "End-to-end safety process implementation and training.",
    fullDesc: "We help in setting up the ISO 26262 Internal Process in Organizations that are new to Automotive or Functional Safety. From Concept till Manufacturing, we have the entire process covered with templates and guidelines.",
    features: ["Internal Process Design", "Safety Culture Setup", "Template Development", "Manufacturing Safety Coordination"],
    standards: ["ISO 26262-1:12"],
    color: "from-blue-500 to-indigo-600",
    video: "/Services-background-video/8986877-uhd_3840_2160_30fps.mp4"
  }
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(services[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth transforms for transitions
  const section1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const section1Scale = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0.9]);
  const section1Y = useTransform(scrollYProgress, [0, 0.25, 0.33], ["0%", "0%", "-50px"]);
  
  const section2Opacity = useTransform(scrollYProgress, [0.33, 0.45, 0.58, 0.66], [0, 1, 1, 0]);
  const section2Y = useTransform(scrollYProgress, [0.33, 0.45, 0.58, 0.66], ["100px", "0px", "0px", "-50px"]);
  const section2Scale = useTransform(scrollYProgress, [0.33, 0.45, 0.58, 0.66], [0.95, 1, 1, 0.95]);

  const section3Opacity = useTransform(scrollYProgress, [0.66, 0.75, 1], [0, 1, 1]);
  const section3Y = useTransform(scrollYProgress, [0.66, 0.75, 1], ["100px", "0px", "0px"]);
  const section3Scale = useTransform(scrollYProgress, [0.66, 0.75, 1], [0.95, 1, 1]);

  // Handle pointer events to allow interaction with sections when they are visible
  const section1PointerEvents = useTransform(scrollYProgress, (p) => (p < 0.33 ? "auto" : "none")) as any;
  const section2PointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.33 && p < 0.66 ? "auto" : "none")) as any;
  const section3PointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.66 ? "auto" : "none")) as any;

  return (
    <main ref={containerRef} className="relative h-[300vh] bg-zinc-950 text-white">
      {/* Background Video Layer - Now Sticky/Fixed for both sections */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeService.video}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover grayscale opacity-80"
              src={activeService.video}
            />
          </motion.div>
        </AnimatePresence>
        {/* Cinematic Dark Overlays */}
        <div className="absolute inset-0 bg-zinc-950/60" />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950/80 via-transparent to-zinc-950/80" />
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Hero Section: Interactive Grid */}
        <motion.section 
          style={{ 
            opacity: section1Opacity, 
            scale: section1Scale, 
            y: section1Y,
            pointerEvents: section1PointerEvents
          }}
          className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 pt-20 pb-16 z-10"
        >
          <div className="max-w-screen-2xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            
            {/* Left Side: Title + Detail Viewer */}
            <div className="flex-1 w-full space-y-10">
              <header>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8]"
                >
                  FuSa <br />
                  <span className="text-white/20 outline-text">Services</span>
                </motion.h1>
                <style jsx>{`
                  .outline-text {
                    -webkit-text-stroke: 1.5px rgba(255,255,255,0.15);
                    color: transparent;
                  }
                `}</style>
              </header>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, scale: 0.98, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, x: 10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${activeService.color} flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-3 p-0.5`}>
                      <div className="w-full h-full rounded-[0.9rem] flex items-center justify-center">
                        {React.cloneElement(activeService.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8 text-white" })}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">{activeService.title}</h2>
                      <div className="flex gap-2 mt-1">
                        {activeService.standards.map(s => (
                          <span key={s} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-zinc-500 uppercase">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-medium max-w-3xl">
                    {activeService.fullDesc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeService.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx + 0.3 }}
                        className="flex items-center gap-4 p-5 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm"
                      >
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                          <CheckCircle2 size={18} />
                        </div>
                        <span className="text-sm font-bold text-zinc-200 uppercase tracking-wide">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side: Interactive Selection Grid */}
            <div className="w-full lg:w-110 flex flex-col gap-4 lg:pt-2">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-2 px-2">
                Technological Domain
              </p>
              <div className="grid grid-cols-1 gap-3">
                {services.map((service) => (
                  <div key={service.id} className="relative group">
                    {activeService.id === service.id && (
                      <GlowingEffect
                        spread={40}
                        proximity={64}
                        glow={true}
                        disabled={false}
                      />
                    )}
                    <button
                      onClick={() => setActiveService(service)}
                      className={`relative w-full text-left p-5 flex items-center gap-5 rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                        activeService.id === service.id
                          ? "bg-blue-600/10 border-blue-500/40 shadow-2xl shadow-blue-500/5 z-10"
                          : "bg-zinc-900/40 border-white/5 hover:border-white/10 group-hover:bg-white/5"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        activeService.id === service.id
                          ? `bg-linear-to-br ${service.color} text-white shadow-xl`
                          : "bg-white/5 text-zinc-500 group-hover:text-zinc-300"
                      }`}>
                        {React.cloneElement(service.icon as React.ReactElement<{ size?: number }>, { size: 20 })}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-black uppercase tracking-widest text-[13px] transition-colors ${
                          activeService.id === service.id ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                        }`}>
                          {service.title}
                        </h3>
                        <p className={`text-[10px] uppercase font-bold tracking-wider mt-1 transition-colors ${
                          activeService.id === service.id ? "text-blue-400/80" : "text-zinc-700 group-hover:text-zinc-500"
                        }`}>
                          {service.shortDesc}
                        </p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

        {/* Description Section: Reveal on Scroll */}
        <motion.section 
          style={{ 
            opacity: section2Opacity, 
            y: section2Y, 
            scale: section2Scale,
            pointerEvents: section2PointerEvents
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-12 py-32 z-10 bg-zinc-950/40 backdrop-blur-[2px]"
        >
          <div className="max-w-4xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center space-y-4"
          >
            <h3 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-sm">
              Reliability & Excellence
            </h3>
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-tight">
              Ensuring Safe and <br />
              <span className="text-white/20 outline-text">Reliable Solutions</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-10"
          >
            <div className="flex items-start gap-8 group">
              <div className="mt-2 w-12 h-1 bg-blue-500 shrink-0 group-hover:w-20 transition-all duration-500" />
              <div className="space-y-6">
                <h4 className="text-2xl font-black uppercase tracking-widest italic">Expert Safety Analysis</h4>
                <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed">
                  DV provides deep expertise in performing comprehensive automotive functional safety activities. 
                  Our team specializes in creating detailed <span className="text-white transition-colors duration-300">Safety Concepts</span>, 
                  conducting rigorous <span className="text-white">Safety Analysis (FMEA, FTA, DFA)</span>, and developing 
                  <span className="text-white"> SEooC</span> elements for both hardware and software systems.
                </p>
                <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed">
                  We bridge the gap between complex ISO 26262 standards and practical engineering implementation, 
                  ensuring your safety lifecycle is not just compliant, but robustly engineered for 
                  real-world automotive challenges.
                </p>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/5"
            >
              {[
                { label: "Compliance", val: "100%" },
                { label: "ASIL Levels", val: "D" },
                { label: "Precision", val: "High" },
                { label: "Standards", val: "ISO" }
              ].map((stat) => (
                <div key={stat.label} className="text-center md:text-left">
                  <div className="text-3xl font-black italic text-blue-500">{stat.val}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

        {/* Section 3: Training Offerings */}
        <motion.section
          style={{
            opacity: section3Opacity,
            y: section3Y,
            scale: section3Scale,
            pointerEvents: section3PointerEvents
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-12 py-32 z-10"
        >
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Visual / Quote */}
            <motion.div 
              className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=2070" 
                alt="Continuous Learning"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center transform -rotate-2">
                  <GraduationCap className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter">
                    (N)EVER (S)TOP <br />
                    <span className="text-blue-500">LEARNING</span>
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Offerings List */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-sm">
                  Knowledge Empowerment
                </h3>
                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
                  Our Training <br />
                  <span className="text-white/20 outline-text">Offerings</span>
                </h2>
                <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em] pt-2">
                  Including but not limited to
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  "Introduction to Functional Safety (FuSa)",
                  "ISO 26262 Part-4 Systems Safety Training",
                  "ISO 26262 Part-5 Hardware Safety Training",
                  "ISO 26262 Part-6 Software Safety Training",
                  "ISO 26262 Part-7 Manufacturing Training",
                  "ISO 26262 Customized Trainings",
                  "ISO/PAS 21448 - SOTIF Training",
                  "How to develop an SEooC - Training",
                  "PAS 8800 Training"
                ].map((item, i) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                      <Check className="w-3 h-3 text-blue-500 group-hover:text-white" />
                    </div>
                    <span className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

function CheckIcon({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
