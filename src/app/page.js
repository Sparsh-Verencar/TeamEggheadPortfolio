"use client"
import Folder from "@/components/react_bits/Components/Folder/Folder";
import { Button } from "@/components/ui/button";
import WindowTaskBar from "@/components/WindowTaskBar";
import { motion } from "motion/react"

export default function Home() {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-gray-950">
    
      <Folder/>
      <WindowTaskBar/>
    </div>
  );
}
