import { Link } from "@inertiajs/react";
import { HiOutlineTrash } from "react-icons/hi";
import { router } from "@inertiajs/react";

interface Workout {
    id: number;
    name: string;
    created_at: string;
}

const WorkoutsHistoryItem = ({ workout }: { workout: Workout }) => {
    // Limpa o nome removendo a data duplicada
    const cleanName = workout.name.split(" - ")[0];

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        // Remove o stopPropagation daqui

        router.delete(route("workouts.destroy", workout.id), {
            preserveScroll: true,
            onBefore: () =>
                confirm("Tens a certeza que queres eliminar este treino?"),
            onSuccess: () => {},
            onError: (err) => console.error("Erro no delete:", err),
        });
    };
    return (
        <div className="relative w-full mb-3">
            <Link
                href={route("workouts.history.detail", { workout: workout.id })}
                /* active:scale e active:opacity dão a sensação de botão nativo ao tocar */
                className="block relative transition-all duration-200 active:scale-[0.98] active:opacity-70"
            >
                {/* CARD CONTAINER: Fundo transparente, borda estática */}
                <div className="relative bg-transparent border border-performance/30 rounded-2xl p-5 pr-16 flex justify-between items-center overflow-hidden">
                    <div className="relative z-10 flex-1 min-w-0">
                        {/* DATA */}
                        <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-1.5 h-1.5 bg-performance rounded-full shadow-[0_0_8px_var(--color-performance)]" />
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                {new Date(
                                    workout.created_at,
                                ).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>

                        {/* NOME DO TREINO */}
                        <h2 className="text-white font-black uppercase italic tracking-tighter text-xl leading-none truncate">
                            {cleanName}
                        </h2>
                    </div>
                </div>
            </Link>

            {/* BOTÃO ELIMINAR: Reage apenas ao toque (active) */}
            <button
                onClick={handleDelete}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-xl bg-transparent border border-transparent flex items-center justify-center transition-all active:bg-red-500/10 active:border-red-500/30 active:scale-90 group/trash"
                aria-label="Eliminar treino"
            >
                <HiOutlineTrash className="text-zinc-600 text-lg group-active/trash:text-red-500 transition-colors" />
            </button>
        </div>
    );
};

export default WorkoutsHistoryItem;
