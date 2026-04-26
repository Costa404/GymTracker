import { useState } from "react";
import { router } from "@inertiajs/react";
import { useShallow } from "zustand/react/shallow";
import { useWorkoutSessionStore } from "./SessionStore/useWorkoutSessionStore";

export const useFinishWorkout = () => {
    const [isFinishing, setIsFinishing] = useState(false);

    const { activeSessionId, sessionExercises, finishSession } =
        useWorkoutSessionStore(
            useShallow((s) => ({
                activeSessionId: s.activeSessionId,
                sessionExercises: s.sessionExercises,
                finishSession: s.finishSession,
            })),
        );

    const finishWorkout = () => {
        if (!confirm("End Workout?")) return;

        router.post(
            route("workouts.finish", { workout: activeSessionId }),
            {
                exercises: sessionExercises,
                duration_seconds:
                    useWorkoutSessionStore.getState().elapsedSeconds,
            },
            {
                onStart: () => setIsFinishing(true),
                onSuccess: () => {
                    finishSession();
                    router.visit(route("dashboard"));
                },
                onFinish: () => setIsFinishing(false),
            },
        );
    };

    return { finishWorkout, isFinishing };
};
