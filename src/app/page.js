"use client"
import Gmail from "@/components/Gmail";
import Folder from "@/components/react_bits/Components/Folder/Folder";
import WindowTaskBar from "@/components/WindowTaskBar";

export default function Home() {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-gray-950">
    
      <Folder size={1} color="#F3F708" className="custom-folder"/>
      <Gmail/>
      <WindowTaskBar/>
    </div>
  );
}
