import MeetingParticipant from "@/app/components/MeetingParticipant";
import { Participant } from "@/types";

/**
 * Create a grid of participants.
 * @param participants - Array of participants
 * @param totalParticipants - Total number of participants
 * @param toggleSidebar - Function to toggle the sidebar
 * @param maxInRow - Maximum number of participants in a row when the number of participants are higher than 10
 * @returns JSX.Element - Grid of participants
 */
export const createGrid = (
  participants: Array<Participant>,
  totalParticipants: number,
  toggleSidebar: () => void,
  maxInRow: number = 7,
) => {
  if (participants.length === 2) {
    return (
      <div
        className="flex items-center justify-center gap-4 w-full"
        style={{ height: "100%" }}
      >
        <div className="h-full" style={{ width: "50%" }}>
          <MeetingParticipant participant={participants[0]} />
        </div>
        <div className="h-full" style={{ width: "50%" }}>
          <MeetingParticipant participant={participants[1]} />
        </div>
      </div>
    );
  }
  const grid = [];
  const participantsLength = participants.length;
  if (participantsLength <= 10) {
    let mid = Math.floor(participantsLength / 2);
    if (participantsLength % 2 !== 0) {
      mid += 1;
    }

    let i = 0;
    while (i < participantsLength) {
      const row = [];
      for (let j = 0; j < mid; j++) {
        if (i >= participantsLength) break;
        row.push(
          <div
            className="h-full"
            style={{ width: `${100 / mid}%` }}
            key={participants[i].id}
          >
            <MeetingParticipant participant={participants[i]} />
          </div>,
        );
        i++;
      }
      const rowJSX = row;
      grid.push(rowJSX);
    }
  } else {
    let i = 0;
    while (i < participantsLength) {
      const row = [];
      for (let j = 0; j < maxInRow; j++) {
        if (i >= participantsLength) break;
        row.push(
          <div
            className="h-full"
            style={{ width: `${100 / maxInRow}%` }}
            key={participants[i].id}
          >
            <MeetingParticipant participant={participants[i]} />
          </div>,
        );
        i++;
      }
      const rowJSX = row;
      grid.push(rowJSX);
    }
  }

  return grid.map((row, index) => {
    return (
      <div
        className="flex items-center justify-center gap-4 w-full"
        key={index}
        style={{
          height: `calc(${100 / grid.length}% - 16px)`,
        }}
      >
        {row}
        {index === grid.length - 1 && totalParticipants > 49 && (
          <div className="h-full" style={{ width: `${100 / maxInRow}%` }}>
            <button
              className="flex flex-col items-center justify-center text-white rounded overflow-hidden w-full bg-slate-400/10 ring ring-slate-800 h-full"
              onClick={toggleSidebar}
            >
              +{totalParticipants - 49}
            </button>
          </div>
        )}
      </div>
    );
  });
};
