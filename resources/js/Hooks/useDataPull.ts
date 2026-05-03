import axios from "axios";
import { db } from "@/spa/db";

export const useDataPull = () => {
    const pullDataFromPC = async () => {
        try {
            // Substitui pelo IP do teu PC na rede local
            const response = await axios.get(
                "http://127.0.0.1:8000/api/sync/pull",
            );
            const { workouts, exercises } = response.data;

            // Usamos uma transação para garantir que os dados entram todos ou nenhum
            await db.transaction(
                "rw",
                db.workouts,
                db.exercises,
                db.workoutLogs,
                async () => {
                    // 1. Atualizar Exercícios
                    if (exercises.length > 0) {
                        await db.exercises.bulkPut(exercises);
                    }

                    // 2. Atualizar Workouts e os seus Logs
                    for (const workout of workouts) {
                        // Guardamos o treino. O bulkPut usa a Primary Key (id)
                        // para decidir se faz Update ou Create.
                        await db.workouts.put({
                            id: workout.id,
                            remote_id: workout.remote_id || workout.id,
                            name: workout.name,
                            duration_seconds: workout.duration_seconds,
                            completed_at: workout.completed_at,
                            created_at: workout.created_at,
                            updated_at: workout.updated_at,
                            synced: 1, // Como vem do PC, já está sincronizado
                        });

                        // 3. Se o workout trouxer logs (Eager Loading do Laravel), guardamo-los
                        if (workout.logs && workout.logs.length > 0) {
                            await db.workoutLogs.bulkPut(workout.logs);
                        }
                    }
                },
            );

            alert("Sync Complete: Data is now local.");
        } catch (error) {
            console.error("Failed to pull data from PC:", error);
            alert("Sync Failed. Make sure the PC server is running.");
        }
    };

    return { pullDataFromPC };
};
