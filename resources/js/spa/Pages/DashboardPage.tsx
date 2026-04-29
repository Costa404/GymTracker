import React from "react";
import GlassBtn from "@/Components/Shared/GlassBtn";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

const DashboardPage = () => {
    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);

    // Volume estático por agora
    const weeklyVolume = 0;

    return (
        <div className="h-full text-white relative overflow-hidden flex flex-col justify-center">
            <div className="relative z-10 w-full flex flex-col gap-4">
                {/* 1. BOTÃO PRINCIPAL (START/CONTINUE) */}
                <GlassBtn
                    to="/workouts/setup"
                    className={`w-full py-8 rounded-[2.5rem] text-lg font-black tracking-[0.2em] italic transition-all border-2
                    ${
                        activeSessionId
                            ? "w-full py-6 rounded-2xl bg-system/5 border border-system/20 text-system-light font-black uppercase italic tracking-widest active:bg-system/10 active:border-system/40 transition-all text-[11px] active:scale-[0.98]"
                            : "bg-performance/10 border-performance/40 text-performance-light shadow-[0_0_20px_var(--color-performance-light)/10]"
                    }`}
                >
                    {activeSessionId ? "CONTINUE WORKOUT " : "START WORKOUT"}
                </GlassBtn>

                {/* 2. BOTÃO PAST WORKOUTS */}
                <GlassBtn
                    to="/workouts/history"
                    variant="zinc"
                    className="w-full py-5 rounded-2xl border-white/10 text-center text-zinc-400 font-bold uppercase text-[10px] tracking-widest transition-all duration-200 hover:bg-white/10 hover:text-white active:bg-white/15 active:scale-[0.98]"
                >
                    Past Workouts
                </GlassBtn>

                {/* 3. BOTÃO CREATE EXERCISE */}
                <GlassBtn
                    to="/exercises/create"
                    variant="system"
                    className="w-full py-4 rounded-xl border border-dashed border-system/30 bg-system/5 text-center text-system-light/70 active:bg-system/10 active:border-system/50 transition-all"
                >
                    <span className="text-[9px] tracking-[0.3em] font-black uppercase">
                        + Create New Exercise
                    </span>
                </GlassBtn>

                {/* 4. PAINEL DE PERFORMANCE (Este não é botão, mantém-se Div) */}
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
        </div>
    );
};

export default DashboardPage;
