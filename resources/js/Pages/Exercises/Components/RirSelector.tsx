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
    <div className="mt-8 space-y-3">
        <label className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.4em] ml-1 italic">
            Intensity / Effort
        </label>

        <div className="flex flex-wrap gap-2">
            {rirOptions.map((opt) => (
                <button
                    key={opt.value}
                    type="button"
                    onClick={() => onSelect(opt.value)}
                    className={`flex-1 min-w-[65px] py-4 rounded-2xl border text-[10px] font-black italic transition-all backdrop-blur-xl uppercase tracking-tighter
                        ${
                            currentRir === opt.value
                                ? opt.activeClass
                                : "bg-white/[0.02] border-white/5 text-zinc-700 hover:border-white/10"
                        }`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    </div>
);
