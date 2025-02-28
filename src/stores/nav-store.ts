import { create } from 'zustand'

interface NavState {
  openItems: Record<string, boolean>
  setOpenItems: (items: Record<string, boolean>) => void
  updateOpenItem: (title: string, isOpen: boolean) => void
}

export const useNavStore = create<NavState>((set) => ({
  openItems: {},
  setOpenItems: (items) => set({ openItems: items }),
  updateOpenItem: (title, isOpen) =>
    set((state) => ({
      openItems: {
        ...state.openItems,
        [title]: isOpen
      }
    }))
}))
