import { Link } from "@inertiajs/react";

// Removi o TypeScript (interface) se estiveres a usar JS puro,
// ou podes manter se o teu projeto for TS.
export const LogHeader = ({
    exerciseName,
    workoutName,
    exerciseId,
    workoutId,
    showHistoryButton = true,
}) => {
    const handleBack = (e) => {
        e.preventDefault();
        window.history.back();
    };

    return (
        <header className="mb-6 flex flex-col items-center px-1 relative z-10 w-full">
            <div className="flex justify-between w-full items-center">
                <div className="flex flex-col gap-2 items-start">
                    {" "}
                    {/* Removi o w-[80px] e usei flex-col */}
                    {showHistoryButton ? (
                        <Link
                            href={`/workout/${workoutId}/exercise/${exerciseId}/history`}
                            className="group relative h-[32px] px-3 flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl rounded-xl text-[8px] font-black uppercase tracking-widest text-emerald-400 hover:bg-emerald-500/20 transition-all"
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

                <button
                    onClick={handleBack}
                    className="h-[32px] w-[80px] flex items-center justify-center bg-red-500/10 border border-red-500/30 backdrop-blur-xl rounded-xl text-[9px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                >
                    Back
                </button>
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
