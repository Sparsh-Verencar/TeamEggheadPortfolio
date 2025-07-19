"use client"
import Gmail from "@/components/Gmail";
import Folder from "@/components/react_bits/Components/Folder/Folder";
import WindowTaskBar from "@/components/WindowTaskBar";
import TargetCursor from "@/components/react_bits/Animations/TargetCursor/TargetCursor";

export default function Home() {
  return (
    <div className="relative w-screen h-screen flex flex-col items-start justify-center bg-gray-950">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      <div className="h-[91vh] flex flex-col items-center justify-around pl-[2vw]">
        <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="members" 
        />
        <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="projects" />
        <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="About Team" />
        <Gmail />
      </div>
      <WindowTaskBar />
    </div>
  );
}
