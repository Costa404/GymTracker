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
        <button onClick={handleRegister}>🚀 Ativar Face ID (via iPhone)</button>
    );
};
export default WebAuthnTest;
