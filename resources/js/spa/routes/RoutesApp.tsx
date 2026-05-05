import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import WorkoutConfig from "../Pages/WorkoutConfig/WorkoutConfig";
import WorkoutHistory from "../Pages/WorkoutHistory/WorkoutHistory";
import WorkoutHistoryDetail from "../Pages/WorkoutHistory/WorkoutHistoryDetail";
import ExerciseCreate from "../Pages/Exercise/ExerciseCreate";
import ExercisePage from "../Pages/Exercise/ExercisePage";
import ExerciseHistory from "../Pages/Exercise/ExerciseHistory/ExerciseHistory";
import ExerciseLog from "../Pages/Exercise/ExerciseLog/ExerciseLog";
import WorkoutTemplate from "../Pages/WorkoutConfig/WorkoutTemplate/WorkoutTemplate";
import WorkoutTemplateCreate from "../Pages/WorkoutConfig/WorkoutTemplate/WorkoutTemplateCreate/WorkoutTemplateCreate";
import WorkoutSession from "../Pages/WorkoutSession/WorkoutSession";
import WorkoutSetup from "../Pages/WorkoutSetup/WorkoutSetup";
import Auth from "../Pages/Auth/Auth";
import WorkoutSummary from "../Pages/WorkoutSummary/WorkoutSummary";

const RoutesApp = () => {
    const isAuth = localStorage.getItem("pin_verified") === "true";

    // if (!isAuth) {
    //     return (
    //         <Routes>
    //             <Route path="*" element={<Auth />} />
    //         </Routes>
    //     );
    // }

    return (
        <Routes>
            {/* DASHBOARD */}
            <Route path="/" element={<DashboardPage />} />

            {/* SESSÃO ATIVA (TREINO NO GINÁSIO) */}
            <Route path="/workout/session" element={<WorkoutSession />} />
            <Route path="/workout/setup" element={<WorkoutSetup />} />
            <Route path="/workout/summary" element={<WorkoutSummary />} />

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
            <Route path="/exercise">
                <Route index element={<ExercisePage />} />
                <Route path="create" element={<ExerciseCreate />} />
                <Route
                    path=":exerciseId/history"
                    element={<ExerciseHistory />}
                />
            </Route>

            {/* HISTÓRICO DE TREINOS CONCLUÍDOS */}
            <Route path="/workout/history" element={<WorkoutHistory />} />
            <Route
                path="/workout/history/:workoutId"
                element={<WorkoutHistoryDetail />}
            />

            {/* CONFIGURAÇÃO DE TEMPLATES */}
            <Route path="/workout/config">
                {/* Menu Principal */}
                <Route index element={<WorkoutConfig />} />
                {/* Gestão de Templates */}
                <Route path="templates">
                    {/* Lista de todos os templates */}
                    <Route index element={<WorkoutTemplate />} />
                    {/* Criar novo template */}
                    <Route path="create" element={<WorkoutTemplateCreate />} />
                </Route>
            </Route>

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default RoutesApp;
