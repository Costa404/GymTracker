import { Head } from "@inertiajs/react";
import ExercisesHeader from "../Components/ExercisesHeader";
import { formatDate, useExerciseHistoryLogic } from "./useExerciseHistoryLogic";
import { EmptyExerciseHistory, Stat } from "./ExerciseHistoryUI";
import ExerciseProgressGraph from "./ExerciseProgressGraph";

const ExerciseHistory = ({ exercise, history, workout }: any) => {
    const sortedGroups = useExerciseHistoryLogic(history);
    // 2. Prepara os dados para o gráfico
    const chartData = sortedGroups
        .map((group: any) => ({
            date: formatDate(group.logs[0].created_at),
            weight: Math.max(...group.logs.map((log: any) => log.weight)),
        }))
        .reverse();

    return (
        <div className="min-h-screen text-white font-sans  relative">
            <Head title={`History | ${exercise.name}`} />

            <div className="max-w-lg mx-auto relative z-10">
                <ExercisesHeader
                    exerciseName={exercise.name}
                    exerciseId={exercise.id}
                    workoutName={workout.name}
                    workoutId={workout.id}
                    showHistoryButton={false}
                />
                <ExerciseProgressGraph data={chartData} />

                <div className="space-y-4">
                    {sortedGroups.length > 0 ? (
                        sortedGroups.map((group: any, idx: number) => (
                            <div
                                key={idx}
                                className="bg-[#0a1220]/40 border border-performance/20 rounded-[2rem] p-6 py-4 shadow-xl"
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest text-performance/60 block ">
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
                        <EmptyExerciseHistory />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExerciseHistory;
