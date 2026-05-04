import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import WorkoutSession from "../Pages/WorkoutSession/WorkoutSession";

// Exercises & Log Station

import ExerciseCreate from "../Pages/Exercises/ExerciseCreate";
// Nome sugerido
import ExerciseHistory from "../Pages/Exercises/ExerciseHistory/ExerciseHistory";

// Workout Config
import WorkoutConfig from "../Pages/WorkoutConfig/WorkoutConfig";

import { db } from "../db";
import { useLiveQuery } from "dexie-react-hooks";
import ExercisesPage from "../Pages/Exercises/ExercisesPage";
import ExerciseLog from "../Pages/Exercises/ExerciseLog/ExerciseLog";

import WorkoutSetup from "../Pages/WorkoutSetup/WorkoutSetup";
import WorkoutHistory from "../Pages/WorkoutHistory/WorkoutHistory";
import WorkoutHistoryDetail from "../Pages/WorkoutHistory/WorkoutHistoryDetail";
import WorkoutTemplate from "../Pages/WorkoutConfig/WorkoutTemplates/WorkoutTemplate";
import WorkoutTemplateCreate from "../Pages/WorkoutConfig/WorkoutTemplates/CreateWorkoutTemplates/WorkoutTemplateCreate";

const RoutesApp = () => {
    return (
        <Routes>
            {/* DASHBOARD */}
            <Route path="/" element={<DashboardPage />} />

            {/* SESSÃO ATIVA (TREINO NO GINÁSIO) */}
            <Route path="/workouts/active" element={<WorkoutSession />} />
            <Route path="/workouts/setup" element={<WorkoutSetup />} />

            {/* LOG STATION: Onde registas as séries (Peso/Reps) */}
            <Route
                path="/workout/:workoutId/exercise/:exerciseId"
                element={<ExerciseLog />}
            />
            <Route
                path="/workout/:workoutId/exercise/:exerciseId/history"
                element={<ExerciseHistory />}
            />

            {/* BIBLIOTECA DE EXERCÍCIOS (HUB CENTRAL) */}
            <Route path="/exercises">
                <Route index element={<ExercisesPage />} />
                <Route path="create" element={<ExerciseCreate />} />
                <Route
                    path=":exerciseId/history"
                    element={<ExerciseHistory />}
                />
            </Route>

            {/* HISTÓRICO DE TREINOS CONCLUÍDOS */}
            <Route path="/workouts/history" element={<WorkoutHistory />} />
            <Route
                path="/workouts/history/:workoutId"
                element={<WorkoutHistoryDetail />}
            />

            {/* CONFIGURAÇÃO DE TEMPLATES */}
            <Route path="/workout/config">
                {/* Menu Principal: Exercises, Templates, Sync */}
                <Route index element={<WorkoutConfig />} />

                {/* Gestão de Templates */}
                <Route path="templates">
                    {/* Lista de todos os templates (O "Pai") */}
                    <Route index element={<WorkoutTemplate />} />

                    {/* Criar novo template */}
                    <Route path="create" element={<WorkoutTemplateCreate />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default RoutesApp;
