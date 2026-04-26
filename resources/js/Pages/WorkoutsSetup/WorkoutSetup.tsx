import { useEffect } from "react";
import { Head } from "@inertiajs/react";
import useWorkoutStore from "@/Hooks/useWorkoutStore";
import GlassBtn from "@/Components/Shared/GlassBtn";
import ActiveSessionDecider from "./ActiveSessionDecider";

import { useShallow } from "zustand/react/shallow";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

const WorkoutSetup = ({ templates, active }) => {
    const { handleStart, setTemplates } = useWorkoutStore(
        useShallow((s) => ({
            handleStart: s.handleStart,
            setTemplates: s.setTemplates,
        })),
    );

    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);
    console.log("WorkoutSetup active prop:", active);
    useEffect(() => {
        setTemplates(templates);
    }, [templates]);

    return (
        /* h-full e justify-center para centrar verticalmente o conteúdo */
        <div className="h-full w-full flex flex-col justify-center relative overflow-hidden">
            <Head title="Setup" />

            <div className="relative z-10 w-full py-10">
                {activeSessionId ? (
                    /* O ActiveSessionDecider já tem o seu próprio flex gap */
                    <ActiveSessionDecider activeWorkout={active} />
                ) : (
                    <div className="flex flex-col gap-6 w-full">
                        {/* HEADER: Select Mission */}
                        <div className="flex items-center gap-4">
                            <h2 className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] italic shrink-0">
                                Select Mission
                            </h2>
                            <div className="h-[1px] bg-system/10 flex-1" />
                        </div>

                        {/* LISTA DE TEMPLATES: Gap-3 consistente para mobile */}
                        <div className="flex flex-col gap-3">
                            {templates.map((template) => (
                                <GlassBtn
                                    key={template.id}
                                    onClick={() =>
                                        handleStart(template.name, template.id)
                                    }
                                    /* Removido hover por active (mobile-first) e garantida a largura total */
                                    className="w-full py-6 rounded-2xl bg-system/5 border border-system/20 text-system-light font-black uppercase italic tracking-widest active:bg-system/10 active:border-system/40 transition-all text-[11px] active:scale-[0.98]"
                                >
                                    {template.name}
                                </GlassBtn>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutSetup;
