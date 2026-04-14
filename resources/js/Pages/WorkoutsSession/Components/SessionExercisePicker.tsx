import { Link } from "@inertiajs/react";
import { HiPlus } from "react-icons/hi";

const SessionExercisePicker = ({ exercise, workoutId }) => {
    return (
        <Link
            href={`/workout/${workoutId}/exercise/${exercise.id}`}
            className="group block w-full relative transition-all duration-300 active:scale-[0.98]"
        >
            {/* CONTAINER: Transição suave para o azul System no hover */}
            <div className="relative bg-zinc-900/20 border border-zinc-800 rounded-2xl flex justify-between items-center p-3 h-16 transition-all group-hover:border-system/30 group-hover:bg-system/5 backdrop-blur-sm">
                {/* LADO ESQUERDO: INFOS */}
                <div className="flex items-center gap-4 flex-1">
                    {/* Badge # discreto: Ganha cor System no hover */}
                    <div className="w-8 h-8 rounded-lg bg-black border border-zinc-800 flex items-center justify-center transition-all group-hover:border-system/20">
                        <span className="text-[10px] text-zinc-600 font-bold group-hover:text-system-light transition-colors">
                            #
                        </span>
                    </div>

                    <span className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.2em] group-hover:text-white transition-colors italic">
                        {exercise.name}
                    </span>
                </div>

                {/* BOTÃO DE ADIÇÃO: Estilo industrial que "acende" com System */}
                <div className="pl-4">
                    <div className="w-9 h-9 rounded-xl bg-black border border-zinc-800 flex items-center justify-center transition-all group-hover:bg-system group-hover:border-system group-hover:shadow-[0_0_15px_var(--color-system)] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                        <HiPlus className="text-zinc-600 group-hover:text-black text-lg transition-transform group-active:rotate-90" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SessionExercisePicker;
