// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
// useAuthStore.ts
interface AuthStore {
    isAuth: boolean;
    lastAuth: number | null; // timestamp
    login: () => void;
    logout: () => void;
    checkExpiry: () => void;
}

// useAuthStore.ts
const AUTH_EXPIRY_MINUTES = 180; // ← muda aqui, equivale ao teu .env

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            isAuth: false,
            lastAuth: null,
            login: () => set({ isAuth: true, lastAuth: Date.now() }),
            logout: () => set({ isAuth: false, lastAuth: null }),
            checkExpiry: () => {
                const { lastAuth, logout } = get();
                if (!lastAuth) return;
                const expiryMs = AUTH_EXPIRY_MINUTES * 60 * 1000;
                if (Date.now() - lastAuth > expiryMs) {
                    logout();
                }
            },
        }),
        { name: "auth" },
    ),
);
