import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useWorkoutSessionStore } from "./SessionStore/useWorkoutSessionStore";
import { db } from "@/spa/db"; // A tua base de dados

export const useFinishWorkout = () => {
    const [isFinishing, setIsFinishing] = useState(false);
    const navigate = useNavigate();

    const { activeSessionId, sessionExercises, finishSession } =
        useWorkoutSessionStore(
            useShallow((s) => ({
                activeSessionId: s.activeSessionId,
                sessionExercises: s.sessionExercises,
                finishSession: s.finishSession,
            })),
        );

    const finishWorkout = async () => {
        if (!confirm("End Workout?")) return;

        setIsFinishing(true);

        try {
            const state = useWorkoutSessionStore.getState();
            const duration = state.elapsedSeconds;
            const now = new Date().toISOString();

            if (activeSessionId) {
                // 1. Atualiza a sessão principal com o tempo e a data de fim
                await db.workouts.update(activeSessionId, {
                    duration_seconds: duration,
                    completed_at: now,
                    updated_at: now,
                });

                // 2. Prepara todas as séries para gravar no Dexie
                const logsToInsert: any[] = [];

                sessionExercises.forEach((exercise: any) => {
                    exercise.sets.forEach((set: any, index: number) => {
                        logsToInsert.push({
                            workout_id: activeSessionId,
                            exercise_id: exercise.exercise_id,
                            set_number: index + 1, // O índice começa a 0, as séries a 1
                            weight: set.weight,
                            reps: set.reps,
                            rir: set.rir ?? null,
                            type: "normal",
                            created_at: now,
                            updated_at: now,
                        });
                    });
                });

                // 3. Despeja as séries todas de uma vez na base de dados local
                if (logsToInsert.length > 0) {
                    await db.workoutLogs.bulkAdd(logsToInsert);
                }
            }

            // 4. Limpa a secretária (O Zustand apaga o localStorage do treino ativo)
            finishSession();
            setIsFinishing(false);

            // 5. Redireciona para o Dashboard
            navigate("/");

            // (Futuro: Aqui podes chamar a API do teu servidor Fly.io para sincronizar os dados novos)
        } catch (error) {
            console.error("Erro crítico ao fechar sessão no Dexie:", error);
            setIsFinishing(false);
        }
    };

    return { finishWorkout, isFinishing };
};
