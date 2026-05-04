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
            // 1. Guardar no Dexie em vez do Fetch
            await db.workout_templates.add({
                name: name.trim(),
                type: templateType,
                exercise_ids: selectedIds,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                synced: 0, // Indica que ainda não foi para o PC
            });
            // 2. Navegação imediata (não precisas de esperar pela resposta de um servidor)
            navigate("/workout/config/templates");
        } catch (error) {
            console.error("Dexie error:", error);
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
