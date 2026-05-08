// useSyncData.ts
import { db } from "@/spa/db";

export const useSyncData = () => {
    const pushToPC = async (baseUrl: string) => {
        // Só envia workouts não sincronizados
        const localWorkouts = await db.workouts
            .where("synced")
            .equals(0)
            .toArray();

        if (localWorkouts.length === 0) {
            alert("Nada para sincronizar.");
            return;
        }

        const payload = await Promise.all(
            localWorkouts.map(async (w) => {
                const logs = await db.workoutLogs
                    .where("workout_id")
                    .equals(w.id as number)
                    .toArray();
                return { ...w, id: undefined, logs }; // sem id — PC cria o id novo
            }),
        );

        const exercises = await db.exercises
            .where("synced")
            .equals(0)
            .toArray();

        const response = await fetch(`${baseUrl}/api/sync/bulk`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
            },
            body: JSON.stringify({ workouts: payload, exercises }),
        });

        if (!response.ok) throw new Error("Push falhou");

        const result = await response.json();

        // Marca como sincronizado no Dexie
        const ids = localWorkouts.map((w) => w.id as number);
        await db.workouts.where("id").anyOf(ids).modify({ synced: 1 });
        await db.exercises
            .where("id")
            .anyOf(exercises.map((e) => e.id as number))
            .modify({ synced: 1 });

        alert(`Push completo! ${result.status}`);
    };

    return { pushToPC };
};
