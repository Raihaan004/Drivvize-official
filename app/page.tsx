"use client";

import { useState } from "react";
import IntroAnimation from "@/components/IntroAnimation";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="relative min-h-screen">
      <LandingPage isIntroFinished={introFinished} />
      
      <IntroAnimation onComplete={() => setIntroFinished(true)} />
    </div>
  );
}
