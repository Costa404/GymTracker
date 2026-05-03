// useWorkoutSessionStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createTimerSlice } from "./Slices/createTimerSlice";
import { createExerciseSlice } from "./Slices/createExerciseSlice";
import { SessionStore } from "@/types";

// 1. Define o tipo que junta as fatias todas
// Podes usar os tipos que já tens no @/types ou definir aqui para ser mais rápido

// 2. Passa o tipo <SessionStore> para o create
export const useWorkoutSessionStore = create<SessionStore>()(
    persist(
        (set, get) => ({
            ...createTimerSlice(set, get),
            ...createExerciseSlice(set, get),

            loadTemplate: (exercises: { id: number }[]) => {
                const templateExercises = exercises.map((ex) => ({
                    exercise_id: ex.id,
                    sets: [],
                }));
                set({ sessionExercises: templateExercises });
            },
        }),
        {
            name: "active-workout-session",
            partialize: (state) => ({
                activeSessionId: state.activeSessionId,
                sessionExercises: state.sessionExercises,
                startTime: state.startTime,
                elapsedSeconds: state.elapsedSeconds,
            }),
        },
    ),
);
