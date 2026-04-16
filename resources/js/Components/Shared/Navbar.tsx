import { Link, usePage } from "@inertiajs/react";
import TimerDisplay from "./TimerDisplay";

import { CgGym } from "react-icons/cg";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

function Navbar() {
    const { url } = usePage();
    const isDashboard = url === "/" || url === "/dashboard";
    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);

    return (
        <nav className="fixed top-7 left-0 right-0 z-[100] h-16 overflow-hidden">
            {/* 3. CONTEÚDO DA NAVBAR */}
            <div className="relative z-20 max-w-md mx-auto h-full flex justify-between items-center px-6">
                <div className="flex items-center gap-3">
                    <Link href="/" className="group inline-flex items-center">
                        <h1 className="text-2xl font-black tracking-tighter italic">
                            <span className="text-white opacity-90 group-hover:opacity-100 transition-opacity">
                                my
                            </span>
                            <span className="ml-0.5 text-system-light font-black italic">
                                Gym
                            </span>
                        </h1>
                    </Link>
                </div>

                <div className="flex items-center">
                    {activeSessionId ? (
                        <TimerDisplay />
                    ) : (
                        <Link
                            href="/"
                            className={`p-2.5 rounded-xl transition-all duration-300 active:scale-90 ${
                                isDashboard
                                    ? "text-system-light bg-system/10 border border-system/20 shadow-[0_0_15px_var(--color-system)/15]"
                                    : "text-zinc-600 border border-transparent opacity-60 hover:opacity-100"
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
