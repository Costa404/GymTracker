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
        /* Contentor padrão: px-6 e espaçamento vertical generoso */
        <div className="min-h-screen max-w-md mx-auto  relative overflow-hidden ">
            <Head title="Setup" />

            <div className="relative z-10">
                {activeSessionId ? (
                    <ActiveSessionDecider />
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-3">
                            <h2 className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] italic">
                                Select Mission
                            </h2>
                            <div className="h-[1px] bg-system/10 flex-1" />
                        </div>

                        <div className="space-y-3">
                            {templates.map((template) => (
                                <GlassBtn
                                    key={template.id}
                                    onClick={() =>
                                        handleStart(template.name, template.id)
                                    }
                                    /* Botão estilo Industrial: Fundo Black, Borda System */
                                    className="w-full py-6 rounded-2xl bg-system/5 border border-system/20 text-system-light font-black uppercase italic tracking-widest hover:bg-system/10 hover:border-system/40 transition-all text-[11px]"
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
