import { create } from "zustand";
import { persist } from "zustand/middleware";
import { router } from "@inertiajs/react";
import { WorkoutStore } from "@/types";

const useWorkoutStore = create<WorkoutStore>()(
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

            handleStart: (type, id = null) => {
                set({ isStarting: true });

                router.post(
                    "/workouts/start",
                    { type, template_id: id },
                    {
                        onSuccess: () => set({ isStarting: false }),
                        onError: () => set({ isStarting: false }),
                    },
                );
            },
        }),
        {
            name: "gym-tracker-storage",
            // Gravamos apenas o selectedIndex para o utilizador voltar onde estava
            partialize: (state) => ({ selectedIndex: state.selectedIndex }),
        },
    ),
);

export default useWorkoutStore;
