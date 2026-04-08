import { Head, Link } from "@inertiajs/react";

import { useEffect, useMemo } from "react";
import LogHeader from "./Components/LogHeader";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

const ExerciseHistory = ({
    exercise,
    workout,
    history = [],
    workout_name,
}: any) => {
    // DEBUG 1: Monitorizar se o componente está a re-renderizar em loop
    console.log("LOG: [ExerciseHistory] Renderizou agora.");

    // Pegamos no Store mas apenas no que precisamos (Selector)
    // Isto evita que o componente re-renderize por causa do TIMER da Navbar
    const sessionExercises = useWorkoutSessionStore(
        (state) => state.sessionExercises,
    );

    useEffect(() => {
        console.log(
            "DEBUG - Zustand sessionExercises mudou:",
            sessionExercises,
        );
    }, [sessionExercises]);

    // UseMemo para evitar cálculos pesados e re-renders inúteis
    const hasHistory = useMemo(() => history && history.length > 0, [history]);

    return (
        <div className="min-h-screen bg-black text-white p-6 font-sans relative overflow-hidden">
            <Head title={`Archive | ${exercise.name}`} />

            {/* Efeito de Brilho Verde (Emerald) para o Histórico */}
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[40%] bg-emerald-500/5  rounded-full pointer-events-none z-0" />

            <div className="relative z-10 max-w-lg mx-auto">
                <LogHeader
                    exerciseName={exercise.name}
                    exerciseId={exercise.id}
                    workoutName={workout_name || workout?.name}
                    workoutId={workout?.id}
                    showHistoryButton={false}
                />

                <div className="space-y-6 mt-8">
                    {hasHistory ? (
                        history.map((log: any, index: number) => (
                            <div
                                key={log.id || index}
                                className="group relative overflow-hidden rounded-[2rem] p-[1px] transition-all"
                            >
                                {/* Borda Glass Emerald Permanente */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-white/5 to-transparent" />

                                <div className="relative bg-zinc-950/80 -xl rounded-[2rem] p-6 flex justify-between items-center shadow-2xl">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-500/60 block">
                                            {log.created_at
                                                ? new Date(
                                                      log.created_at,
                                                  ).toLocaleDateString("pt-PT")
                                                : "MISSION DATA"}
                                        </span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-black italic tracking-tighter text-white">
                                                {log.weight}
                                            </span>
                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                                                KG
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-[1px] bg-zinc-800/50" />
                                        <div className="text-right">
                                            <div className="flex items-baseline justify-end gap-1.5">
                                                <span className="text-2xl font-black italic text-white/90">
                                                    {log.reps}
                                                </span>
                                                <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">
                                                    Reps
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        /* EMPTY STATE TÉCNICO */
                        <div className="border border-dashed border-zinc-800 rounded-[2.5rem] p-16 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center mb-6 animate-pulse">
                                <span className="text-2xl opacity-20">📡</span>
                            </div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
                                No Logs Found
                            </h3>
                            <p className="text-[8px] text-zinc-700 font-bold uppercase mt-3 tracking-[0.2em] leading-relaxed">
                                Archive is empty. <br />
                                Execute a session to sync log data.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExerciseHistory;
