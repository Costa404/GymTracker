import Dexie, { Table } from "dexie";

// 1. A Tabela Mestre: 'workouts'
export interface Workout {
    id?: number;
    name: string | null;
    duration_seconds: number | null;
    completed_at: string | null;
    created_at: string;
    updated_at: string;
}

// 2. A Lista de Exercícios: 'exercises'
export interface Exercise {
    id?: number;
    name: string;
    muscle_group: string | null;
    category: string | null;
    created_at: string;
    updated_at: string;
}

// 3. O Registo das Séries (Fundimos a ideia do workout_logs e exercise_logs para a SPA)
export interface WorkoutLog {
    id?: number;
    workout_id: number; // Liga à tabela 'workouts'
    exercise_id: number; // Liga à tabela 'exercises'
    set_number: number;
    weight: number;
    reps: number;
    rir: number | null;
    type: string; // 'normal', 'warmup', etc (default: 'normal')
    created_at: string;
    updated_at: string;
}

export class GymDatabase extends Dexie {
    workouts!: Table<Workout>;
    exercises!: Table<Exercise>;
    workoutLogs!: Table<WorkoutLog>;

    constructor() {
        super("GymTrackerDB");

        // Define as Primary Keys (++) e os Indexes para pesquisas rápidas
        this.version(1).stores({
            workouts: "++id, completed_at",
            exercises: "++id, name, muscle_group",
            workoutLogs: "++id, workout_id, exercise_id",
        });
    }
}

export const db = new GymDatabase();
