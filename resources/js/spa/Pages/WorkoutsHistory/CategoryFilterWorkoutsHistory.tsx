import GlassBtn from "@/Components/Shared/GlassBtn";

interface Props {
    currentType: string | null;
    onFilterChange?: (type: string | null) => void;
}

const CategoryFilterWorkoutsHistory = ({
    currentType,
    onFilterChange,
}: Props) => {
    // Mantendo a tua lista de tipos
    const types = ["Upper", "Push Day", "Pull Day", "Legs Day"];

    return (
        <div className="flex justify-center w-full mb-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar items-center   pb-2">
                {/* Botão ALL */}
                <GlassBtn
                    onClick={() => onFilterChange?.(null)}
                    className={`px-5 py-2 rounded-xl transition-all duration-200 border flex-shrink-0 ${
                        currentType === null
                            ? "bg-transparent  text-system"
                            : "bg-transparent border-white/5 text-zinc-500"
                    }`}
                >
                    <span className="text-[9px] font-black uppercase italic tracking-[0.15em]">
                        All
                    </span>
                </GlassBtn>

                {/* Mapeamento dos tipos com GlassBtn */}
                {types.map((type) => {
                    const isSelected = currentType === type;
                    return (
                        <GlassBtn
                            key={type}
                            onClick={() => onFilterChange?.(type)}
                            className={`px-5 py-2 rounded-xl border whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                                isSelected
                                    ? "bg-transparent  text-system"
                                    : "bg-transparent border-white/5 text-zinc-500"
                            }`}
                        >
                            <span className="text-[9px] font-black uppercase italic tracking-[0.15em]">
                                {type.replace(" Day", "")}
                            </span>
                        </GlassBtn>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryFilterWorkoutsHistory;
