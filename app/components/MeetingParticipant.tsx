import { Participant } from "@/types";
import clsx from "clsx";
import { IoPersonOutline } from "react-icons/io5";

interface IMeetingParticipantProps {
  participant: Participant;
}

const MeetingParticipant: React.FC<IMeetingParticipantProps> = ({
  participant,
}) => {
  return (
    <div
      className={clsx(
        "relative flex flex-col items-center justify-center text-white rounded overflow-hidden h-full w-full ring-2",
        participant.audio ? "ring-blue-500" : "ring-slate-800",
      )}
      data-testid="participant"
    >
      <div className="flex-1 flex items-center justify-center w-full bg-slate-400/10">
        {participant.video ? (
          <video
            src="/sample-5s.mp4"
            className="h-full aspect-video"
            autoPlay
            muted
            loop
          />
        ) : (
          <IoPersonOutline className="h-1/4 w-full" />
        )}
      </div>
      <div className="md:text-xs lg:text-lg text-right w-full absolute bottom-0 right-1">
        {participant.name}
      </div>
    </div>
  );
};
export default MeetingParticipant;
