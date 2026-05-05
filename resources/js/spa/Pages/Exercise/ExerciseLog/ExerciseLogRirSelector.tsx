import React from "react";
import GlassBtn from "@/spa/Components/Shared/GlassBtn";

interface RirOption {
    label: string;
    value: string;
}

const rirOptions: RirOption[] = [
    { label: "FAIL", value: "F" },
    { label: "0", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
];

const ExerciseLogRirSelector = ({
    currentRir,
    onSelect,
}: {
    currentRir: string;
    onSelect: (v: string) => void;
}) => (
    <div className="mt-4 flex items-center gap-3 bg-transparent border border-white/10 p-1 rounded-xl backdrop-blur-sm">
        {/* Label Lateral */}
        <div className="pl-2 pr-2 border-r border-white/10 shrink-0">
            <label className="text-[7px] font-black uppercase text-zinc-500 tracking-widest italic leading-none block">
                Intense
            </label>
            <label className="text-[7px] font-black uppercase text-zinc-500 tracking-widest italic leading-none block">
                Effort
            </label>
        </div>

        {/* Botões */}
        <div className="flex flex-1 gap-1 sm:gap-2">
            {rirOptions.map((opt) => {
                const isActive = currentRir === opt.value;
                const isFail = opt.value === "F";

                const activeClasses = isFail
                    ? "!bg-red-500 !text-black !shadow-[0_0_15px_rgba(239,68,68,0.3)] scale-[0.95]"
                    : "!bg-performance !text-black !shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-[0.95]";

                return (
                    <GlassBtn
                        key={opt.value}
                        variant={
                            isActive
                                ? isFail
                                    ? "red"
                                    : "performance"
                                : "ghost"
                        }
                        onClick={() => onSelect(opt.value)}
                        // ADICIONADO: !px-0 e min-w-0 para permitir que os botões encolham
                        className={`flex-1 min-w-0 !px-0 !py-2.5 !text-[10px] !tracking-tighter italic ${
                            isActive ? activeClasses : "opacity-50"
                        }`}
                    >
                        {opt.label}
                    </GlassBtn>
                );
            })}
        </div>
    </div>
);

export default ExerciseLogRirSelector;
