"use client"
import Gmail from "@/components/Gmail";
import Folder from "@/components/react_bits/Components/Folder/Folder";
import WindowTaskBar from "@/components/WindowTaskBar";
import TargetCursor from "@/components/react_bits/Animations/TargetCursor/TargetCursor";

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
    <div className="relative w-screen h-screen flex flex-col items-start justify-center bg-gray-950">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      <div className="h-[91vh] flex flex-col items-center justify-around pl-[2vw]">
        <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="members" />
        <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="projects" />
        <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="About Team" />
        <Gmail />
      </div>
    <FadingSquare progress={progress} />


      
      <RetroProgressBar value={progress} className="w-96" />
      <WindowTaskBar />

    
    </div>

  );
}
