import GlassBtn from "@/spa/Components/Shared/GlassBtn";

interface CategoryFilterProps {
    activeBlock: string | null;
    setActiveBlock: (block: string) => void;
}

const WorkoutTemplateFilter = ({
    activeBlock,
    setActiveBlock,
}: CategoryFilterProps) => {
    // Substituímos os "dias de treino" por "grupos musculares" reais
    const categories = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];

    return (
        <div className="mb-8">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 ">
                Filter by muscle
            </p>

            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 px-1">
                {categories.map((group) => {
                    const isSelected = activeBlock === group;
                    return (
                        <GlassBtn
                            key={group}
                            onClick={() => setActiveBlock(group)}
                            variant={isSelected ? "system" : "ghost"}
                            className={`px-5 py-2.5 rounded-xl whitespace-nowrap active:scale-95 flex-shrink-0 border ${
                                !isSelected
                                    ? "border-white/5 bg-zinc-900/20"
                                    : ""
                            }`}
                        >
                            <span
                                className={`text-[10px] font-black uppercase tracking-widest italic transition-colors ${
                                    isSelected
                                        ? "text-system-light"
                                        : "text-zinc-500"
                                }`}
                            >
                                {group}
                            </span>
                        </GlassBtn>
                    );
                })}
            </div>
        </div>
    );
};

export default WorkoutTemplateFilter;
