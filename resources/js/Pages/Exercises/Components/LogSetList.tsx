export const LogSetList = ({ sets }: { sets: any[] }) => (
    <div className="mt-8 space-y-3 px-1">
        <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-text-performance/20 to-transparent" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-performance/60 flex items-center gap-2">
                <span className="w-1 h-1 bg-performance rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                Sets Added
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-text-performance/20 to-transparent" />
        </div>

        {[...sets].reverse().map((set, i) => (
            <div
                key={i}
                className="group relative overflow-hidden rounded-xl p-[1px] transition-all duration-300"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-text-performance/20" />

                <div className="relative bg-[#050505] rounded-xl p-3 flex items-center justify-between border border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center">
                            <span className="text-[9px] font-black text-zinc-500 group-hover:text-performance transition-colors">
                                #{sets.length - i}
                            </span>
                        </div>

                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black italic text-white tracking-tighter">
                                {set.weight}
                            </span>
                            <span className="text-[8px] font-bold text-performance uppercase tracking-widest">
                                kg
                            </span>
                        </div>
                    </div>

                    {/* Centro: Divisor Visual mais discreto */}
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

                        <div className="flex flex-col items-end min-w-[35px]">
                            <span className="text-[6px] text-zinc-600 font-black uppercase tracking-widest mb-0.5">
                                RIR
                            </span>
                            <div className="bg-performance/10 border border-performance/20 px-2 py-0.5 rounded-md text-[10px] font-black text-performance-light">
                                {set.rir === -1 ? "F" : set.rir}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
