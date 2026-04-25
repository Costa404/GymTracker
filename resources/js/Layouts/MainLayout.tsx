import Navbar from "@/Components/Shared/Navbar";
import { usePage } from "@inertiajs/react";

// function MainLayout({ children }) {
//     const { url } = usePage();
//     const isPinPage = url.startsWith("/login-pin");

//     return (
//         <div className="text-gray-300 font-sans antialiased bg-black overflow-x-hidden min-h-screen relative">
//             {/* 1. GLOW GLOBAL (O NOVO CORAÇÃO DA APP) */}
//             {/* Z-0: Fica atrás de todo o conteúdo para não bloquear cliques */}

//             <div
//                 className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[70vh] pointer-events-none z-0 opacity-20"
//                 style={{
//                     background:
//                         "radial-gradient(circle at top, var(--color-system) 0%, transparent 85%)",
//                 }}
//             />

//             {/* 2. NAVBAR (Z-50: Sempre no topo) */}
//             {!isPinPage && <Navbar />}

//             {/* 3. IMAGEM DE FUNDO (COMENTADA) */}
//             {/* {!isPinPage && (
//                 <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden opacity-30">
//                     <div className="absolute bottom-0 left-0 right-0 h-[60%]">
//                         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
//                         <img
//                             src="/img/gym.jpg"
//                             className="w-full h-full object-contain object-bottom grayscale blur-[1px]"
//                             alt=""
//                         />
//                     </div>
//                 </div>
//             )}
//             */}

//             {/* 4. CONTEÚDO PRINCIPAL (Z-10: Acima do Glow) */}
//             <main
//                 className={`relative z-10 min-h-screen no-scrollbar overflow-y-auto ${!isPinPage ? "pt-14" : ""} px-0`}
//             >
//                 {/* Mantive o px-6 para garantir o alinhamento uniforme que discutimos */}
//                 <div className={!isPinPage ? "max-w-md mx-auto px-6" : ""}>
//                     {children}
//                 </div>
//             </main>

//             <style
//                 dangerouslySetInnerHTML={{
//                     __html: `
//                 .no-scrollbar::-webkit-scrollbar { display: none; }
//                 .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//                 body { background-color: black; -webkit-tap-highlight-color: transparent; }
//             `,
//                 }}
//             />
//         </div>
//     );
// }

// export default MainLayout;

function MainLayout({ children }) {
    const { url } = usePage();
    const isPinPage = url.startsWith("/auth");

    return (
        <div className="fixed inset-0 bg-black overflow-hidden font-sans antialiased text-gray-300">
            {/* 1. O GLOW (Z-0) */}
            {!isPinPage && (
                <div
                    className="absolute inset-x-0 top-0 h-[500px] pointer-events-none z-0 opacity-30"
                    style={{
                        background:
                            "radial-gradient(circle at top, var(--color-system) 0%, transparent 70%)",
                    }}
                />
            )}

            {/* 2. NAVBAR (Z-50) */}
            {!isPinPage && <Navbar />}

            {/* 3. MAIN */}
            {isPinPage ? (
                <main className="absolute inset-0 flex items-center justify-center">
                    {children}
                </main>
            ) : (
                <main
                    className="absolute inset-0 overflow-y-auto no-scrollbar"
                    style={{
                        paddingTop: "calc(env(safe-area-inset-top) + 4.5rem)",
                        clipPath:
                            "inset(calc(env(safe-area-inset-top) + 2.5rem) 0 0 0)",
                    }}
                >
                    <div className="max-w-md mx-auto px-6 py-3 pb-20">
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
