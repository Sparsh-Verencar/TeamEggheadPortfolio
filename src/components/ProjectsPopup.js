"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Particles from "@/components/react_bits/Particles/Particles";
import ChromaGrid from "@/components/react_bits/ChromaGrid/ChromaGrid";

const projects = [
  {
    name: "CPLUSPLUS",
    title: "Front End Project, developed by Sparsh",
    image: "/images/Screenshot 2025-07-19 211719.png",
    deployUrl: "https://67e04a2ff49d028d9dfbb4c3--cplusplusapp.netlify.app/"
  },
  {
    name: "Hackathon Marcel",
    title: "Developed by Team Egghead",
    image: "/images/Screenshot 2025-07-19 233122.png",
    deployUrl: "https://github.com/AldeBaraN59/HackHazard-EggHead-"
  },
  {
    name: "IIT Goa Hackathon",
    title: "Group Effort, Team Egghead",
    image: "/images/Screenshot 2025-07-19 233230.png",
    deployUrl: "https://github.com/Sparsh-Verencar/Egghead-Uno-"
  },
];

export default function ProjectPopup() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  // ChromaGrid items converted from project list
  const chromaItems = projects.map((project) => ({
    image: project.image,
    title: project.name,
    subtitle: project.title,
    handle: "Deploy",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: project.deployUrl,
  }));

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ top: -100, bottom: 800, left: -100, right: 1000 }}
      className="fixed top-20 left-3 z-50 p-4 md:p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 h-120 w-[120vw] md:w-[70vw]"
    >
      {/* Background Particles */}
      <div className="relative z-10 flex flex-col space-y-4">
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="relative mb-4 h-7">
            <h2 className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-white">
              Our Projects
            </h2>
            <button
              onClick={() => setVisible(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5 text-red-500" />
            </button>
          </div>

          {/* Card Grid with Chroma Effect */}
          <div style={{ height: "400px" }}>
            <ChromaGrid
              items={chromaItems}
              radius={300}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
