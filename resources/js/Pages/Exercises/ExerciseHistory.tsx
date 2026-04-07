import { Head, Link } from "@inertiajs/react";
import { LogHeader } from "./Components/LogHeader";
import useWorkoutSessionStore from "@/Hooks/SessionStore/useWorkoutSessionStore";

const ExerciseHistory = ({ exercise, ExerciseHistory, workout_name }: any) => {
    // Simulação: Se a DB estiver vazia, o 'ExerciseHistory' será um array vazio []
    const hasExerciseHistory = ExerciseHistory && ExerciseHistory.length > 0;

    const { sessionExercises } = useWorkoutSessionStore();

    // DEBUG 1: O que está no Store neste momento?
    console.log("DEBUG - Zustand sessionExercises:", sessionExercises);

    const activeItems = sessionExercises.filter(
        (ex) => ex.sets && ex.sets.length > 0,
    );

    // DEBUG 2: O filtro de séries está a deixar passar alguma coisa?
    console.log("DEBUG - Active Items após filtro:", activeItems);
    // DEBUG 2: O filtro de séries está a deixar passar alguma coisa?
    console.log("DEBUG - Active Items após filtro:", activeItems);
    return (
        <div className="min-h-screen text-white p-6 font-sans relative overflow-hidden">
            <Head title={`ExerciseHistory | ${exercise.name}`} />

            {/* Efeito de Brilho Verde (Emerald) para o Histórico */}
            <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10 max-w-lg mx-auto">
                <LogHeader
                    exerciseName={exercise.name}
                    exerciseId={exercise.id}
                    workoutName={workout_name}
                    workoutId={null}
                    showHistoryButton={false}
                />

                <div className="space-y-6">
                    {hasExerciseHistory ? (
                        ExerciseHistory.map((log: any, index: number) => (
                            <div
                                key={index}
                                className="bg-[#0a1220]/40 border border-emerald-500/20 rounded-[2rem] p-6 backdrop-blur-xl shadow-xl flex justify-between items-center group hover:border-emerald-500/40 transition-all"
                            >
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60 block mb-1">
                                        {new Date(
                                            log.created_at,
                                        ).toLocaleDateString("pt-PT")}
                                    </span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-black italic">
                                            {log.weight}
                                        </span>
                                        <span className="text-xs font-black text-emerald-400 uppercase">
                                            KG
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right font-black italic">
                                    <span className="text-2xl text-white/90">
                                        {log.reps}
                                    </span>
                                    <span className="text-[10px] text-zinc-500 uppercase ml-1">
                                        Reps
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        /* ESTADO VAZIO (SIMULAÇÃO) */
                        <div className="bg-[#0a1220]/60 border border-dashed border-white/10 rounded-[2.5rem] p-16 backdrop-blur-3xl flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 rounded-full bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center animate-pulse">
                                <span className="text-3xl opacity-40">📈</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/80">
                                    No Data Detected
                                </h3>
                                <p className="text-[10px] text-zinc-600 font-black italic uppercase mt-2 tracking-widest leading-relaxed">
                                    System standby. <br />
                                    Complete your first set to sync performance.
                                </p>
                            </div>

                            <Link
                                href={`/exercises/${exercise.id}?workout_id=${1}`} // Exemplo
                                className="mt-4 px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all"
                            >
                                Start Training
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExerciseHistory;
