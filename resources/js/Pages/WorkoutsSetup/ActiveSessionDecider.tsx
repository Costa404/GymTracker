import GlassBtn from "@/Components/Shared/GlassBtn";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";
import { useFinishWorkout } from "@/Hooks/useFinishWorkout";

const ActiveSessionDecider = () => {
    const sessionId = useWorkoutSessionStore((s) => s.activeSessionId);
    const exercisesCount = useWorkoutSessionStore(
        (s) => s.sessionExercises.length,
    );

    const { finishWorkout } = useFinishWorkout();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* PAINEL STATUS: Identidade Performance */}
            <div className="bg-performance/5 border-2 border-performance/20 p-8 rounded-[2.5rem] text-center mb-10 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-performance/10 blur-2xl pointer-events-none" />

                <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="w-2 h-2 bg-performance rounded-full animate-pulse shadow-[0_0_10px_var(--color-performance)]" />
                    <h3 className="text-performance-light font-black uppercase text-[10px] tracking-[0.4em] italic">
                        Recording Active
                    </h3>
                </div>

                <p className="text-white font-black uppercase text-2xl italic tracking-tighter mb-1">
                    #{sessionId}
                </p>

                <div className="mt-6 pt-4 border-t border-performance/10">
                    <p className="text-performance/40 font-black text-[9px] uppercase tracking-[0.2em]">
                        {exercisesCount} Exercises in Local Buffer
                    </p>
                </div>
            </div>

            {/* AÇÕES: Diferenciação entre Continuar (System) e Finalizar (Perigo/Red) */}
            <div className="space-y-4">
                <GlassBtn
                    href={`/workouts/${sessionId}/workoutSession`}
                    className="w-full py-7 rounded-2xl bg-system/10 border-2 border-system/40 text-system-light font-black uppercase italic tracking-[0.2em] shadow-[0_0_20px_var(--color-system)/5]"
                >
                    Continue Workout →
                </GlassBtn>

                <button
                    onClick={finishWorkout}
                    className="w-full py-5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500/50 hover:bg-red-500/10 hover:text-red-500 transition-all flex flex-col items-center gap-1 group"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                        — Finish Workout —
                    </span>
                    <span className="opacity-40 text-[7px] font-bold group-hover:opacity-100 transition-opacity uppercase">
                        (Sync data to cloud)
                    </span>
                </button>
            </div>
        </div>
    );
};
export default ActiveSessionDecider;
