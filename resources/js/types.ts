// Interfaces que já tinhas
export interface Template {
    id: number;
    name: string;
}

export interface Workout {
    id: number;
    name: string;
}

export interface Exercise {
    id: number;
    name: string;
    muscle_group: string; // Adicionei este que criámos na migration
}

// --- Novas Interfaces para o Store ---

export interface Set {
    weight: number;
    reps: number;
    rir: number | null;
    created_at?: string;
}

export interface ActiveExercise {
    exercise_id: number;
    name: string;
    sets: Set[];
}

export interface SessionStore {
    activeSessionId: number | null;
    sessionExercises: any[];
    startTime: number | null;
    elapsedSeconds: number;
    tick: () => void;
    startSession: (id: number) => void;
    addSet: (
        exerciseId: number,
        weight: number,
        reps: number,
        rir: number,
    ) => void;
    finishSession: () => void;
}

export interface WorkoutState {
    selectedIndex: number;
    templates: Template[];
    isStarting?: boolean; // Adicionado para suportar o estado de loading
}

export interface WorkoutActions {
    setTemplates: (templates: Template[]) => void;
    next: () => void;
    prev: () => void;
    handleStart: (type: string, id?: number | null) => void;
}

// Interface completa para o Store
export type WorkoutStore = WorkoutState & WorkoutActions;

export interface LogData {
    exercise_id: number;
    workout_id: number;
    weight: string | number;
    reps: string | number;
    rir: string | number | null;
}

export interface InputGroupProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    suffix?: string;
    placeholder?: string;
}
