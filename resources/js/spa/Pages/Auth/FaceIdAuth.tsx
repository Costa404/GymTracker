import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    startAuthentication,
    browserSupportsWebAuthn,
} from "@simplewebauthn/browser";

const FaceIdAuth = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleFaceId = async () => {
        try {
            // 1. Pedir opções ao Laravel
            const { data: options } = await axios.post(
                "/webauthn/login/options",
            );

            // 2. O iOS/Android abre a janela nativa.
            const assertion = await startAuthentication(options);

            // 3. Ativar o Loading Screen IMEDIATAMENTE após o "visto" verde do sistema
            setIsProcessing(true);

            // 4. Validar no backend
            await axios.post("/webauthn/login", assertion);

            // 5. Delay estratégico para suavizar a transição na SPA
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error: any) {
            setIsProcessing(false);

            // NotAllowedError significa que o user cancelou a face scan
            if (error.name !== "NotAllowedError") {
                alert("Erro na autenticação");
            }
        }
    };

    if (!browserSupportsWebAuthn()) return null;

    return (
        <>
            {/* Overlay de Transição - Essencial para Mobile */}
            {isProcessing && (
                <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
                    <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/50 italic animate-pulse">
                        Verifying
                    </p>
                </div>
            )}

            <div className="flex flex-col items-center gap-3">
                <button
                    onClick={handleFaceId}
                    disabled={isProcessing}
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] italic transition-all duration-200 active:scale-95 active:bg-blue-500/10 active:border-blue-500/40 touch-manipulation disabled:opacity-20"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 3H5a2 2 0 0 0-2 2v4" />
                        <path d="M15 3h4a2 2 0 0 1 2 2v4" />
                        <path d="M9 21H5a2 2 0 0 1-2-2v-4" />
                        <path d="M15 21h4a2 2 0 0 0 2-2v-4" />
                        <path d="M9 9v1" />
                        <path d="M15 9v1" />
                        <path d="M9 15a3 3 0 0 0 6 0" />
                    </svg>
                    Face ID
                </button>
            </div>
        </>
    );
};

export default FaceIdAuth;
