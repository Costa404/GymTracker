import { startRegistration } from "@simplewebauthn/browser";
import { router } from "@inertiajs/react";

// WebAuthnTest.tsx
const WebAuthnTest = () => {
    const handleRegister = async () => {
        try {
            // Usa window.axios — já tem as configurações correctas
            const { data: options } = await window.axios.get(
                "/webauthn/register/options",
            );

            const { startRegistration } =
                await import("@simplewebauthn/browser");
            const attestation = await startRegistration(options);

            await window.axios.post("/webauthn/register", attestation);
            alert("Face ID registado com sucesso!");
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    return (
        <>
            <button onClick={handleRegister}>
                🚀 Ativar Face ID (via iPhone)
            </button>
            <button
                onClick={() => router.post("/logout")}
                className="w-full py-3 rounded-xl border border-red-500/30 bg-red-500/5 text-red-400/70 text-[9px] font-black uppercase tracking-widest hover:bg-red-500/10"
            >
                Logout
            </button>
        </>
    );
};
export default WebAuthnTest;
