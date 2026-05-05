import { useMemo } from "react";

const useFilteredExercises = (
    exercises?: any[],
    activeExercises?: any[],
    workoutName?: string,
) => {
    return useMemo(() => {
        // Transformamos o nome do treino em minúsculas para comparar
        const name = workoutName.toLowerCase();
        const safeActiveExercises = Array.isArray(activeExercises)
            ? activeExercises
            : [];
        const activeIds = new Set(
            safeActiveExercises.map((ex) => ex.exercise_id),
        );

        return exercises.filter((ex) => {
            if (activeIds.has(ex.id)) return false;

            // A categoria na DB pode ser "Upper Push", "Upper Pull" ou "Lower"
            const category = (ex.category || "").toLowerCase();

            // Filtro para Pernas / Lower
            if (name.includes("legs") || name.includes("lower")) {
                return category.includes("lower");
            }

            // Filtro específico para PUSH (mostra apenas Upper Push)
            if (name.includes("push")) {
                return category.includes("push");
            }

            // Filtro específico para PULL (mostra apenas Upper Pull)
            if (name.includes("pull")) {
                return category.includes("pull");
            }

            // Filtro para UPPER geral (mostra tudo o que seja Upper Push ou Pull)
            if (name.includes("upper")) {
                return category.includes("upper");
            }

            return true;
        });
    }, [exercises, activeExercises, workoutName]);
};

export default useFilteredExercises;
