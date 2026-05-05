import WorkoutTemplateFilter from "./WorkoutTemplateFilter";

import { useCreateTemplate } from "./useCreateTemplate";
import WorkoutTemplateHeader from "./WorkoutTemplateHeader";
import WorkoutTemplateNameInput from "./WorkoutTemplateNameInput";
import WorkoutTemplateTypeSelector from "./WorkoutTemplateTypeSelector";
import WorkoutTemplateExerciseDisplay from "./WorkoutTemplateExerciseDisplay";

const WorkoutTemplateCreate = () => {
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
            <WorkoutTemplateHeader
                onSave={handleSave}
                isSaving={isSaving}
                isDisabled={isSaveDisabled}
            />

            <WorkoutTemplateNameInput name={name} setName={setName} />

            {/* A NOVA SECÇÃO DE TIPO DE ROTINA */}
            <WorkoutTemplateTypeSelector
                type={templateType}
                setType={setTemplateType}
            />

            {/* O SEPARADOR VISUAL OPIONAL */}
            <div className="h-[1px] w-full bg-gradient-to-r from-zinc-800/50 via-zinc-800/20 to-transparent mb-6" />

            <WorkoutTemplateFilter
                activeBlock={activeBlock}
                setActiveBlock={setActiveBlock}
            />

            <WorkoutTemplateExerciseDisplay
                exercises={displayedExercises}
                selectedIds={selectedIds}
                toggleExercise={toggleExercise}
                activeBlock={activeBlock}
            />
        </div>
    );
};

export default WorkoutTemplateCreate;
