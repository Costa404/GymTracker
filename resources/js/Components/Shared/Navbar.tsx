import { Link, usePage } from "@inertiajs/react";
import TimerDisplay from "./TimerDisplay";
import { GiWeightLiftingUp } from "react-icons/gi";
import { CgGym } from "react-icons/cg";

function Navbar() {
    const { url } = usePage();
    const isDashboard = url === "/" || url === "/dashboard";

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/60 -xl border-b border-white/[0.05] z-[100] h-14">
            <div className="max-w-md mx-auto h-full flex justify-between items-center px-6">
                {/* LADO ESQUERDO: TELEMETRIA (Ícone + Timer) */}
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center">
                        {/* Glow azul mais focado para não "comer" o ícone */}
                        <div className="absolute inset-0 bg-blue-500/10 blur-sm rounded-full" />
                        <CgGym className="text-blue-500 text-lg relative z-10 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" />
                    </div>

                    {/* Separador Técnico: w-[1px] e h-3 para ser discreto */}
                    <div className="w-[1px] h-3 bg-zinc-800" />

                    {/* O TimerDisplay deve vir "limpo" de fundos próprios agora */}
                    <TimerDisplay />
                </div>

                {/* LADO DIREITO: HOME / DASHBOARD */}
                <div className="flex items-center">
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
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
