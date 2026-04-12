import { Link } from "@inertiajs/react";
import { HiOutlineTrash } from "react-icons/hi";
import { router } from "@inertiajs/react";

interface Workout {
    id: number;
    name: string;
    created_at: string;
}

const WorkoutsHistoryItem = ({ workout }: { workout: Workout }) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevents the parent Link navigation
        e.stopPropagation(); // Stops the click from bubbling up

        if (confirm("Are you sure you want to  delete this workout?")) {
            router.delete(route("workouts.destroy", workout.id), {
                preserveScroll: true,
                onSuccess: () => {
                    console.log("Workout deleted successfully");
                },
            });
        }
    };

    return (
        <div className="group relative w-full mb-2.5">
            <Link
                href={route("workouts.history.detail", { workout: workout.id })}
                className="block relative transition-all duration-300 active:scale-[0.98]"
            >
                {/* CARD CONTAINER: Paleta Monocromática (Zinco) para Histórico */}
                <div className="relative bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 pr-28 flex justify-between items-center overflow-hidden transition-all group-hover:border-zinc-700 group-hover:bg-zinc-900/60">
                    <div className="relative z-10 flex-1">
                        <div className="flex items-center gap-3 mb-1.5">
                            {/* Ponto indicador cinza (Histórico = Arquivado) */}
                            <div className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                                {workout.name}
                            </p>
                        </div>

                        <h2 className="text-white font-black uppercase italic tracking-tighter text-lg leading-none">
                            {new Date(workout.created_at).toLocaleDateString(
                                "pt-PT",
                                {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                },
                            )}
                        </h2>
                    </div>

                    {/* Overlay de hover técnico */}
                    <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </Link>

            {/* BOTÃO ELIMINAR: Vermelho com alto contraste contra o Zinco */}
            <button
                onClick={handleDelete}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-center transition-all hover:bg-red-500 hover:border-red-500 group/trash"
            >
                <HiOutlineTrash className="text-red-500/40 text-lg group-hover/trash:text-black transition-all" />
            </button>
        </div>
    );
};

export default WorkoutsHistoryItem;
