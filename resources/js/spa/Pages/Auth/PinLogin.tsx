import { useAuthStore } from "@/spa/hooks/useAuthStore";
import { useState, useEffect, useRef } from "react";

const PinLogin = () => {
    const login = useAuthStore((state) => state.login);
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const processingRef = useRef(false);

    useEffect(() => {
        if (pin.length !== 6 || processingRef.current) return;

        const authenticate = async () => {
            processingRef.current = true;
            setLoading(true);
            setError("");

            try {
                const response = await fetch("/api/auth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ pin }),
                });

                const body = await response.json();

                if (body.authenticated === true) {
                    login(); // ← zustand + persist trata do localStorage e re-renderiza o RoutesApp
                } else {
                    setError("PIN invalid");
                    setPin("");
                }
            } catch {
                setError("Erro de ligação");
                setPin("");
            } finally {
                processingRef.current = false;
                setLoading(false);
            }
        };

        authenticate();
    }, [pin]);

    return (
        <div className="space-y-6">
            <div className="relative max-w-[240px] mx-auto">
                <input
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    disabled={loading}
                    className="w-full bg-blue-500/[0.03] border border-blue-500/20 rounded-2xl py-4 text-center text-3xl text-white tracking-[0.4em] focus:outline-none disabled:opacity-40 transition-opacity"
                    placeholder="••••••"
                    autoFocus
                />
            </div>
            {error && (
                <p className="text-red-500/80 text-[9px] font-bold uppercase text-center tracking-widest">
                    {error}
                </p>
            )}
        </div>
    );
};

export default PinLogin;
