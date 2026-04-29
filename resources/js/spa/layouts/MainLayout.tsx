import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // Substitui o Inertia
import Navbar from "@/Components/Shared/Navbar"; // Mantemos o teu Navbar original

interface Props {
    children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
    // Na SPA, usamos o hook do React Router para saber onde estamos
    const location = useLocation();
    const url = location.pathname;

    // A tua lógica mantém-se intocável
    const isFullPage =
        url.startsWith("/auth") || url === "/" || url === "/workouts/setup";

    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }, [url]);

    return (
        <div className="fixed inset-0 bg-black overflow-hidden font-sans antialiased text-gray-300">
            {/* Background Glow */}
            <div
                className="absolute inset-x-0 top-0 h-[500px] pointer-events-none z-0 opacity-30"
                style={{
                    background:
                        "radial-gradient(circle at top, var(--color-system) 0%, transparent 70%)",
                }}
            />

            {!isFullPage && <Navbar />}

            {isFullPage ? (
                <main className="absolute inset-0 flex flex-col justify-center">
                    <div className="w-full max-w-md mx-auto px-6">
                        {children}
                    </div>
                </main>
            ) : (
                <main
                    ref={mainRef}
                    className="absolute inset-0 overflow-y-auto no-scrollbar"
                    style={{
                        paddingTop: "calc(env(safe-area-inset-top) + 3.5rem)",
                        clipPath:
                            "inset(calc(env(safe-area-inset-top) + 2.5rem) 0 0 0)",
                    }}
                >
                    <div className="max-w-md mx-auto px-6 pb-20">
                        {children}
                    </div>
                </main>
            )}

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        .no-scrollbar::-webkit-scrollbar { display: none; }
                        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    `,
                }}
            />
        </div>
    );
};

export default MainLayout;
