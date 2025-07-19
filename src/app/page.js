"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import RetroProgressBar from "@/components/RetroProgressBar";
import FadingSquare from "@/components/FadingSquare";

export default function Home() {
  const [progress, setProgress] = useState(0);

  const [baseStart, setBaseStart] = useState(null);
  const [baseEnd, setBaseEnd] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentChain, setCurrentChain] = useState([]);
  const [chains, setChains] = useState([]);
  const [viewport, setViewport] = useState({ w: 1920, h: 1080 });
  const containerRef = useRef();

  // Progress bar
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

  // Resize
  useEffect(() => {
    const update = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Click handlers
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

  // Even spacing
  const getLinePoints = (A, B, N) => {
    if (!A || !B || N < 1) return [];
    return Array.from({ length: N }, (_, i) => {
      const t = N === 1 ? 0 : i / (N - 1);
      return {
        x: A.x + (B.x - A.x) * t,
        y: A.y + (B.y - A.y) * t,
      };
    });
  };

  // Download paths on Ctrl+Click
  const downloadTxt = (e) => {
    if (!e.ctrlKey) {
      alert("Hold CTRL while clicking to download.");
      return;
    }
    e.preventDefault();
    if (chains.length === 0) {
      alert("No paths to download yet!");
      return;
    }

    const starts = getLinePoints(baseStart, baseEnd, chains.length);
    const dStrings = chains.map((chainPts, idx) => {
      const pts = [starts[idx], ...chainPts];
      return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
    });

    const blob = new Blob([dStrings.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "paths.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const startPoints = getLinePoints(
    baseStart,
    baseEnd,
    chains.length + (isDrawing ? 1 : 0)
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center gap-4 min-h-screen bg-black text-white relative"
      onClick={handleClick}
      onContextMenu={handleContext}
    >
      {/* OG: FadingSquare + ProgressBar */}
      {/* <FadingSquare progress={progress} />
      <RetroProgressBar value={progress} className="w-96" /> */}

      {/* EGGHEAD exact */}
      <div
        className="absolute w-24 h-24 bg-green-500 border border-green-900 flex items-center justify-center text-black"
        style={{
          top: `272.5px`,
          left: `592.5px`,
          clipPath: `polygon(20% 20%,100% 0,80% 80%,0 100%)`,
          transform: `rotate(55deg) scale(2.7)`,
        }}
      >
        EGGHEAD
      </div>

      {/* Download Button */}
      <button
        onClick={downloadTxt}
        className="absolute bottom-4 left-4 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
      >
        Download Paths (CTRL+Click)
      </button>

      {/* SVG lines */}
      <svg
        className="absolute top-0 left-0"
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewport.w} ${viewport.h}`}
      >
        {/* Base */}
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

        {/* Chains */}
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

        {/* Current chain */}
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
    </div>
  );
}
