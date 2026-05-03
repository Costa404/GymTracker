import PageTitle from "@/Components/Shared/PageTitle"; // <- ADICIONADO

interface TemplateHeaderProps {
    onSave: () => void;
    isSaving: boolean;
    isDisabled: boolean;
}

const TemplateHeader = ({
    onSave,
    isSaving,
    isDisabled,
}: TemplateHeaderProps) => {
    return (
        <div className="flex items-center justify-between pt-4 pb-2 ">
            {/* Uso do teu componente padronizado */}
            <PageTitle>New Template</PageTitle>

            <button
                onClick={onSave}
                disabled={isDisabled || isSaving}
                // Adicionado p-2 para aumentar a hitbox tátil em mobile, e active:scale-95
                className={`p-2 transition-all duration-300 flex items-center gap-2 group active:scale-95 ${
                    isDisabled
                        ? "opacity-20 grayscale cursor-not-allowed"
                        : "opacity-100"
                }`}
            >
                <div className="flex flex-col items-end">
                    <span
                        className={`font-black italic text-[11px] uppercase tracking-widest transition-colors ${
                            isDisabled ? "text-zinc-500" : "text-performance"
                        }`}
                    >
                        {isSaving ? "SYNCING..." : "FINISH"}
                    </span>
                    <div
                        className={`h-[2px] transition-all duration-500 bg-performance mt-0.5 ${
                            isDisabled ? "w-0" : "w-full"
                        }`}
                    />
                </div>
            </button>
        </div>
    );
};

export default TemplateHeader;
