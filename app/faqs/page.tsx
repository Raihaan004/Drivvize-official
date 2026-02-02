"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Plus, 
  Minus, 
  ChevronDown, 
  HelpCircle,
  ShieldCheck,
  BookOpen,
  Cpu,
  Lock,
  MessageSquare
} from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    category: "General",
    question: "What services does Drivvize offer?",
    answer: "Drivvize offers a comprehensive suite of automotive engineering services focused on Safety and Reliability. This includes Functional Safety (ISO 26262), Cybersecurity (ISO 21434), SEooC development, Audits, Assessments, and specialized Technical Trainings."
  },
  {
    id: 2,
    category: "General",
    question: "What services does Drivvize offer with respect to Functional Safety?",
    answer: "We provide end-to-end FuSa support including HARA, Item Definition, Technical Safety Concepts (TSC), FMEA/FTA/DFA Analysis, and software/hardware safety analysis across all ASIL levels (A to D)."
  },
  {
    id: 3,
    category: "General",
    question: "Does Drivvize help an organization with their microcontroller, complex ICs, Operating System (OS) & tools selection?",
    answer: "Yes, we provide expert consultancy in selecting safety-compliant hardware (MCUs, ICs) and software (RTOS, Middleware) that meet the specific ASIL requirements of your system, ensuring tool qualification (TCL) is also handled."
  },
  {
    id: 4,
    category: "Safety & Tech",
    question: "Does Drivvize support in Functional Safety Semiconductor development?",
    answer: "Absolutely. We specialize in ISO 26262-11 (Guidelines on application of ISO 26262 to semiconductors), assisting chip manufacturers in developing SEooC elements and performing quantitative FMEDA for hardware components."
  },
  {
    id: 5,
    category: "Safety & Tech",
    question: "What services does Drivvize offer with respect to Cybersecurity (ISO 21434)?",
    answer: "We offer TARA (Threat Analysis and Risk Assessment), Cybersecurity Concept development, requirements management, and process gap analysis to ensure your vehicle systems are protected against evolving digital threats."
  },
  {
    id: 6,
    category: "Training",
    question: "What trainings does Drivvize offer?",
    answer: "Our offerings include Introduction to FuSa, ISO 26262 Parts 4-7 specific training, SOTIF (ISO 21448), SEooC development training, and customized workshops tailored to your organization's specific technical needs."
  },
  {
    id: 7,
    category: "Training",
    question: "Do we offer trainings exclusively for organizations?",
    answer: "While we primarily focus on corporate training to upskill engineering teams, we also host open workshops and certification programs that individual professionals can join to advance their automotive safety careers."
  },
  {
    id: 8,
    category: "Compliance",
    question: "Does Drivvize perform Audits & Assessments?",
    answer: "Yes, we act as an independent body to perform Functional Safety Audits (process-based) and Safety Assessments (technical/product-based) to verify compliance before production release."
  },
  {
    id: 9,
    category: "Compliance",
    question: "Does Drivvize provide ASIL certification for process or products?",
    answer: "We provide 'Readiness' certification and independent assessment reports. For final formal third-party certification, we bridge the gap and prepare all necessary documentation for recognized certification bodies."
  },
  {
    id: 10,
    category: "Compliance",
    question: "What are the kind of certifications that an organization could achieve?",
    answer: "Organizations can achieve Process Compliance (ASPICE, ISO 26262) or Product Compliance (ASIL A-D rated systems). Drivvize ensures your safety lifecycle is robust enough to pass any formal audit."
  },
  {
    id: 11,
    category: "Safety & Tech",
    question: "What is the highest ASIL Drivvize could support?",
    answer: "We support the full spectrum of Automotive Safety Integrity Levels, up to and including ASIL D, which represents the most stringent safety requirements."
  },
  {
    id: 12,
    category: "General",
    question: "How do I get a quote for a specific project?",
    answer: "You can reach out via our contact page or email us directly with your project requirements. We typically conduct an initial discovery call to understand your needs before providing a detailed proposal."
  },
  {
    id: 13,
    category: "Compliance",
    question: "Can Drivvize help with ASPICE compliance?",
    answer: "Yes, we provide ASPICE (Automotive SPICE) process improvement consulting, helping organizations reach Level 2 or Level 3 capability with a focus on integrating safety processes into the development lifecycle."
  },
  {
    id: 14,
    category: "Safety & Tech",
    question: "Do you provide safety manual templates for SEooC?",
    answer: "Yes, we provide frameworks and templates for creating comprehensive Safety Manuals for Safety Elements out of Context (SEooC), including valid context assumptions and technical interface specifications."
  },
  {
    id: 15,
    category: "General",
    question: "What industries do you serve besides automotive?",
    answer: "While automotive is our primary focus, our functional safety expertise extends to Off-Highway vehicles, Industrial Robotics (IEC 61508), and e-mobility solutions."
  },
  {
    id: 16,
    category: "Training",
    question: "Is training available on-site or only remotely?",
    answer: "We offer both! On-site training at your facility allows for hands-on collaboration, while our remote live-instructor sessions provide flexibility for distributed teams."
  },
  {
    id: 17,
    category: "General",
    question: "How does Drivvize handle data confidentiality?",
    answer: "Confidentiality is paramount in safety engineering. We operate under strict NDAs and use secure infrastructure to ensure your intellectual property and project data are protected at all times."
  },
  {
    id: 18,
    category: "Safety & Tech",
    question: "Do you support SOTIF (ISO 21448) implementation?",
    answer: "Yes, we support 'Safety Of The Intended Functionality' (SOTIF) analysis, which is critical for ADAS and autonomous driving features where failures can occur without a hardware malfunction."
  },
  {
    id: 19,
    category: "Safety & Tech",
    question: "Can Drivvize assist with tool qualification (ISO 26262-8)?",
    answer: "Yes, we perform Tool Impact Analysis and Tool Error Detection analysis to determine the Tool Confidence Level (TCL) and perform the necessary qualification activities for your toolchain."
  },
  {
    id: 20,
    category: "Training",
    question: "How long are the training sessions typically?",
    answer: "Our sessions range from 1-day executive overviews to deep-dive 5-day technical workshops, depending on the complexity of the subject and the required depth of knowledge."
  }
];

const categories = ["All", "General", "Safety & Tech", "Training", "Compliance"];

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<number | null>(1);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <main className="h-screen bg-zinc-950 text-white selection:bg-blue-500/30 overflow-hidden flex flex-col">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 overflow-hidden pt-12 md:pt-16 pb-10">
        {/* Header Section - Sticky/Fixed at top of layout */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 shrink-0">
          <div className="space-y-4">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-blue-500 font-bold uppercase tracking-[0.3em] text-sm"
            >
              Support Center
            </motion.h3>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none"
            >
              Frequently asked <br />
              <span className="text-white/20 outline-text">questions</span>
            </motion.h1>
            <style jsx>{`
              .outline-text {
                -webkit-text-stroke: 1.5px rgba(255,255,255,0.15);
                color: transparent;
              }
            `}</style>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-100 relative"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-zinc-500" />
            </div>
            <input 
              type="text"
              placeholder="Looking for something?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-zinc-200 placeholder:text-zinc-600 focus:outline-hidden focus:border-blue-500/50 transition-all backdrop-blur-sm"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 overflow-hidden flex-1">
          {/* Navigation/Sidebar - Fixed on large screens */}
          <div className="lg:col-span-3 h-full shrink-0">
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-4">
                  Categories
                </p>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${
                        activeCategory === cat 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                          : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion List - Scrollable */}
          <div className="lg:col-span-9 overflow-y-auto pr-4 custom-scrollbar flex-1 space-y-4">
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.2);
              }
            `}</style>
            <AnimatePresence mode="popLayout">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className={`rounded-2xl border transition-all duration-300 ${
                      openId === faq.id 
                        ? "bg-zinc-900/80 border-blue-500/30" 
                        : "bg-zinc-900/30 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <button
                      onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                      className="w-full text-left px-6 py-6 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          openId === faq.id ? "bg-blue-500 text-white" : "bg-white/5 text-zinc-500"
                        }`}>
                          {faq.category === "Training" && <BookOpen size={16} />}
                          {faq.category === "General" && <HelpCircle size={16} />}
                          {faq.category === "Safety & Tech" && <ShieldCheck size={16} />}
                          {faq.category === "Compliance" && <ChevronDown size={16} className={openId === faq.id ? "rotate-180" : ""} />}
                          {!["Training", "General", "Safety & Tech", "Compliance"].includes(faq.category) && <HelpCircle size={16} />}
                        </div>
                        <span className={`text-lg font-bold tracking-tight transition-colors ${
                          openId === faq.id ? "text-white" : "text-zinc-300"
                        }`}>
                          {faq.question}
                        </span>
                      </div>
                      <div className={`shrink-0 transition-transform duration-300 ${openId === faq.id ? "rotate-180" : ""}`}>
                        {openId === faq.id ? <Minus size={20} className="text-blue-500" /> : <Plus size={20} className="text-zinc-600" />}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {openId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 ml-12">
                            <p className="text-zinc-400 leading-relaxed text-lg">
                              {faq.answer}
                            </p>
                            <div className="flex gap-2 mt-4">
                              <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded-md uppercase tracking-widest">
                                {faq.category}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-white/10"
                >
                  <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">No matches found for "{searchQuery}"</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}

