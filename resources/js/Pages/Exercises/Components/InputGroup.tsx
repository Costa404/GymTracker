import { InputGroupProps } from "@/types";

// Adicionamos 'lastSets' que será o array [75, 75, 70] vindo do Controller
export const InputGroup = ({
    label,
    value,
    onChange,
    suffix,
    placeholder = "0",
    lastSets = [], // Default para array vazio para não dar erro no .map()
}: InputGroupProps & { lastSets?: (string | number)[] }) => (
    <div className="group border-b border-white/10 focus-within:border-cyan-400 transition-all pb-2">
        {/* HEADER: Label e a "Escada" de séries anteriores */}
        <div className="flex flex-col mb-2 px-1 gap-1.5">
            <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] group-focus-within:text-cyan-400 transition-colors italic leading-none">
                {label}
            </label>

            {/* Renderiza os badges apenas se existirem dados na DB */}
            {lastSets && lastSets.length > 0 && (
                <div className="flex items-center gap-1.5">
                    <span className="text-[7px] font-black text-zinc-700 uppercase italic leading-none mr-0.5 shrink-0">
                        Last:
                    </span>
                    {lastSets.slice(0, 3).map((val, idx) => (
                        <div
                            key={idx}
                            className="bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded shrink-0"
                        >
                            <span className="text-[9px] font-black text-emerald-400 italic leading-none">
                                {val}
                                {suffix?.toLowerCase()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* INPUT PRINCIPAL: Grande e com impacto */}
        <div className="flex items-baseline gap-2">
            <input
                type="number"
                step="0.5"
                inputMode="decimal"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent text-5xl font-black italic outline-none text-white placeholder:text-zinc-900 border-none p-0 focus:ring-0 leading-none"
                placeholder={placeholder}
            />
            {suffix && (
                <span className="text-[12px] font-black text-cyan-400 italic uppercase">
                    {suffix}
                </span>
            )}
        </div>
    </div>
);
