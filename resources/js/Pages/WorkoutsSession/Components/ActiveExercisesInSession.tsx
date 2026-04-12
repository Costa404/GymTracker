// Components/ActiveExercisesInSession.tsx

import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";
import SessionExerciseCard from "./SessionExerciseCard";

interface ActiveExercisesInSessionProps {
    workoutId: number;
    exercises: any[];
}

const ActiveExercisesInSession = ({
    workoutId,
    exercises,
}: ActiveExercisesInSessionProps) => {
    // 1. Obtemos a lista de exercícios da sessão
    const sessionExercises = useWorkoutSessionStore((s) => s.sessionExercises);

    // LOGICA: Agora mostramos TUDO o que está no store da sessão.
    // Se o utilizador carregou um template, os exercícios já estão aqui,
    // mesmo que sets esteja vazio [].
    const activeItems = sessionExercises;

    if (!activeItems || activeItems.length === 0) {
        return null;
    }

    return (
        <section className="mb-4 animate-in fade-in slide-in-from-top-2 duration-500">
            <div className="space-y-2">
                {activeItems.map((item) => {
                    const exerciseInfo = exercises.find(
                        (e) => e.id === item.exercise_id,
                    );

                    return (
                        <SessionExerciseCard
                            key={item.exercise_id}
                            name={exerciseInfo?.name || "Unknown Exercise"}
                            // CORREÇÃO LÓGICA: Se o template carregar o exercício sem o array de sets,
                            // usamos o optional chaining ou default para evitar crash (0 sets).
                            setsCount={item.sets?.length || 0}
                            exerciseId={item.exercise_id}
                            workoutId={workoutId}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default ActiveExercisesInSession;
