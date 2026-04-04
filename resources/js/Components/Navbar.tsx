import { Link, usePage } from "@inertiajs/react";

function Navbar() {
    const { url } = usePage();
    const isDashboard = url === "/" || url === "/dashboard";

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-b border-white/5 z-[100] shadow-2xl shadow-black/50">
            <div className="max-w-md mx-auto flex justify-between items-center px-6 py-5">
                {/* LOGO COM GLOW AZUL */}
                <Link href="/" className="group flex items-center gap-1">
                    <span className="text-white font-black italic tracking-tighter text-xl group-active:scale-95 transition-transform">
                        GYM
                        <span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                            TRACKER
                        </span>
                    </span>
                </Link>

                {/* ICON DE NAVEGAÇÃO GLASS */}
                <div className="flex items-center">
                    <Link
                        href="/"
                        className={`p-2 rounded-xl transition-all duration-300 active:scale-90 ${
                            isDashboard
                                ? "bg-blue-500/10 border border-blue-500/20 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                                : "text-zinc-600 border border-transparent"
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
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
