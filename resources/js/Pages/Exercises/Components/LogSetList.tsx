export const LogSetList = ({ sets }: { sets: any[] }) => (
    <div className="mt-6 space-y-2 px-1">
        {/* Separador mais discreto para poupar altura */}
        <div className="flex items-center gap-2 mb-4 opacity-30">
            <div className="h-[1px] flex-1 bg-white/20" />
            <span className="text-[7px] font-black uppercase tracking-[0.3em]">
                Sets Added
            </span>
            <div className="h-[1px] flex-1 bg-white/20" />
        </div>

        {[...sets].reverse().map((set, i) => (
            <div
                key={i}
                className="flex items-center justify-between bg-white/[0.03] p-3 rounded-xl border border-white/5"
            >
                {/* Lado Esquerdo: # e Peso */}
                <div className="flex items-center gap-3">
                    <span className="text-[8px] font-bold text-zinc-600">
                        #{sets.length - i}
                    </span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-black italic text-white">
                            {set.weight}
                        </span>
                        <span className="text-[7px] font-bold text-zinc-500 uppercase">
                            kg
                        </span>
                    </div>
                </div>

                {/* Lado Direito: Reps e RIR alinhados */}
                <div className="flex items-center gap-4">
                    <div className="flex items-baseline gap-1">
                        <span className="text-zinc-600 text-[10px] italic">
                            x
                        </span>
                        <span className="text-lg font-black italic text-white">
                            {set.reps}
                        </span>
                    </div>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded text-[7px] font-black text-cyan-400">
                        RIR {set.rir}
                    </div>
                </div>
            </div>
        ))}
    </div>
);
