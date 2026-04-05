import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WorkoutSessionStore } from "@/types";

const useWorkoutSessionStore = create<WorkoutSessionStore>()(
    persist(
        (set, get) => ({
            // Adicionamos o 'get' aqui para podermos ler o estado nas ações
            activeSessionId: null,
            sessionExercises: [],

            startSession: (workoutId) => {
                const currentId = get().activeSessionId;
                // Só faz reset se mudarmos de treino. Se for o mesmo, mantém os dados!
                if (currentId !== workoutId) {
                    set({ activeSessionId: workoutId, sessionExercises: [] });
                }
            },

            addExercise: (id, name) =>
                set((state) => ({
                    sessionExercises: [
                        ...state.sessionExercises,
                        { exercise_id: id, name, sets: [] },
                    ],
                })),

            // 1. Atualizado para aceitar o RIR
            addSet: (exerciseId, weight, reps, rir) =>
                set((state) => {
                    const hasExercise = state.sessionExercises.some(
                        (ex) => ex.exercise_id === exerciseId,
                    );
                    const newSet = {
                        weight,
                        reps,
                        rir,
                        created_at: new Date().toISOString(),
                    };

                    if (!hasExercise) {
                        // Se não existe, cria o exercício e já mete o set
                        return {
                            sessionExercises: [
                                ...state.sessionExercises,
                                {
                                    exercise_id: exerciseId,
                                    name: "",
                                    sets: [newSet],
                                },
                            ],
                        };
                    }

                    // Se já existe, faz o map normal que tinhas
                    return {
                        sessionExercises: state.sessionExercises.map((ex) =>
                            ex.exercise_id === exerciseId
                                ? { ...ex, sets: [...ex.sets, newSet] }
                                : ex,
                        ),
                    };
                }),

            // 3. Função para limpar tudo após o sucesso do upload no Laravel
            finishSession: () =>
                set({ activeSessionId: null, sessionExercises: [] }),
        }),
        {
            name: "active-workout-session",
        },
    ),
);

export default useWorkoutSessionStore;
