import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/spa/db";
import useFilteredExercises from "@/spa/Hooks/useFilteredExercises";
import { useWorkoutSessionStore } from "@/spa/Hooks/SessionStore/useWorkoutSessionStore";

import SessionQuickStart from "./Components/SessionQuickStart";

import SessionLibraryPicker from "./Components/SessionLibraryPicker";
import WorkoutSessionHeader from "./Components/WorkoutSessionHeader";

const WorkoutSession = () => {
    const navigate = useNavigate();
    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);
    const startSession = useWorkoutSessionStore((s) => s.startSession);
    const sessionExercises = useWorkoutSessionStore((s) => s.sessionExercises);

    const workout = useLiveQuery(
        () => (activeSessionId ? db.workouts.get(activeSessionId) : undefined),
        [activeSessionId],
    );

    const exercises = useLiveQuery(() => db.exercises.toArray()) || [];
    // console.log("Exercises in WorkoutSession:", exercises);

    useEffect(() => {
        if (!activeSessionId) {
            navigate("/");
            return;
        }
        startSession(activeSessionId);
    }, [activeSessionId, navigate, startSession]);

    const filteredLibrary = useFilteredExercises(
        exercises,
        [],
        workout?.name || "",
    );

    const activeIds = sessionExercises.map((item) => item.exercise_id);
    const libraryToDisplay = filteredLibrary.filter(
        (ex) => !activeIds.includes(ex.id),
    );

    if (!workout) return null; // ainda a carregar do Dexie

    return (
        <div className="min-h-screen text-white text-left relative overflow-x-hidden">
            <div className="relative z-10 mb-6">
                <WorkoutSessionHeader workout={workout} />
            </div>
            <section className="relative z-10 mb-6">
                <SessionQuickStart workout={workout} exercises={exercises} />
            </section>
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
