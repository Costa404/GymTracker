import React from "react";
import { Link } from "@inertiajs/react";

interface HeaderWorkoutSessionProps {
    workout: {
        name: string;
    };
}

const HeaderWorkoutSession = ({ workout }: HeaderWorkoutSessionProps) => {
    return (
        <header className="mb-3 pt-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Badge de Status LIVE */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <p className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em]">
                            {workout.name} // LIVE
                        </p>
                    </div>
                </div>

                {/* Console/Settings Link */}
                <Link
                    href="/workouts/setup"
                    className="p-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-zinc-500 active:scale-95 transition-all"
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
                            strokeWidth="2"
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                    </svg>
                </Link>
            </div>
        </header>
    );
};

export default HeaderWorkoutSession;
