import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useWorkoutSessionStore } from "./SessionStore/useWorkoutSessionStore";
import { db } from "@/spa/db";

export const useFinishWorkout = () => {
    const [isFinishing, setIsFinishing] = useState(false);
    const navigate = useNavigate();

    const { activeSessionId, sessionExercises, finishSession } =
        useWorkoutSessionStore(
            useShallow((s) => ({
                activeSessionId: s.activeSessionId,
                sessionExercises: s.sessionExercises,
                finishSession: s.finishSession,
            })),
        );

    const finishWorkout = async () => {
        if (!confirm("Are you sure you want to end this workout?")) return;

        setIsFinishing(true);

        try {
            const state = useWorkoutSessionStore.getState();
            const duration = state.elapsedSeconds;
            const now = new Date().toISOString();

            if (activeSessionId) {
                const logsToInsert: any[] = [];

                // Mapping exercises to logs
                sessionExercises.forEach((exercise: any) => {
                    exercise.sets.forEach((set: any, index: number) => {
                        // Technical check: only save sets with actual data
                        if (set.reps > 0 || set.weight > 0) {
                            logsToInsert.push({
                                workout_id: activeSessionId,
                                exercise_id: exercise.exercise_id,
                                set_number: index + 1,
                                weight: set.weight,
                                reps: set.reps,
                                rir: set.rir ?? null,
                                type: "normal",
                                created_at: now,
                                updated_at: now,
                            });
                        }
                    });
                });

                // EDGE CASE: Empty Workout Handling
                if (logsToInsert.length === 0) {
                    // Discard empty workout from local DB
                    await db.workouts.delete(activeSessionId);
                } else {
                    // Save workout data
                    await db.workouts.update(activeSessionId, {
                        duration_seconds: duration,
                        completed_at: now,
                        updated_at: now,
                        synced: 0, // Flag for future sync
                    });

                    // Bulk insert logs
                    await db.workoutLogs.bulkAdd(logsToInsert);
                }
            }

            // Cleanup session state
            finishSession();
            setIsFinishing(false);
            navigate("/workout/summary");
        } catch (error) {
            console.error("Critical error while finishing session:", error);
            alert("Failed to save workout. Please try again.");
            setIsFinishing(false);
        }
    };

    return { finishWorkout, isFinishing };
};
