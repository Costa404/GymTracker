import { useState } from "react";
import {
    startAuthentication,
    browserSupportsWebAuthn,
} from "@simplewebauthn/browser";
import GlassBtn from "@/spa/Components/Shared/GlassBtn";
import { useAuthStore } from "@/spa/hooks/useAuthStore";
import { getCsrfToken } from "@/spa/hooks/csrf";

const LoginFaceId = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const login = useAuthStore((state) => state.login);

    const handleFaceId = async () => {
        if (isProcessing) return;

        try {
            const options = await fetch("/webauthn/login/options", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-XSRF-TOKEN": getCsrfToken(),
                },
            }).then((r) => r.json());

            const assertion = await startAuthentication(options);

            setIsProcessing(true);

            await fetch("/webauthn/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-XSRF-TOKEN": getCsrfToken(),
                },
                body: JSON.stringify(assertion),
            });

            setTimeout(() => {
                login();
            }, 1000);
        } catch (error: any) {
            setIsProcessing(false);
            if (error.name !== "NotAllowedError") {
                alert("Erro na autenticação");
            }
        }
    };

    if (!browserSupportsWebAuthn()) return null;

    return (
        <>
            {isProcessing && (
                <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
                    <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/80 italic animate-pulse">
                        Verifying
                    </p>
                </div>
            )}

            <div className="flex flex-col items-center gap-3">
                <GlassBtn
                    type="button"
                    onClick={handleFaceId}
                    variant="default"
                    className={`gap-3 px-8 py-4 rounded-2xl border text-[10px] uppercase tracking-[0.2em] touch-manipulation
                        ${
                            isProcessing
                                ? "opacity-20 pointer-events-none"
                                : "border-blue-500/20 bg-blue-500/[0.03] text-blue-400 active:bg-blue-500/10 active:border-blue-500/40"
                        }
                    `}
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
                </GlassBtn>
            </div>
        </>
    );
};

export default LoginFaceId;
