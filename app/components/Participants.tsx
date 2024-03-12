"use client";
import useParticipantsStore from "@/store/participants";
import useUIStore from "@/store/ui";
import { Participant } from "@/types";
import { CURRENT_USER, MAX_PARTICIPANTS } from "@/utils/constants";
import { createGrid } from "@/utils/grid";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { useMemo } from "react";

const Participants = () => {
  const participants = useParticipantsStore((state) => state.participants);
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  const { bothAudioVideoOn, audioOrVideoOn, others } = useMemo(() => {
    const bothAudioVideoOn: Array<Participant> = [];
    const audioOrVideoOn: Array<Participant> = [];
    const others: Array<Participant> = [];
    participants.forEach((participant) => {
      if (participant.audio && participant.video) {
        bothAudioVideoOn.push(participant);
      } else if (participant.audio || participant.video) {
        audioOrVideoOn.push(participant);
      } else {
        others.push(participant);
      }
    });
    return {
      bothAudioVideoOn,
      audioOrVideoOn,
      others,
    };
  }, [participants]);

  const MAX_PARTICIPANTS_TO_SHOW = MAX_PARTICIPANTS - 1;

  const bothAudioVideoOnParticipants = bothAudioVideoOn.slice(
    0,
    MAX_PARTICIPANTS_TO_SHOW,
  );
  const audioOrVideoOnParticipants = audioOrVideoOn.slice(
    0,
    MAX_PARTICIPANTS_TO_SHOW - bothAudioVideoOnParticipants.length,
  );
  const otherParticipants = others.slice(
    0,
    MAX_PARTICIPANTS_TO_SHOW -
      bothAudioVideoOnParticipants.length -
      audioOrVideoOnParticipants.length,
  );

  const participantsToShow = createGrid(
    bothAudioVideoOnParticipants,
    audioOrVideoOnParticipants,
    otherParticipants,
    CURRENT_USER,
  );

  return (
    <div
      className={clsx("grid gap-4 w-full h-full pt-8", {
        "w-[calc(100vw-320px)]": isSidebarOpen,
      })}
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      }}
    >
      {participantsToShow.map((participant) => (
        <Transition
          show={true}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          key={participant.id}
          appear={true}
        >
          <div className="col-span-1 bg-white text-black rounded-sm">
            {participant.name}
          </div>
        </Transition>
      ))}

      {participants.length > 49 && (
        <div className="col-span-1">+{participants.length - 49}</div>
      )}
    </div>
  );
};

export default Participants;
