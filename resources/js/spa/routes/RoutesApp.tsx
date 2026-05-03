import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import WorkoutSession from "../Pages/WorkoutsSession/WorkoutSession";
import WorkoutSetup from "../Pages/WorkoutsSetup/WorkoutSetup";
import WorkoutsHistory from "../Pages/WorkoutsHistory/WorkoutsHistory";
import DetailsWorkoutsHistory from "../Pages/WorkoutsHistory/DetailsWorkoutsHistory";

// Exercises & Log Station

import CreateExercise from "../Pages/Exercises/CreateExercise";
// Nome sugerido
import ExerciseHistory from "../Pages/Exercises/ExercisesHistory/ExerciseHistory";

// Workout Config
import WorkoutConfig from "../Pages/WorkoutConfig/WorkoutConfig";

import CreateWorkoutTemplate from "../Pages/WorkoutConfig/WorkoutTemplates/CreateWorkoutTemplates/CreateWorkoutTemplate";

import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";
import ExercisesPage from "../Pages/Exercises/ExercisesPage";
import LogExercises from "../Pages/Exercises/LogExercises/LogExercises";
import WorkoutTemplates from "../Pages/WorkoutConfig/WorkoutTemplates/WorkoutTemplates";

const RoutesApp = () => {
    return (
        <Routes>
            {/* DASHBOARD */}
            <Route path="/" element={<DashboardPage />} />

            {/* SESSÃO ATIVA (TREINO NO GINÁSIO) */}
            <Route path="/workouts/active" element={<WorkoutSession />} />
            <Route
                path="/workouts/setup"
                element={<WorkoutSetup active={null} />}
            />

            {/* LOG STATION: Onde registas as séries (Peso/Reps) */}
            <Route
                path="/workout/:workoutId/exercise/:exerciseId"
                element={<LogExercises />}
            />
            <Route
                path="/workout/:workoutId/exercise/:exerciseId/history"
                element={<ExerciseHistory />}
            />

            {/* BIBLIOTECA DE EXERCÍCIOS (HUB CENTRAL) */}
            <Route path="/exercises">
                <Route index element={<ExercisesPage />} />
                <Route path="create" element={<CreateExercise />} />
                <Route
                    path=":exerciseId/history"
                    element={<ExerciseHistory />}
                />
            </Route>

            {/* HISTÓRICO DE TREINOS CONCLUÍDOS */}
            <Route path="/workouts/history" element={<WorkoutsHistory />} />
            <Route
                path="/workouts/history/:workoutId"
                element={<DetailsWorkoutsHistory />}
            />

            {/* CONFIGURAÇÃO DE TEMPLATES */}
            <Route path="/workout/config">
                {/* Menu Principal: Exercises, Templates, Sync */}
                <Route index element={<WorkoutConfig />} />

                {/* Gestão de Templates */}
                <Route path="templates">
                    {/* Lista de todos os templates (O "Pai") */}
                    <Route index element={<WorkoutTemplates />} />

                    {/* Criar novo template */}
                    <Route path="create" element={<CreateWorkoutTemplate />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default RoutesApp;
