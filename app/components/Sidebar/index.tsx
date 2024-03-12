"use client";
import React, { Fragment, useMemo } from "react";
import { Transition } from "@headlessui/react";
import { IoMdPersonAdd } from "react-icons/io";
import useParticipantsStore from "@/store/participants";
import useUIStore from "@/store/ui";
import Button from "../Button";
import SidebarParticipant from "./SidebarParticipant";
import SidebarPagination from "./SidebarPagination";

const Sidebar: React.FC = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const participants = useParticipantsStore((state) => state.participants);
  const addParticipant = useParticipantsStore((state) => state.addParticipant);
  const [currentPage, setCurrentPage] = React.useState(0);

  const paginatedParticipantsList = useMemo(
    () => participants.slice(currentPage * 10, currentPage * 10 + 10),
    [participants, currentPage],
  );

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
      <div className="w-72 bg-white text-black p-2 rounded-xl h-[calc(100vh-64px)] fixed top-1 right-1 flex flex-col">
        <button
          onClick={toggleSidebar}
          className="absolute top-1 right-2 text-2xl border rounded-full flex items-center justify-center h-8 w-8"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold">Control Panel</h2>
        <Button
          text="Add New"
          icon={<IoMdPersonAdd />}
          onClick={addParticipant}
          size="small"
          className="my-8 w-fit"
        />
        <div className="flex flex-col justify-between gap-3 flex-1 pb-4">
          <h3 className="text-lg font-bold">Participants</h3>
          <div className="flex flex-col gap-3 mb-8 flex-1">
            {paginatedParticipantsList.map((participant) => (
              <SidebarParticipant
                key={participant.id}
                participant={participant}
              />
            ))}
          </div>
          <SidebarPagination
            currentPage={currentPage}
            totalPages={Math.floor(participants.length % 10)}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </Transition>
  );
};

export default Sidebar;
