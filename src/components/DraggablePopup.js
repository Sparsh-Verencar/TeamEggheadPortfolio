"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import ProfileCard from "@/components/react_bits/ProfileCard/ProfileCard";
import { useState } from "react";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import Particles from "@/components/react_bits/Particles/Particles";

const cards = [
  {
    name: "Shivank",
    handle: "shivank",
    title: "Backend Engineer",
    status: "LinkedIn",
    avatarUrl: "",
    bio: "Hi, I am Shivank. Age 20, Third Year IT student studying in Goa Engineering College. Currently the back end developer of Team Egghead. I help my team with server sided functionalities and help resolve various errors in projects.",
    linkedIn: "https://www.linkedin.com/in/shivank-kuncolienkar-47077135b/", // ✅ Add real URL here
  },
  {
    name: "Suyash",
    handle: "suyash",
    title: "Frontend Designer",
    status: "LinkedIn",
    avatarUrl: "",
    bio: "Greetings, Suyash here. Age 20, a Third Year IT in Goa Engineering College. I am a Front End developer for the Team Egghead. I suggest ideas and make beautiful designs for websites. Also good in hardware related stuff like micro controller and have played key role in college project",
    linkedIn: "https://www.linkedin.com/in/suyash-khobrekar-568289280/", // ✅ Add real URL here
  },
  {
    name: "Sparsh",
    handle: "sparsh",
    title: "Frontend Engineer",
    status: "LinkedIn",
    avatarUrl: "",
    bio: "Sparsh Verencar appreciates your visit. My age is 20, a Third Year IT student in Goa Engineering College. Leader and the main Front End Developer of Team EggHead. I have learnt Generative Ai and I guide my team through many hackathons.",
    linkedIn: "https://www.linkedin.com/in/sparsh-verencar/", // ✅ Add real URL here
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
      className="fixed top-10 left-60 z-50  p-4 md:p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-zinc-700 dark:bg-zinc-900 overflow-hidden backdrop-blur-2xl scale-90 sm:scale-75 "
    >
      {/* Particles Background */}
      <div className="absolute inset-0 z-0 ">
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
      <div className="relative z-10 ">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Team Members</h2>
          <button
            onClick={() => setVisible(false)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5 text-red-500" />
          </button>
        </div>

        {selectedCard ? (
          // Single Profile View
          <div className="flex flex-col md:flex-row gap-5 items-center">
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

            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold mb-2 text-white">
                About {selectedCard.name}
              </h3>
              <TextGenerateEffect className="text-white" words={selectedCard.bio} />

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
    onClick={(e) => {
      // If the actual clicked element is the "Contact" button:
      if (
        e.target.innerText === "Contact" || 
        (e.target ).closest("button")?.innerText === "Contact"
      ) {
        window.open(card.linkedIn, "_blank", "noopener,noreferrer");
        return;
      }

      // Otherwise, show the detailed profile
      setSelectedCard(card);
    }}
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
