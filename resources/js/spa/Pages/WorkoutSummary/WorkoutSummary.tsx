import React, { useState } from "react";
import WorkoutSummaryHeader from "./WorkoutSummaryHeader";
import WorkoutSummaryAchievementGrid from "./WorkoutSummaryAchievementGrid";
import WorkoutSummaryPerformanceMetrics from "./WorkoutSummaryPerformanceMetrics";
import WorkoutSummaryPumpCapture from "./WorkoutSummaryPumpCapture";
import WorkoutSummaryFooter from "./WorkoutSummaryFooter";

const WorkoutSummary = () => {
    // Gestão do Estado Central
    const [mood, setMood] = useState<string | null>(null);
    const [rpe, setRpe] = useState<number | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);

    // Mockup de dados (poderá vir do Dexie ou Store futuramente)
    const prs = [
        { name: "Bench Press", value: "100kg x 5", diff: "+5kg" },
        { name: "Squat", value: "140kg x 3", diff: "+2 reps" },
    ];

    // Função que será chamada quando o treino terminar
    const handleCompleteMission = () => {
        console.log("Saving workout...", { mood, rpe, photo });
        // Lógica de guardar no Dexie / sync
    };

    return (
        <div className="flex flex-col min-h-[100dvh] w-full max-w-lg mx-auto py-8 pb-10 text-white">
            {/* Container do conteúdo que expande */}
            <div className="flex flex-col gap-8 flex-1">
                <WorkoutSummaryHeader />

                <WorkoutSummaryAchievementGrid prs={prs} />

                <WorkoutSummaryPerformanceMetrics
                    mood={mood}
                    setMood={setMood}
                    rpe={rpe}
                    setRpe={setRpe}
                />

                <WorkoutSummaryPumpCapture photo={photo} setPhoto={setPhoto} />
            </div>

            {/* Footer que é empurrado para o fundo */}
            <WorkoutSummaryFooter onComplete={handleCompleteMission} />
        </div>
    );
};

export default WorkoutSummary;
