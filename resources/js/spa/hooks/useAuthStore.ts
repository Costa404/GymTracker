// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
    isAuth: boolean;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            isAuth: false,
            login: () => set({ isAuth: true }),
            logout: () => set({ isAuth: false }),
        }),
        { name: "auth" }, // guarda no localStorage automaticamente
    ),
);
