import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/spa/db";
import GlassBtn from "@/Components/Shared/GlassBtn";
import PageTitle from "@/Components/Shared/PageTitle";

const CreateExercise = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        muscle_group: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSetData = (key: string, value: string) => {
        setData((prev) => ({ ...prev, [key]: value }));
        if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!data.name.trim()) {
            setErrors({ name: "The exercise name is required." });
            return;
        }
        if (!data.muscle_group) {
            setErrors({ muscle_group: "Please select a muscle group." });
            return;
        }

        setProcessing(true);

        try {
            const now = new Date().toISOString();

            await db.exercises.add({
                name: data.name.toUpperCase(),
                muscle_group: data.muscle_group,
                category: "Custom",
                created_at: now,
                updated_at: now,
            });

            navigate(-1);
        } catch (err) {
            console.error("Failed to save exercise:", err);
        } finally {
            setProcessing(false);
        }
    };

    const muscleGroups = [
        "Chest",
        "Back",
        "Legs",
        "Shoulders",
        "Biceps",
        "Triceps",
        "Forearm",
        "Core",
    ];

    return (
        <div className="w-full relative ">
            <PageTitle>New EXERCISE</PageTitle>

            <form onSubmit={submit} className="space-y-10">
                {/* Input Name */}
                <div className="space-y-3 group">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-1 group-focus-within:text-system transition-colors">
                        Exercise Name
                    </label>
                    <input
                        type="text"
                        autoComplete="off"
                        value={data.name}
                        onChange={(e) => handleSetData("name", e.target.value)}
                        className="w-full bg-system/5 border border-system/10 rounded-2xl py-5 px-6 text-white font-bold placeholder:text-zinc-800 focus:border-system/40 focus:bg-system/10 focus:ring-0 backdrop-blur-md transition-all outline-none italic uppercase"
                        placeholder="e.g. BENCH PRESS"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-[9px] uppercase font-black tracking-widest animate-pulse ml-1">
                            !! {errors.name}
                        </p>
                    )}
                </div>

                {/* Muscle Group Selector */}
                <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-1">
                        Muscle Group
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {muscleGroups.map((group) => {
                            const isActive = data.muscle_group === group;
                            return (
                                <button
                                    key={group}
                                    type="button" // Importante para não submeter o form
                                    onClick={() =>
                                        handleSetData("muscle_group", group)
                                    }
                                    /* Removido hovers, adicionado active:scale-95 e touch-manipulation */
                                    className={`
                                        py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest text-center transition-all duration-200 italic touch-manipulation active:scale-95
                                        ${
                                            isActive
                                                ? "bg-system/20 border-system text-system-light shadow-[0_0_20px_rgba(var(--system-rgb),0.1)]"
                                                : "bg-white/[0.02] border-white/[0.05] text-zinc-500"
                                        }
                                    `}
                                >
                                    {group}
                                </button>
                            );
                        })}
                    </div>
                    {errors.muscle_group && (
                        <p className="text-red-500 text-[9px] uppercase font-black tracking-widest animate-pulse ml-1">
                            !! {errors.muscle_group}
                        </p>
                    )}
                </div>

                <div className="pt-4">
                    <GlassBtn
                        type="submit"
                        variant="system"
                        className="w-full py-7 text-[12px] rounded-2xl border-2 uppercase font-black tracking-widest italic"
                        disabled={processing}
                    >
                        {processing ? "Deploying..." : "Add Exercise"}
                    </GlassBtn>
                </div>
            </form>
        </div>
    );
};

export default CreateExercise;
