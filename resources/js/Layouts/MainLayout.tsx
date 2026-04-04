import Navbar from "@/Components/Navbar";

function MainLayout({ children }) {
    return (
        <div className="text-gray-300 font-sans antialiased bg-black overflow-x-hidden min-h-screen">
            {/* Navbar Fixa */}
            <Navbar />

            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-[75%]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-10"></div>
                    <img
                        src="/img/gym.jpg"
                        className="w-full h-full object-contain opacity-30 grayscale"
                        alt="Background"
                    />
                </div>
            </div>

            <main className="relative z-10 min-h-screen pt-20 no-scrollbar overflow-y-auto">
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
