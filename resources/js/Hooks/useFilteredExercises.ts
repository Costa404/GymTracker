import { useMemo } from "react";

// Adicionamos activeExercises como argumento
const useFilteredExercises = (
    exercises: any[],
    activeExercises: any[],
    workoutName: string,
) => {
    return useMemo(() => {
        const name = workoutName.toLowerCase();

        // 1. Criar um conjunto (Set) com os IDs dos exercícios que já estão no treino
        // Usamos Set para uma pesquisa super rápida (Performance O(1))
        const activeIds = new Set(activeExercises.map((ex) => ex.exercise_id));

        // 2. Filtrar a lista total
        return exercises.filter((ex) => {
            // REGRA A: Já está ativo? Se sim, retira (false)
            if (activeIds.has(ex.id)) {
                return false;
            }

            // REGRA B: Filtragem por Categoria (Push/Pull/Legs)
            if (name.includes("custom") || name.includes("manual")) {
                return true;
            }

            const muscleGroup = ex.muscle_group.toLowerCase();
            if (name.includes("legs")) return muscleGroup.includes("legs");
            if (name.includes("push")) return muscleGroup.includes("push");
            if (name.includes("pull")) return muscleGroup.includes("pull");
            if (name.includes("upper")) return muscleGroup.includes("upper");

            return true;
        });
    }, [exercises, activeExercises, workoutName]); // Recalcula se os ativos mudarem
};

export default useFilteredExercises;
