import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WorkoutSessionStore } from "@/types";

const useWorkoutSessionStore = create<WorkoutSessionStore>()(
    persist(
        (set) => ({
            activeSessionId: null,
            sessionExercises: [],

            startSession: (workoutId) =>
                set({ activeSessionId: workoutId, sessionExercises: [] }),

            addExercise: (id, name) =>
                set((state) => ({
                    sessionExercises: [
                        ...state.sessionExercises,
                        { exercise_id: id, name, sets: [] },
                    ],
                })),

            addSet: (exerciseId, weight, reps) =>
                set((state) => ({
                    sessionExercises: state.sessionExercises.map((ex) =>
                        ex.exercise_id === exerciseId
                            ? { ...ex, sets: [...ex.sets, { weight, reps }] }
                            : ex,
                    ),
                })),

            finishSession: () =>
                set({ activeSessionId: null, sessionExercises: [] }),
        }),
        {
            name: "active-workout-session",
        },
    ),
);

export default useWorkoutSessionStore;
