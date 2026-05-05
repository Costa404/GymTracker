import { useNavigate } from "react-router-dom";
import GlassBtn from "./Shared/GlassBtn";

const WebAuthnTest = () => {
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
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

    const handleLogout = async () => {
        await window.axios.post("/api/auth/logout");
        localStorage.removeItem("pin_verified");
        navigate("/auth");
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
