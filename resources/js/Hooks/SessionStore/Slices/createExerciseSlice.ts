import { createNewSet, updateExercisesWithSet } from "../sessionUtils";

export const createExerciseSlice = (set: any, get: any) => ({
    activeSessionId: null,
    sessionExercises: [],

    startSession: (workoutId: number) => {
        if (get().activeSessionId !== workoutId) {
            set({
                activeSessionId: workoutId,
                sessionExercises: [],
                startTime: Date.now(),
                elapsedSeconds: 0,
            });
        }
    },

    removeSet: (exerciseId: number, setIndex: number) => {
        set((state: any) => ({
            sessionExercises: state.sessionExercises.map((ex: any) =>
                ex.exercise_id === exerciseId
                    ? {
                          ...ex,
                          // Filtramos pelo index para remover a série exata
                          sets: ex.sets.filter(
                              (_: any, index: number) => index !== setIndex,
                          ),
                      }
                    : ex,
            ),
        }));
    },

    addSet: (exerciseId: number, weight: number, reps: number, rir: number) => {
        set((state: any) => {
            // Se o exercício ainda não estiver na sessão (adicionado manualmente pelo picker)
            const exists = state.sessionExercises.find(
                (e: any) => e.exercise_id === exerciseId,
            );

            const baseExercises = exists
                ? state.sessionExercises
                : [
                      ...state.sessionExercises,
                      { exercise_id: exerciseId, sets: [] },
                  ];

            return {
                sessionExercises: updateExercisesWithSet(
                    baseExercises,
                    exerciseId,
                    createNewSet(weight, reps, rir),
                ),
            };
        });
    },

    finishSession: () =>
        set({
            activeSessionId: null,
            sessionExercises: [],
            startTime: null,
            elapsedSeconds: 0,
        }),
});
