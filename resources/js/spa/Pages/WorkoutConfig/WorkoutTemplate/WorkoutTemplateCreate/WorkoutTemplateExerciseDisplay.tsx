import { LuCheck } from "react-icons/lu";
import PageTitle from "@/spa/Components/Shared/PageTitle";

interface WorkoutTemplateExerciseDisplayProps {
    exercises: any[];
    selectedIds: number[];
    toggleExercise: (id: number) => void;
    activeBlock: string | null;
}

const WorkoutTemplateExerciseDisplay = ({
    exercises,
    selectedIds,
    toggleExercise,
    activeBlock,
}: WorkoutTemplateExerciseDisplayProps) => {
    return (
        <div className="space-y-1.5 mb-10">
            {/* Header com PageTitle para consistência */}
            <div className="flex justify-between items-end mb-5">
                <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase text-zinc-600 tracking-[0.3em] mb-1">
                        Selection Mode
                    </span>
                    <PageTitle className="text-xl">Assign Exercises</PageTitle>
                </div>

                <span className="text-[10px] font-black text-performance uppercase tracking-widest bg-performance/5 px-3 py-1 rounded-full border border-performance/10">
                    {selectedIds.length} Selected
                </span>
            </div>

            {exercises.length > 0 ? (
                exercises.map((ex) => {
                    const isSelected = selectedIds.includes(ex.id);

                    // LÓGICA INTELIGENTE:
                    // Se o músculo for igual à aba ativa (ex: Chest == Chest), mostra a Categoria (ex: Upper Push).
                    // Caso contrário (ex: Aba Arms -> Músculo Biceps), mostra o Músculo.
                    const isSameAsTab =
                        ex.muscle_group?.toLowerCase().trim() ===
                        activeBlock?.toLowerCase().trim();
                    const subLabel = isSameAsTab
                        ? ex.category
                        : ex.muscle_group;

                    return (
                        <div
                            key={ex.id}
                            onClick={() => toggleExercise(ex.id)}
                            className={`p-4 rounded-2xl flex justify-between items-center cursor-pointer transition-all active:scale-[0.98] border ${
                                isSelected
                                    ? "bg-performance/5 border-performance/30 shadow-[0_0_15px_rgba(var(--performance-rgb),0.05)]"
                                    : "bg-zinc-900/20 border-white/5 active:border-white/10"
                            }`}
                        >
                            <div className="min-w-0 pr-4">
                                <p
                                    className={`font-black italic text-base tracking-tight transition-colors ${
                                        isSelected
                                            ? "text-performance"
                                            : "text-zinc-100"
                                    }`}
                                >
                                    {ex.name}
                                </p>
                                {/* Aqui aplicamos a nossa Smart Label */}
                                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-0.5">
                                    {subLabel}
                                </p>
                            </div>

                            {/* Checkmark */}
                            <div
                                className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                                    isSelected
                                        ? "bg-performance border-performance text-black shadow-[0_0_10px_rgba(var(--performance-rgb),0.4)]"
                                        : "bg-transparent border-zinc-800 text-transparent"
                                }`}
                            >
                                <LuCheck size={14} strokeWidth={4} />
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="py-12 text-center bg-zinc-900/10 rounded-3xl border border-dashed border-white/5">
                    <p className="text-zinc-700 text-[9px] font-black uppercase tracking-[0.4em]">
                        No exercises found
                    </p>
                </div>
            )}
        </div>
    );
};

export default WorkoutTemplateExerciseDisplay;
