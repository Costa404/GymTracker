import React from "react";
import { Link } from "@inertiajs/react";

interface HeaderWorkoutSessionProps {
    workout: {
        name: string;
    };
}

const HeaderWorkoutSession = ({ workout }: HeaderWorkoutSessionProps) => {
    return (
        <header className=" p">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Badge de Status LIVE: Alinhado com o tema Performance */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-performance/5 border border-performance/15 rounded-xl backdrop-blur-sm">
                        {/* Dot Pulsante com a variável oficial */}
                        <span className="w-1.5 h-1.5 bg-performance rounded-full animate-pulse shadow-[0_0_8px_var(--color-performance)]" />

                        <p className="text-[9px] text-performance-light font-black uppercase tracking-[0.25em] italic">
                            {workout.name}{" "}
                            <span className="opacity-50 ml-1">// LIVE</span>
                        </p>
                    </div>
                </div>

                {/* Console/Settings Link: Estilo Glassmorphism */}
                <Link
                    href="/workouts/setup"
                    className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all backdrop-blur-md"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5" /* Um pouco mais grosso para parecer UI de sistema */
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                    </svg>
                </Link>
            </div>
        </header>
    );
};

export default HeaderWorkoutSession;
