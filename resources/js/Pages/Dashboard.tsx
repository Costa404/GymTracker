import GlassBtn from "@/Components/Shared/GlassBtn";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";
import { Head } from "@inertiajs/react";

// Definimos a interface para as props que vêm do Controller
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

            <div className="relative w-full px-8 space-y-6 max-w-md mx-auto pt-4">
                {/* BOTÕES DE ACÇÃO */}
                <div className="space-y-4">
                    <GlassBtn
                        href="/workouts/setup"
                        variant="blue"
                        className="w-full py-8 rounded-3xl text-lg shadow-[0_10px_30px_rgba(37,99,235,0.2)]"
                    >
                        {activeSessionId ? "Continue Workout" : "Start Workout"}
                    </GlassBtn>

                    <GlassBtn
                        href="/workouts/history"
                        variant="zinc"
                        className="w-full py-5 rounded-2xl"
                    >
                        Past Workouts
                    </GlassBtn>

                    {/* Botão para Adicionar Exercício */}
                    <GlassBtn
                        href="/exercises/create"
                        variant="cyan"
                        className="w-full py-3 opacity-60 hover:opacity-100"
                    >
                        + Create New Exercise
                    </GlassBtn>
                </div>
                {/* PAINEL DE STATUS & MÉTRICAS */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Card de Volume Semanal */}
                    <div className="col-span-2 bg-emerald-500/[0.05] border border-emerald-500/30 rounded-[2rem] p-6 shadow-[0_0_50px_rgba(16,185,129,0.1)] flex flex-col items-center justify-center text-center relative overflow-hidden">
                        {/* Um pequeno detalhe de luz no canto */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 blur-3xl" />

                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                            Weekly Load Volume
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black italic text-white leading-none">
                                {weeklyVolume.toLocaleString()}
                            </span>
                            <span className="text-xs font-black text-emerald-500 uppercase">
                                KG
                            </span>
                        </div>
                        <p className="text-[8px] text-zinc-500 uppercase mt-2 tracking-widest font-bold">
                            Total effort across last 7 days
                        </p>
                    </div>

                    {/* Card de Data/Hora (Apenas para preencher o visual) */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-col items-center">
                        <span className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">
                            Date
                        </span>
                        <span className="text-sm font-black text-white uppercase">
                            {currentDate}
                        </span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-col items-center">
                        <span className="text-[8px] font-black uppercase text-zinc-500 tracking-widest">
                            System Time
                        </span>
                        <span className="text-sm font-black text-white">
                            {currentTime}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
