"use client"
import { Button } from "@/components/ui/button";
import { motion } from "motion/react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
    <h1>Team Egghead</h1>
    <Button>Click</Button>
    <h1>Framer motion button below</h1>
      <motion.button 
        className="bg-amber-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => console.log('hover started!')}
      >hello</motion.button>
    </div>
  );
}
