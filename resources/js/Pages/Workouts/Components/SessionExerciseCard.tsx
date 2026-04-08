import { Link } from "@inertiajs/react";
import { HiChevronRight } from "react-icons/hi";

const SessionExerciseCard = ({ name, setsCount, exerciseId, workoutId }) => {
    console.log("ola");
    return (
        <Link
            href={`/workout/${workoutId}/exercise/${exerciseId}`}
            className="group block w-full relative overflow-hidden rounded-[2rem] p-[1.5px] transition-all duration-300 active:scale-[0.98]"
        >
            {/* BORDA FULL 100: Gradiente circular/conic que cobre todos os ângulos */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/60 via-cyan-400/40 to-cyan-600/60 group-active:from-cyan-400 group-active:to-white transition-all duration-500" />

            {/* CONTEÚDO INTERNO: O bg-zinc-950 garante que a borda de 1.5px sobressaia */}
            <div className="relative bg-zinc-950 rounded-[calc(2rem-1.5px)] p-6 flex justify-between items-center shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]">
                <div className="flex-1">
                    <h2 className="text-white font-black uppercase italic tracking-tighter text-xl group-active:text-cyan-400 transition-colors">
                        {name}
                    </h2>

                    <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                        <span className="text-[10px] text-cyan-300 font-black uppercase tracking-widest tabular-nums">
                            {setsCount} {setsCount === 1 ? "Set" : "Sets"}
                        </span>
                    </div>
                </div>

                {/* BOTÃO DE AÇÃO COM GLOW */}
                <div className="ml-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.1)] group-active:bg-cyan-500 group-active:border-cyan-400 transition-all duration-500">
                        <HiChevronRight className="text-cyan-400 group-active:text-black text-2xl transition-transform group-active:translate-x-1" />
                    </div>
                </div>
            </div>

            {/* BRILHO EXTRA NO TOPO PARA REALISMO */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
        </Link>
    );
};

export default SessionExerciseCard;
