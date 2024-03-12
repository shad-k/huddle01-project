"use client";
import useParticipantsStore from "@/store/participants";

const Participants = () => {
  const participants = useParticipantsStore((state) => state.participants);

  const activeSpeaker = participants.find(
    (participant) => participant.priority === 3,
  );
  const participantsWithAudioAndVideo = participants.filter(
    (participant) => participant.priority === 2,
  );
  const participantsWithAudioOrVideo = participants.filter(
    (participant) => participant.priority === 1,
  );
  const currentUser = participants.find(
    (participant) => participant.priority === 1 && participant.isCurrentUser,
  );
  const otherParticipants = participants.filter(
    (participant) => participant.priority === 0,
  );

  const allParticipants = [
    activeSpeaker,
    ...participantsWithAudioAndVideo,
    ...participantsWithAudioOrVideo,
    currentUser,
    ...otherParticipants,
  ];

  const participantsToShow = allParticipants.slice(0, 49);

  return (
    <div className="grid grid-cols-7 gap-4 w-full h-full">
      {participantsToShow.map((participant) => (
        <div
          key={participant.id}
          className="col-span-1 bg-white text-black rounded-sm"
        >
          {participant.name}
        </div>
      ))}

      <div className="col-span-1">{allParticipants.length - 49}</div>
    </div>
  );
};

export default Participants;
