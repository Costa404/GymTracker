import { useEffect } from "react";
import { Head } from "@inertiajs/react";
import useWorkoutStore from "@/Hooks/useWorkoutStore";
import useWorkoutSessionStore from "@/Hooks/useWorkoutSessionStore";
import ActiveSession from "../../Components/ActiveSession";

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
                    {/* SELETOR */}
                    <div className="flex items-center justify-between bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-xl">
                        <button
                            onClick={prev}
                            className="p-2 text-zinc-600 hover:text-blue-500 font-black"
                        >
                            {"<"}
                        </button>
                        <span className="text-white font-black uppercase text-sm italic tracking-widest">
                            {currentTemplate.name}
                        </span>
                        <button
                            onClick={next}
                            className="p-2 text-zinc-600 hover:text-blue-500 font-black"
                        >
                            {">"}
                        </button>
                    </div>
                    <button
                        onClick={() =>
                            handleStart(
                                currentTemplate.name,
                                currentTemplate.id,
                            )
                        }
                        className="w-full bg-blue-600 py-4 rounded-xl"
                    >
                        <span className="text-white font-black uppercase text-xs italic tracking-widest">
                            START {currentTemplate.name}
                        </span>
                    </button>
                    <button
                        onClick={() => handleStart("Custom")}
                        className="w-full bg-zinc-900/50 border border-zinc-800 py-4 rounded-xl text-zinc-500 font-black uppercase text-[10px] italic tracking-widest"
                    >
                        Manual Session
                    </button>
                </div>
            )}
        </div>
    );
};

export default WorkoutSetup;
