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
    console.log("URL:", route("workouts.finish", { workout: activeSessionId }));
    const finishWorkout = () => {
        if (!confirm("End Workout?")) return;
        console.log("exercises:", sessionExercises);
        // EM VEZ DE: `/workouts/finish/${activeSessionId}`
        // USAMOS O NOME DA ROTA:
        console.log(route("workouts.finish", { workout: activeSessionId }));
        router.post(
            route("workouts.finish", { workout: activeSessionId }),
            {
                exercises: sessionExercises,
                duration_seconds:
                    useWorkoutSessionStore.getState().elapsedSeconds,
            },
            {
                onSuccess: () => finishSession(),
                onError: (err) => console.error(err),
            },
        );
    };

    return { finishWorkout };
};
