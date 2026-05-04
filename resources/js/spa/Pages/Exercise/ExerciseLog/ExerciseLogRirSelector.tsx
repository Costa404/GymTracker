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
    <div className="mt-4 flex items-center gap-3 bg-[#050505] border border-white/5 p-1 rounded-xl">
        <div className="pl-2 pr-2 border-r border-white/5 shrink-0">
            <label className="text-[7px] font-black uppercase text-zinc-700 tracking-widest italic leading-none block">
                Intense
            </label>
            <label className="text-[7px] font-black uppercase text-zinc-700 tracking-widest italic leading-none block">
                Effort
            </label>
        </div>

        <div className="flex flex-1 gap-2">
            {rirOptions.map((opt) => {
                const isActive = currentRir === opt.value;

                const activeStyle =
                    opt.value === "F"
                        ? "bg-red-500 text-black shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                        : "bg-performance text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]";

                return (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => onSelect(opt.value)}
                        className={`flex-1 py-2.5 rounded-lg text-[10px] font-black italic transition-all uppercase tracking-tighter touch-manipulation
                            ${
                                isActive
                                    ? `${activeStyle} scale-[0.95]`
                                    : "text-zinc-600 active:bg-white/10"
                            }`}
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    </div>
);
export default ExerciseLogRirSelector;
