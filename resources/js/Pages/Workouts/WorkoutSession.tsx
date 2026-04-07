import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import SessionExercisePicker from "./Components/SessionExercisePicker";
import GlassBtn from "@/Components/Shared/GlassBtn"; // Importamos o novo componente

import useWorkoutSessionStore from "@/Hooks/SessionStore/useWorkoutSessionStore";
import useFilteredExercises from "@/Hooks/useFilteredExercises";
import ActiveExercisesInSession from "@/Pages/Workouts/Components/ActiveExercisesInSession";

const WorkoutSession = ({ workout, workoutData, exercises }) => {
    const { startSession } = useWorkoutSessionStore();

    const filteredLibrary = useFilteredExercises(
        exercises,
        workoutData,
        workout.name,
    );

    useEffect(() => {
        startSession(workout.id);
    }, [workout.id]);

    // No teu WorkoutSession.jsx
    const { sessionExercises } = useWorkoutSessionStore();

    // Obtemos apenas os IDs dos exercícios que já estão ativos
    const activeIds = sessionExercises.map((item) => item.exercise_id);

    // A biblioteca filtrada só mostra o que ainda NÃO foi adicionado
    const libraryToDisplay = filteredLibrary.filter(
        (ex) => !activeIds.includes(ex.id),
    );

    return (
        <div className="max-w-md mx-auto  px-4 pb-48 text-left">
            <Head title={`War Room | ${workout.name}`} />

            <header className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-white text-xl font-black uppercase tracking-tighter leading-none">
                        {workout.name}
                    </h1>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-[0.2em]">
                            Live Session
                        </p>
                    </div>
                </div>

                <GlassBtn
                    href="/workouts/setup"
                    variant="zinc"
                    className="px-3 py-1.5 text-[10px]"
                >
                    Setup
                </GlassBtn>
            </header>

            {/* PARTE DE CIMA: ZUSTAND */}
            <ActiveExercisesInSession
                workoutId={workout.id}
                exercises={exercises}
            />

            {/* PARTE DE BAIXO: BIBLIOTECA */}
            <section className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px bg-zinc-800 flex-1" />
                    {/* Removido o italic daqui */}
                    <h2 className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em]">
                        Add to Session
                    </h2>
                    <div className="h-px bg-zinc-800 flex-1" />
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {libraryToDisplay.length > 0 ? (
                        libraryToDisplay.map((ex) => (
                            <SessionExercisePicker
                                key={ex.id}
                                exercise={ex}
                                workoutId={workout.id}
                            />
                        ))
                    ) : (
                        /* Removido o italic daqui */
                        <p className="text-center text-[10px] text-zinc-600 uppercase font-bold">
                            All category exercises added
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default WorkoutSession;
