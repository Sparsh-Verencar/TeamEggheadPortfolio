"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FadingSquare({ progress }) {
  const [finalMove, setFinalMove] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setFinalMove(true);
      }, 1000); // wait 1 second after completion

      return () => clearTimeout(timer);
    } else {
      setFinalMove(false);
    }
  }, [progress]);

  // shift only when finalMove is true
  const shift = finalMove ? 20 : 0;

  return (
    <motion.div
      className="w-24 h-24 bg-green-500 border border-green-900 flex items-center justify-center text-black opacity-0"
      animate={{
        opacity: progress >= 90 ? (progress - 90) / 10 : 0,
        clipPath: `polygon(
          ${0 + shift}% ${0 + shift}%,
          100% 0%,
          ${100 - shift}% ${100 - shift}%,
          0% 100%
        )`,
        rotate: finalMove ? 55 : 0,
        x: finalMove ? 180 : 0,
        y: finalMove ? 50 : 0,
        scale: finalMove ? 2 : 1,  // 🔑 Keep scale at 1 until final!
      }}
      transition={{
        duration: 0.9,
        type: "spring",
        stiffness: 60,
      }}
    >
      <motion.h4
        animate={{
          opacity: progress >= 90 ? (progress - 90) / 10 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        EGGHEAD
      </motion.h4>
    </motion.div>
  );
}
