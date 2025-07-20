"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import Particles from "@/components/react_bits/Particles/Particles";
import ShinyText from "@/components/react_bits/ShinyText/ShinyText"

export default function AboutTeam() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ top: -100, bottom: 800, left: -100, right: 1000 }}
      className="fixed top-10 left-60 z-50 p-4 md:p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 overflow-hidden backdrop-blur-2xl h-150 scale-90 sm:scale-75"
    >
      {/* Particles Background */}
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white"></h2>
          <button
            onClick={() => setVisible(false)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5 text-red-500" />
          </button>
        </div>

<div className="flex flex-col md:flex-row gap-5 items-start">
  {/* LEFT SIDE */}
  <div className="w-full md:w-1/2 flex flex-col items-center">
    <img
      src="/images/WhatsApp%20Image%202025-07-20%20at%202.48.06%20AM.jpeg"
      alt="Team Egghead"
      className="rounded-xl w-100 h-80 object-cover border border-white"
    />
    <div className="mt-[90px] text-5xl">
      <ShinyText
        text="Team EggHead"
        disabled={false}
        speed={3}
        className="custom-class"
      />
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="w-full md:w-1/2">
    <h3 className="text-xl font-semibold mb-2 text-white">WE ARE EGGHEADS!!!</h3>
     <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
    <TextGenerateEffect
      className="text-white"
      words="Team Egghead, a passionate group of engineers from Goa Engineering College. Egghead was founded during the second year's when hackathons were more prevalent and necessity of knowing modern world was greatly deliberated on. Our group mainly focuses on making fantastic looking websites with back end integration. Team EggHead seeks to provide quality web designs to the customer. We are recently working on automation based on Generative Ai and shall use it in future projects once our knowledge capabilities are set. Speaking of team, Sparsh is our leader and he introduces us to these hackathons and various technologies. Speaking of team members,

      Sparsh has done lot of front end projects and has even prize in one of the hackathons. Suyash, is our front end developer and he provides us beautiful ideas on project designs. His success exceeds to the hardware like micro controllers and has greatly supported us in college projects. Shivank looks after the backend of the projects. Many functionalities were possibly due to his assistance. He has also provided immense help in figuring out errors in project codes and fetching sources related to backend. "
    />
    </div>
  </div>
</div>


      </div>
    </motion.div>
  );
}
