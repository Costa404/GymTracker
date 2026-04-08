import { Head, Link } from "@inertiajs/react";

interface DetailsWorkoutsHistoryProps {
    workout: any;
    workoutData: Record<string, any[]>;
}

const DetailsWorkoutsHistory = ({
    workout,
    workoutData,
}: DetailsWorkoutsHistoryProps) => {
    console.log("Workout Data:", workoutData);
    return (
        <div className="max-w-2xl mx-auto py-8 px-6">
            <Head title={`Report: ${workout.name}`} />

            <div className="mb-8">
                <Link
                    href={route("workouts.history")}
                    className="text-cyan-500 text-[10px] font-black uppercase tracking-widest hover:text-cyan-400 transition-colors"
                >
                    ← Back to Archive
                </Link>
                <h1 className="text-2xl font-black italic text-white uppercase mt-4 tracking-tighter">
                    {workout.name}
                </h1>
                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.3em]">
                    Mission Completed at{" "}
                    {new Date(workout.completed_at).toLocaleDateString("pt-PT")}
                </p>
            </div>

            <div className="space-y-6">
                {Object.entries(workoutData).map(([exerciseName, sets]) => (
                    <div
                        key={exerciseName}
                        className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5"
                    >
                        <h2 className="text-cyan-500 text-[11px] font-black uppercase tracking-widest mb-4">
                            {exerciseName}
                        </h2>

                        <div className="space-y-2">
                            {sets.map((set, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center py-2 border-b border-zinc-800/50 last:border-0"
                                >
                                    <span className="text-zinc-500 font-black italic text-[10px]">
                                        SET {idx + 1}
                                    </span>
                                    <div className="flex gap-4">
                                        <div className="text-right">
                                            <span className="text-white font-black text-sm">
                                                {set.weight}
                                            </span>
                                            <span className="text-zinc-600 text-[8px] font-bold ml-1 uppercase">
                                                KG
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-white font-black text-sm">
                                                {set.reps}
                                            </span>
                                            <span className="text-zinc-600 text-[8px] font-bold ml-1 uppercase">
                                                REPS
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailsWorkoutsHistory;
