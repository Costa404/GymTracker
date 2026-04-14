import GlassBtn from "@/Components/Shared/GlassBtn";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";
import { Head } from "@inertiajs/react";

interface Props {
    weeklyVolume: number;
    currentDate: string;
    currentTime: string;
}

const Dashboard = ({ weeklyVolume, currentDate, currentTime }: Props) => {
    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);

    return (
        /* Contentor Pai com Padding Lateral Padrão e o Glow de Sistema no topo */
        <div className="min-h-screen bg-black text-white px-6 pt-12 pb-32 relative overflow-hidden">
            <Head title="Command Center" />

            <div className="relative z-10 max-w-md mx-auto space-y-10">
                {/* 1. SECÇÃO DE ACÇÃO (O Cérebro da App) */}
                <div className="space-y-4">
                    <GlassBtn
                        href="/workouts/setup"
                        className={`w-full py-8 rounded-[2.5rem] text-lg font-black tracking-[0.2em] italic transition-all border-2
                            ${
                                activeSessionId
                                    ? "bg-performance/10 border-performance/40 text-performance-light shadow-[0_0_20px_var(--color-performance-light)/10]"
                                    : "bg-system/10 border-system/40 text-system-light shadow-[0_0_20px_var(--color-system)/10]"
                            }`}
                    >
                        {activeSessionId
                            ? "CONTINUE WORKOUT →"
                            : "START WORKOUT"}
                    </GlassBtn>

                    <div className="grid grid-cols-1 gap-3">
                        <GlassBtn
                            href="/workouts/history"
                            className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 font-bold uppercase text-[10px] tracking-widest hover:text-white hover:bg-white/10"
                        >
                            Past Workouts
                        </GlassBtn>

                        <GlassBtn
                            href="/exercises/create"
                            className="w-full py-4 rounded-xl border border-dashed border-system/30 bg-system/5 text-system-light/70 hover:bg-system/10 hover:border-system/50 transition-all"
                        >
                            <span className="text-[9px] tracking-[0.3em] font-black uppercase">
                                + Create New Exercise
                            </span>
                        </GlassBtn>
                    </div>
                </div>

                {/* 2. PAINEL DE PERFORMANCE (O Músculo) */}
                <div className="space-y-4">
                    {/* Card de Volume Semanal */}
                    <div className="bg-performance/5 border-2 border-performance/20 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        {/* Glow interno focado */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-performance/10 blur-[40px] pointer-events-none" />

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

                    {/* Cards de Info (System Context) */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center backdrop-blur-sm">
                            <span className="text-[7px] font-black uppercase text-zinc-600 tracking-[0.2em] mb-2">
                                Current Date
                            </span>
                            <span className="text-[11px] font-black text-zinc-300 uppercase italic">
                                {currentDate}
                            </span>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center backdrop-blur-sm">
                            <span className="text-[7px] font-black uppercase text-zinc-600 tracking-[0.2em] mb-2">
                                System Time
                            </span>
                            <span className="text-[11px] font-black text-zinc-300 italic">
                                {currentTime}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
