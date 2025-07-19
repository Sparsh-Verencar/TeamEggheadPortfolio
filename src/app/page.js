"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import RetroProgressBar from "@/components/RetroProgressBar";
import FadingSquare from "@/components/FadingSquare";
import CornerPullDiv from "@/components/CornerPullDiv";


export default function Home() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 80) {
          return prev + 1;
        } else if (prev < 100) {
          return prev + 0.3; // 🐌 Super slo-mo
        } else {
          return 100;
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen bg-black text-white relative">
    <FadingSquare progress={progress} />


      
      <RetroProgressBar value={progress} className="w-96" />
    </div>

    </>
  );
}
