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
    // MAGIA: Limpar a data do título, exatamente como fizemos na lista
    const cleanName = workout?.name ? workout.name.split(" - ")[0] : "Workout";

    return (
        <div className="w-full text-white pb-20">
            <Head title={`Report: ${cleanName}`} />

            {/* HEADER AREA */}
            <div className="mb-8">
                <div className="border-b border-white/[0.05] pb-6">
                    {/* Título e Info na mesma linha */}
                    <div className="flex justify-between items-baseline gap-4 w-full">
                        {/* Esquerda: Título Limpo */}
                        <h1 className="text-xl font-black italic text-white uppercase tracking-tight leading-none truncate min-w-0">
                            {cleanName}
                        </h1>

                        {/* Direita: Info (Data e Relógio) */}
                        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.1em] shrink-0">
                            <div className="flex items-center gap-1.5 text-zinc-500">
                                <HiOutlineCalendar className="text-performance text-sm" />
                                <span>
                                    {new Date(
                                        workout.completed_at ||
                                            workout.created_at,
                                    ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>

                            {workout.duration_seconds && (
                                <div className="flex items-center gap-1.5 text-zinc-500">
                                    <HiOutlineClock className="text-performance text-sm" />
                                    <span>
                                        {Math.floor(
                                            workout.duration_seconds / 60,
                                        )}
                                        m
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* EXERCISES LIST */}
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
                                /* Removido o group-hover para otimizar para mobile */
                                className="flex justify-between items-center px-5 py-4 bg-white/[0.02] border-b border-white/[0.03] active:bg-white/[0.05] transition-all"
                            >
                                <h2 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] italic">
                                    {exerciseName}
                                </h2>
                                <span className="text-[15px] text-system/40 font-black uppercase">
                                    →
                                </span>
                            </Link>

                            <div className="p-4 space-y-3">
                                {sets.map((set, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center"
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
