import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/spa/db";

export const useCreateTemplate = () => {
    const navigate = useNavigate();

    // ESTADOS
    const [name, setName] = useState("");
    const [activeBlock, setActiveBlock] = useState<string>("Chest"); // Já com o músculo por defeito
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [templateType, setTemplateType] = useState<string>("Push");

    // FETCH & FILTRO
    const allExercises = useLiveQuery(() => db.exercises.toArray()) || [];
    // console.log("All Exercises from Dexie:", allExercises); // Debug para verificar os dados
    const displayedExercises = allExercises.filter((e) => {
        const dbMuscle = e.muscle_group?.toLowerCase() || "";
        const filter = activeBlock.toLowerCase();

        // Regra especial para o botão "Arms"
        if (filter === "arms") {
            return ["arms", "biceps", "triceps", "forearm"].includes(dbMuscle);
        }

        // Se quiseres prec aver o Core (caso tenhas "Abs" na BD)
        if (filter === "core") {
            return ["core", "abs", "obliques"].includes(dbMuscle);
        }

        // Para os restantes (Chest, Back, Legs, Shoulders), a comparação é direta
        return dbMuscle === filter;
    });
    // AÇÕES
    const toggleExercise = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        );
    };

    const handleSave = async () => {
        if (!name.trim() || selectedIds.length === 0) return;

        setIsSaving(true);
        try {
            const response = await fetch("/api/workout-config/templates", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    type: templateType,
                    exercise_ids: selectedIds,
                }),
            });

            if (response.ok) {
                // Navega de volta para a lista de templates Pai
                navigate("/workout/config/templates");
            } else {
                console.error("Failed to save template");
            }
        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // Lógica extraída para manter o componente limpo
    const isSaveDisabled = !name.trim() || selectedIds.length === 0 || isSaving;

    // RETORNO DO HOOK
    return {
        name,
        setName,
        activeBlock,
        setActiveBlock,
        selectedIds,
        isSaving,
        isSaveDisabled,
        displayedExercises,
        toggleExercise,
        handleSave,
        setTemplateType,
        templateType,
    };
};
