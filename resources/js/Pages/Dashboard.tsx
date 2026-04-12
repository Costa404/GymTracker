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
        <>
            <Head title="Command Center" />

            <div className="relative w-full px-8 space-y-6 max-w-md mx-auto pt-8 z-10">
                {/* BOTÕES DE ACÇÃO */}
                <div className="space-y-4">
                    {/* Botão Principal: Start/Continue */}
                    <GlassBtn
                        href="/workouts/setup"
                        variant="blue"
                        className="w-full py-8 rounded-[2rem] text-lg font-black tracking-[0.2em] bg-blue-500/[0.08] border border-blue-500/40 shadow-none hover:bg-blue-500/15 transition-colors"
                    >
                        {activeSessionId ? "CONTINUE WORKOUT" : "START WORKOUT"}
                    </GlassBtn>

                    <GlassBtn
                        href="/workouts/history"
                        variant="zinc"
                        className="w-full py-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08]"
                    >
                        Past Workouts
                    </GlassBtn>

                    {/* Botão Criar: Fundo Azul e Borda Tracejada */}
                    <GlassBtn
                        href="/exercises/create"
                        className="w-full py-3 rounded-xl border border-dashed border-blue-400/40 bg-blue-600/[0.04] text-blue-400/90 transition-all hover:bg-blue-600/[0.1] hover:border-blue-400/60"
                    >
                        <span className="text-[10px] tracking-widest font-black uppercase">
                            + Create New Exercise
                        </span>
                    </GlassBtn>
                </div>

                {/* PAINEL DE STATUS & MÉTRICAS */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Card de Volume Semanal */}
                    <div className="col-span-2 bg-emerald-500/[0.05] border border-emerald-500/30 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-3">
                            Weekly Load Volume
                        </span>

                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black italic text-white leading-none">
                                {weeklyVolume.toLocaleString()}
                            </span>
                            <span className="text-sm font-black text-emerald-500">
                                KG
                            </span>
                        </div>

                        <p className="text-[9px] text-zinc-500 uppercase mt-4 tracking-[0.2em] font-bold">
                            Total effort • Last 7 Days
                        </p>
                    </div>

                    {/* Cards de Info */}
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col items-center">
                        <span className="text-[8px] font-black uppercase text-zinc-500 tracking-widest mb-1">
                            Date
                        </span>
                        <span className="text-xs font-bold text-white uppercase">
                            {currentDate}
                        </span>
                    </div>

                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col items-center">
                        <span className="text-[8px] font-black uppercase text-zinc-500 tracking-widest mb-1">
                            System Time
                        </span>
                        <span className="text-xs font-bold text-white">
                            {currentTime}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
