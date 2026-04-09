import { useEffect } from "react";
import { Head } from "@inertiajs/react";
import useWorkoutStore from "@/Hooks/useWorkoutStore";
import GlassBtn from "@/Components/Shared/GlassBtn";
import ActiveSessionDecider from "./ActiveSessionDecider";

import { useShallow } from "zustand/react/shallow";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

const WorkoutSetup = ({ templates }) => {
    const { handleStart, setTemplates } = useWorkoutStore(
        useShallow((s) => ({
            handleStart: s.handleStart,
            setTemplates: s.setTemplates,
        })),
    );

    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);

    useEffect(() => {
        setTemplates(templates);
    }, [templates]);

    return (
        <div className="max-w-md mx-auto pt-8 px-6">
            <Head title="Preparation" />
            {activeSessionId ? (
                <ActiveSessionDecider workoutId={activeSessionId} />
            ) : (
                <div className="space-y-3">
                    <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.3em] text-center mb-6">
                        Select Mission
                    </p>
                    {templates.map((template) => (
                        <GlassBtn
                            key={template.id}
                            onClick={() =>
                                handleStart(template.name, template.id)
                            }
                            variant="blue"
                            className="w-full py-5 text-[11px]"
                        >
                            {template.name}
                        </GlassBtn>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WorkoutSetup;
