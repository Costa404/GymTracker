import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "@/spa/db";
import GlassBtn from "@/spa/Components/Shared/GlassBtn";
import PageTitle from "@/spa/Components/Shared/PageTitle";

const ExerciseCreate = () => {
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
                synced: 0,
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
                                <GlassBtn
                                    key={group}
                                    variant={isActive ? "system" : "ghost"}
                                    onClick={() =>
                                        handleSetData("muscle_group", group)
                                    }
                                    // Opcionalmente força a altura (py-4), largura (w-full) e o estilo itálico
                                    className={`w-full !py-4 italic text-center ${
                                        isActive
                                            ? "shadow-[0_0_20px_rgba(var(--system-rgb),0.1)] !bg-system/20 !border-system"
                                            : "!bg-white/[0.02] !border-white/[0.05]"
                                    }`}
                                >
                                    {group}
                                </GlassBtn>
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

export default ExerciseCreate;
