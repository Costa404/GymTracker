import { db } from "@/spa/db";

export const useDataPull = () => {
    const pullDataFromPC = async (baseUrl: string) => {
        try {
            const response = await fetch(`${baseUrl}/api/sync/pull`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                },
            });
            const { workouts, exercises } = await response.json();

            await db.transaction(
                "rw",
                [db.workouts, db.exercises, db.workoutLogs],
                async () => {
                    if (exercises?.length > 0) {
                        await db.exercises.bulkPut(exercises);
                    }
                    if (workouts?.length > 0) {
                        for (const workout of workouts) {
                            await db.workouts.put({
                                id: workout.id,
                                remote_id: workout.remote_id || workout.id,
                                name: workout.name,
                                duration_seconds: workout.duration_seconds,
                                completed_at: workout.completed_at,
                                created_at: workout.created_at,
                                updated_at: workout.updated_at,
                                synced: 1,
                            });
                            if (workout.logs?.length > 0) {
                                await db.workoutLogs.bulkPut(workout.logs);
                            }
                        }
                    }
                },
            );

            alert("Sync completo!");
        } catch (error) {
            console.error(error);
            alert("Sync falhou.");
        }
    };

    return { pullDataFromPC };
};
