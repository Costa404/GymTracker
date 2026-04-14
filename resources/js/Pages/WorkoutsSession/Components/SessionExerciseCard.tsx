import { Link } from "@inertiajs/react";
import { HiChevronRight } from "react-icons/hi";

const SessionExerciseCard = ({ name, setsCount, exerciseId, workoutId }) => {
    return (
        <Link
            href={`/workout/${workoutId}/exercise/${exerciseId}`}
            className="group block w-full relative transition-all duration-300 active:scale-[0.98]"
        >
            {/* CARD CONTAINER: Trocado blue-500 por system */}
            <div className="relative bg-system/5 border border-system/10 rounded-2xl p-5 px-4 flex justify-between items-center overflow-hidden transition-all group-hover:border-system/40 backdrop-blur-sm">
                {/* Efeito de luz interna no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-system/0 via-system/5 to-system/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <div className="relative z-10 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        {/* Ponto pulsante azul usando a variável system */}
                        <div className="w-1.5 h-1.5 bg-system rounded-full animate-pulse shadow-[0_0_8px_var(--color-system)]" />

                        <h2 className="text-white font-black uppercase italic tracking-tighter text-lg leading-none">
                            {name}
                        </h2>
                    </div>

                    {/* Badge de Sets: Ajustado para o sistema */}
                    <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-system/10 border border-system/20 rounded-md">
                        <span className="text-[9px] text-system-light font-bold uppercase tracking-[0.2em] tabular-nums">
                            {setsCount} {setsCount === 1 ? "Set" : "Sets"}{" "}
                            Active
                        </span>
                    </div>
                </div>

                {/* BOTÃO DE AÇÃO */}
                <div className="relative z-10 ml-4">
                    <div className="w-10 h-10 rounded-xl bg-system/10 border border-system/20 flex items-center justify-center transition-all group-hover:bg-system group-hover:border-system group-hover:shadow-[0_0_15px_var(--color-system)]">
                        <HiChevronRight className="text-system text-xl group-hover:text-black transition-all" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SessionExerciseCard;
