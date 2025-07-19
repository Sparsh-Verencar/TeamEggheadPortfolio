"use client";

import Gmail from "@/components/Gmail";
import Folder from "@/components/react_bits/Components/Folder/Folder";
import WindowTaskBar from "@/components/WindowTaskBar";
import TargetCursor from "@/components/react_bits/Animations/TargetCursor/TargetCursor";
import DraggablePopup from "@/components/DraggablePopup";
import ProjectsPopup from "@/components/ProjectsPopup";
import { useState } from "react";
import AboutTeam from "@/components/AboutTeam";

export default function Home() {
  const [showMembersPopup, setShowMembersPopup] = useState(false);
  const [showProjectsPopup, setShowProjectsPopup] = useState(false);
  const [membersPopupKey, setMembersPopupKey] = useState(0);
  const [projectsPopupKey, setProjectsPopupKey] = useState(0);
const [showAboutTeamPopup, setShowAboutTeamPopup] = useState(false);
const [aboutTeamPopupKey, setAboutTeamPopupKey] = useState(0);



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


  return (
    <div className="relative w-screen h-screen flex flex-col items-start justify-center bg-gray-950">
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />

      <div className="h-[91vh] flex flex-col items-center justify-around pl-[2vw]">
        <div onClick={handleOpenMembers}>
          <Folder
            size={1}
            color="#F3F708"
            className="cursor-target custom-folder flex flex-col items-center justify-center"
            text="members"
          />
        </div>

        <div onClick={handleOpenProjects}>
          <Folder
            size={1}
            color="#F3F708"
            className="cursor-target custom-folder flex flex-col items-center justify-center"
            text="projects"
          />
        </div>
<div onClick = {handleAboutTeam}>
        <Folder
          size={1}
          color="#F3F708"
          className="cursor-target custom-folder flex flex-col items-center justify-center"
          text="About Team"
        />
        <Gmail />
        </div>
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
