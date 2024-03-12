import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoVideocamOff, IoVideocam, IoMic, IoMicOff } from "react-icons/io5";
import useParticipantsStore from "@/store/participants";
import { Participant } from "@/types";
import clsx from "clsx";

interface SidebarParticipantProps {
  participant: Participant;
  hideControls?: boolean;
}

const SidebarParticipant: React.FC<SidebarParticipantProps> = ({
  participant,
  hideControls = false,
}) => {
  const updateParticipantAudio = useParticipantsStore(
    (state) => state.updateParticipantAudio,
  );
  const updateParticipantVideo = useParticipantsStore(
    (state) => state.updateParticipantVideo,
  );
  const removeParticipant = useParticipantsStore(
    (state) => state.removeParticipant,
  );

  const { name, video, audio, id } = participant;

  const handleToggleVideo = () => {
    updateParticipantVideo(id, !video);
  };

  const handleToggleAudio = () => {
    updateParticipantAudio(id, !audio);
  };

  const handleRemoveParticipant = () => {
    removeParticipant(id);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="text-base italic flex-1">{name}</div>
      {!hideControls && (
        <div className="flex items-center justify-center gap-2">
          <button
            className={clsx(
              "w-8 h-8 rounded-full p-1 flex items-center justify-center",
              {
                "bg-red-500 text-white": !video,
                "bg-gray-200": video,
              },
            )}
            onClick={handleToggleVideo}
          >
            {video ? <IoVideocam /> : <IoVideocamOff />}
          </button>
          <button
            className={clsx(
              "w-8 h-8 rounded-full p-1 flex items-center justify-center",
              {
                "bg-red-500 text-white": !audio,
                "bg-gray-200": audio,
              },
            )}
            onClick={handleToggleAudio}
          >
            {audio ? <IoMic /> : <IoMicOff />}
          </button>
          <button
            className="w-8 h-8 rounded-full p-1 flex items-center justify-center bg-red-500 text-white"
            onClick={handleRemoveParticipant}
          >
            <MdDeleteForever />
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarParticipant;
