import { Link } from "@inertiajs/react";
import { HiPlus } from "react-icons/hi";

const SessionExercisePicker = ({ exercise, workoutId }) => {
    console.log("ola");
    return (
        <Link
            href={`/workout/${workoutId}/exercise/${exercise.id}`}
            className="group block w-full relative overflow-hidden rounded-2xl p-[1px] transition-all duration-300 active:scale-[0.97]"
        >
            {/* BORDA PERMANENTE: Esta é a "alma" do card. O brilho está sempre lá. */}
            {/* Usamos white/20 no topo e blue-500/30 no fundo para simular luz real de vidro. */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/[0.05] to-blue-600/30 group-hover:from-blue-500/40 group-active:from-blue-400 group-active:to-cyan-400 transition-all duration-500" />

            {/* CONTEÚDO INTERNO: Fundo escuro para fazer a borda "saltar" */}
            <div className="relative bg-zinc-950/90 -2xl rounded-2xl flex justify-between items-center p-4 h-16">
                {/* LADO ESQUERDO: INFOS (Com separador de vidro) */}
                <div className="flex items-center gap-4 flex-1 pr-4 border-r border-white/[0.05]">
                    {/* Badge # com luz constante */}
                    <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-inner group-hover:border-blue-500/30 transition-all">
                        <span className="text-[10px] text-zinc-500 font-bold group-hover:text-blue-400">
                            #
                        </span>
                    </div>

                    <span className="text-zinc-300 font-black uppercase text-[10px] tracking-[0.2em] group-hover:text-white transition-colors">
                        {exercise.name}
                    </span>
                </div>

                {/* BOTÃO DE ADIÇÃO (Sempre iluminado) */}
                <div className="pl-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] group-active:from-blue-500 group-active:to-cyan-600 group-active:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500">
                        <HiPlus className="text-zinc-400 group-hover:text-white text-lg transition-transform group-active:rotate-90" />
                    </div>
                </div>
            </div>

            {/* REFLEXO DE SUPERFÍCIE (Efeito de vidro real ao mover) */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </Link>
    );
};

export default SessionExercisePicker;
