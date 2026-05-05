import GlassBtn from "@/spa/Components/Shared/GlassBtn";
import { LuZap, LuTarget, LuSkull } from "react-icons/lu";

interface Props {
    mood: string | null;
    setMood: (mood: string) => void;
    rpe: number | null;
    setRpe: (rpe: number) => void;
}

const WorkoutSummaryPerformanceMetrics = ({
    mood,
    setMood,
    rpe,
    setRpe,
}: Props) => {
    return (
        <div className="flex flex-col gap-8">
            {/* FEELING */}
            <section className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[.3em] text-zinc-600 ml-1">
                    Feeling
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { id: "wrecked", icon: LuSkull, label: "Wrecked" },
                        { id: "focused", icon: LuTarget, label: "Focused" },
                        { id: "god", icon: LuZap, label: "God Mode" },
                    ].map((item) => (
                        <div key={item.id} className="flex flex-col gap-2">
                            <GlassBtn
                                variant={
                                    mood === item.id ? "performance" : "white"
                                }
                                onClick={() => setMood(item.id)}
                                // Substituímos transition-all por transition-colors e removemos os scales manuais
                                className={`w-full !h-[64px] !p-0 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                                    mood === item.id
                                        ? "border-performance bg-performance/10 opacity-100"
                                        : "opacity-40 border-white/10 bg-white/5"
                                }`}
                            >
                                <item.icon
                                    size={26}
                                    className={
                                        mood === item.id
                                            ? "text-performance"
                                            : "text-white"
                                    }
                                />
                            </GlassBtn>
                            <span
                                className={`text-[9px] text-center font-black uppercase tracking-widest transition-colors duration-300 ${
                                    mood === item.id
                                        ? "text-performance"
                                        : "text-zinc-600"
                                }`}
                            >
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* EFFORT (RPE) */}
            <section className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[.3em] text-zinc-600 ml-1">
                    Effort (RPE)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { val: 1, label: "Light" },
                        { val: 2, label: "Solid" },
                        { val: 3, label: "Max" },
                    ].map((lvl) => (
                        <div key={lvl.val} className="flex flex-col gap-2">
                            <GlassBtn
                                variant={rpe === lvl.val ? "system" : "white"}
                                onClick={() => setRpe(lvl.val)}
                                // Mesma correção aqui para garantir estabilidade visual
                                className={`w-full !h-[64px] !p-0 rounded-2xl flex items-center justify-center font-black text-2xl italic transition-colors duration-300 ${
                                    rpe === lvl.val
                                        ? "border-system bg-system/10 text-system opacity-100"
                                        : "opacity-40 border-white/10 bg-white/5 text-white"
                                }`}
                            >
                                {lvl.val}
                            </GlassBtn>
                            <span
                                className={`text-[9px] text-center font-black uppercase tracking-widest transition-colors duration-300 ${
                                    rpe === lvl.val
                                        ? "text-system"
                                        : "text-zinc-600"
                                }`}
                            >
                                {lvl.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default WorkoutSummaryPerformanceMetrics;
