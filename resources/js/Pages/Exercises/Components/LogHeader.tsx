import { Link } from "@inertiajs/react";

interface LogHeaderProps {
    exerciseName: string;
    workoutName: string;
    exerciseId: number;
    showHistoryButton?: boolean;
}

export const LogHeader = ({
    exerciseName,
    workoutName,
    exerciseId,
    showHistoryButton = true,
}: LogHeaderProps) => {
    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        window.history.back();
    };

    return (
        // Reduzido mb-12 para mb-6
        <header className="mb-6 flex flex-col items-center px-1 relative z-10 w-full">
            <div className="flex justify-between w-full items-center">
                <div className="w-[80px] flex items-center justify-start">
                    {showHistoryButton ? (
                        <Link
                            href={`/exercises/${exerciseId}/ExerciseHistory`}
                            // Reduzido h-[38px] para h-[32px] e arredondamento para xl
                            className="group relative h-[32px] w-full flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl rounded-xl text-[8px] font-black uppercase tracking-widest text-emerald-400 hover:bg-emerald-500/20 transition-all"
                        >
                            <span className="flex items-center gap-1">
                                <span className="text-[10px]">📈</span>
                                <span>History</span>
                            </span>
                        </Link>
                    ) : (
                        <div className="flex flex-col leading-none">
                            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-600">
                                Session
                            </span>
                            <span className="text-[9px] font-black uppercase text-cyan-400 italic truncate max-w-[80px]">
                                {workoutName}
                            </span>
                        </div>
                    )}
                </div>

                {/* Botão Back mais discreto */}
                <button
                    onClick={handleBack}
                    className="h-[32px] w-[80px] flex items-center justify-center bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-xl text-[8px] font-black uppercase tracking-widest text-zinc-400 hover:text-red-400 transition-all"
                >
                    Back
                </button>
            </div>

            {/* TÍTULO: Reduzido mt-8 para mt-4 e text-4xl para text-2xl */}
            <div className="mt-4 flex flex-col justify-center items-center w-full px-4">
                <h1 className="text-2xl font-black italic uppercase tracking-tighter leading-none text-white text-center drop-shadow-sm">
                    {exerciseName}
                </h1>

                {/* Linha Decorativa mais subtil */}
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mt-2"></div>
            </div>
        </header>
    );
};
