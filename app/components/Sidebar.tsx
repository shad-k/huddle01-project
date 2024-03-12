"use client";
import React, { Fragment } from "react";
import useParticipantsStore from "@/store/participants";
import useUIStore from "@/store/ui";
import { Transition } from "@headlessui/react";

const Sidebar: React.FC = () => {
  // const participants = useParticipantsStore(state => state.participants);
  // const toggleVideo = useParticipantsStore(state => state.toggleVideo);
  // const toggleAudio = useParticipantsStore(state => state.toggleAudio);
  // const leaveMeeting = useParticipantsStore(state => state.leaveMeeting);

  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <Transition
      show={isSidebarOpen}
      enter="transform transition ease-in-out duration-500"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition ease-in-out duration-500"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
      appear={true}
      as={Fragment}
    >
      <div className="w-72 bg-white text-black p-1 rounded-xl h-[calc(100vh-64px)] fixed top-1 right-1">
        <button
          onClick={toggleSidebar}
          className="absolute top-1 right-2 text-2xl border rounded-full flex items-center justify-center h-8 w-8"
        >
          &times;
        </button>
        <h2>Participants</h2>
      </div>
    </Transition>
  );
};

export default Sidebar;
