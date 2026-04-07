// Hooks/sessionUtils.ts

export const createNewSet = (
    weight: number,
    reps: number,
    rir: number | null,
) => ({
    weight,
    reps,
    rir,
    created_at: new Date().toISOString(),
});

export const updateExercisesWithSet = (
    exercises: any[],
    exerciseId: number,
    newSet: any,
) => {
    const hasExercise = exercises.some((ex) => ex.exercise_id === exerciseId);

    // Se o exercício ainda não foi tocado neste treino, adicionamo-lo à lista
    if (!hasExercise) {
        return [
            ...exercises,
            { exercise_id: exerciseId, name: "", sets: [newSet] },
        ];
    }

    // Se já existe, apenas adicionamos o novo "Set" ao array de sets dele
    return exercises.map((ex) =>
        ex.exercise_id === exerciseId
            ? { ...ex, sets: [...ex.sets, newSet] }
            : ex,
    );
};
