import useUIStore from "@/store/ui";
import clsx from "clsx";
import { createGrid } from "@/utils/grid";
import { Participant } from "@/types";

interface ITabletGridProps {
  participantsToShow: Array<Participant>;
  totalParticipants: number;
}

const TabletGrid: React.FC<ITabletGridProps> = ({
  participantsToShow,
  totalParticipants,
}) => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  const grid = createGrid(
    participantsToShow,
    totalParticipants,
    toggleSidebar,
    6,
  );

  return (
    <div
      className={clsx(
        "hidden lg:hidden md:flex flex-col items-center justify-center gap-4 w-full h-[calc(100vh-100px)]",
        {
          "w-[calc(100vw-320px)]": isSidebarOpen,
        },
      )}
    >
      {grid}
    </div>
  );
};

export default TabletGrid;
