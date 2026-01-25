"use client";

import { useState, useCallback } from "react";
import IntroAnimation from "@/components/IntroAnimation";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  const handleComplete = useCallback(() => {
    setIntroFinished(true);
  }, []);

  return (
    <div className="relative min-h-screen">
      <LandingPage isIntroFinished={introFinished} />
      
      {!introFinished && <IntroAnimation onComplete={handleComplete} />}
    </div>
  );
}
