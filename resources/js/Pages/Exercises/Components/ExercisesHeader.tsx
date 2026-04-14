import GlassBtn from "@/Components/Shared/GlassBtn";

const ExercisesHeader = ({
    exerciseName,
    workoutName,
    exerciseId,
    workoutId,
    showHistoryButton = true,
}) => {
    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        }
    };

    return (
        <header className="mb-6 flex flex-col items-center px-1 relative z-10 w-full">
            <div className="flex justify-between w-full items-center">
                <GlassBtn
                    onClick={handleBack}
                    variant="zinc"
                    className="h-[32px] w-[80px] text-[9px]"
                >
                    Back
                </GlassBtn>
                <div className="flex flex-col gap-2 items-start">
                    {showHistoryButton && workoutId ? (
                        <GlassBtn
                            href={`/workout/${workoutId}/exercise/${exerciseId}/history`}
                            variant="green"
                            className="h-[32px] px-3 text-[8px] text-performance-light border-performance/20 bg-performance/10 hover:bg-performance/20"
                        >
                            <span className="flex items-center gap-1">
                                <span className="text-[10px]">📈</span>
                                <span>History</span>
                            </span>
                        </GlassBtn>
                    ) : !showHistoryButton && workoutName ? (
                        <div className="flex flex-col leading-none">
                            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-600">
                                Session
                            </span>
                            <span className="text-[9px] font-black uppercase text-cyan-400 italic truncate ">
                                {workoutName}
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="mt-4 flex flex-col justify-center items-center w-full px-4">
                <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none text-white text-center">
                    {exerciseName}
                </h1>
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mt-2"></div>
            </div>
        </header>
    );
};

export default ExercisesHeader;
