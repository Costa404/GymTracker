import GlassBtn from "@/Components/Shared/GlassBtn";
import PageTitle from "@/Components/Shared/PageTitle";

const ExercisesHeader = ({
    exerciseName,
    workoutName,
    exerciseId,
    workoutId,
    showHistoryButton = true,
    centerTitle = false, // Nova prop (por defeito não centra)
}) => {
    return (
        <header className="mb-6 relative z-10 w-full">
            <div
                className={`flex items-center w-full min-h-[40px] ${
                    centerTitle ? "justify-center" : "justify-between"
                }`}
            >
                <PageTitle>{exerciseName}</PageTitle>

                {showHistoryButton && workoutId && (
                    <div
                        className={
                            centerTitle
                                ? "absolute right-0 top-1/2 -translate-y-1/2"
                                : ""
                        }
                    >
                        <GlassBtn
                            to={`/workout/${workoutId}/exercise/${exerciseId}/history`}
                            variant="performance"
                            className="h-10 w-10 !p-0 rounded-full flex items-center justify-center shrink-0"
                        >
                            <span className="text-xs">📈</span>
                        </GlassBtn>
                    </div>
                )}
            </div>
        </header>
    );
};

export default ExercisesHeader;
