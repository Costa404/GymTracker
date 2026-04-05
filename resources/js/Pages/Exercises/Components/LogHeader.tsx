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
        <header className="mb-12 flex flex-col items-center px-1 relative z-10 w-full">
            {/* LINHA SUPERIOR: Navegação e Contexto */}
            <div className="flex justify-between w-full items-center">
                {/* LADO ESQUERDO: History ou Workout Name */}
                <div className="w-[100px] flex items-center justify-start">
                    {showHistoryButton ? (
                        <Link
                            href={`/exercises/${exerciseId}/ExerciseHistory`}
                            className="group relative h-[38px] w-full flex items-center justify-center bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all shadow-lg"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                <span className="text-[12px]">📈</span>
                                <span>History</span>
                            </span>
                        </Link>
                    ) : (
                        /* Se estivermos no histórico, mostramos o nome do treino aqui */
                        <div className="flex flex-col leading-tight">
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-500">
                                Session
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-cyan-400 italic truncate ">
                                {workoutName}
                            </span>
                        </div>
                    )}
                </div>

                {/* BOTÃO BACK (Sempre à Direita) */}
                <button
                    onClick={handleBack}
                    className="group relative h-[38px] w-[100px] flex items-center justify-center bg-red-500/10 border border-red-500/20 backdrop-blur-xl rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all shadow-lg"
                >
                    <span className="relative z-10 leading-none">Back</span>
                    <div className="absolute inset-0 rounded-2xl bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                </button>
            </div>

            {/* TÍTULO: Centralizado com brilho suave */}
            <div className="mt-8 flex flex-col justify-center items-center w-full">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] text-center">
                    {exerciseName}
                </h1>

                {/* Linha Decorativa Tech */}
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mt-4"></div>
            </div>
        </header>
    );
};
