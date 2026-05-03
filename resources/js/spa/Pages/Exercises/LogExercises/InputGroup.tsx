import { InputGroupProps } from "@/types";

const InputGroup = ({
    label,
    value,
    onChange,
    suffix,
    placeholder = "0",
    lastSets = [],
}: InputGroupProps & { lastSets?: (string | number)[] }) => (
    /* Removido o efeito de hover do grupo, mantendo apenas a transição de foco */
    <div className="group border-b border-white/5 focus-within:border-performance/50 transition-all pb-4">
        <div className="flex flex-col mb-3 gap-2">
            <label className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.2em] group-focus-within:text-performance transition-colors italic leading-none">
                {label}
            </label>

            {lastSets && lastSets.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    <span className="text-[7px] font-black text-zinc-700 uppercase italic leading-none mr-0.5 shrink-0">
                        Last:
                    </span>
                    {lastSets.slice(0, 3).map((val, idx) => (
                        <div
                            key={idx}
                            className="bg-performance/5 border border-performance/10 w-[38px] h-[20px] flex items-center justify-center rounded-md shrink-0"
                        >
                            <span className="text-[9px] font-black text-performance/60 italic leading-none">
                                {val}
                                {label === "Weight" && suffix?.toLowerCase()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>

        <div className="flex items-baseline gap-2 relative">
            <input
                type="number"
                step="0.5"
                inputMode="decimal"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                /* placeholder:text-zinc-900 para contraste em mobile, leading-none para evitar cortes */
                className="w-full bg-transparent text-6xl font-black italic outline-none text-white placeholder:text-zinc-900 border-none p-0 focus:ring-0 leading-none tracking-tighter touch-manipulation"
                placeholder={placeholder}
                autoFocus={label === "Weight"}
            />
            {suffix && (
                <span className="text-[11px] font-black text-performance italic uppercase tracking-widest opacity-70">
                    {suffix}
                </span>
            )}
        </div>
    </div>
);

export default InputGroup;
