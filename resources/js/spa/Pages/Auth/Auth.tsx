import { useState } from "react";
import FaceIdAuth from "./FaceIdAuth";
import PinLogin from "./PinLogin";
import GlassBtn from "@/spa/Components/Shared/GlassBtn";

const Auth = () => {
    const [mode, setMode] = useState<"faceid" | "pin">("faceid");

    return (
        <div className="h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden antialiased font-sans">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            {/* O Bloco Único - Centralizado */}
            <div className="z-10 w-full max-w-xs flex flex-col items-center space-y-2">
                {/* Header */}
                <div className="space-y-4 text-center">
                    <h1 className="text-white font-black text-5xl tracking-tighter italic opacity-90">
                        my
                        <span className="text-transparent [text-stroke:1px_theme(colors.blue.500)] [-webkit-text-stroke:1px_theme(colors.blue.500)] [filter:drop-shadow(0_0_8px_rgba(59,130,246,0.5))] ml-1">
                            Gym
                        </span>
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
                {/* Conteúdo (Face ID ou PIN) */}
                <div className="min-h-[160px] flex flex-col items-center justify-center w-full">
                    {mode === "faceid" ? (
                        <div className="flex flex-col items-center gap-8 w-full animate-in fade-in zoom-in duration-300">
                            <FaceIdAuth />

                            {/* Botão de Alternância usando GlassBtn */}
                            <GlassBtn
                                variant="ghost"
                                onClick={() => setMode("pin")}
                                className="!border-transparent !bg-transparent !text-zinc-600 !tracking-[0.4em] !text-[8px] active:!text-zinc-300"
                            >
                                Use PIN Code
                            </GlassBtn>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-8 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <PinLogin />

                            {/* Botão de Alternância usando GlassBtn */}
                            <GlassBtn
                                variant="ghost"
                                onClick={() => setMode("faceid")}
                                className="!border-transparent !bg-transparent !text-zinc-600 !tracking-[0.4em] !text-[8px] active:!text-blue-500"
                            >
                                ← Back to Face ID
                            </GlassBtn>
                        </div>
                    )}
                </div>

                {/* Footer Decorativo */}
                <div className="flex flex-col items-center gap-4 opacity-20 pt-4">
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
