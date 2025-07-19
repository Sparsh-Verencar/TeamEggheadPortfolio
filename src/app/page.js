"use client"
import Gmail from "@/components/Gmail";
import Folder from "@/components/react_bits/Components/Folder/Folder";
import WindowTaskBar from "@/components/WindowTaskBar";
import TargetCursor from "@/components/react_bits/Animations/TargetCursor/TargetCursor";
import FadingSquare from "@/components/FadingSquare";
import Loading from "./loading";

import { useState, useEffect } from "react";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 7000); // Match your loading duration

    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return <Loading />; // Show animation while waiting
  }

  return (
    <div className="relative w-screen h-screen flex items-between justify-between bg-gray-950" suppressHydrationWarning>
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      <div className="h-[91vh] flex flex-col items-center justify-around pl-[2vw]">
        <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="members" />
        <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="projects" />
        <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="About Team" />
        <Gmail />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <FadingSquare progress={progress} />
      </div>

      <WindowTaskBar />
    </div>
  );
}
