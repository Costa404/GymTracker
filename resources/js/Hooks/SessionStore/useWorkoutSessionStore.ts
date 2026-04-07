// useWorkoutSessionStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createTimerSlice } from "./Slices/createTimerSlice";
import { createExerciseSlice } from "./Slices/createExerciseSlice";
import { SessionStore } from "@/types";

// 1. Define o tipo que junta as fatias todas
// Podes usar os tipos que já tens no @/types ou definir aqui para ser mais rápido

// 2. Passa o tipo <SessionStore> para o create
const useWorkoutSessionStore = create<SessionStore>()(
    persist(
        (set, get) => ({
            ...createTimerSlice(set, get),
            ...createExerciseSlice(set, get),
        }),
        { name: "active-workout-session" },
    ),
);

export default useWorkoutSessionStore;
