import useUIStore from "@/store/ui";
import clsx from "clsx";
import { createGrid } from "@/utils/grid";
import { Participant } from "@/types";
import MeetingParticipant from "../MeetingParticipant";

interface MobileGridProps {
  participantsToShow: Array<Participant>;
  totalParticipants: number;
}

const MobileGrid: React.FC<MobileGridProps> = ({
  participantsToShow,
  totalParticipants,
}) => {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <div className="md:hidden flex flex-col items-center justify-between gap-4 w-full h-[calc(100vh-100px)]">
      <div className="h-4/5 w-full">
        <MeetingParticipant participant={participantsToShow[0]} />
      </div>
      <div className="h-1/5 w-full">
        <div className="overflow-x-auto flex gap-4 min-w-full h-full p-2">
          {participantsToShow.slice(1).map((participant) => (
            <div className="h-32 min-w-[128px]" key={participant.id}>
              <MeetingParticipant participant={participant} />
            </div>
          ))}
          {totalParticipants > 49 && (
            <div className="h-32 min-w-[128px]">
              <button
                className="flex flex-col items-center justify-center text-white rounded overflow-hidden w-full bg-slate-400/10 ring ring-slate-800 h-full"
                onClick={toggleSidebar}
              >
                +{totalParticipants - 49}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileGrid;
