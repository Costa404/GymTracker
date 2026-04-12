import React from "react";
import ActiveExercisesInSession from "./ActiveExercisesInSession";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

const TEMPLATES_MAP: Record<string, any[]> = {
    PUSH: [{ name: "Push Alpha", ids: [1, 4, 7] }],
    PULL: [{ name: "Pull Heavy", ids: [10, 12, 15] }],
    LEGS: [
        { name: "Legs A", ids: [20, 22, 25] },
        { name: "Legs B", ids: [20, 26, 28] },
    ],
    UPPER: [{ name: "Upper Body", ids: [1, 10, 4, 12] }],
    FULL: [{ name: "Full Body", ids: [1, 10, 30, 45] }],
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
        if (name.includes("FULL")) return TEMPLATES_MAP["FULL"];
        return [];
    };

    const currentTemplates = getActiveTemplates();

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
                <section className="mb-4 animate-in fade-in zoom-in duration-500">
                    <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em]">
                            Quick Start
                        </h2>
                        <div className="h-px bg-zinc-800/50 flex-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {currentTemplates.map((template, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleLoadTemplate(template.ids)}
                                className={`group relative p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl text-left transition-all active:scale-95 hover:border-blue-500/40 ${
                                    currentTemplates.length === 1
                                        ? "col-span-2"
                                        : "col-span-1"
                                }`}
                            >
                                <div className="relative z-10">
                                    <p className="text-blue-400 font-black uppercase italic text-[11px] tracking-tighter">
                                        {template.name}
                                    </p>
                                    <p className="text-[8px] text-zinc-500 font-bold uppercase mt-1">
                                        {template.ids.length} Exercises
                                    </p>
                                </div>
                                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors rounded-2xl" />
                            </button>
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
