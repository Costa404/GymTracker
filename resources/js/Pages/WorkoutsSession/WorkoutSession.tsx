import { Head } from "@inertiajs/react";
import { useEffect } from "react";
import useFilteredExercises from "@/Hooks/useFilteredExercises";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

import SessionQuickStart from "./Components/SessionQuickStart";
import HeaderWorkoutSession from "./Components/HeaderWorkoutSession";
import SessionLibraryPicker from "./Components/SessionLibraryPicker";

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

    const activeIds = sessionExercises.map((item) => item.exercise_id);

    const libraryToDisplay = filteredLibrary.filter(
        (ex) => !activeIds.includes(ex.id),
    );

    return (
        /* 1. O Contentor Pai com Padding Lateral Fixo (px-6) e Fundo Dark */
        <div className="min-h-screen max-w-md mx-auto  text-white text-left relative overflow-x-hidden">
            <Head title={`${workout.name}`} />

            {/* 2. Glow de Fundo Subtil para dar profundidade à página inteira */}

            {/* 3. Header: mb-10 dá o espaço necessário para o título respirar */}
            <div className="relative z-10 mb-6">
                <HeaderWorkoutSession workout={workout} />
            </div>

            {/* 4. Quick Start: Envolvido numa section com margem inferior padrão */}
            <section className="relative z-10 mb-6">
                <SessionQuickStart workout={workout} exercises={exercises} />
            </section>

            {/* 5. Biblioteca: Outra section com a mesma margem */}
            <section className="relative z-10">
                <SessionLibraryPicker
                    libraryToDisplay={libraryToDisplay}
                    workoutId={workout.id}
                />
            </section>
        </div>
    );
};

export default WorkoutSession;
