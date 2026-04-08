import { Head } from "@inertiajs/react";
import { useState, useMemo } from "react";
import { useLogExercise } from "@/Hooks/useLogExercise";
import { LogSetList } from "./Components/LogSetList";
import { RirSelector } from "./Components/RirSelector";
import { InputGroup } from "./Components/InputGroup";
import LogHeader from "./Components/LogHeader";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

const ExerciseDisplay = ({ exercise, workout, lastWeights, lastReps }: any) => {
    const { weight, setWeight, reps, setReps, rir, setRir, saveLocally } =
        useLogExercise();
    const [saved, setSaved] = useState(false);

    // Seletor Atómico: Importante para ignorar o timer global
    const currentExercise = useWorkoutSessionStore((s) =>
        s.sessionExercises.find((ex) => ex.exercise_id === exercise.id),
    );

    const isInvalid = !weight || !reps || weight === "0" || reps === "0";

    const handleAction = (e: React.FormEvent) => {
        e.preventDefault();
        if (isInvalid) return;
        saveLocally(exercise.id);
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
    };

    // LOG: Agora só deve aparecer quando alteras o formulário, não a cada segundo
    console.log("LOG: [ExerciseDisplay] Render.");

    return (
        <div className="min-h-screen text-white font-sans relative overflow-hidden px-4">
            <Head title={`Log | ${exercise.name}`} />

            {/* GLOW DE FUNDO: Substituímos o blur dinâmico por um gradiente radial simples */}
            <div
                className="absolute top-[-5%] left-[-5%] w-[50%] h-[30%] pointer-events-none z-0 opacity-40"
                style={{
                    background:
                        "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
                }}
            />

            <div className="relative z-10 max-w-lg mx-auto">
                <LogHeader
                    exerciseName={exercise.name}
                    workoutName={workout.name}
                    exerciseId={exercise.id}
                    workoutId={workout.id}
                />

                {/* FORMULÁRIO: Removido o backdrop-blur, usamos uma cor sólida profunda */}
                <form
                    onSubmit={handleAction}
                    className="bg-[#0c1425] border border-cyan-500/20 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
                >
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

                    <div className="relative z-10 mt-2">
                        <RirSelector currentRir={rir} onSelect={setRir} />
                    </div>

                    {/* BOTÃO SAVE: Removido o pulse e sombras pesadas */}
                    <button
                        type="submit"
                        disabled={isInvalid || saved}
                        className={`w-full mt-6 py-6 rounded-2xl font-black uppercase italic text-[11px] tracking-[0.4em] transition-all duration-300 relative overflow-hidden group
                            ${
                                saved
                                    ? "bg-emerald-500 text-black scale-[0.98]"
                                    : isInvalid
                                      ? "bg-zinc-900 border-zinc-800 text-zinc-700 cursor-not-allowed"
                                      : "bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 active:bg-cyan-500/30"
                            }`}
                    >
                        <span className="relative z-10">
                            {saved
                                ? "✓ Set Recorded"
                                : isInvalid
                                  ? "Enter Stats"
                                  : "Save Set"}
                        </span>

                        {/* Efeito de brilho ao passar (CSS puro, muito leve) */}
                        {!saved && !isInvalid && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-500" />
                        )}
                    </button>
                </form>

                {/* LISTA DE SÉRIES: Garante que o LogSetList também é "lite" */}
                <LogSetList sets={currentExercise?.sets || []} />
            </div>
        </div>
    );
};

export default ExerciseDisplay;
