import Navbar from "@/Components/Shared/Navbar";
import { usePage } from "@inertiajs/react";
import { useEffect, useRef } from "react";

function MainLayout({ children }) {
    const { url } = usePage();

    // Nome mais genérico. Inclui páginas de auth e o dashboard
    // No teu MainLayout.tsx
    const isFullPage =
        url.startsWith("/auth") || url === "/" || url === "/workouts/setup";

    const mainRef = useRef(null);

    useEffect(() => {
        mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }, [url]);

    return (
        <div className="fixed inset-0 bg-black overflow-hidden font-sans antialiased text-gray-300">
            {/* Background Glow: Escondido em páginas full-page se preferires um look mais clean */}

            <div
                className="absolute inset-x-0 top-0 h-[500px] pointer-events-none z-0 opacity-30"
                style={{
                    background:
                        "radial-gradient(circle at top, var(--color-system) 0%, transparent 70%)",
                }}
            />

            {!isFullPage && <Navbar />}

            {isFullPage ? (
                /* AGORA: O Dashboard vai respeitar o max-w-md e o px-6 exatamente como os outros */
                <main className="absolute inset-0 flex flex-col justify-center">
                    <div className="w-full max-w-md mx-auto px-6">
                        {children}
                    </div>
                </main>
            ) : (
                /* Layout Padrão (Mantém-se igual) */
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
}

export default MainLayout;
