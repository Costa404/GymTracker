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
        <div className="w-full text-white pb-20">
            <Head title={`Report: ${workout.name}`} />

            {/* HEADER AREA - Compacta e Técnica */}
            <div className="mb-8">
                <GlassBtn
                    href={route("workouts.history")}
                    variant="system"
                    className="h-[32px] px-3 text-[9px] mb-6"
                >
                    <HiOutlineArrowLeft className="mr-2" />
                    Back to Archive
                </GlassBtn>

                <div className="flex justify-between items-end border-b border-white/[0.05] pb-6">
                    <div className="min-w-0">
                        {/* Título Reduzido: Mais elegante e profissional */}
                        <h1 className="text-xl font-black italic text-white uppercase tracking-tight leading-none mb-3">
                            {workout.name}
                        </h1>

                        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em]">
                            <div className="flex items-center gap-1.5 text-zinc-500">
                                <HiOutlineCalendar className="text-system" />
                                <span>
                                    {new Date(
                                        workout.completed_at ||
                                            workout.created_at,
                                    ).toLocaleDateString("pt-PT", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>

                            {workout.duration_seconds && (
                                <div className="flex items-center gap-1.5 text-zinc-500">
                                    <HiOutlineClock className="text-system" />
                                    <span>
                                        {Math.floor(
                                            workout.duration_seconds / 60,
                                        )}
                                        m {workout.duration_seconds % 60}s
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Botão Delete: Discreto mas acessível */}
                    <button className="p-2.5 rounded-xl border border-red-500/10 bg-red-500/5 text-red-500/40 hover:text-red-500 transition-all active:scale-90">
                        <HiOutlineTrash className="text-lg" />
                    </button>
                </div>
            </div>

            {/* EXERCISES LIST - Mantendo a clareza técnica */}
            <div className="space-y-4">
                {Object.entries(workoutData).map(
                    ([exerciseName, sets]: [string, any[]]) => (
                        <div
                            key={exerciseName}
                            className="bg-zinc-900/20 border border-white/[0.05] rounded-2xl overflow-hidden"
                        >
                            <Link
                                href={route(
                                    "exercises.IndividualHistory",
                                    sets[0].exercise_id,
                                )}
                                className="flex justify-between items-center px-5 py-4 bg-white/[0.02] border-b border-white/[0.03] group/header hover:bg-white/[0.05] transition-all"
                            >
                                <h2 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] italic group-hover/header:text-system-light transition-colors">
                                    {exerciseName}
                                </h2>
                                <span className="text-[8px] text-system/40 font-black uppercase opacity-0 group-hover/header:opacity-100 transition-opacity">
                                    Telemetry →
                                </span>
                            </Link>

                            <div className="p-4 space-y-3">
                                {sets.map((set, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center group"
                                    >
                                        <span className="text-zinc-600 font-black italic text-[9px] uppercase tracking-tighter">
                                            Set {idx + 1}
                                        </span>

                                        <div className="flex gap-8">
                                            <div className="flex items-baseline">
                                                <span className="text-white font-black text-base leading-none tracking-tighter">
                                                    {set.weight}
                                                </span>
                                                <span className="text-zinc-600 font-black text-[8px] ml-1 uppercase">
                                                    kg
                                                </span>
                                            </div>

                                            <div className="flex items-baseline min-w-[40px] justify-end">
                                                <span className="text-white font-black text-base leading-none tracking-tighter">
                                                    {set.reps}
                                                </span>
                                                <span className="text-zinc-600 font-black text-[8px] ml-1 uppercase text-right">
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
