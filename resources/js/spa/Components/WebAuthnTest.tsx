import GlassBtn from "./Shared/GlassBtn";
import { useAuthStore } from "../hooks/useAuthStore";

const WebAuthnTest = () => {
    const logout = useAuthStore((state) => state.logout);

    const handleRegister = async () => {
        try {
            const options = await fetch("/webauthn/register/options", {
                method: "GET",
                headers: { Accept: "application/json" },
            }).then((r) => r.json());

            const { startRegistration } =
                await import("@simplewebauthn/browser");
            const attestation = await startRegistration(options);

            await fetch("/webauthn/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(attestation),
            });

            alert("Face ID register done!");
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        logout();
    };
    return (
        <div className="flex flex-col gap-4">
            {/* Botão de Registo */}
            <GlassBtn
                variant="system"
                onClick={handleRegister}
                className="w-full !py-3"
            >
                🚀 Ativar Face ID (via iPhone)
            </GlassBtn>

            {/* Botão de Logout */}
            <GlassBtn
                variant="red"
                onClick={handleLogout}
                className="w-full !py-3 !text-[9px]"
            >
                Logout
            </GlassBtn>
        </div>
    );
};

export default WebAuthnTest;
