import PageTitle from "@/Components/Shared/PageTitle";
import GlassBtn from "@/Components/Shared/GlassBtn";
interface WorkoutTemplateHeaderProps {
    onSave: () => void;
    isSaving: boolean;
    isDisabled: boolean;
}

const WorkoutTemplateHeader = ({
    onSave,
    isSaving,
    isDisabled,
}: WorkoutTemplateHeaderProps) => {
    return (
        <div className="flex items-center justify-between pt-4 pb-2">
            <PageTitle>New Template</PageTitle>

            <GlassBtn
                variant="performance"
                onClick={onSave}
                disabled={isDisabled || isSaving}
                className="min-w-[100px]"
            >
                Save
            </GlassBtn>
        </div>
    );
};

export default WorkoutTemplateHeader;
