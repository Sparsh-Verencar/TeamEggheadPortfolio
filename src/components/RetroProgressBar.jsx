"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RetroProgressBar({ value, className }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (value >= 90) {
      const timer = setTimeout(() => {
        setHidden(true);
      }, 500); // wait half a second for dramatic effect

      return () => clearTimeout(timer);
    } else {
      setHidden(false); // if you ever reuse this bar
    }
  }, [value]);

  return (
    <motion.div
      className={`bg-black p-2 border-4 border-white inline-block ${className}`}
      style={{ imageRendering: "pixelated" }}
      animate={{ opacity: hidden ? 0 : 1, scale: hidden ? 0.8 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="bg-gray-800 p-1 border-2 border-green-500">
        <motion.div
          className="bg-green-500 h-6"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{
            boxShadow:
              "inset -4px -4px 0 #004400, inset 4px 4px 0 #00FF00",
          }}
        />
      </div>
      <p className="text-green-400 font-mono mt-2 text-center">
        {Math.floor(value)}%
      </p>
    </motion.div>
  );
}
