interface RirOption {
    label: string;
    value: string;
    activeClass: string;
}

const rirOptions: RirOption[] = [
    {
        label: "FAIL",
        value: "F",
        activeClass:
            "bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)]",
    },
    {
        label: "RIR 0",
        value: "0",
        activeClass:
            "bg-cyan-500/20 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]",
    },
    {
        label: "RIR 1",
        value: "1",
        activeClass:
            "bg-white/10 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    },
    {
        label: "RIR 2",
        value: "2",
        activeClass:
            "bg-white/10 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    },
];

export const RirSelector = ({
    currentRir,
    onSelect,
}: {
    currentRir: string;
    onSelect: (v: string) => void;
}) => (
    <div className="mt-4 flex items-center gap-4 bg-black/20 border border-white/5 p-1 rounded-xl backdrop-blur-md">
        {/* Label lateral fixa para poupar altura vertical */}
        <div className="pl-2 pr-1 border-r border-white/5">
            <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest italic leading-none block">
                Intense
            </label>
            <label className="text-[7px] font-black uppercase text-zinc-600 tracking-widest italic leading-none block">
                Effort
            </label>
        </div>

        <div className="flex flex-1 gap-1">
            {rirOptions.map((opt) => {
                const isActive = currentRir === opt.value;
                return (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => onSelect(opt.value)}
                        // Se estiver ativo, usamos uma cor de fundo sólida e texto contrastante
                        className={`flex-1 py-2 rounded-lg text-[10px] font-black italic transition-all uppercase tracking-tighter
                            ${
                                isActive
                                    ? opt.value === "F"
                                        ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] scale-[1.02]"
                                        : "bg-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-[1.02]"
                                    : "text-zinc-500 hover:text-zinc-400 hover:bg-white/[0.05]"
                            }`}
                    >
                        {opt.label.replace("RIR ", "")}
                    </button>
                );
            })}
        </div>
    </div>
);
