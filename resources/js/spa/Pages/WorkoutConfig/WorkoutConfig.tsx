import React from "react";
import GlassBtn from "@/Components/Shared/GlassBtn";
import PageTitle from "@/Components/Shared/PageTitle";

const WorkoutConfig = () => {
    return (
        <div className="flex flex-col justify-center h-full gap-4">
            <header className="mb-4  text-center">
                <PageTitle>Configuration</PageTitle>
                <p className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.2em] italic mt-1">
                    System & Data Management
                </p>
            </header>

            <div className="space-y-4">
                {/* Gestão de Exercícios */}
                <GlassBtn
                    to="/exercises"
                    variant="system"
                    className="w-full py-7 rounded-2xl"
                >
                    <span className="text-[11px] tracking-[0.5em] font-black uppercase italic text-white">
                        Exercises Library
                    </span>
                </GlassBtn>

                {/* Gestão de Templates - AGORA É UM BOTÃO QUE LEVA À LISTA */}
                <GlassBtn
                    to="/workout/config/templates"
                    variant="performance"
                    className="w-full py-7 rounded-2xl"
                >
                    <span className="text-[11px] tracking-[0.5em] font-black uppercase italic text-performance">
                        Workout Templates
                    </span>
                </GlassBtn>

                {/* Utilidade de Sincronização */}
                <GlassBtn
                    variant="zinc"
                    className="w-full py-7 rounded-2xl border-white/5 opacity-60"
                >
                    <span className="text-[10px] tracking-[0.3em] font-bold uppercase italic text-zinc-500">
                        Sync to PC
                    </span>
                </GlassBtn>
            </div>
        </div>
    );
};

export default WorkoutConfig;
