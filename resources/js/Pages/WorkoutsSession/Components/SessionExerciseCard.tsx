import { Link } from "@inertiajs/react";
import { HiChevronRight } from "react-icons/hi";

const SessionExerciseCard = ({ name, setsCount, exerciseId, workoutId }) => {
    return (
        <Link
            href={`/workout/${workoutId}/exercise/${exerciseId}`}
            className="group block w-full relative transition-all duration-300 active:scale-[0.98]"
        >
            {/* CARD CONTAINER: Agora com o mesmo fundo azul translúcido do QuickStart */}
            <div className="relative bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5 px-3 flex justify-between items-center overflow-hidden transition-all group-hover:border-blue-500/40">
                <div className="relative z-10 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        {/* Ponto pulsante azul */}
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                        <h2 className="text-white font-black uppercase italic tracking-tighter text-lg leading-none">
                            {name}
                        </h2>
                    </div>

                    {/* Badge de Sets: Ajustado para combinar com o fundo */}
                    <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-blue-500/10 border border-blue-400/30 rounded-md">
                        <span className="text-[9px] text-blue-100 font-bold uppercase tracking-[0.2em] tabular-nums">
                            {setsCount} {setsCount === 1 ? "Set" : "Sets"}{" "}
                            Active
                        </span>
                    </div>
                </div>

                {/* BOTÃO DE AÇÃO */}
                <div className="relative z-10 ml-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center transition-all group-hover:bg-blue-500 group-hover:border-blue-500">
                        <HiChevronRight className="text-blue-400 text-xl group-hover:text-black transition-all" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SessionExerciseCard;
