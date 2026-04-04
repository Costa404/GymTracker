import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import ActiveExerciseCard from "../../Components/ActiveExerciseCard";
import ExerciseLibraryItem from "../../Components/ExerciseLibraryItem";
import useWorkoutSessionStore from "@/Hooks/useWorkoutSessionStore";
import useFilteredExercises from "@/Hooks/useFilteredExercises";

const WorkoutSession = ({ workout, workoutData, exercises }) => {
    // workoutData vem do PHP como ['Exercise Name' => [logs...]]
    const activeExercises = Object.entries(workoutData || {});
    const { startSession } = useWorkoutSessionStore();

    // Hook para filtrar a biblioteca (esconde ativos e filtra por categoria)
    const filteredLibrary = useFilteredExercises(
        exercises,
        workoutData,
        workout.name,
    );

    useEffect(() => {
        // Regista o ID da sessão no Zustand ao carregar
        startSession(workout.id);
    }, [workout.id]);

    return (
        <div className="max-w-md mx-auto pt-6 px-4 pb-48 text-left">
            <Head title={`War Room | ${workout.name}`} />

            {/* HEADER */}
            <header className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-white text-2xl font-black italic uppercase tracking-tighter">
                        {workout.name}
                    </h1>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">
                        Session in progress
                    </p>
                </div>
                <Link
                    href="/workouts/setup"
                    className="text-[9px] text-zinc-400 font-black uppercase border border-zinc-800 px-4 py-2 rounded-xl italic hover:bg-zinc-900 transition"
                >
                    Back
                </Link>
            </header>

            <section className="space-y-4 mb-16">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                    <h2 className="text-[10px] text-cyan-500 font-black uppercase tracking-[0.4em] italic">
                        Active Exercises
                    </h2>
                </div>

                {activeExercises.length > 0 ? (
                    activeExercises.map(([name, logs]: [string, any]) => (
                        <ActiveExerciseCard
                            key={name}
                            name={name}
                            setsCount={logs.length}
                            exerciseId={logs[0].exercise_id}
                            workoutId={workout.id}
                        />
                    ))
                ) : (
                    <div className="py-16 text-center border-2 border-dashed border-zinc-800 rounded-3xl opacity-30">
                        <p className="text-zinc-500 text-[9px] font-black uppercase italic">
                            No exercises added yet
                        </p>
                    </div>
                )}
            </section>

            {/* SEÇÃO 2: BIBLIOTECA (PARA ADICIONAR NOVOS) */}
            <section className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-zinc-800 flex-1" />
                    <h2 className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em] italic">
                        Add to Session
                    </h2>
                    <div className="h-px bg-zinc-800 flex-1" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {filteredLibrary.length > 0 ? (
                        filteredLibrary.map((ex) => (
                            <ExerciseLibraryItem
                                key={ex.id}
                                exercise={ex}
                                workoutId={workout.id}
                            />
                        ))
                    ) : (
                        <p className="text-center text-[10px] text-zinc-600 uppercase font-bold italic">
                            All category exercises added
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default WorkoutSession;
