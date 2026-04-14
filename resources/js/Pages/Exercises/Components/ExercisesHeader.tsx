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
        <header className="mb-10 flex flex-col items-center relative z-10 w-full">
            {/* LINHA DE TOPO: Ações Rápidas */}
            <div className="flex justify-between w-full items-center">
                <GlassBtn
                    onClick={handleBack}
                    variant="system" // <--- Muda para system
                    className="h-[32px] w-[80px] text-[9px]" // Mantém apenas o tamanho
                >
                    BACK
                </GlassBtn>

                <div className="flex flex-col gap-2 items-end">
                    {" "}
                    {/* Alinhado à direita */}
                    {showHistoryButton && workoutId ? (
                        <GlassBtn
                            href={`/workout/${workoutId}/exercise/${exerciseId}/history`}
                            /* CORREÇÃO: Usamos o variant para definir a base e
                               forçamos as cores de performance no className
                            */
                            className="h-[32px] px-4 text-[9px] font-black uppercase tracking-widest border-performance/30 bg-performance/10 text-performance-light hover:bg-performance/20 transition-all italic"
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-[10px] not-italic">
                                    📈
                                </span>
                                <span>History</span>
                            </span>
                        </GlassBtn>
                    ) : !showHistoryButton && workoutName ? (
                        <div className="flex flex-col items-end leading-none">
                            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-1">
                                Session
                            </span>
                            <span className="text-[10px] font-black uppercase text-system-light italic truncate">
                                {workoutName}
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* TÍTULO CENTRAL: O foco do exercício */}
            <div className="mt-8 flex flex-col justify-center items-center w-full">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-none text-white text-center drop-shadow-2xl">
                    {exerciseName}
                </h1>

                {/* LINHA DECORATIVA:
                   Troquei cyan-500 por system ou performance para manter a consistência
                */}
                <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-performance/40 to-transparent mt-3"></div>
            </div>
        </header>
    );
};

export default ExercisesHeader;
