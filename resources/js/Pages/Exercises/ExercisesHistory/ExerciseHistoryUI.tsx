// Componente para cada linha de performance (Weight/Reps/RIR)
export const Stat = ({ value, label, color = "text-zinc-500" }: any) => (
    <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black italic">{value}</span>
        <span className={`text-[10px] font-black uppercase ${color}`}>
            {label}
        </span>
    </div>
);

// Componente para quando não há dados
export const EmptyExerciseHistory = () => (
    <div className="bg-[#0a1220]/60 border border-dashed border-white/10 rounded-[2.5rem] p-16 backdrop-blur-3xl text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center mx-auto animate-pulse">
            <span className="text-3xl opacity-40">📈</span>
        </div>
        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/80">
            No Data Detected
        </h3>
        <p className="text-[10px] text-zinc-600 font-black italic uppercase tracking-widest leading-relaxed">
            System standby. <br /> Complete your first set to sync performance.
        </p>
    </div>
);
