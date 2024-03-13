import useUIStore from "@/store/ui";
import clsx from "clsx";
import { createGrid } from "@/utils/grid";
import { Participant } from "@/types";

interface IDesktopGridProps {
  participantsToShow: Array<Participant>;
  totalParticipants: number;
}

const DesktopGrid: React.FC<IDesktopGridProps> = ({
  participantsToShow,
  totalParticipants,
}) => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  const grid = createGrid(participantsToShow, totalParticipants, toggleSidebar);

  return (
    <div
      className={clsx(
        "hidden lg:flex flex-col items-center justify-center gap-4 h-[calc(100vh-100px)]",
        isSidebarOpen ? "w-[calc(100vw-320px)]" : "w-full",
      )}
    >
      {grid}
    </div>
  );
};

export default DesktopGrid;
