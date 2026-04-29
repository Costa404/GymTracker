export const useExerciseHistoryLogic = (history: any[]) => {
    if (!history || history.length === 0) return [];

    // Agrupa por workout_id
    const grouped = history.reduce((acc: any, log: any) => {
        const key = log.workout_id;
        if (!acc[key]) acc[key] = { logs: [] };
        acc[key].logs.push(log);
        return acc;
    }, {});

    // Ordena do mais recente para o mais antigo
    return Object.values(grouped).sort(
        (a: any, b: any) =>
            new Date(b.logs[0].created_at).getTime() -
            new Date(a.logs[0].created_at).getTime(),
    );
};

export const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-PT");
};
