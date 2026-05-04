import { useEffect } from "react";
import GlassBtn from "@/Components/Shared/GlassBtn";
import ActiveSessionDecider from "./ActiveSessionDecider";
import { useShallow } from "zustand/react/shallow";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";
import { useWorkoutStore } from "@/Hooks/useWorkoutStore";

const WorkoutSetup = () => {
    const { handleStart } = useWorkoutStore(
        useShallow((s) => ({
            handleStart: s.handleStart,
        })),
    );

    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);

    const workoutName = [
        { id: 1, name: "Push Day", type: "Push" },
        { id: 2, name: "Pull Day", type: "Pull" },
        { id: 3, name: "Legs Day", type: "Legs" },
        { id: 4, name: "Upper Day", type: "Upper" },
        { id: 5, name: "Full Body Day", type: "Full Body" },
    ];

    return (
        <div className="relative z-10 w-full py-10">
            {activeSessionId ? (
                <ActiveSessionDecider />
            ) : (
                <div className="flex flex-col gap-6 w-full">
                    {/* HEADER */}
                    <div className="flex items-center gap-4">
                        <h2 className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em] italic shrink-0">
                            Select Mission
                        </h2>
                        <div className="h-[1px] bg-system/10 flex-1" />
                    </div>

                    {/* LISTA */}
                    <div className="flex flex-col gap-3">
                        {workoutName.map((wName) => (
                            <GlassBtn
                                key={wName.id}
                                onClick={() =>
                                    handleStart(wName.name, wName.id)
                                }
                                className="w-full py-6 rounded-2xl bg-system/5 border border-system/20 text-system-light font-black uppercase tracking-widest italic active:bg-system/10 active:border-system/40 text-[11px]"
                            >
                                {wName.name}
                            </GlassBtn>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutSetup;
