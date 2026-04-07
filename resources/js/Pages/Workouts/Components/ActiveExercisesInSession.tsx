// Components/ActiveExercisesInSession.tsx
import ActiveExerciseCard from "./SessionExerciseCard";
import useWorkoutSessionStore from "@/Hooks/SessionStore/useWorkoutSessionStore";

interface ActiveExercisesInSessionProps {
    workoutId: number;
    exercises: any[];
}

const ActiveExercisesInSession = ({
    workoutId,
    exercises,
}: ActiveExercisesInSessionProps) => {
    const { sessionExercises } = useWorkoutSessionStore();

    // Filtramos exercícios que já tenham pelo menos uma série gravada
    // Ou que o utilizador acabou de selecionar (dependendo da tua lógica de 'active')
    const activeItems = sessionExercises.filter(
        (ex) => ex.sets && ex.sets.length > 0,
    );

    // Se não houver nada ativo, não renderizamos a secção para poupar scroll vertical
    if (activeItems.length === 0) {
        return null;
    }

    return (
        <section className="mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
            {/* Header da Secção mais compacto */}
            <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.5)]"></span>
                <h2 className="text-[9px] text-cyan-500 font-black uppercase tracking-[0.3em]">
                    Active Exercises
                </h2>
                <div className="h-px bg-cyan-950 flex-1 opacity-30" />
            </div>

            {/* Lista de Cards */}
            <div className="space-y-3">
                {activeItems.map((item) => {
                    const exerciseInfo = exercises.find(
                        (e) => e.id === item.exercise_id,
                    );

                    return (
                        <ActiveExerciseCard
                            key={item.exercise_id}
                            name={exerciseInfo?.name || "Unknown Exercise"}
                            setsCount={item.sets.length}
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
