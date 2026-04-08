export const LogSetList = ({ sets }: { sets: any[] }) => (
    <div className="mt-8 space-y-3 px-1">
        {/* Header da Lista: Estilo HUD */}
        <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-cyan-500/60 flex items-center gap-2">
                <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
                Sets Added
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        </div>

        {[...sets].reverse().map((set, i) => (
            <div
                key={i}
                className="group relative overflow-hidden rounded-xl p-[1px] transition-all duration-300"
            >
                {/* Borda de Vidro Subtil (Sempre acesa) */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-cyan-500/10" />

                {/* Conteúdo do Set */}
                <div className="relative bg-zinc-950/80  rounded-xl p-3 flex items-center justify-between">
                    {/* Lado Esquerdo: Badge e Peso */}
                    <div className="flex items-center gap-4">
                        <div className="w-7 h-7 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center">
                            <span className="text-[9px] font-black text-zinc-600">
                                #{sets.length - i}
                            </span>
                        </div>

                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black italic text-white tracking-tighter">
                                {set.weight}
                            </span>
                            <span className="text-[8px] font-bold text-cyan-500 uppercase tracking-widest">
                                kg
                            </span>
                        </div>
                    </div>

                    {/* Centro: Divisor Visual */}
                    <div className="h-4 w-[1px] bg-zinc-800" />

                    {/* Lado Direito: Reps e RIR */}
                    <div className="flex items-center gap-5">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-[10px] font-bold text-zinc-600 italic">
                                x
                            </span>
                            <span className="text-xl font-black italic text-white tracking-tighter">
                                {set.reps}
                            </span>
                        </div>

                        {/* RIR Badge: Estilo Console */}
                        <div className="flex flex-col items-end">
                            <span className="text-[6px] text-zinc-500 font-black uppercase tracking-widest mb-0.5">
                                RIR
                            </span>
                            <div className="bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-md text-[10px] font-black text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                                {set.rir}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
