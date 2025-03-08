import { User } from "@/services/swagger-types";
import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  removeUser: () => void;
}

const persistAuthMiddleware = (
  config: StateCreator<AuthState, [], [["zustand/persist", AuthState]]>,
) => {
  return persist(config, {
    name: "auth",
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage: () => (state) => {
      console.log("hydrated state:", state);
    },
  });
};

export const useAuthStore = create<AuthState>()(
  persistAuthMiddleware((set) => ({
    user: null,
    setUser: (user: User | null) => {
      set({ user });
    },
    removeUser: () => {
      set({ user: null });
    },
  })),
);
