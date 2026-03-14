import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,

      setToken: (token) =>
        set({
          token,
        }),

      logout: () =>
        set({
          token: null,
        }),
    }),
    {
      name: "auth-storage",

      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);
