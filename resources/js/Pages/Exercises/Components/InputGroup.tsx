import { InputGroupProps } from "@/types";

export const InputGroup = ({
    label,
    value,
    onChange,
    suffix,
    placeholder = "0",
}: InputGroupProps) => (
    <div className="group border-b border-white/10 focus-within:border-cyan-400 transition-all pb-2">
        <label className="text-[10px] font-black uppercase text-zinc-500 mb-2 block tracking-[0.2em] group-focus-within:text-cyan-400 transition-colors italic">
            {label}
        </label>
        <div className="flex items-baseline gap-2">
            <input
                type="number"
                step="0.5"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent text-5xl font-black italic outline-none text-white placeholder:text-zinc-900 border-none p-0 focus:ring-0"
                placeholder={placeholder}
            />
            {suffix && (
                <span className="text-[10px] font-black text-cyan-400 italic uppercase drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                    {suffix}
                </span>
            )}
        </div>
    </div>
);
