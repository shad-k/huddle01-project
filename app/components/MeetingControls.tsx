"use client";
import useUIStore from "@/store/ui";
import React from "react";

interface MeetingControlsProps {
  onCameraToggle?: () => void;
  onAudioToggle?: () => void;
  onLeaveMeeting?: () => void;
}

const MeetingControls: React.FC<MeetingControlsProps> = ({}) => {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-2 flex justify-center items-center">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={toggleSidebar}
      >
        Toggle Sidebar
      </button>
      {/* <button
        className="mr-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={onCameraToggle}
      >
        Toggle Camera
      </button>
      <button
        className="mr-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={onAudioToggle}
      >
        Toggle Audio
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={onLeaveMeeting}
      >
        Leave Meeting
      </button> */}
    </div>
  );
};

export default MeetingControls;
