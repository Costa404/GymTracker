import { useForm, Head } from "@inertiajs/react";
import GlassBtn from "@/Components/Shared/GlassBtn";

const CreateExercise = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        muscle_group: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/exercises");
    };

    // Lista de grupos musculares para o select
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
        <div className="max-w-md mx-auto pt-12  min-h-screen bg-black">
            <Head title="New Mission" />

            <h1 className="text-cyan-400 font-black uppercase tracking-[0.4em] text-center mb-10 italic">
                Add New Exercise
            </h1>

            <form onSubmit={submit} className="space-y-8">
                {/* Input de Nome */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">
                        Exercise Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-zinc-700 focus:border-cyan-500/50 focus:ring-0 backdrop-blur-md transition-all"
                        placeholder="e.g. Bench Press"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-[10px] uppercase font-bold">
                            {errors.name}
                        </span>
                    )}
                </div>

                {/* Select de Grupo Muscular */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">
                        Muscle Group
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {muscleGroups.map((group) => (
                            <div
                                key={group}
                                onClick={() => setData("muscle_group", group)}
                                className={`
                                    py-3 px-4 rounded-xl border text-[11px] font-black uppercase tracking-tighter text-center cursor-pointer transition-all
                                    ${
                                        data.muscle_group === group
                                            ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                            : "bg-white/[0.02] border-white/5 text-zinc-600 hover:border-white/20"
                                    }
                                `}
                            >
                                {group}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botão de Submissão */}
                <div className="pt-6">
                    <GlassBtn
                        type="submit"
                        variant="cyan"
                        className="w-full py-6 text-lg"
                        disabled={processing}
                    >
                        {processing ? "Deploying..." : "Confirm Exercise"}
                    </GlassBtn>
                </div>
            </form>
        </div>
    );
};

export default CreateExercise;
