import React, { useEffect } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import axios from "axios";
import {
    startAuthentication,
    browserSupportsWebAuthn,
} from "@simplewebauthn/browser";

const PinLogin = () => {
    const { data, setData, post, processing, reset, clearErrors, errors } =
        useForm({
            pin: "",
        });

    useEffect(() => {
        if (data.pin.length === 6 && !processing) {
            post("/login-pin", {
                onError: () => {
                    reset("pin");
                },
            });
        }
    }, [data.pin]);

    const handleFaceId = async () => {
        try {
            // ✅ POST em vez de GET
            const { data: options } = await axios.post(
                "/webauthn/login/options",
            );
            const assertion = await startAuthentication(options);
            await axios.post("/webauthn/login", assertion);
            router.visit("/dashboard");
        } catch (error) {
            console.error("Erro no Face ID:", error);
            alert("Autenticação falhou ou foi cancelada.");
        }
    };
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-6 font-sans antialiased"
            style={{
                marginTop: "calc(-1 * (env(safe-area-inset-top) + 4.5rem))",
            }}
        >
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[120px] rounded-full" />
            </div>
            <Head title="System Locked" />

            <div className="w-full max-w-xs z-10 space-y-10 transition-all duration-500">
                {/* Header Section */}
                <div className="space-y-4 text-center">
                    <h1 className="text-white font-black text-2xl tracking-tighter italic opacity-80">
                        GYM<span className="text-blue-500">TRACKER</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                        <div
                            className={`w-1 h-1 rounded-full ${processing ? "bg-zinc-700" : "bg-blue-500 animate-pulse"}`}
                        />
                        <p className="uppercase text-[8px] font-black tracking-[0.6em] text-zinc-600">
                            {processing ? "Verifying" : "Private System"}
                        </p>
                    </div>
                </div>

                {/* Input Section */}
                <div className="relative max-w-[240px] mx-auto">
                    <input
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        value={data.pin}
                        onChange={(e) => {
                            setData("pin", e.target.value);
                            if (errors.pin) clearErrors("pin");
                        }}
                        disabled={processing}
                        className={`w-full bg-blue-500/[0.03] border ${
                            errors.pin
                                ? "border-red-500/40"
                                : "border-blue-500/20 focus:border-blue-500/60"
                        } rounded-2xl py-4 text-center text-3xl text-white tracking-[0.4em] focus:outline-none transition-all duration-300`}
                        placeholder="••••••"
                        autoFocus
                    />
                    {errors.pin && (
                        <p className="text-red-500/80 text-[9px] font-bold uppercase mt-4 text-center tracking-widest">
                            {errors.pin}
                        </p>
                    )}
                </div>

                {/* Face ID Button — só aparece se o browser suportar */}
                {browserSupportsWebAuthn() && (
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-[1px] w-full max-w-[240px] bg-zinc-900" />
                        <button
                            onClick={handleFaceId}
                            disabled={processing}
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] text-blue-400 text-xs font-bold uppercase tracking-widest hover:border-blue-500/60 hover:bg-blue-500/10 transition-all duration-300 disabled:opacity-30"
                        >
                            {/* Ícone Face ID */}
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
                )}

                {/* Footer Decor */}
                <div className="flex flex-col items-center gap-4">
                    <div className="h-[1px] w-12 bg-zinc-900 overflow-hidden relative">
                        <div
                            className={`absolute inset-0 bg-blue-500 transition-all duration-700 ${processing ? "w-full" : "w-0"}`}
                        />
                    </div>
                    <p className="text-[7px] text-zinc-800 uppercase tracking-[0.4em] font-black">
                        Authorized Access
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PinLogin;
