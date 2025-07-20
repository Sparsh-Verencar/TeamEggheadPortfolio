"use client"
import Gmail from "@/components/Gmail";
import Folder from "@/components/react_bits/Components/Folder/Folder";
import WindowTaskBar from "@/components/WindowTaskBar";
import TargetCursor from "@/components/react_bits/Animations/TargetCursor/TargetCursor";
import FadingSquare from "@/components/FadingSquare";
import Loading from "./loading";
import Spline from '@splinetool/react-spline';
import DraggablePopup from "@/components/DraggablePopup";
import ProjectsPopup from "@/components/ProjectsPopup";
import AboutTeam from "@/components/AboutTeam";

import { useState, useEffect } from "react";

export default function Home() {
  // Loading state
  const [showContent, setShowContent] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Popup states
  const [showMembersPopup, setShowMembersPopup] = useState(false);
  const [showProjectsPopup, setShowProjectsPopup] = useState(false);
  const [showAboutTeamPopup, setShowAboutTeamPopup] = useState(false);
  const [membersPopupKey, setMembersPopupKey] = useState(0);
  const [projectsPopupKey, setProjectsPopupKey] = useState(0);
  const [aboutTeamPopupKey, setAboutTeamPopupKey] = useState(0);

  // Loading animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 80) {
          return prev + 1;
        } else if (prev < 100) {
          return prev + 0.3; // 🐌 Super slo-mo
        } else {
          return 100;
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 7000); // Match your loading duration

    return () => clearTimeout(timer);
  }, []);

  const handleOpenMembers = () => {
    setMembersPopupKey(prev => prev + 1);
    setShowMembersPopup(true);
  };

  const handleOpenProjects = () => {
    setProjectsPopupKey(prev => prev + 1);
    setShowProjectsPopup(true);
  };

  const handleAboutTeam = () => {
    setAboutTeamPopupKey(prev => prev + 1);
    setShowAboutTeamPopup(true);
  };

  if (!showContent) {
    return <Loading />; // Show animation while waiting
  }

  return (
    <div className="relative w-screen h-screen flex items-between justify-between bg-gray-950" suppressHydrationWarning>
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      
      <div className="h-[91vh] flex flex-col items-center justify-around pl-[2vw]">
        <div onClick={handleOpenMembers}>
          <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="members" />
        </div>
        
        <div onClick={handleOpenProjects}>
          <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="projects" />
        </div>
        
        <div onClick={handleAboutTeam}>
          <Folder size={1} color="#F3F708" className="cursor-target custom-folder flex flex-col items-center justify-center" text="About Team" />
        </div>
        
        <Gmail />
      </div>
      
      <div className="w-[60vw] h-full">
        <Spline
          scene="https://prod.spline.design/qPvDC6ECtPlXnOaq/scene.splinecode"
          className="w-10 h-full"
        />
      </div>
      
      <WindowTaskBar />

      {showMembersPopup && (
        <DraggablePopup
          key={membersPopupKey}
          onClose={() => setShowMembersPopup(false)}
        />
      )}
      
      {showProjectsPopup && (
        <ProjectsPopup
          key={projectsPopupKey}
          onClose={() => setShowProjectsPopup(false)}
        />
      )}
      
      {showAboutTeamPopup && (
        <AboutTeam
          key={aboutTeamPopupKey}
          onClose={() => setShowAboutTeamPopup(false)}
        />
      )}
    </div>
  );
}