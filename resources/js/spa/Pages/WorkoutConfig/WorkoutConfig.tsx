import React from "react";

import { useAuthStore } from "@/spa/hooks/useAuthStore";
import RegisterFaceId from "../Auth/RegisterFaceId";
import PageTitle from "@/spa/Components/Shared/PageTitle";
import GlassBtn from "@/spa/components/Shared/GlassBtn";
import { useNavigate } from "react-router-dom";
import { SyncButton } from "@/spa/hooks/SyncData/SyncButton";

const WorkoutConfig = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        try {
            // 1. Avisamos o servidor primeiro
            await fetch("/api/auth/logout", { method: "POST" });
        } catch (error) {
            console.error("Erro ao encerrar sessão no servidor", error);
        } finally {
            logout();
            navigate("/");
        }
    };
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
                <SyncButton />
                <RegisterFaceId />
                <GlassBtn
                    variant="red"
                    onClick={handleLogout}
                    className="w-full py-6 rounded-2xl border border-red-500/20 bg-red-500/5 !text-red-500 active:bg-red-500/10 active:border-red-500/40 flex items-center justify-center disabled:opacity-0"
                >
                    <span className="text-red-500 text-[11px] font-black uppercase tracking-widest italic">
                        Logout
                    </span>
                </GlassBtn>
            </div>
        </div>
    );
};

export default WorkoutConfig;
