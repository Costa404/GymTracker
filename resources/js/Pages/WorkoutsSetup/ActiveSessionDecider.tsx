import GlassBtn from "@/Components/Shared/GlassBtn";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";
import { useFinishWorkout } from "@/Hooks/useFinishWorkout";

const ActiveSessionDecider = () => {
    // Usamos seletores individuais para máxima performance (mata o loop do timer)
    const sessionId = useWorkoutSessionStore((s) => s.activeSessionId);
    const exercisesCount = useWorkoutSessionStore(
        (s) => s.sessionExercises.length,
    );

    const { finishWorkout } = useFinishWorkout();
    return (
        <div className="space-y-8 animate-in fade-in duration-300 pb-8">
            {/* PAINEL STATUS */}
            <div className="bg-emerald-950/10  border border-emerald-500/10 p-6 rounded-3xl text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                    <h3 className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.3em]">
                        Recording Active
                    </h3>
                </div>
                <p className="text-white font-black uppercase text-xl italic tracking-tighter">
                    Session: #{sessionId}
                </p>
                <p className="mt-4 text-emerald-500/40 font-black text-[8px] uppercase tracking-[0.2em] pt-3 border-t border-emerald-500/5">
                    {exercisesCount} Exercises in Local Buffer
                </p>
            </div>

            {/* AÇÕES */}
            <div className="grid grid-cols-1 gap-4">
                <GlassBtn
                    href={`/workouts/${sessionId}/workoutSession`}
                    variant="blue"
                    className="w-full py-6"
                >
                    Continue Workout →
                </GlassBtn>

                <GlassBtn
                    onClick={finishWorkout}
                    variant="red"
                    className="w-full py-5 flex flex-col gap-1"
                >
                    <span className="tracking-widest">— Finish Workout —</span>
                    <span className="opacity-40 text-[7px] font-bold">
                        (End session and sync data)
                    </span>
                </GlassBtn>
            </div>
        </div>
    );
};

export default ActiveSessionDecider;
