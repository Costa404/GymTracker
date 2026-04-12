import { Head, Link } from "@inertiajs/react";
import {
    HiOutlineArrowLeft,
    HiOutlineClock,
    HiOutlineCalendar,
} from "react-icons/hi";

interface DetailsWorkoutsHistoryProps {
    workout: any;
    workoutData: Record<string, any[]>;
}

const DetailsWorkoutsHistory = ({
    workout,
    workoutData,
}: DetailsWorkoutsHistoryProps) => {
    return (
        <div className="max-w-2xl mx-auto py-8 px-6 pb-20">
            <Head title={`Report: ${workout.name}`} />

            {/* HEADER AREA */}
            <div className="mb-10">
                <Link
                    href={route("workouts.history")}
                    className="group inline-flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
                >
                    <HiOutlineArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
                    Back to Archive
                </Link>

                <div className="mt-6">
                    <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">
                        {workout.name}
                    </h1>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <HiOutlineCalendar className="text-blue-500 text-xs" />
                            <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em]">
                                {new Date(
                                    workout.completed_at,
                                ).toLocaleDateString("pt-PT", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </div>

                        {workout.duration_seconds && (
                            <div className="flex items-center gap-2">
                                <HiOutlineClock className="text-blue-500 text-xs" />
                                <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.2em]">
                                    Duration:{" "}
                                    {Math.floor(workout.duration_seconds / 60)}m{" "}
                                    {workout.duration_seconds % 60}s
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* EXERCISES LIST */}
            <div className="space-y-4">
                {Object.entries(workoutData).map(([exerciseName, sets]) => (
                    <div
                        key={exerciseName}
                        className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden"
                    >
                        {/* Exercise Title Header */}
                        <div className="px-5 py-3 border-b border-zinc-800/50 bg-zinc-800/20">
                            <h2 className="text-blue-500 text-[11px] font-black uppercase tracking-[0.2em] italic">
                                {exerciseName}
                            </h2>
                        </div>

                        {/* Sets Grid */}
                        <div className="p-5 space-y-3">
                            {sets.map((set, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center py-1 group"
                                >
                                    <span className="text-zinc-600 font-black italic text-[10px] uppercase tracking-tighter group-hover:text-zinc-400 transition-colors">
                                        Set {idx + 1}
                                    </span>

                                    <div className="flex gap-6">
                                        <div className="flex flex-col items-end">
                                            <span className="text-white font-black text-base leading-none">
                                                {set.weight}
                                                <span className="text-zinc-600 text-[8px] ml-1">
                                                    KG
                                                </span>
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end min-w-[40px]">
                                            <span className="text-white font-black text-base leading-none">
                                                {set.reps}
                                                <span className="text-zinc-600 text-[8px] ml-1">
                                                    REPS
                                                </span>
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
