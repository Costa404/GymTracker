import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import SessionExercisePicker from "./Components/SessionExercisePicker";

import useFilteredExercises from "@/Hooks/useFilteredExercises";

import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

import SessionQuickStart from "./Components/SessionQuickStart";
import HeaderWorkoutSession from "./Components/HeaderWorkoutSession";
import SessionLibraryPicker from "./Components/SessionLibraryPicker";

const WorkoutSession = ({ workout, workoutData, exercises }) => {
    // 1. Extrai a função do store

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

    // Obtemos apenas os IDs dos exercícios que já estão ativos
    const activeIds = sessionExercises.map((item) => item.exercise_id);

    // A biblioteca filtrada só mostra o que ainda NÃO foi adicionado
    const libraryToDisplay = filteredLibrary.filter(
        (ex) => !activeIds.includes(ex.id),
    );

    return (
        <div className="max-w-md mx-auto  px-4 pb-48 text-left">
            <Head title={`${workout.name}`} />
            <HeaderWorkoutSession workout={workout} />

            {/* QUICK START DOCK: Só aparece se ainda não houver séries registadas */}
            <SessionQuickStart workout={workout} exercises={exercises} />
            {/* PARTE DE BAIXO: BIBLIOTECA */}
            <SessionLibraryPicker
                libraryToDisplay={libraryToDisplay}
                workoutId={workout.id}
            />
        </div>
    );
};

export default WorkoutSession;
