import React from "react";
import TemplateHeader from "./TemplateHeader";
import TemplateNameInput from "./TemplateNameInput";
import TemplateTypeSelector from "./TemplateTypeSelector"; // <-- NOVO IMPORT
import CategoryFilter from "./CategoryFilter";
import ExerciseList from "./ExerciseList";
import { useCreateTemplate } from "./useCreateTemplate";

const CreateWorkoutTemplate = () => {
    const {
        name,
        setName,
        templateType,
        setTemplateType,
        activeBlock,
        setActiveBlock,
        selectedIds,
        isSaving,
        isSaveDisabled,
        displayedExercises,
        toggleExercise,
        handleSave,
    } = useCreateTemplate();

    return (
        <div className="w-full font-sans animate-in fade-in duration-300">
            <TemplateHeader
                onSave={handleSave}
                isSaving={isSaving}
                isDisabled={isSaveDisabled}
            />

            <TemplateNameInput name={name} setName={setName} />

            {/* A NOVA SECÇÃO DE TIPO DE ROTINA */}
            <TemplateTypeSelector
                type={templateType}
                setType={setTemplateType}
            />

            {/* O SEPARADOR VISUAL OPIONAL */}
            <div className="h-[1px] w-full bg-gradient-to-r from-zinc-800/50 via-zinc-800/20 to-transparent mb-6" />

            <CategoryFilter
                activeBlock={activeBlock}
                setActiveBlock={setActiveBlock}
            />

            <ExerciseList
                exercises={displayedExercises}
                selectedIds={selectedIds}
                toggleExercise={toggleExercise}
                activeBlock={activeBlock}
            />
        </div>
    );
};

export default CreateWorkoutTemplate;
