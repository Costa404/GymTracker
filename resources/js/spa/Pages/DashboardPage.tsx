import GlassBtn from "@/Components/Shared/GlassBtn";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

const DashboardPage = () => {
    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);
    const weeklyVolume = 0;

    return (
        <div className="flex flex-col justify-center gap-4">
            {/* 1. BOTÃO PRINCIPAL: Dinâmico entre Performance e System */}
            <GlassBtn
                to="/workouts/setup"
                variant={activeSessionId ? "system" : "performance"}
                className="w-full py-8 rounded-[2.5rem]"
            >
                <span
                    className={
                        activeSessionId
                            ? "text-[11px] tracking-widest"
                            : "text-lg tracking-[0.2em]"
                    }
                >
                    {activeSessionId ? "CONTINUE WORKOUT" : "START WORKOUT"}
                </span>
            </GlassBtn>

            {/* 2. WORKOUT CONFIG */}
            <GlassBtn
                to="/workout/config"
                variant="system"
                className="w-full py-5 rounded-2xl"
            >
                <span className="text-[9px] tracking-[0.3em]">
                    Workout Config
                </span>
            </GlassBtn>

            {/* 3. PAST WORKOUTS */}
            <GlassBtn
                to="/workouts/history"
                variant="zinc"
                className="w-full py-5 rounded-2xl"
            >
                <span className="text-[9px] tracking-[0.3em]">
                    Past Workouts
                </span>
            </GlassBtn>

            {/* 4. PAINEL DE PERFORMANCE */}
            <div className="w-full bg-performance/5 border-2 border-performance/20 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-performance/50 mb-4 italic">
                    Weekly Load Volume
                </span>

                <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black italic text-white leading-none tracking-tighter">
                        {weeklyVolume.toLocaleString()}
                    </span>
                    <span className="text-sm font-black text-performance-light">
                        KG
                    </span>
                </div>

                <div className="mt-6 h-[1px] w-12 bg-performance/20" />

                <p className="text-[8px] text-zinc-600 uppercase mt-4 tracking-[0.3em] font-bold">
                    Total effort • Last 7 Days
                </p>
            </div>
        </div>
    );
};

export default DashboardPage;
