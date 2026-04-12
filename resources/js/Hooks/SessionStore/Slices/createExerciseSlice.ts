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

    // --- NOVA FUNÇÃO PARA TEMPLATES ---
    loadTemplate: (exerciseIds: number[]) => {
        // Mapeia os IDs para o formato de objeto da sessão
        const templateExercises = exerciseIds.map((id) => ({
            exercise_id: id,
            sets: [], // Começa vazio, mas "ativo" na UI
        }));

        set({
            sessionExercises: templateExercises,
        });
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
