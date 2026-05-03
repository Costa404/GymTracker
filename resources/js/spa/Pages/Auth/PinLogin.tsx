import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PinLogin = () => {
    const navigate = useNavigate();

    // 1. Estados locais em vez do useForm do Inertia
    const [pin, setPin] = useState("");
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const authenticate = async () => {
            if (pin.length === 6 && !processing) {
                setProcessing(true);
                setError(""); // Limpa erros anteriores

                try {
                    /*
                     * 2. Lógica de Autenticação SPA
                     * Aqui deves fazer o pedido à tua API (ex: Laravel Sanctum/Passport)
                     * Se usares apenas uma validação local simples, substitui o bloco fetch.
                     */
                    const response = await fetch("/api/auth", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify({ pin }),
                    });

                    if (response.ok) {
                        // Sucesso: Vai para o Dashboard
                        navigate("/");
                    } else {
                        // Falha: Mostra erro e limpa o PIN
                        setError("Invalid PIN");
                        setPin("");
                    }
                } catch (err) {
                    setError("Connection error");
                    setPin("");
                } finally {
                    setProcessing(false);
                }
            }
        };

        authenticate();
    }, [pin, processing, navigate]);

    return (
        <div className="space-y-6">
            <div className="relative max-w-[240px] mx-auto">
                <input
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    disabled={processing}
                    className="w-full bg-blue-500/[0.03] border border-blue-500/20 rounded-2xl py-4 text-center text-3xl text-white tracking-[0.4em] focus:outline-none"
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
