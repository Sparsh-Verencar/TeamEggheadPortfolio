"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import ProfileCard from "@/components/react_bits/ProfileCard/ProfileCard";
import { useState } from "react";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import Particles from "@/components/react_bits/Particles/Particles"; // Make sure the path is correct

const cards = [
  {
    name: "Shivank",
    handle: "javicodes",
    title: "Backend Engineer",
    avatarUrl: "",
  },
  {
    name: "Suyash",
    handle: "nehaspace",
    title: "Frontend Designer",
    avatarUrl: "",
  },
  {
    name: "Sparsh",
    handle: "marcusdev",
    title: "Frontend Engineer",
    avatarUrl: "",
  },
];

export default function DraggablePopup() {
  const [visible, setVisible] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  if (!visible) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{ top: -100, bottom: 800, left: -100, right: 1000 }}
      className="fixed top-24 left-6 z-50 backdrop-blur-lg p-4 md:p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 w-50px  dark:bg-zinc-900 overflow-hidden bg-transparent"
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
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Team Members
          </h2>
          <button
            onClick={() => setVisible(false)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedCard ? (
          // Single Profile View
          <div className="flex flex-col md:flex-row gap-5 items-center">
            {/* Left: Large Avatar */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={
                  selectedCard.avatarUrl ||
                  `https://api.dicebear.com/8.x/micah/svg?seed=${encodeURIComponent(
                    selectedCard.name
                  )}`
                }
                alt={selectedCard.name}
                className="rounded-xl w-64 h-64 object-cover"
              />
            </div>

            {/* Right: Generated Text */}
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-zinc-100">
                About {selectedCard.name}
              </h3>
              <TextGenerateEffect
                words={`Meet ${selectedCard.name}, a passionate ${selectedCard.title}. Always excited to collaborate, innovate, and solve meaningful problems with their team.`}
              />
              <button
                onClick={() => setSelectedCard(null)}
                className="mt-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm"
              >
                ← Go Back
              </button>
            </div>
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="scale-[0.7] transition-transform hover:scale-75 cursor-pointer"
                onClick={() => setSelectedCard(card)}
              >
                <ProfileCard {...card} />
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
