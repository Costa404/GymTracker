import { Head } from "@inertiajs/react";
import ExercisesHeader from "../Components/ExercisesHeader";
import { formatDate, useExerciseHistoryLogic } from "./useExerciseHistoryLogic";
import { EmptyExerciseHistory, Stat } from "./ExerciseHistoryUI";

const ExerciseHistory = ({ exercise, history, workout }: any) => {
    const sortedGroups = useExerciseHistoryLogic(history);

    return (
        <div className="min-h-screen text-white font-sans px-4 relative">
            <Head title={`History | ${exercise.name}`} />

            <div className="max-w-lg mx-auto relative z-10">
                <ExercisesHeader
                    exerciseName={exercise.name}
                    exerciseId={exercise.id}
                    workoutName={workout.name}
                    workoutId={workout.id}
                    showHistoryButton={false}
                />

                <div className="space-y-6">
                    {sortedGroups.length > 0 ? (
                        sortedGroups.map((group: any, idx: number) => (
                            <div
                                key={idx}
                                className="bg-[#0a1220]/40 border border-emerald-500/20 rounded-[2rem] p-6 backdrop-blur-xl shadow-xl"
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60 block mb-4">
                                    {formatDate(group.logs[0].created_at)}
                                </span>

                                <div className="space-y-3">
                                    {group.logs.map((log: any, i: number) => (
                                        <div
                                            key={i}
                                            className="flex justify-between items-center py-2 border-b border-emerald-500/10 last:border-0"
                                        >
                                            <span className="text-zinc-500 font-black text-[10px] uppercase">
                                                SET {i + 1}
                                            </span>
                                            <div className="flex gap-4">
                                                <Stat
                                                    value={log.weight}
                                                    label="KG"
                                                    color="text-emerald-400"
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
