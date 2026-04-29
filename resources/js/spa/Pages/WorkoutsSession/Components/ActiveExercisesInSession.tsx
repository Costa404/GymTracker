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
    // 1. Obtemos a lista de exercícios da sessão (seletor atómico para performance)
    const sessionExercises = useWorkoutSessionStore((s) => s.sessionExercises);

    // Se a sessão estiver vazia, não renderizamos nada
    if (!sessionExercises || sessionExercises.length === 0) {
        return null;
    }

    return (
        <section className="mb-0 animate-in fade-in slide-in-from-top-4 duration-700 ease-out">
            {/* Título opcional para dar contexto de sistema (System) */}
            <div className="flex items-center gap-2 mb-4 ">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-system/20 to-transparent" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-system-light/40 italic">
                    Current Sequence
                </span>
            </div>

            <div className="space-y-3">
                {sessionExercises.map((item) => {
                    const exerciseInfo = exercises.find(
                        (e) => e.id === item.exercise_id,
                    );

                    return (
                        <SessionExerciseCard
                            key={item.exercise_id}
                            name={exerciseInfo?.name || "Unknown Exercise"}
                            // Lógica de contagem robusta
                            setsCount={item.sets?.length || 0}
                            exerciseId={item.exercise_id}
                            workoutId={workoutId}
                        />
                    );
                })}
            </div>

            {/* Linha final para fechar o bloco visualmente */}
            <div className=" h-[1px] w-full bg-gradient-to-r from-transparent via-system/5 to-transparent" />
        </section>
    );
};

export default ActiveExercisesInSession;
