import React from "react";
import { Head, Link } from "@inertiajs/react";
import {
    HiOutlineArrowLeft,
    HiOutlineClock,
    HiOutlineCalendar,
    HiOutlineTrash,
} from "react-icons/hi";
import GlassBtn from "@/Components/Shared/GlassBtn";

interface DetailsWorkoutsHistoryProps {
    workout: any;
    workoutData: Record<string, any[]>;
}

const DetailsWorkoutsHistory = ({
    workout,
    workoutData,
}: DetailsWorkoutsHistoryProps) => {
    return (
        <div className="max-w-2xl mx-auto font-sans bg-[#050a12] min-h-screen text-white">
            <Head title={`Report: ${workout.name}`} />

            {/* HEADER AREA */}
            <div className="mb-10">
                <GlassBtn
                    href={route("workouts.history")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-zinc-700 bg-zinc-800/[0.04] text-zinc-500 transition-all hover:bg-zinc-800/[0.1] hover:border-performance/40 hover:text-performance-light group"
                >
                    <HiOutlineArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[9px] tracking-widest font-black uppercase">
                        Back to Archive
                    </span>
                </GlassBtn>
                <div className="mt-6 flex justify-between items-start gap-4">
                    <div className="min-w-0">
                        <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none mb-4 truncate">
                            {workout.name}
                        </h1>

                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2">
                                <HiOutlineCalendar className="text-performance text-sm" />
                                <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                                    {new Date(
                                        workout.completed_at ||
                                            workout.created_at,
                                    ).toLocaleDateString("pt-PT", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            {workout.duration_seconds && (
                                <div className="flex items-center gap-2">
                                    <HiOutlineClock className="text-performance text-sm" />
                                    <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                                        {Math.floor(
                                            workout.duration_seconds / 60,
                                        )}
                                        m {workout.duration_seconds % 60}s
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Botão Archive/Delete Estilizado */}
                    <button className="flex-shrink-0 bg-red-500/5 hover:bg-red-500/20 border border-red-500/10 hover:border-red-500/40 text-red-500/60 hover:text-red-500 p-3 rounded-xl transition-all duration-300">
                        <HiOutlineTrash className="text-xl" />
                    </button>
                </div>
            </div>

            {/* EXERCISES LIST */}
            <div className="space-y-4">
                {Object.entries(workoutData).map(
                    ([exerciseName, sets]: [string, any[]]) => (
                        <div
                            key={exerciseName}
                            className="bg-[#0a1220]/40 border border-performance/10 rounded-2xl overflow-hidden shadow-2xl"
                        >
                            {/* Tornamos o Header um Link para o detalhe do exercício */}
                            <Link
                                href={route(
                                    "exercises.IndividualHistory",
                                    sets[0].exercise_id,
                                )}
                                className="block px-5 py-3 border-b border-performance/5 bg-performance/5 hover:bg-performance/10 transition-colors group/header"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-performance-light text-[11px] font-black uppercase tracking-[0.2em] italic">
                                        {exerciseName}
                                    </h2>
                                    <span className="text-[8px] text-performance/40 font-black uppercase opacity-0 group-hover/header:opacity-100 transition-opacity">
                                        View Progress →
                                    </span>
                                </div>
                            </Link>

                            <div className="px-3 py-3 space-y-2">
                                {sets.map((set, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center py-1 group border-b border-white/5 last:border-0"
                                    >
                                        <span className="text-zinc-500 font-black italic text-[9px] uppercase tracking-tighter group-hover:text-performance/50 transition-colors">
                                            Set {idx + 1}
                                        </span>

                                        <div className="flex gap-8">
                                            {/* Peso */}
                                            <div className="flex items-baseline">
                                                <span className="text-white font-black text-lg leading-none tracking-tighter">
                                                    {set.weight}
                                                </span>
                                                <span className="text-performance/60 font-black text-[8px] ml-1 uppercase">
                                                    kg
                                                </span>
                                            </div>

                                            {/* Repetições */}
                                            <div className="flex items-baseline min-w-[45px] justify-end">
                                                <span className="text-white font-black text-lg leading-none tracking-tighter">
                                                    {set.reps}
                                                </span>
                                                <span className="text-zinc-600 font-black text-[8px] ml-1 uppercase">
                                                    reps
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
};

export default DetailsWorkoutsHistory;
