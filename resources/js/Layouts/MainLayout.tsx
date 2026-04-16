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
    const isPinPage = url.startsWith("/login-pin");

    return (
        /* O fundo preto fica aqui na base */
        <div className="bg-black min-h-screen relative overflow-x-hidden font-sans antialiased text-gray-300">
            {!isPinPage && <Navbar />}

            <main
                className={`relative z-10 min-h-screen no-scrollbar overflow-y-auto ${!isPinPage ? "pt-14" : ""} px-0`}
            >
                {/* O GLOW ENTRA AQUI: Agora ele faz parte da mesma camada que o conteúdo */}
                {!isPinPage && (
                    <div
                        className="absolute left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none z-0 opacity-25"
                        style={{
                            top: "calc(-1 * env(safe-area-inset-top))",
                            background:
                                "radial-gradient(circle at top, var(--color-system) 0%, transparent 40%)",
                        }}
                    />
                )}
                {/* O CONTEÚDO: Garante que é relativo e z-10 para ficar À FRENTE do novo glow */}
                <div
                    className={`${!isPinPage ? "max-w-md mx-auto px-6 py-4" : ""} relative z-10`}
                >
                    {children}
                </div>
            </main>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                body { background-color: black; }
            `,
                }}
            />
        </div>
    );
}

export default MainLayout;
