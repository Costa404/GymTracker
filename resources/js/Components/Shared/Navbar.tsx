import { Link, useLocation } from "react-router-dom"; // O Inertia bazou, entra o React Router
import TimerDisplay from "./TimerDisplay";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

function Navbar() {
    // Substituímos o usePage do Inertia pelo useLocation do React Router
    const location = useLocation();
    const url = location.pathname;

    const isDashboard = url === "/" || url === "/dashboard";
    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);

    return (
        <nav className="fixed top-7 left-0 right-0 z-[100] h-22 overflow-hidden">
            <div className="relative z-20 max-w-md mx-auto h-full flex justify-between items-center px-6">
                {/* Logo - Já funciona como botão "Home" */}
                <div className="flex items-center gap-3">
                    {/* Alterado de href para to */}
                    <Link to="/" className="group inline-flex items-center">
                        <h1 className="text-2xl font-black tracking-tighter italic  flex items-center">
                            {/* "my" em branco sólido para contraste */}
                            <span className="text-white">my</span>

                            {/* "Gym" Extravagante: Apenas o contorno limpo, sem sombras */}
                            <span
                                className="ml-1 italic"
                                style={{
                                    color: "transparent",
                                    WebkitTextStroke:
                                        "0.2px var(--color-system)",
                                }}
                            >
                                Gym
                            </span>
                        </h1>
                    </Link>
                </div>
                {/* Área de Ação (Direita) */}
                <div className="flex items-center">
                    {activeSessionId ? (
                        <TimerDisplay />
                    ) : (
                        /* Só mostra a "Casa" se NÃO estivermos no Dashboard */
                        !isDashboard && (
                            // Alterado de href para to
                            <Link
                                to="/"
                                className="p-2.5 rounded-xl text-zinc-500 hover:text-blue-500 transition-all duration-300 active:scale-90"
                                aria-label="Voltar para Dashboard"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
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
                        )
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
