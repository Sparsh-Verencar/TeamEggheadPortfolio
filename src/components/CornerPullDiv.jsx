"use client";

import { motion } from "framer-motion";

export default function CornerPullDiv() {
  return (
    <motion.div
      style={{
        width: "300px",
        height: "300px",
        backgroundColor: "#3B82F6",
        clipPath: `polygon(
          20px 0%,      /* Pull top-left corner inward */
          100% 0%,
          100% calc(100% - 20px), /* Pull bottom-right corner inward */
          calc(100% - 20px) 100%,
          0% 100%,
          0% 20px
        )`
      }}
    />
  );
}
