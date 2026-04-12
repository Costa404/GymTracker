import Navbar from "@/Components/Shared/Navbar";
import { usePage } from "@inertiajs/react";

function MainLayout({ children }) {
    const { url } = usePage();

    // Verifica se estamos na página de login do PIN
    const isPinPage = url.startsWith("/login-pin");

    return (
        <div className="text-gray-300 font-sans antialiased bg-black overflow-x-hidden min-h-screen">
            {/* 1. Só mostra a Navbar se NÃO for a página do PIN */}
            {!isPinPage && <Navbar />}

            {/* 2. Só mostra a imagem de fundo e o degradê se NÃO for a página do PIN */}
            {!isPinPage && (
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-[80%]">
                        {/* Gradiente mais dramático para fundir com o topo e fundo */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black z-10"></div>

                        <img
                            src="/img/gym.jpg"
                            className="w-full h-full object-contain object-bottom opacity-[0.08] grayscale blur-[2px] transition-opacity duration-1000"
                            alt="Background"
                        />
                    </div>

                    {/* Vinheta extra nas laterais para focar o conteúdo no centro */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,black_90%)] z-10 opacity-60"></div>
                </div>
            )}

            {/* 3. Ajuste do Padding Top: no PIN não queremos o espaço da Navbar (pt-16) */}
            <main
                className={`relative z-10 min-h-screen no-scrollbar overflow-y-auto ${!isPinPage ? "pt-16" : ""}`}
            >
                {children}
            </main>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                body { -webkit-tap-highlight-color: transparent; }
            `,
                }}
            />
        </div>
    );
}

export default MainLayout;
