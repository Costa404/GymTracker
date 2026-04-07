import { createNewSet, updateExercisesWithSet } from "../sessionUtils";

export const createExerciseSlice = (set: any, get: any) => ({
    activeSessionId: null,
    sessionExercises: [],

    startSession: (workoutId: number) => {
        if (get().activeSessionId !== workoutId) {
            set({
                activeSessionId: workoutId,
                sessionExercises: [],
                startTime: Date.now(), // Reset do timer aqui também
                elapsedSeconds: 0,
            });
        }
    },

    addSet: (exerciseId: number, weight: number, reps: number, rir: number) => {
        set((state: any) => ({
            sessionExercises: updateExercisesWithSet(
                state.sessionExercises,
                exerciseId,
                createNewSet(weight, reps, rir),
            ),
        }));
    },

    finishSession: () =>
        set({
            activeSessionId: null,
            sessionExercises: [],
            startTime: null,
            elapsedSeconds: 0,
        }),
});
