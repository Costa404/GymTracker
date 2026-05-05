import { db } from "@/spa/db";
import axios from "axios";

/**
 * Hook/Function to handle the data handshake between Dexie and the PC.
 * It pushes local workouts to the "Porto Seguro" (SQLite) via a bulk sync.
 */
export const useSyncData = async () => {
    try {
        // 1. Fetching only unsynced workouts from the local schema
        const localWorkouts = await db.workouts
            .where("synced")
            .equals(0)
            .toArray();

        // 2. Mapping workouts with their respective logs (The Payload)
        const payload = await Promise.all(
            localWorkouts.map(async (w) => {
                const logs = await db.workoutLogs
                    .where("workout_id")
                    .equals(w.id as number)
                    .toArray();
                return { ...w, logs };
            }),
        );

        if (payload.length > 0) {
            // 3. Pushing data to the local server (Porto Seguro)
            // Heads-up: Make sure your PC IP is correct and Laravel is serving on 0.0.0.0
            const response = await axios.post(
                "http://127.0.0.1:8000/api/sync/bulk",
                { workouts: payload },
            );

            if (response.status === 200 || response.status === 201) {
                // 4. Updating local state to prevent duplicate syncs (Clean the queue)
                const ids = localWorkouts.map((w) => w.id as number);
                await db.workouts.where("id").anyOf(ids).modify({ synced: 1 });

                alert("All set! Synced with Porto Seguro.");
            }
        } else {
            alert("Nothing to sync. You're good to go!");
        }
    } catch (error) {
        // Barfed error handling
        console.error("Sync barfed:", error);
        alert("Sync failed! The connection is borked. Is the PC server up?");
    }
};
