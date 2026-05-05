import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WorkoutStore } from "@/types";
import { db } from "@/spa/db"; // Importa a tua base de dados Dexie
import { useWorkoutSessionStore } from "./SessionStore/useWorkoutSessionStore"; // Para ativar a sessão

export const useWorkoutStore = create<WorkoutStore>()(
    persist(
        (set) => ({
            selectedIndex: 0,
            templates: [],
            isStarting: false,

            setTemplates: (templates) => set({ templates }),

            next: () =>
                set((state) => ({
                    selectedIndex:
                        state.templates.length > 0
                            ? (state.selectedIndex + 1) % state.templates.length
                            : 0,
                })),

            prev: () =>
                set((state) => ({
                    selectedIndex:
                        state.templates.length > 0
                            ? (state.selectedIndex -
                                  1 +
                                  state.templates.length) %
                              state.templates.length
                            : 0,
                })),

            // Adicionamos o 'navigate' como 3º parâmetro
            handleStart: async (type, id = null, navigate) => {
                set({ isStarting: true });

                try {
                    const now = new Date().toISOString();

                    // 1. Cria a sessão no Dexie exatamente com a estrutura do Laravel
                    const newSessionId = await db.workouts.add({
                        name: type, // Ex: "Push Day"
                        duration_seconds: null,
                        completed_at: null,
                        created_at: now,
                        updated_at: now,
                        synced: 0, //
                    });

                    // 2. Avisa o resto da app que há um treino a decorrer
                    useWorkoutSessionStore.setState({
                        activeSessionId: Number(newSessionId),
                    });

                    set({ isStarting: false });

                    // 3. Muda de página suavemente com o React Router
                    if (navigate) {
                        navigate("/workout/session");
                    }
                } catch (error) {
                    console.error("Erro ao iniciar treino no Dexie:", error);
                    set({ isStarting: false });
                }
            },
        }),
        {
            name: "gym-tracker-storage",
            // Só guardamos o selectedIndex, não precisamos de guardar o isStarting nem os templates aqui
            partialize: (state) => ({ selectedIndex: state.selectedIndex }),
        },
    ),
);
