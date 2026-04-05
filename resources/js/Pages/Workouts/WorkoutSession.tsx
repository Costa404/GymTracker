import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import ExerciseLibraryItem from "../../Components/ExerciseLibraryItem";

import useWorkoutSessionStore from "@/Hooks/useWorkoutSessionStore";
import useFilteredExercises from "@/Hooks/useFilteredExercises";
import ActiveExercisesInSession from "@/Components/ActiveExercisesInSession";

const WorkoutSession = ({ workout, workoutData, exercises }) => {
    const { startSession } = useWorkoutSessionStore();

    // A biblioteca continua a usar a lógica que já tinhas e que funciona bem
    const filteredLibrary = useFilteredExercises(
        exercises,
        workoutData,
        workout.name,
    );

    useEffect(() => {
        startSession(workout.id);
    }, [workout.id]);

    return (
        <div className="max-w-md mx-auto pt-6 px-4 pb-48 text-left">
            <Head title={`War Room | ${workout.name}`} />

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

            {/* PARTE DE CIMA: ZUSTAND APENAS */}
            <ActiveExercisesInSession
                workoutId={workout.id}
                exercises={exercises}
            />

            {/* PARTE DE BAIXO: BIBLIOTECA (Lógica PHP/Filtros) */}
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
