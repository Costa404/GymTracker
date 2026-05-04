// useWorkoutSessionStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SessionStore } from "@/types";
import { ExerciseCreateSlice } from "./Slices/createExerciseSlice";
import { CreateTimerSlice } from "./Slices/createTimerSlice";

// 1. Define o tipo que junta as fatias todas
// Podes usar os tipos que já tens no @/types ou definir aqui para ser mais rápido

// 2. Passa o tipo <SessionStore> para o create
export const useWorkoutSessionStore = create<SessionStore>()(
    persist(
        (set, get) => ({
            ...CreateTimerSlice(set, get),
            ...ExerciseCreateSlice(set, get),

            loadTemplate: (exerciseIds: number[]) => {
                const templateExercises = exerciseIds.map((id: number) => ({
                    exercise_id: id,
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
