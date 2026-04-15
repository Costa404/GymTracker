import { Head } from "@inertiajs/react";
import { useState } from "react";
import { useLogExercise } from "@/Hooks/useLogExercise";
import { LogSetList } from "./Components/LogSetList";
import { RirSelector } from "./Components/RirSelector";
import { InputGroup } from "./Components/InputGroup";
import ExercisesHeader from "./Components/ExercisesHeader";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

const ExerciseDisplay = ({ exercise, workout, lastWeights, lastReps }: any) => {
    const { weight, setWeight, reps, setReps, rir, setRir, saveLocally } =
        useLogExercise();
    const [saved, setSaved] = useState(false);
    // Extraímos a nova função da store
    const removeSet = useWorkoutSessionStore((s) => s.removeSet);

    const deleteSet = (index: number) => {
        // Chamamos a store enviando o ID do exercício atual e o index da série
        removeSet(exercise.id, index);
    };

    // Seletor Atómico para evitar re-renders desnecessários do timer
    const currentExercise = useWorkoutSessionStore((s) =>
        s.sessionExercises.find((ex) => ex.exercise_id === exercise.id),
    );

    const isInvalid = !weight || !reps || weight === "0" || reps === "0";

    const handleAction = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (isInvalid) return;
        saveLocally(exercise.id);
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
    };

    return (
        <div className="min-h-screen text-white font-sans relative overflow-hidden ">
            <Head title={`Log | ${exercise.name}`} />

            {/* GLOW DE FUNDO: Usa a tua variável light para o ambiente */}

            <div className="relative z-10 max-w-lg mx-auto ">
                <ExercisesHeader
                    exerciseName={exercise.name}
                    workoutName={workout.name}
                    exerciseId={exercise.id}
                    workoutId={workout.id}
                />

                {/* FORMULÁRIO PRINCIPAL */}
                <form
                    onSubmit={handleAction}
                    className=" border-2 border-performance/30 ring-1 ring-performance/5 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(16,185,129,0.05)] relative overflow-hidden"
                >
                    {/* Brilho interno no canto superior direito */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-performance/15 blur-[40px] pointer-events-none" />

                    <div className="grid grid-cols-2 gap-8 relative z-10">
                        <InputGroup
                            label="Weight"
                            value={weight}
                            onChange={setWeight}
                            suffix="KG"
                            lastSets={lastWeights}
                        />
                        <InputGroup
                            label="Reps"
                            value={reps}
                            onChange={setReps}
                            lastSets={lastReps}
                        />
                    </div>

                    <div className="relative z-10 mt-6">
                        <RirSelector currentRir={rir} onSelect={setRir} />
                    </div>

                    {/* BOTÃO DE SUBMISSÃO DINÂMICO */}
                    <button
                        type="submit"
                        disabled={isInvalid || saved}
                        className={`w-full mt-8 py-6 rounded-2xl font-black uppercase italic text-[11px] tracking-[0.4em] transition-all duration-300 relative overflow-hidden group
                        ${
                            saved
                                ? "bg-performance text-black scale-[0.98] shadow-[0_0_20px_var(--color-performance)]"
                                : isInvalid
                                  ? "bg-zinc-900/50 border border-zinc-800 text-zinc-800 cursor-not-allowed"
                                  : "bg-performance/10 border-2 border-performance/30 text-performance-light active:bg-performance/20 active:scale-[0.99]"
                        }`}
                    >
                        <span className="relative z-10">
                            {saved
                                ? "✓ Set Recorded"
                                : isInvalid
                                  ? "Enter Stats"
                                  : "Save Set"}
                        </span>

                        {/* Efeito de brilho que passa pelo botão no hover */}
                        {!saved && !isInvalid && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-performance-light/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        )}
                    </button>
                </form>

                {/* LISTAGEM DE SÉRIES ANTERIORES */}
                <div className="mt-4">
                    <LogSetList
                        sets={currentExercise?.sets || []}
                        onDelete={deleteSet}
                    />
                </div>
            </div>
        </div>
    );
};

export default ExerciseDisplay;
