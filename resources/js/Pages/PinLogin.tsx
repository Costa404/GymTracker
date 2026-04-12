import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";

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

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 font-sans antialiased">
            <Head title="System Locked" />

            {/* Content Container - Sem border ou background */}
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

                {/* Input Section - Mais compacta */}
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
