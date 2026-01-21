"use client";

import { useState } from "react";
import IntroAnimation from "@/components/IntroAnimation";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-slate-50">
      <LandingPage />
      
      <IntroAnimation onComplete={() => setIntroFinished(true)} />
    </div>
  );
}
