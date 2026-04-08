import { useEffect, useMemo } from "react";
import { Head } from "@inertiajs/react";
import useWorkoutStore from "@/Hooks/useWorkoutStore";
import GlassBtn from "@/Components/Shared/GlassBtn";
import ActiveSessionDecider from "./ActiveSessionDecider";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

const WorkoutSetup = ({ templates }) => {
    const { selectedIndex, next, prev, handleStart, setTemplates } =
        useWorkoutStore();

    // Seletor atómico: Este componente agora ignora o Timer completamente
    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);

    useEffect(() => {
        setTemplates(templates);
    }, [templates]);

    // O "ola" agora só deve aparecer se mudares o template (selectedIndex)
    console.log("LOG: [WorkoutSetup] Render.");

    const currentTemplate = useMemo(
        () => templates[selectedIndex] || {},
        [templates, selectedIndex],
    );

    return (
        <div className="max-w-md mx-auto pt-8 px-6">
            <Head title="Preparation" />

            {activeSessionId ? (
                <ActiveSessionDecider workoutId={activeSessionId} />
            ) : (
                <div className="space-y-4">
                    {/* SELETOR DE TEMPLATE: Removemos o -sm */}
                    <div className="flex items-center justify-between bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl">
                        <button
                            onClick={prev}
                            className="p-2 text-zinc-500 hover:text-blue-500 font-black transition-colors text-xl"
                        >
                            {"<"}
                        </button>

                        <div className="text-center">
                            <span className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em] block mb-1">
                                Selected Unit
                            </span>
                            <span className="text-white font-black uppercase text-sm italic tracking-[0.2em]">
                                {currentTemplate.name}
                            </span>
                        </div>

                        <button
                            onClick={next}
                            className="p-2 text-zinc-500 hover:text-blue-500 font-black transition-colors text-xl"
                        >
                            {">"}
                        </button>
                    </div>

                    {/* BOTÕES DE AÇÃO */}
                    <div className="space-y-3 pt-2">
                        <GlassBtn
                            onClick={() =>
                                handleStart(
                                    currentTemplate.name,
                                    currentTemplate.id,
                                )
                            }
                            variant="blue"
                            className="w-full py-6 text-[10px]"
                        >
                            INITIALIZE: {currentTemplate.name}
                        </GlassBtn>

                        <GlassBtn
                            onClick={() => handleStart("Custom")}
                            variant="slate"
                            className="w-full py-4 text-[9px] opacity-70"
                        >
                            Manual Mission Setup
                        </GlassBtn>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutSetup;
