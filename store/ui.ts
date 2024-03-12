import { create } from "zustand";

type UIStore = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default useUIStore;
