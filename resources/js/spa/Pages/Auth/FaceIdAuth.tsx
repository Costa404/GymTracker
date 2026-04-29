import React, { useState } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import {
    startAuthentication,
    browserSupportsWebAuthn,
} from "@simplewebauthn/browser";

const FaceIdAuth = () => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFaceId = async () => {
        try {
            // 1. Pedir opções (Ainda não mostramos loader aqui)
            const { data: options } = await axios.post(
                "/webauthn/login/options",
            );

            // 2. O iOS abre a janela nativa.
            // O código "para" aqui enquanto o utilizador olha para o iPhone.
            const assertion = await startAuthentication(options);

            // --- MOMENTO DO "DONE" NO IPHONE ---
            // Assim que o utilizador vê o visto verde, o código continua:

            // 3. Ativar o Loading Screen IMEDIATAMENTE
            setIsProcessing(true);

            // 4. Validar a resposta no Laravel
            await axios.post("/webauthn/login", assertion);

            // 5. Pequena pausa de 1s para o utilizador ver o teu loader e não ser um corte seco
            setTimeout(() => {
                router.visit("/dashboard");
            }, 1000);
        } catch (error: any) {
            // Se falhar ou cancelar, garantimos que o loader desliga
            setIsProcessing(false);

            if (error.name !== "NotAllowedError") {
                alert("Erro na autenticação");
            }
        }
    };

    if (!browserSupportsWebAuthn()) return null;

    return (
        <>
            {/* Overlay de Transição: Reutiliza o teu CSS do Blade */}
            {isProcessing && (
                <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
                    <div className="spinner"></div>
                    <p className="loader-text">Verifying</p>
                </div>
            )}

            <div className="flex flex-col items-center gap-3">
                <button
                    onClick={handleFaceId}
                    disabled={isProcessing}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] text-blue-400 text-xs font-bold uppercase tracking-widest hover:border-blue-500/60 hover:bg-blue-500/10 transition-all duration-300 disabled:opacity-30"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
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
