import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "../Pages/DashboardPage";
import WorkoutSetup from "../Pages/WorkoutsSetup/WorkoutSetup";
import WorkoutSession from "../Pages/WorkoutsSession/WorkoutSession";

// Mocks temporários para o setup não rebentar
const mockTemplates = [
    { id: 1, name: "Push Session (A)" },
    { id: 2, name: "Pull Session (B)" },
];

const RoutesApp = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />

            <Route
                path="/workouts/setup"
                element={
                    <WorkoutSetup templates={mockTemplates} active={null} />
                }
            />

            {/* A NOVA ROTA DO TREINO ATIVO */}
            <Route path="/workouts/active" element={<WorkoutSession />} />

            {/* <Route path="/workouts/history" element={<HistoryPage />} /> */}
        </Routes>
    );
};

export default RoutesApp;
