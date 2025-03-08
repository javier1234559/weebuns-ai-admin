import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";
import { StateCreator } from "zustand";

interface NavState {
  openItems: Record<string, boolean>;
  setOpenItems: (items: Record<string, boolean>) => void;
  updateOpenItem: (title: string, isOpen: boolean) => void;
}

const persistNavMiddleware = (
  config: StateCreator<NavState, [], [["zustand/persist", NavState]]>,
) => {
  return persist(config, {
    name: "nav",
    storage: createJSONStorage(() => localStorage),
  });
};

export const useNavStore = create<NavState>()(
  persistNavMiddleware((set) => ({
    openItems: {},
    setOpenItems: (items: Record<string, boolean>) => set({ openItems: items }),
    updateOpenItem: (title: string, isOpen: boolean) =>
      set((state: NavState) => ({
        openItems: {
          ...state.openItems,
          [title]: isOpen,
        },
      })),
  })),
);
