import { useParams, Link } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/spa/db";
import { HiOutlineClock, HiOutlineCalendar } from "react-icons/hi";
import PageTitle from "@/spa/Components/Shared/PageTitle";

const WorkoutHistoryDetail = () => {
    const { workoutId } = useParams();
    const wkId = Number(workoutId);

    // 1. Puxar o treino específico do Dexie
    const workout = useLiveQuery(() => db.workouts.get(wkId), [wkId]);

    // 2. Puxar todos os logs deste treino e agrupar por exercício
    const workoutData = useLiveQuery(async () => {
        const logs = await db.workoutLogs
            .where("workout_id")
            .equals(wkId)
            .toArray();

        // Agrupamento manual
        const grouped: Record<string, any[]> = {};

        for (const log of logs) {
            const exercise = await db.exercises.get(log.exercise_id);
            const name = exercise?.name || "Unknown Exercise";

            if (!grouped[name]) grouped[name] = [];
            grouped[name].push(log);
        }

        return grouped;
    }, [wkId]);

    const cleanName = workout?.name ? workout.name.split(" - ")[0] : "Workout";

    if (!workout || !workoutData) {
        return (
            <div className="min-h-screen flex items-center justify-center text-performance">
                <span className="animate-pulse font-black uppercase italic tracking-widest text-[10px]">
                    Loading Report...
                </span>
            </div>
        );
    }

    return (
        <div className="w-full text-white pb-20 max-w-lg mx-auto">
            {/* HEADER AREA: Lado a Lado */}
            <div className="mb-8 ">
                <div className="flex flex-wrap justify-between items-center gap-4 w-full">
                    {/* Título à esquerda */}
                    <PageTitle>{cleanName}</PageTitle>

                    {/* Badges alinhadas à direita */}
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/10 px-2.5 py-1.5 rounded-xl">
                            <HiOutlineCalendar className="text-performance text-[13px]" />
                            <span className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400 mt-[1px]">
                                {new Date(
                                    workout.completed_at || workout.created_at,
                                ).toLocaleDateString("pt-PT", {
                                    month: "short",
                                    day: "numeric",
                                })}
                            </span>
                        </div>

                        {workout.duration_seconds && (
                            <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/10 px-2.5 py-1.5 rounded-xl">
                                <HiOutlineClock className="text-performance text-[13px]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.1em] text-zinc-400 mt-[1px]">
                                    {Math.floor(workout.duration_seconds / 60)}{" "}
                                    MIN
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* EXERCISES LIST */}
            <div className="space-y-6">
                {Object.entries(workoutData).map(([exerciseName, sets]) => (
                    <div
                        key={exerciseName}
                        className="border border-white/10 rounded-[2rem] overflow-hidden bg-[#050505] shadow-xl"
                    >
                        {/* Link Accordion Header */}
                        <Link
                            to={`/workout/${wkId}/exercise/${sets[0].exercise_id}/history`}
                            className="flex justify-between items-center px-6 py-5 bg-white/[0.02] border-b border-white/5 active:bg-white/[0.05] transition-colors touch-manipulation group"
                        >
                            <h2 className="text-white text-[11px] font-black uppercase tracking-widest italic leading-none mt-[2px]">
                                {exerciseName}
                            </h2>
                            <span className="text-performance text-lg leading-none active:scale-90 transition-transform">
                                →
                            </span>
                        </Link>

                        {/* Sets List */}
                        <div className="px-6 py-2">
                            {sets.map((set, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center py-3 border-b border-white/5 last:border-0"
                                >
                                    <span className="text-zinc-600 font-black text-[10px] uppercase tracking-widest italic">
                                        SET {idx + 1}
                                    </span>

                                    <div className="flex gap-5">
                                        {/* Bloco Peso */}
                                        <div className="flex items-baseline gap-1 min-w-[35px] justify-end">
                                            <span className="text-performance-light font-black text-base leading-none tracking-tighter">
                                                {set.weight}
                                            </span>
                                            <span className="text-zinc-600 font-black text-[8px] uppercase tracking-widest">
                                                KG
                                            </span>
                                        </div>

                                        {/* Bloco Reps */}
                                        <div className="flex items-baseline gap-1 min-w-[35px] justify-end">
                                            <span className="text-white font-black text-base leading-none tracking-tighter">
                                                {set.reps}
                                            </span>
                                            <span className="text-zinc-600 font-black text-[8px] uppercase tracking-widest">
                                                Reps
                                            </span>
                                        </div>

                                        {/* Bloco RIR (se existir) */}
                                        {set.rir !== undefined &&
                                            set.rir !== null && (
                                                <div className="flex items-baseline gap-1 min-w-[35px] justify-end">
                                                    <span className="text-white font-black text-base leading-none tracking-tighter">
                                                        {set.rir === -1
                                                            ? "F"
                                                            : set.rir}
                                                    </span>
                                                    <span className="text-zinc-600 font-black text-[8px] uppercase tracking-widest">
                                                        RIR
                                                    </span>
                                                </div>
                                            )}
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

export default WorkoutHistoryDetail;
