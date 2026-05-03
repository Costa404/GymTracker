import { useState } from "react";
import { useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/spa/db";
import { useLogExercise } from "@/Hooks/useLogExercise";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

import InputGroup from "./InputGroup";
import RirSelector from "./RirSelector";
import LogSetList from "./LogSetList";
import ExercisesHeader from "./ExercisesHeader";
import GlassBtn from "@/Components/Shared/GlassBtn";

// Componentes UI (Garante que os caminhos estão corretos)

const LogExercises = () => {
    // 1. Captura os IDs da URL (ex: /workouts/1/exercises/5)
    const { workoutId, exerciseId } = useParams();
    const exId = Number(exerciseId);
    const wkId = Number(workoutId);

    // 2. Queries ao Dexie para recuperar o que antes vinha por Props
    const exercise = useLiveQuery(() => db.exercises.get(exId), [exId]);
    const workout = useLiveQuery(() => db.workouts.get(wkId), [wkId]);

    // 3. Busca o histórico de logs para mostrar os "Last Weights/Reps"
    const history = useLiveQuery(
        () =>
            db.workoutLogs
                .where("exercise_id")
                .equals(exId)
                .reverse()
                .limit(5)
                .toArray(),
        [exId],
    );

    // 4. Hooks de Lógica e Store
    const { weight, setWeight, reps, setReps, rir, setRir, saveLocally } =
        useLogExercise();
    const [saved, setSaved] = useState(false);
    const removeSet = useWorkoutSessionStore((s) => s.removeSet);

    // Seleciona o estado atual deste exercício na sessão (sets feitos agora)
    const currentExercise = useWorkoutSessionStore((s) =>
        s.sessionExercises.find((ex) => ex.exercise_id === exId),
    );

    // 5. Cálculos de UI
    const isInvalid = !weight || !reps || weight === "0" || reps === "0";
    const lastWeights = history?.map((h) => h.weight.toString()) || [];
    const lastReps = history?.map((h) => h.reps.toString()) || [];

    const deleteSet = (index: number) => {
        removeSet(exId, index);
    };

    const handleAction = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (isInvalid) return;

        // O saveLocally agora deve gravar no Dexie (workoutLogs)
        await saveLocally(exId);

        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
    };

    // 6. Guardas de Carregamento
    if (!exercise || !workout) {
        return (
            <div className="min-h-screen flex items-center justify-center text-performance">
                <span className="animate-pulse font-black uppercase italic tracking-widest">
                    Loading Exercise...
                </span>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white font-sans relative overflow-hidden ">
            <div className="relative z-10 max-w-lg mx-auto">
                <ExercisesHeader
                    exerciseName={exercise.name}
                    workoutName={workout.name || "Workout"}
                    exerciseId={exercise.id}
                    workoutId={workout.id}
                />

                {/* FORMULÁRIO PRINCIPAL */}
                <form
                    onSubmit={handleAction}
                    className="border-2 border-performance/30 bg-performance/5 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden"
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

                    <div className="relative z-10 mt-6">
                        <RirSelector currentRir={rir} onSelect={setRir} />
                    </div>

                    <GlassBtn
                        type="submit"
                        disabled={isInvalid || saved}
                        variant={saved ? "performance" : "performance"} // Performance quando ativo
                        className={`w-full mt-8 py-6 rounded-2xl ${isInvalid ? "opacity-20" : ""}`}
                    >
                        {saved
                            ? "✓ Set Recorded"
                            : isInvalid
                              ? "Enter Stats"
                              : "Save Set"}
                    </GlassBtn>
                </form>

                {/* LISTAGEM DE SÉRIES DA SESSÃO ATUAL */}
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

export default LogExercises;
