import GlassBtn from "@/Components/Shared/GlassBtn";

interface WorkoutTemplateTypeSelectorProps {
    type: string;
    setType: (type: string) => void;
}

const WorkoutTemplateTypeSelector = ({
    type,
    setType,
}: WorkoutTemplateTypeSelectorProps) => {
    const types = ["Push", "Pull", "Legs", "Upper", "Full Body", "Custom"];

    return (
        <div className="mb-6 ">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3">
                Routine Type
            </p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {types.map((t) => {
                    const isSelected = type === t;
                    return (
                        <GlassBtn
                            key={t}
                            onClick={() => setType(t)}
                            variant={isSelected ? "system" : "ghost"}
                            className={`px-5 py-2.5 rounded-xl whitespace-nowrap active:scale-95 flex-shrink-0 border  ${
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
                                {t}
                            </span>
                        </GlassBtn>
                    );
                })}
            </div>
        </div>
    );
};

export default WorkoutTemplateTypeSelector;
