import { useEffect } from "react";
import { Head } from "@inertiajs/react";
import useWorkoutStore from "@/Hooks/useWorkoutStore";
import useWorkoutSessionStore from "@/Hooks/SessionStore/useWorkoutSessionStore";
import ActiveSession from "./Components/ActiveSession";
import GlassBtn from "@/Components/Shared/GlassBtn"; // Importa o teu novo componente

const WorkoutSetup = ({ templates }) => {
    const { selectedIndex, next, prev, handleStart, setTemplates } =
        useWorkoutStore();
    const { activeSessionId } = useWorkoutSessionStore();

    useEffect(() => {
        setTemplates(templates);
    }, [templates]);

    const currentTemplate = templates[selectedIndex] || {};

    return (
        <div className="max-w-md mx-auto pt-8 px-6">
            <Head title="Preparation" />

            {activeSessionId ? (
                <ActiveSession workoutId={activeSessionId} />
            ) : (
                <div className="space-y-4">
                    {/* SELETOR DE TEMPLATE */}
                    <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-xl backdrop-blur-sm">
                        <button
                            onClick={prev}
                            className="p-2 text-zinc-600 hover:text-blue-500 font-black transition-colors"
                        >
                            {"<"}
                        </button>
                        <span className="text-white font-black uppercase text-sm italic tracking-widest">
                            {currentTemplate.name}
                        </span>
                        <button
                            onClick={next}
                            className="p-2 text-zinc-600 hover:text-blue-500 font-black transition-colors"
                        >
                            {">"}
                        </button>
                    </div>

                    {/* BOTÃO START (TEMPLATE SELECIONADO) */}
                    <GlassBtn
                        onClick={() =>
                            handleStart(
                                currentTemplate.name,
                                currentTemplate.id,
                            )
                        }
                        variant="blue"
                        className="w-full py-6 text-xs"
                    >
                        START {currentTemplate.name}
                    </GlassBtn>

                    {/* BOTÃO MANUAL (ZINC) */}
                    <GlassBtn
                        onClick={() => handleStart("Custom")}
                        variant="slate"
                        className="w-full py-4 text-[10px]"
                    >
                        Manual Session
                    </GlassBtn>
                </div>
            )}
        </div>
    );
};

export default WorkoutSetup;
