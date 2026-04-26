import React from "react";
import ActiveExercisesInSession from "./ActiveExercisesInSession";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";
import GlassBtn from "@/Components/Shared/GlassBtn";

const TEMPLATES_MAP: Record<string, any[]> = {
    PUSH: [{ name: "Push", ids: [7, 8, 10, 11, 12, 13, 14, 9] }],
    PULL: [{ name: "Pull", ids: [27, 30, 28, 29, 32, 33, 31] }],
    LEGS: [
        { name: "Legs A", ids: [1, 2, 3, 4, 6] },
        { name: "Legs B", ids: [35, 36, 3, 4, 37] },
    ],
    UPPER: [{ name: "Upper", ids: [8, 10, 11, 9, 18, 16, 21, 25, 26] }],
};

interface SessionQuickStartProps {
    workout: any;
    exercises: any[];
}

const SessionQuickStart = ({ workout, exercises }: SessionQuickStartProps) => {
    const loadTemplate = useWorkoutSessionStore((s) => s.loadTemplate);
    const startSession = useWorkoutSessionStore((s) => s.startSession);
    const sessionExercises = useWorkoutSessionStore((s) => s.sessionExercises);

    const getActiveTemplates = () => {
        const name = workout?.name?.toUpperCase() || "";
        if (name.includes("PUSH")) return TEMPLATES_MAP["PUSH"];
        if (name.includes("PULL")) return TEMPLATES_MAP["PULL"];
        if (name.includes("LEGS")) return TEMPLATES_MAP["LEGS"];
        if (name.includes("UPPER")) return TEMPLATES_MAP["UPPER"];
        // if (name.includes("FULL")) return TEMPLATES_MAP["FULL"];

        // NAO PRECISAMOS ESTE ULTIMO IF PORQUE se for full VAI DAR RETURN EM TODOS OS EXERCICOS
        return [];
    };
    // console.log("🟠 exercises prop:", exercises);

    const currentTemplates = getActiveTemplates();

    // console.log(
    //     "🔵 SessionQuickStart Rendered with workout name:",
    //     workout.name,
    // );
    const handleLoadTemplate = (exerciseIds: number[]) => {
        startSession(workout.id);
        loadTemplate(exerciseIds);
    };

    const isSessionClean =
        sessionExercises.length === 0 ||
        sessionExercises.every((ex) => !ex.sets || ex.sets.length === 0);

    return (
        <>
            {isSessionClean && currentTemplates.length > 0 && (
                <section className="mb-4 animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-3 mb-2 px-1">
                        <h2 className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] italic">
                            Quick Start
                        </h2>
                        <div className="h-[1px] bg-system/10 flex-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {currentTemplates.map((template, idx) => (
                            <GlassBtn
                                key={idx}
                                onClick={() => handleLoadTemplate(template.ids)}
                                className={`group relative w-full p-6 bg-system/5 border border-system/20 rounded-2xl text-left transition-all active:scale-[0.98] active:bg-system/10 active:border-system/40 backdrop-blur-sm text-system-light font-black uppercase italic tracking-widest text-[11px]    ${
                                    currentTemplates.length === 1
                                        ? "col-span-2"
                                        : "col-span-1"
                                }`}
                            >
                                <div className="relative z-10">
                                    <p className="text-system-light font-black uppercase italic text-[12px] tracking-tight group-hover:text-white transition-colors">
                                        {template.name}
                                    </p>
                                    <p className="text-[8px] text-system/40 font-bold uppercase mt-1 tracking-widest">
                                        {template.ids.length} Exercises
                                    </p>
                                </div>

                                {/* Efeito de brilho sutil no canto ao passar o rato */}
                            </GlassBtn>
                        ))}
                    </div>
                </section>
            )}

            <ActiveExercisesInSession
                workoutId={workout.id}
                exercises={exercises}
            />
        </>
    );
};

export default SessionQuickStart;
