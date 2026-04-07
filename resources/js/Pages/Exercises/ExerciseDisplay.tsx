import { Head } from "@inertiajs/react";
import { useState } from "react";
import { useLogExercise } from "@/Hooks/useLogExercise";
import useWorkoutSessionStore from "@/Hooks/SessionStore/useWorkoutSessionStore";

// Componentes Modulares
import { LogHeader } from "./Components/LogHeader";
import { LogSetList } from "./Components/LogSetList";
import { RirSelector } from "./Components/RirSelector";
import { InputGroup } from "./Components/InputGroup";

const ExerciseDisplay = ({ exercise, workout, lastWeights, lastReps }: any) => {
    const { weight, setWeight, reps, setReps, rir, setRir, saveLocally } =
        useLogExercise();
    const [saved, setSaved] = useState(false);

    // Validação: Botão só ativa se houver peso e reps
    const isInvalid = !weight || !reps || weight === "0" || reps === "0";

    const currentExercise = useWorkoutSessionStore((s) =>
        s.sessionExercises.find((ex) => ex.exercise_id === exercise.id),
    );

    const handleAction = (e: React.FormEvent) => {
        e.preventDefault();
        if (isInvalid) return;
        console.log(
            "DEBUG - Store após saveLocally:",
            useWorkoutSessionStore.getState().sessionExercises,
        );
        saveLocally(exercise.id);
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
    };

    return (
        /* Div principal transparente para deixar a imagem do MainLayout aparecer */
        <div className="min-h-screen text-white p-6 font-sans relative overflow-hidden">
            <Head title={`Log | ${exercise.name}`} />

            {/* Brilho Ciano centralizado para dar profundidade ao vidro */}
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10 max-w-lg mx-auto">
                <LogHeader
                    exerciseName={exercise.name}
                    workoutName={workout.name}
                    exerciseId={exercise.id}
                    workoutId={workout.id}
                />

                {/* FORM COM A COR AZUL GLASS DA IMAGEM */}
                <form
                    onSubmit={handleAction}
                    className="bg-[#0a1220]/50 border border-cyan-500/20 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300"
                >
                    <div className="grid grid-cols-2 gap-8 relative z-10">
                        <InputGroup
                            label="Weight"
                            value={weight}
                            onChange={setWeight}
                            suffix="KG"
                            lastSets={lastWeights} // Passa o array de pesos
                        />
                        <InputGroup
                            label="Reps"
                            value={reps}
                            onChange={setReps}
                            lastSets={lastReps} // Passa o array de reps
                        />
                    </div>
                    <div className="relative z-10 mt-2">
                        <RirSelector currentRir={rir} onSelect={setRir} />
                    </div>
                    {/* BOTÃO ESTILO COMMAND CENTER */}
                    <button
                        type="submit"
                        disabled={isInvalid || saved}
                        className={`w-full mt-4 py-6 rounded-2xl font-black uppercase italic text-[12px] tracking-[0.4em] transition-all duration-500 shadow-2xl relative overflow-hidden group
                            ${
                                saved
                                    ? "bg-emerald-500 text-black shadow-emerald-500/50 scale-[0.97]"
                                    : isInvalid
                                      ? "bg-white/5 border-white/5 text-zinc-700 cursor-not-allowed opacity-50"
                                      : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 backdrop-blur-md hover:bg-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                            }`}
                    >
                        <span className="relative z-10">
                            {saved
                                ? "✓ Set Recorded"
                                : isInvalid
                                  ? "Enter Stats"
                                  : "Save Set"}
                        </span>

                        {!saved && !isInvalid && (
                            <div className="absolute inset-0 bg-gradient-to-r   from-transparent via-cyan-500/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        )}
                    </button>
                </form>

                <LogSetList sets={currentExercise?.sets || []} />
            </div>
        </div>
    );
};

export default ExerciseDisplay;
