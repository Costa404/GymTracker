import { HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
const SessionExerciseCard = ({ name, setsCount, exerciseId, workoutId }) => {
    // Lógica para verificar se está ativo
    const isActive = setsCount > 0;

    return (
        <Link
            to={`/workout/${workoutId}/exercise/${exerciseId}`}
            className="block w-full relative active:scale-[0.98] transition-transform"
        >
            {/* 1. Borda Dinâmica: Se tiver sets, a borda fica mais forte (opacity-100 ou azul sólido) */}
            <div
                className={`relative  border rounded-2xl p-5 px-4 flex justify-between items-center overflow-hidden transition-colors min-h-[100px]
                ${
                    isActive
                        ? "border-system shadow-[0_0_10px_rgba(var(--color-system-rgb),0.1)]"
                        : "border-system/30"
                } active:border-system`}
            >
                <div className="relative z-10 flex-1 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-3 mb-2">
                        {/* 2. Ponto Dinâmico: Azul se parado, Verde se tiver sets */}
                        <div
                            className={`w-1.5 h-1.5 rounded-full animate-pulse shrink-0 ${
                                isActive
                                    ? "bg-emerald-400 shadow-[0_0_8px_#10b981]"
                                    : "bg-system"
                            }`}
                        />

                        <h2
                            className={`font-black uppercase italic tracking-tighter text-base leading-[1.1] line-clamp-2 transition-colors ${
                                isActive ? "text-white" : "text-zinc-400"
                            }`}
                        >
                            {name}
                        </h2>
                    </div>

                    {/* 3. Badge Dinâmico */}
                    <div
                        className={`inline-flex items-center gap-2 px-2 py-0.5 border rounded-md self-start transition-colors ${
                            isActive
                                ? "bg-system/20 border-system text-white"
                                : "bg-system/5 border-system/20 text-system-light"
                        }`}
                    >
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] tabular-nums">
                            {setsCount} {setsCount === 1 ? "Set" : "Sets"}{" "}
                            Active
                        </span>
                    </div>
                </div>

                <div className="relative z-10 ml-4 shrink-0">
                    <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                            isActive
                                ? "bg-system border-system"
                                : "bg-system/5 border-system/30"
                        }`}
                    >
                        <HiChevronRight
                            className={`text-xl ${
                                isActive ? "text-black" : "text-system"
                            }`}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default SessionExerciseCard;
