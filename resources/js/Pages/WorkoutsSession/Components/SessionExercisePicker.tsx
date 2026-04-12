import { Link } from "@inertiajs/react";
import { HiPlus } from "react-icons/hi";
const SessionExercisePicker = ({ exercise, workoutId }) => {
    return (
        <Link
            href={`/workout/${workoutId}/exercise/${exercise.id}`}
            className="group block w-full relative transition-all duration-300 active:scale-[0.98]"
        >
            {/* CONTAINER: Fundo mais escuro e borda minimalista */}
            <div className="relative bg-zinc-900/20 border border-zinc-800 rounded-2xl flex justify-between items-center p-3 h-16 transition-all group-hover:border-blue-500/30 group-hover:bg-zinc-900/40">
                {/* LADO ESQUERDO: INFOS */}
                <div className="flex items-center gap-4 flex-1">
                    {/* Badge # discreto */}
                    <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center transition-colors group-hover:border-blue-500/20">
                        <span className="text-[10px] text-zinc-600 font-bold group-hover:text-blue-500/50">
                            #
                        </span>
                    </div>

                    <span className="text-zinc-400 font-black uppercase text-[10px] tracking-[0.2em] group-hover:text-zinc-200 transition-colors">
                        {exercise.name}
                    </span>
                </div>

                {/* BOTÃO DE ADIÇÃO: Estilo industrial */}
                <div className="pl-4">
                    <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center transition-all group-hover:bg-blue-500 group-hover:border-blue-500 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                        <HiPlus className="text-zinc-500 group-hover:text-black text-lg transition-transform group-active:rotate-90" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SessionExercisePicker;
