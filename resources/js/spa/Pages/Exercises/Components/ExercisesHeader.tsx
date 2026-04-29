import GlassBtn from "@/Components/Shared/GlassBtn";

const ExercisesHeader = ({
    exerciseName,
    workoutName,
    exerciseId,
    workoutId,
    showHistoryButton = true,
}) => {
    return (
        <header className="mb-6 relative z-10 w-full">
            {/* 1. LINHA DO TOPO: Título e Botão (Alinhados perfeitamente ao centro) */}
            <div className="flex justify-between items-center w-full gap-3">
                {/* ESQUERDA: Apenas o Título */}
                <h1
                    className="text-system-light font-black uppercase italic tracking-tighter text-2xl"
                    title={exerciseName}
                >
                    {exerciseName}
                </h1>

                {/* DIREITA: Botão History ou Nome da Sessão */}
                <div className="flex flex-col items-end shrink-0">
                    {showHistoryButton && workoutId ? (
                        <GlassBtn
                            href={`/workout/${workoutId}/exercise/${exerciseId}/history`}
                            className="h-[32px] px-3 text-[9px] font-black uppercase tracking-widest border-performance/30 bg-performance/10 text-performance-light hover:bg-performance/20 transition-all italic"
                        >
                            <span className="flex items-center gap-1.5">
                                <span className="text-[10px] not-italic">
                                    📈
                                </span>
                            </span>
                        </GlassBtn>
                    ) : null}
                </div>
            </div>
        </header>
    );
};

export default ExercisesHeader;
