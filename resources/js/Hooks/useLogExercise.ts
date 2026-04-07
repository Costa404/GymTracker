import { useState } from "react";
import useWorkoutSessionStore from "@/Hooks/SessionStore/useWorkoutSessionStore";

export const useLogExercise = (initialWeight = "", initialReps = "") => {
    const [weight, setWeight] = useState(initialWeight);
    const [reps, setReps] = useState(initialReps);
    const [rir, setRir] = useState("");

    const { addSet } = useWorkoutSessionStore();

    const saveLocally = (exerciseId: number) => {
        if (!weight || !reps) {
            alert("Weight and reps are required, let's go!");
            return;
        }

        // Lógica de conversão: Se for "F", enviamos -1 (Falha).
        // Se for vazio, enviamos null. Caso contrário, o número do RIR.
        const rirValue = rir === "F" ? -1 : rir !== "" ? Number(rir) : null;

        addSet(exerciseId, Number(weight), Number(reps), rirValue);

        // Limpa tudo, incluindo o RIR
        setWeight("");
        setReps("");
        setRir("");
    };

    return {
        weight,
        setWeight,
        reps,
        setReps,
        rir,
        setRir,
        saveLocally,
    };
};
