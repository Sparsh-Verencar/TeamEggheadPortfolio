"use client"
import Gmail from "@/components/Gmail";
import Folder from "@/components/react_bits/Components/Folder/Folder";
import WindowTaskBar from "@/components/WindowTaskBar";
import TargetCursor from "@/components/react_bits/Animations/TargetCursor/TargetCursor";
import FadingSquare from "@/components/FadingSquare";
import Loading from "./loading";

import { useState, useEffect } from "react";
import Capacitor from "@/components/Capacitor";
import Pins from "@/components/Pins";

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

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowContent(true);
  //   }, 7000); // Match your loading duration

  //   return () => clearTimeout(timer);
  // }, []);

  /* if (!showContent) {
    return <Loading />; // Show animation while waiting
  } */

  return (
    <div className="relative w-screen h-screen flex items-between justify-between bg-gray-950" suppressHydrationWarning>
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      <div className="h-[91vh] flex flex-col items-center justify-around pl-[2vw]">
        <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="members" />
        <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="projects" />
        <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="About Team" />
        <Gmail />
      </div>
      // Assuming the faded square is centered with this wrapper
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Pins className="absolute -left-9"/>
        <Pins className="absolute -left-4 top-4"/>
        <Pins className="absolute left-1 top-9"/>
        <Pins className="absolute left-6 top-13"/>
        <Pins className="absolute left-11 top-19"/>
        <Pins className="absolute left-16 top-23"/>
        <Pins className="absolute left-21 top-29"/>
        <Pins className="absolute left-26 top-33"/>

        <Pins className="absolute left-32 top-33"/>
        <Pins className="absolute left-38 top-31"/>
        <Pins className="absolute left-44 top-29"/>
        <Pins className="absolute left-50 top-27"/>
        <Pins className="absolute left-56 top-25"/>
        <Pins className="absolute left-62 top-23"/>
        <Pins className="absolute left-68 top-21"/>
        <Pins className="absolute left-74 top-19"/>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Capacitor />
        <FadingSquare progress={progress} />
      </div>

      <WindowTaskBar />
    </div>
  );
}