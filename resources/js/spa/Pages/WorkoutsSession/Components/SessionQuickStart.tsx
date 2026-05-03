import { useState, useEffect } from "react";
import ActiveExercisesInSession from "./ActiveExercisesInSession";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";
import GlassBtn from "@/Components/Shared/GlassBtn";

interface SessionQuickStartProps {
    workout: any;
    exercises: any[];
}

const SessionQuickStart = ({ workout, exercises }: SessionQuickStartProps) => {
    const loadTemplate = useWorkoutSessionStore((s) => s.loadTemplate);
    const startSession = useWorkoutSessionStore((s) => s.startSession);
    const sessionExercises = useWorkoutSessionStore((s) => s.sessionExercises);

    const [templates, setTemplates] = useState<any[]>([]);

    useEffect(() => {
        if (!workout?.name) return;

        fetch("/api/workout-config/templates")
            .then((res) => res.json())
            .then((data) => {
                const workoutType = workout.name.split(" ")[0]; // "Push", "Pull", "Legs"...
                const filtered = data.filter(
                    (t: any) =>
                        t.type.toLowerCase() === workoutType.toLowerCase(),
                );
                setTemplates(filtered);
            });
    }, [workout?.name]);

    const handleLoadTemplate = (template: any) => {
        startSession(workout.id);
        loadTemplate(template.exercises);
    };

    const isSessionClean =
        sessionExercises.length === 0 ||
        sessionExercises.every((ex) => !ex.sets || ex.sets.length === 0);

    return (
        <>
            {isSessionClean && templates.length > 0 && (
                <section className="mb-4 animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] italic">
                            Quick Start
                        </h2>
                        <div className="h-[1px] bg-system/10 flex-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {templates.map((template, idx) => (
                            <GlassBtn
                                key={idx}
                                onClick={() => handleLoadTemplate(template)}
                                className={`group relative flex flex-col items-start justify-start transition-all active:scale-[0.98] active:bg-system/10 active:border-system/40 w-full p-6 bg-system/5 border border-system/20 rounded-2xl backdrop-blur-sm text-left text-system-light font-black uppercase italic tracking-widest text-[11px] ${
                                    templates.length === 1
                                        ? "col-span-2"
                                        : "col-span-1"
                                }`}
                            >
                                <div className="relative z-10">
                                    <p className="text-system-light font-black uppercase italic text-[12px] tracking-tight transition-colors">
                                        {template.name}
                                    </p>
                                    <p className="text-[8px] text-system/40 font-bold uppercase mt-1 tracking-widest">
                                        {template.exercises?.length} Exercises
                                    </p>
                                </div>
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
