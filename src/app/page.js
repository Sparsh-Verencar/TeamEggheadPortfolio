"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Gmail from "@/components/Gmail";
import Folder from "@/components/react_bits/Components/Folder/Folder";
import WindowTaskBar from "@/components/WindowTaskBar";
import TargetCursor from "@/components/react_bits/Animations/TargetCursor/TargetCursor";
import FadingSquare from "@/components/FadingSquare";
import Loading from "./loading";
import RetroProgressBar from "@/components/RetroProgressBar";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [progress, setProgress] = useState(0);

  // Drawing state
  const [baseStart, setBaseStart] = useState(null);
  const [baseEnd, setBaseEnd] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentChain, setCurrentChain] = useState([]);
  const [chains, setChains] = useState([]);
  const [viewport, setViewport] = useState({ w: 1920, h: 1080 });
  const containerRef = useRef();

  // Progress bar logic
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 80) return prev + 1;
        if (prev < 100) return prev + 0.3;
        return 100;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Delay showing the main content
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  // Track viewport size for SVG
  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Left‑click handler
  const handleClick = (e) => {
    if (e.button !== 0) return;
    const pt = { x: e.clientX, y: e.clientY };

    if (!baseStart) {
      setBaseStart(pt);
    } else if (!baseEnd) {
      setBaseEnd(pt);
    } else if (isDrawing) {
      setCurrentChain((chain) => [...chain, pt]);
    }
  };

  // Right‑click handler
  const handleContext = (e) => {
    e.preventDefault();
    if (!baseStart || !baseEnd) return;
    const pt = { x: e.clientX, y: e.clientY };

    if (!isDrawing) {
      setCurrentChain([pt]);
      setIsDrawing(true);
    } else {
      setChains((arr) => [...arr, currentChain]);
      setCurrentChain([]);
      setIsDrawing(false);
    }
  };

  // Distribute N points evenly along AB
  const getLinePoints = (A, B, N) => {
    if (!A || !B || N < 1) return [];
    return Array.from({ length: N }, (_, i) => {
      const t = N === 1 ? 0 : i / (N - 1);
      return { x: A.x + (B.x - A.x) * t, y: A.y + (B.y - A.y) * t };
    });
  };

  // Download handler
  const downloadTxt = () => {
    if (!baseStart || !baseEnd || chains.length === 0) {
      alert("You need at least one completed chain to download.");
      return;
    }

    const starts = getLinePoints(baseStart, baseEnd, chains.length);
    const dStrings = chains.map((chainPts, idx) => {
      const pts = [starts[idx], ...chainPts];
      return pts
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
        .join(" ");
    });

    const blob = new Blob([dStrings.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "paths.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const startPoints = getLinePoints(
    baseStart,
    baseEnd,
    chains.length + (isDrawing ? 1 : 0)
  );

  if (!showContent) {
    return <Loading />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-gray-950 text-white overflow-hidden"
      onClick={handleClick}
      onContextMenu={handleContext}
      suppressHydrationWarning
    >
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />

      {/* Sidebar: Folders & Gmail */}
      <div className="h-[91vh] flex flex-col items-start justify-around pl-[2vw]">
        <Folder size={1} color="#F3F708" text="members" className="cursor-target custom-folder" />
        <Folder size={1} color="#F3F708" text="projects" className="cursor-target custom-folder" />
        <Folder size={1} color="#F3F708" text="About Team" className="cursor-target custom-folder" />
        <Gmail />
      </div>

      {/* Centered Fading Square */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <FadingSquare progress={progress} />
      </div>

      {/* Egghead centered at (640, 320.5) */}
      <div
        className="absolute w-24 h-24 bg-green-500 border border-green-900 flex items-center justify-center text-black"
        style={{
          top: `272.5px`,   // 320.5 - 48
          left: `592px`,    // 640 - 48
          clipPath: `polygon(20% 20%,100% 0,80% 80%,0 100%)`,
          transform: `rotate(55deg) scale(2.7)`,
        }}
      >
        EGGHEAD
      </div>

      {/* Download button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // don't let the parent div steal it
          downloadTxt();
        }}
        className="absolute top-4 right-4 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
      >
        Download Paths
      </button>

      {/* SVG overlay for lines (pointer-events-none added!) */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${viewport.w} ${viewport.h}`}
      >
        {/* Base line */}
        {baseStart && baseEnd && (
          <motion.line
            x1={baseStart.x}
            y1={baseStart.y}
            x2={baseEnd.x}
            y2={baseEnd.y}
            stroke="#FF00FF"
            strokeWidth="2"
          />
        )}

        {/* Completed chains */}
        {chains.map((chainPts, idx) => {
          const start = startPoints[idx];
          const pts = [start, ...chainPts];
          const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
          return (
            <path
              key={idx}
              d={d}
              stroke="#00FF00"
              strokeWidth="2"
              fill="none"
            />
          );
        })}

        {/* Current in‑progress chain */}
        {isDrawing && currentChain.length > 0 && (() => {
          const start = startPoints[chains.length];
          const pts = [start, ...currentChain];
          const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
          return (
            <path
              d={d}
              stroke="#00FF00"
              strokeWidth="2"
              fill="none"
            />
          );
        })()}
      </svg>

      <WindowTaskBar />
    </div>
  );
}
