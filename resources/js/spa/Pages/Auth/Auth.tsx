import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import FaceIdAuth from "./FaceIdAuth";
import PinLogin from "./PinLogin";

const Auth = () => {
    const [mode, setMode] = useState<"faceid" | "pin">("faceid");

    return (
        // h-[100dvh] e overflow-hidden para não haver scroll nem bailoiço
        <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-black relative overflow-hidden antialiased font-sans">
            <Head title="System Locked" />

            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            {/* O Bloco Único - Tudo junto verticalmente */}
            <div className="z-10 w-full max-w-xs flex flex-col items-center space-y-2">
                {/* Header */}
                <div className="space-y-4 text-center">
                    <h1 className="text-white font-black text-2xl tracking-tighter italic opacity-80">
                        GYM<span className="text-blue-500">TRACKER</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 h-4">
                        <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                        <p className="uppercase text-[8px] font-black tracking-[0.6em] text-zinc-600">
                            {mode === "faceid"
                                ? "Private System"
                                : "Manual Security"}
                        </p>
                    </div>
                </div>

                {/* Conteúdo (Face ID ou PIN) - Espaço fixo para não saltar */}
                <div className="min-h-[160px] flex flex-col items-center justify-center w-full">
                    {mode === "faceid" ? (
                        <div className="flex flex-col items-center gap-8 w-full animate-in fade-in zoom-in duration-300">
                            <FaceIdAuth />
                            <button
                                onClick={() => setMode("pin")}
                                className="text-[8px] text-zinc-600 uppercase tracking-[0.4em] font-black hover:text-zinc-300 transition-colors"
                            >
                                Use PIN Code
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-8 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <PinLogin />
                            <button
                                onClick={() => setMode("faceid")}
                                className="text-[8px] text-zinc-600 uppercase tracking-[0.4em] font-black hover:text-blue-500 transition-colors"
                            >
                                ← Back to Face ID
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer - Colado ao grupo */}
                <div className="flex flex-col items-center gap-4 opacity-20">
                    <div className="h-[1px] w-12 bg-zinc-800" />
                    <p className="text-[7px] text-zinc-800 uppercase tracking-[0.4em] font-black">
                        Authorized Access
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
