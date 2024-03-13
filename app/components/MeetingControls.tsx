"use client";
import useParticipantsStore from "@/store/participants";
import useUIStore from "@/store/ui";
import { CURRENT_USER } from "@/utils/constants";
import clsx from "clsx";
import React, { useState } from "react";
import { IoMic, IoMicOff, IoVideocam, IoVideocamOff } from "react-icons/io5";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

interface MeetingControlsProps {
  onCameraToggle?: () => void;
  onAudioToggle?: () => void;
  onLeaveMeeting?: () => void;
}

const MeetingControls: React.FC<MeetingControlsProps> = ({}) => {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);
  const updateParticipantAudio = useParticipantsStore(
    (state) => state.updateParticipantAudio,
  );
  const updateParticipantVideo = useParticipantsStore(
    (state) => state.updateParticipantVideo,
  );

  const handleToggleVideo = () => {
    updateParticipantVideo(0, !currentUser.video);
    setCurrentUser((user) => ({ ...user, video: !user.video }));
  };

  const handleToggleAudio = () => {
    updateParticipantAudio(0, !currentUser.audio);
    setCurrentUser((user) => ({ ...user, audio: !user.audio }));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-2 px-8 flex justify-center gap-4 items-center">
      <button
        className={clsx(
          "w-8 h-8 rounded-full p-1 flex items-center justify-center",
          {
            "bg-red-500 text-white": !currentUser.video,
            "bg-gray-200": currentUser.video,
          },
        )}
        onClick={handleToggleVideo}
      >
        {currentUser.video ? <IoVideocam /> : <IoVideocamOff />}
      </button>
      <button
        className={clsx(
          "w-8 h-8 rounded-full p-1 flex items-center justify-center",
          {
            "bg-red-500 text-white": !currentUser.audio,
            "bg-gray-200": currentUser.audio,
          },
        )}
        onClick={handleToggleAudio}
      >
        {currentUser.audio ? <IoMic /> : <IoMicOff />}
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={toggleSidebar}
      >
        <TbLayoutSidebarLeftCollapse />
      </button>
    </div>
  );
};

export default MeetingControls;
