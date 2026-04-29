import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/spa/db"; // O teu ficheiro da base de dados Dexie
import useFilteredExercises from "@/Hooks/useFilteredExercises";
import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";

import SessionQuickStart from "./Components/SessionQuickStart";
import HeaderWorkoutSession from "./Components/HeaderWorkoutSession";
import SessionLibraryPicker from "./Components/SessionLibraryPicker";

// 1. Já não recebe props! As props vinham do Inertia.
const WorkoutSession = () => {
    const navigate = useNavigate();

    // 2. Saber qual é o treino que está a decorrer neste momento
    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);
    const startSession = useWorkoutSessionStore((s) => s.startSession);
    const sessionExercises = useWorkoutSessionStore((s) => s.sessionExercises);

    // 3. Fazer as consultas (queries) diretamente à base de dados local!
    // Puxa o treino ativo
    const workout = useLiveQuery(
        () => (activeSessionId ? db.workouts.get(activeSessionId) : undefined),
        [activeSessionId],
    );

    // Puxa a lista mestre de exercícios (com fallback para array vazio enquanto carrega)
    const exercises = useLiveQuery(() => db.exercises.toArray()) || [];

    // O workoutData que o teu hook pedia. (No futuro poderás filtrar apenas logs anteriores aqui)
    const workoutData = useLiveQuery(() => db.workoutLogs.toArray()) || [];

    // 4. Segurança de navegação e inicialização
    useEffect(() => {
        if (!activeSessionId) {
            // Se tentar aceder a esta página sem um treino ativo, recambia-o para o dashboard
            navigate("/");
            return;
        }
        startSession(activeSessionId);
    }, [activeSessionId, navigate, startSession]);

    const filteredLibrary = useFilteredExercises(
        exercises,
        workoutData,
        workout?.name || "",
    );

    // 5. Previne o ecrã de rebentar enquanto o Dexie está a ler a informação do disco (milissegundos)
    if (!workout) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-system">
                <span className="animate-pulse text-xs uppercase tracking-widest font-black italic">
                    Loading Data...
                </span>
            </div>
        );
    }

    const activeIds = sessionExercises.map((item) => item.exercise_id);
    const libraryToDisplay = filteredLibrary.filter(
        (ex) => !activeIds.includes(ex.id),
    );

    return (
        <div className="min-h-screen max-w-md mx-auto text-white text-left relative overflow-x-hidden">
            <div className="relative z-10 mb-6">
                <HeaderWorkoutSession workout={workout} />
            </div>

            <section className="relative z-10 mb-6">
                <SessionQuickStart workout={workout} exercises={exercises} />
            </section>

            <section className="relative z-10">
                <SessionLibraryPicker
                    libraryToDisplay={libraryToDisplay}
                    workoutId={workout.id} // Aqui o workout já é garantido que existe
                />
            </section>
        </div>
    );
};

export default WorkoutSession;
