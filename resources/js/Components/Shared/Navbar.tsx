import { Link, usePage } from "@inertiajs/react";
import TimerDisplay from "./TimerDisplay";

import { CgGym } from "react-icons/cg";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

function Navbar() {
    const { url } = usePage();
    const isDashboard = url === "/" || url === "/dashboard";
    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-md border-b border-white/[0.08] z-[100] h-14">
            <div className="max-w-md mx-auto h-full flex justify-between items-center px-4">
                {/* LADO ESQUERDO: TELEMETRIA (Ícone + Timer) */}
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                        <Link
                            href="/"
                            className="group inline-flex items-center"
                        >
                            <h1 className="text-2xl font-black tracking-tighter italic">
                                {/* Parte "my" em branco limpo */}
                                <span className="text-white opacity-90 group-hover:opacity-100 transition-opacity">
                                    my
                                </span>

                                {/* Parte "Gym" com efeito Blue Glass */}
                                <span className="relative ml-0.5 ">
                                    <span className="text-blue-500/80 drop-shadow-[0_0_4px_rgba(59,130,246,0.6)]">
                                        Gym
                                    </span>
                                </span>
                            </h1>
                        </Link>
                    </div>
                    {/* timer só aparece se tiver sessão ativa, para não poluir visualmente quando não estiver em treino */}{" "}
                </div>

                {/* LADO DIREITO: HOME / DASHBOARD */}
                <div className="flex items-center">
                    {activeSessionId ? (
                        <TimerDisplay />
                    ) : (
                        <Link
                            href="/"
                            className={`p-2 rounded-xl transition-all duration-300 active:scale-90 ${
                                isDashboard
                                    ? "text-blue-500 bg-blue-500/5 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                                    : "text-zinc-700 border border-transparent opacity-60 hover:opacity-100"
                            }`}
                        >
                            <svg
                                className="h-5 w-5"
                                fill={isDashboard ? "currentColor" : "none"}
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
