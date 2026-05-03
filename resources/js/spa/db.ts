import Dexie, { Table } from "dexie";

// ==========================================
// ENTITIES (Database Schema Interfaces)
// ==========================================

export interface Workout {
    id?: number;
    name: string | null;
    remote_id?: number | null;
    duration_seconds: number | null;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
    synced: number; // 0 = local only, 1 = synced to PC
}

export interface Exercise {
    id?: number;
    name: string;
    muscle_group: string | null;
    category: string | null;
    created_at: string;
    updated_at: string;
}

export interface WorkoutLog {
    id?: number;
    workout_id: number; // Linked to Workout.id
    exercise_id: number; // Linked to Exercise.id
    set_number: number;
    weight: number;
    reps: number;
    rir: number | null;
    type: string;
    created_at: string;
    updated_at: string;
}

// ==========================================
// DATABASE ENGINE
// ==========================================

export class GymDatabase extends Dexie {
    workouts!: Table<Workout>;
    exercises!: Table<Exercise>;
    workoutLogs!: Table<WorkoutLog>;

    constructor() {
        super("GymTrackerDB");

        // Versioning: if you change this string, Dexie will handle migrations
        this.version(1).stores({
            workouts: "++id, completed_at, synced",
            exercises: "++id, name, muscle_group",
            workoutLogs: "++id, workout_id, exercise_id",
        });
    }
}

// Export a single instance to be used across the app
export const db = new GymDatabase();
