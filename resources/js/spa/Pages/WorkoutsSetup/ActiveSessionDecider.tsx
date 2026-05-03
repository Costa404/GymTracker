import { useEffect, useState } from "react";
import GlassBtn from "@/Components/Shared/GlassBtn";
import TimerDisplay from "@/Components/Shared/TimerDisplay";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";
import { useFinishWorkout } from "@/Hooks/useFinishWorkout";
import { db } from "@/spa/db";

const ActiveSessionDecider = () => {
    const exercisesCount = useWorkoutSessionStore(
        (s) => s.sessionExercises.length,
    );
    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);
    const { finishWorkout, isFinishing } = useFinishWorkout();

    const [workoutName, setWorkoutName] = useState("Active Mission");

    useEffect(() => {
        if (!activeSessionId) return;
        db.workouts.get(activeSessionId).then((workout) => {
            if (workout?.name) setWorkoutName(workout.name);
        });
    }, [activeSessionId]);

    const cleanWorkoutName = workoutName.split("-")[0].trim();

    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    return (
        <>
            {/* OVERLAY DE SINCRONIZAÇÃO */}
            {isFinishing && (
                <div className="fixed inset-0 z-[999] bg-[#050505]/90 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-2 border-performance border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(var(--color-performance),0.3)]" />
                        <div className="flex flex-col items-center gap-1 text-center px-6">
                            <span className="text-performance font-black uppercase italic tracking-[0.3em] text-[10px]">
                                Syncing Mission Data
                            </span>
                            <span className="text-white/20 font-bold uppercase text-[7px] tracking-widest">
                                Finalizing Session...
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`transition-all duration-500 flex flex-col gap-4 ${isFinishing ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}
            >
                {/* PAINEL STATUS CENTRAL */}
                <div className="w-full bg-performance/5 border-2 border-performance/20 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden gap-3 shadow-2xl shadow-black/20">
                    {/* CAMADA 1: INDICADOR RECORDING */}
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-performance rounded-full animate-pulse shadow-[0_0_8px_var(--color-performance)]" />
                        <h3 className="text-performance-light font-black uppercase text-[10px] tracking-[0.4em] italic leading-none">
                            Recording
                        </h3>
                    </div>

                    {/* CAMADA 2: NOME DO TREINO */}
                    <div className="py-2">
                        <h2 className="text-white font-black uppercase text-4xl italic tracking-tighter leading-none">
                            {cleanWorkoutName}
                        </h2>
                    </div>

                    {/* CAMADA 3: INFO TÉCNICA (DATA | TIMER) */}
                    <div className="flex items-center gap-5 px-6 py-2 rounded-full border border-white/5">
                        <span className="text-zinc-500 font-black uppercase text-[9px] tracking-[0.2em] italic">
                            {currentDate}
                        </span>

                        <div className="h-3 w-[1px] bg-performance/30" />

                        <div className="text-white font-mono font-black italic text-[12px] tracking-widest min-w-[70px]">
                            <TimerDisplay />
                        </div>
                    </div>

                    {/* FOOTER: BUFFER INFO */}
                    <div className="mt-4 pt-4 border-t border-performance/10 w-full">
                        <p className="text-performance/30 font-black text-[8px] uppercase tracking-[0.3em]">
                            {exercisesCount} Exercises in Local Buffer
                        </p>
                    </div>
                </div>

                {/* BOTÕES DE AÇÃO HOMOGÉNEOS */}

                {/* Botão System */}
                <GlassBtn
                    to="/workouts/active"
                    className="w-full py-6 rounded-2xl bg-system/5 border border-system/20 text-system-light font-black uppercase italic tracking-widest active:bg-system/10 active:border-system/40 text-[11px]"
                >
                    Continue Workout
                </GlassBtn>

                {/* Botão Danger - Letras garantidamente a vermelho! */}
                <GlassBtn
                    onClick={finishWorkout}
                    disabled={isFinishing}
                    className="w-full py-6 rounded-2xl border border-red-500/20 bg-red-500/5 !text-red-500 active:bg-red-500/10 active:border-red-500/40 flex items-center justify-center disabled:opacity-0"
                >
                    <span className="text-red-500 text-[11px] font-black uppercase tracking-widest italic">
                        Finish Workout
                    </span>
                </GlassBtn>
            </div>
        </>
    );
};

export default ActiveSessionDecider;
