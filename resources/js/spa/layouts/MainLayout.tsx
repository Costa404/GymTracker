import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/spa/Components/Shared/Navbar";

interface Props {
    children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
    const location = useLocation();
    const url = location.pathname;
    const mainRef = useRef<HTMLElement>(null);

    // 1. Define aqui as rotas que queres centradas
    // Podes adicionar ou remover rotas facilmente neste array
    const centeredRoutes = ["/", "/login", "/workout/setup", "/workout/config"];

    const isCentered = centeredRoutes.includes(url);

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

            <Navbar />

            <main
                ref={mainRef}
                className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col"
                style={{
                    paddingTop: "calc(env(safe-area-inset-top) + 3.5rem)",
                    clipPath:
                        "inset(calc(env(safe-area-inset-top) + 2.5rem) 0 0 0)",
                }}
            >
                {/*
                   O contentor interno expande sempre (flex-1).
                   O justify-center só é aplicado se a rota estiver no array.
                */}
                <div
                    className={`
                    flex-1 flex flex-col w-full max-w-md mx-auto px-6 pb-20
                    ${isCentered ? "justify-center" : "justify-start"}
                `}
                >
                    {children}
                </div>
            </main>

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
