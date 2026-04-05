// Components/ActiveExercisesInSession.tsx
import ActiveExerciseCard from "./ActiveExerciseCard";
import useWorkoutSessionStore from "@/Hooks/useWorkoutSessionStore";

interface ActiveExercisesInSessionProps {
    workoutId: number;
    exercises: any[]; // Para podermos buscar o nome pelo ID se necessário
}

const ActiveExercisesInSession = ({
    workoutId,
    exercises,
}: ActiveExercisesInSessionProps) => {
    const { sessionExercises } = useWorkoutSessionStore();

    // Filtramos apenas exercícios que já tenham pelo menos uma série gravada
    const activeItems = sessionExercises.filter(
        (ex) => ex.sets && ex.sets.length > 0,
    );

    return (
        <section className="space-y-4 mb-16">
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                <h2 className="text-[10px] text-cyan-500 font-black uppercase tracking-[0.4em] italic">
                    Active Exercises
                </h2>
            </div>

            {activeItems.length > 0 ? (
                activeItems.map((item) => {
                    const exerciseInfo = exercises.find(
                        (e) => e.id === item.exercise_id,
                    );
                    return (
                        <ActiveExerciseCard
                            key={item.exercise_id}
                            name={exerciseInfo?.name || "Unknown"}
                            setsCount={item.sets.length}
                            exerciseId={item.exercise_id}
                            workoutId={workoutId}
                        />
                    );
                })
            ) : (
                <div className="py-16 text-center border-2 border-dashed border-zinc-800 rounded-3xl opacity-30">
                    <p className="text-zinc-500 text-[9px] font-black uppercase italic">
                        No exercises added yet
                    </p>
                </div>
            )}
        </section>
    );
};

export default ActiveExercisesInSession;
