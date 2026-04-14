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
        <div className="w-full relative">
            <Head title="New Mission" />

            {/* Header com tipografia de sistema */}
            <div className="text-center mb-4">
                <h1 className="text-system-light font-black uppercase tracking-italic text-xl ">
                    Add New Exercise
                </h1>
                <div className="h-[1px] w-12 bg-system/20 mx-auto mt-4" />
            </div>

            <form onSubmit={submit} className="space-y-10">
                {/* Input de Nome: Estilo Glass Industrial */}
                <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-1">
                        Exercise Name
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full bg-system/5 border border-system/10 rounded-2xl py-5 px-6 text-white font-bold placeholder:text-zinc-800 focus:border-system/40 focus:bg-system/10 focus:ring-0 backdrop-blur-md transition-all outline-none italic"
                        placeholder="e.g. BENCH PRESS"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-[9px] uppercase font-black tracking-widest animate-pulse ml-1">
                            !! {errors.name}
                        </p>
                    )}
                </div>

                {/* Grid de Grupos Musculares: Estilo Ativação de Módulo */}
                <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 ml-1">
                        Muscle Group
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {muscleGroups.map((group) => {
                            const isActive = data.muscle_group === group;
                            return (
                                <div
                                    key={group}
                                    onClick={() =>
                                        setData("muscle_group", group)
                                    }
                                    className={`
                                        py-4 px-4 rounded-xl border text-[10px] font-black uppercase tracking-widest text-center cursor-pointer transition-all duration-300 italic
                                        ${
                                            isActive
                                                ? "bg-system/20 border-system text-system-light shadow-[0_0_20px_var(--color-system)/10] scale-[0.98]"
                                                : "bg-white/[0.02] border-white/[0.05] text-zinc-500 hover:border-white/10"
                                        }
                                    `}
                                >
                                    {group}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Botão de Submissão: O "Big Blue Button" de confirmação */}
                <div className="pt-4">
                    <GlassBtn
                        type="submit"
                        variant="system"
                        className="w-full py-7 text-[12px] rounded-2xl border-2"
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
