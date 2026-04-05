export const LogSetList = ({ sets }: { sets: any[] }) => (
    <div className="mt-10 space-y-3 px-1">
        <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-[9px] font-black uppercase text-zinc-700 tracking-[0.5em]">
                Sets addded
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {[...sets].reverse().map((set, i) => (
            <div
                key={i}
                className="group flex justify-between items-center bg-white/[0.02] border border-white/5 p-4 rounded-2xl backdrop-blur-sm hover:border-cyan-500/20 transition-all shadow-xl"
            >
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black italic text-zinc-700">
                        #{sets.length - i}
                    </span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black italic text-white/90">
                            {set.weight}
                        </span>
                        <span className="text-[9px] font-black text-zinc-600 uppercase italic">
                            kg
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-xl font-black italic text-white/80">
                        <span className="text-zinc-600 text-xs mr-2">x</span>
                        {set.reps}
                    </div>
                    <div className="min-w-[60px] text-center bg-white/5 border border-white/10 px-2 py-1 rounded-lg">
                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-tighter">
                            RIR {set.rir ?? "-"}
                        </span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
