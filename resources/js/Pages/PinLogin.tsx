import React, { useState } from "react";
import { router, Head, usePage } from "@inertiajs/react";

const PinLogin = () => {
    const [pin, setPin] = useState("");
    const { errors } = usePage().props as any;
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin.length < 6) return; // Evita submeter se não estiver completo

        setLoading(true);

        router.post(
            "/login-pin",
            { pin },
            {
                onError: () => {
                    setLoading(false);
                    setPin(""); // Limpa o PIN em caso de erro para nova tentativa
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-8 relative overflow-hidden">
            <Head title="Unlock - Command Center" />

            <div className="w-full max-w-sm z-10 space-y-8 text-center">
                <div className="space-y-2">
                    <h1 className="text-white font-black text-3xl tracking-tighter italic">
                        GYM<span className="text-emerald-500">TRACKER</span>
                    </h1>
                    <p className="text-zinc-500 uppercase text-[10px] font-black tracking-[0.4em]">
                        Private Command Center
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="password"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={6} // Limita a 6 caracteres
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className={`w-full bg-white/[0.03] border ${
                                errors.pin
                                    ? "border-red-500/50"
                                    : "border-white/10"
                            } rounded-[2rem] py-6 text-center text-3xl text-white tracking-[0.3em] focus:outline-none focus:border-emerald-500/40 transition-all backdrop-blur-md`}
                            placeholder="••••••" // Placeholder com 6 pontos
                            autoFocus
                        />
                        {errors.pin && (
                            <p className="text-red-500 text-[10px] font-bold uppercase mt-2 tracking-widest">
                                {errors.pin}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || pin.length !== 6} // Só ativa com exatamente 6 dígitos
                        className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all border
                            ${
                                loading
                                    ? "bg-zinc-800 border-zinc-700 text-zinc-500 cursor-wait"
                                    : pin.length === 6
                                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                      : "bg-white/5 border-white/5 text-zinc-600 cursor-not-allowed"
                            }`}
                    >
                        {loading ? "Authorizing..." : "Unlock System"}
                    </button>
                </form>

                <p className="text-[8px] text-zinc-600 uppercase tracking-widest font-bold">
                    Secure Session • Encrypted Access
                </p>
            </div>
        </div>
    );
};

export default PinLogin;
