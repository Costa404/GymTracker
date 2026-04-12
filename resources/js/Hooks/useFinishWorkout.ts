import { router } from "@inertiajs/react";
import { useShallow } from "zustand/react/shallow";
import { useWorkoutSessionStore } from "./SessionStore/useWorkoutSessionStore";
export const useFinishWorkout = () => {
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
                onSuccess: () => finishSession(),
            },
        );
    };

    return { finishWorkout };
};
