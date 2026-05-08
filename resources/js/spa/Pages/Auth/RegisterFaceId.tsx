import { useAuthStore } from "@/spa/hooks/useAuthStore";
import { getCsrfToken } from "../../hooks/csrf";
import GlassBtn from "../../components/Shared/GlassBtn";

const RegisterFaceId = () => {
    const handleRegister = async () => {
        try {
            const options = await fetch("/webauthn/register/options", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "X-XSRF-TOKEN": getCsrfToken(),
                },
            }).then((r) => r.json());

            const { startRegistration } =
                await import("@simplewebauthn/browser");
            const attestation = await startRegistration(options);

            await fetch("/webauthn/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-XSRF-TOKEN": getCsrfToken(),
                },
                body: JSON.stringify(attestation),
            });

            alert("Face ID registado com sucesso!");
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <GlassBtn
                variant="system"
                onClick={handleRegister}
                className="w-full !py-3"
            >
                Register FaceId
            </GlassBtn>
        </div>
    );
};

export default RegisterFaceId;
