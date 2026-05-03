import { useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/spa/db";

import { formatDate, useExerciseHistoryLogic } from "./useExerciseHistoryLogic";
import { EmptyExerciseHistory, Stat } from "./ExerciseHistoryUI";
import ExerciseProgressGraph from "./ExerciseProgressGraph";
import ExercisesHeader from "../LogExercises/ExercisesHeader";

const ExerciseHistory = () => {
    // 1. Capturar IDs da URL (workoutId pode ser undefined dependendo da rota)
    const { workoutId, exerciseId } = useParams();

    const exId = Number(exerciseId);
    // Só tentamos converter o workoutId se ele existir na URL
    const wkId = workoutId ? Number(workoutId) : null;

    // 2. Queries ao Dexie com proteção rigorosa
    const exercise = useLiveQuery(() => {
        if (isNaN(exId) || exId === 0) return undefined;
        return db.exercises.get(exId);
    }, [exId]);

    // O workout só é pesquisado se o wkId for um número válido
    const workout = useLiveQuery(() => {
        if (!wkId || isNaN(wkId)) return undefined;
        return db.workouts.get(wkId);
    }, [wkId]);

    // O histórico precisa apenas do ID do exercício
    const history =
        useLiveQuery(() => {
            if (isNaN(exId) || exId === 0) return [];
            return db.workoutLogs.where("exercise_id").equals(exId).toArray();
        }, [exId]) || [];

    // 3. Aplicar a lógica de agrupamento
    const sortedGroups = useExerciseHistoryLogic(history);

    // 4. Preparar os dados para o gráfico
    const chartData = sortedGroups
        .map((group: any) => ({
            date: formatDate(group.logs[0].created_at),
            weight: Math.max(...group.logs.map((log: any) => log.weight)),
        }))
        .reverse();

    // 5. Guardas de carregamento (Apenas o exercise é obrigatório para renderizar)
    if (!exercise) {
        return (
            <div className="min-h-screen flex items-center justify-center text-performance">
                <span className="animate-pulse font-black uppercase italic tracking-widest text-[10px]">
                    Loading History...
                </span>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white font-sans relative">
            <div className="max-w-lg mx-auto relative z-10 ">
                {/*
                  O Header agora é inteligente:
                  Se existir 'workout', usa o nome e ID dele.
                  Se não existir, usa valores fallback lógicos.
                */}
                <ExercisesHeader
                    exerciseName={exercise.name}
                    exerciseId={exercise.id}
                    workoutName={workout ? workout.name : "Global History"}
                    workoutId={workout ? workout.id : 0}
                    showHistoryButton={false}
                />

                {/* Gráfico de Progresso */}
                {chartData.length > 0 && (
                    <div className="mt-6">
                        <ExerciseProgressGraph data={chartData} />
                    </div>
                )}

                <div className="space-y-4 mt-6">
                    {sortedGroups.length > 0 ? (
                        sortedGroups.map((group: any, idx: number) => (
                            <div
                                key={idx}
                                className="border border-performance/20 rounded-[2rem] p-6 py-4 shadow-xl"
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest text-performance/60 block mb-2">
                                    {formatDate(group.logs[0].created_at)}
                                </span>

                                <div className="space-y-2">
                                    {group.logs.map((log: any, i: number) => (
                                        <div
                                            key={i}
                                            className="flex justify-between items-center py-2 border-b border-performance/10 last:border-0"
                                        >
                                            <span className="text-zinc-500 font-black text-[10px] uppercase">
                                                SET {i + 1}
                                            </span>
                                            <div className="flex gap-4">
                                                <Stat
                                                    value={log.weight}
                                                    label="KG"
                                                    color="text-performance-light"
                                                />
                                                <Stat
                                                    value={log.reps}
                                                    label="Reps"
                                                />
                                                {log.rir !== null && (
                                                    <Stat
                                                        value={
                                                            log.rir === -1
                                                                ? "F"
                                                                : log.rir
                                                        }
                                                        label="RIR"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="pt-8">
                            <EmptyExerciseHistory />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExerciseHistory;
