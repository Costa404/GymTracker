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
    reps: number;
    weight: number;
}

export interface ActiveExercise {
    exercise_id: number;
    name: string;
    sets: Set[];
}

// Interface completa para o Zustand
export interface WorkoutSessionStore {
    activeSessionId: number | null;
    sessionExercises: ActiveExercise[];
    startSession: (workoutId: number) => void;
    addExercise: (exerciseId: number, name: string) => void;
    addSet: (exerciseId: number, weight: number, reps: number) => void;
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
