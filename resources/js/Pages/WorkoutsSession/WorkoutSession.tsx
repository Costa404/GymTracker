import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import SessionExercisePicker from "./Components/SessionExercisePicker";

import useFilteredExercises from "@/Hooks/useFilteredExercises";

import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";
import ActiveExercisesInSession from "./Components/ActiveExercisesInSession";

const WorkoutSession = ({ workout, workoutData, exercises }) => {
    const startSession = useWorkoutSessionStore((s) => s.startSession);
    const sessionExercises = useWorkoutSessionStore((s) => s.sessionExercises);

    const filteredLibrary = useFilteredExercises(
        exercises,
        workoutData,
        workout.name,
    );
    useEffect(() => {
        startSession(workout.id);
    }, [workout.id]);
    // No teu WorkoutSession.jsx

    // Obtemos apenas os IDs dos exercícios que já estão ativos
    const activeIds = sessionExercises.map((item) => item.exercise_id);

    // A biblioteca filtrada só mostra o que ainda NÃO foi adicionado
    const libraryToDisplay = filteredLibrary.filter(
        (ex) => !activeIds.includes(ex.id),
    );

    return (
        <div className="max-w-md mx-auto  px-4 pb-48 text-left">
            <Head title={`War Room | ${workout.name}`} />

            <header className="mb-4 flex justify-between items-start">
                <div className="flex-1">
                    {/* Título com data em destaque técnico */}
                    <h1 className="text-white text-2xl font-black uppercase tracking-tighter leading-none mb-2">
                        {workout.name}
                    </h1>

                    {/* Badge de Status: Emerald para "Live" é o padrão técnico */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                            <p className="text-[7px] text-emerald-500 font-black uppercase tracking-[0.2em]">
                                Active Session
                            </p>
                        </div>
                        {/* Opcional: ID da Sessão pequeno ao lado */}
                        <span className="text-[7px] text-zinc-600 font-bold uppercase tracking-widest">
                            Ref: #15
                        </span>
                    </div>
                </div>

                {/* CONSOLE: Substitui o antigo "Setup" */}
                <Link
                    href="/workouts/setup"
                    className="flex flex-col items-end gap-1.5 group transition-all"
                >
                    <div className="p-2.5 bg-zinc-900/50  border border-zinc-800 rounded-xl group-active:border-blue-500/50 group-active:bg-blue-500/5 transition-all shadow-inner">
                        <svg
                            className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                    </div>
                    <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-[0.3em] group-hover:text-zinc-300 transition-colors">
                        Console
                    </span>
                </Link>
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
