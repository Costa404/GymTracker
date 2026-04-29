import React from "react";
import SessionExercisePicker from "./SessionExercisePicker";

interface SessionLibraryPickerProps {
    libraryToDisplay: any[];
    workoutId: number;
}

const SessionLibraryPicker = ({
    libraryToDisplay,
    workoutId,
}: SessionLibraryPickerProps) => {
    return (
        <section className="space-y-6">
            {" "}
            {/* Aumentei o space-y para respirar melhor */}
            {/* Divisor Visual Estilizado (Estilo HUD técnico) */}
            <div className="flex items-center gap-4 mb-2">
                {/* Gradiente que "morre" nas pontas para um look premium */}
                <div className="h-px bg-gradient-to-r from-transparent to-zinc-800 flex-1" />

                <div className="flex items-center gap-2">
                    {/* Pequeno detalhe técnico antes do texto */}
                    <div className="w-1 h-1 bg-zinc-700 rotate-45" />
                    <h2 className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.3em] italic">
                        Add to Session
                    </h2>
                </div>

                <div className="h-px bg-gradient-to-l from-transparent to-zinc-800 flex-1" />
            </div>
            {/* Lista de Exercícios Disponíveis */}
            <div className="grid grid-cols-1 gap-2.5">
                {libraryToDisplay.length > 0 ? (
                    libraryToDisplay.map((ex) => (
                        <SessionExercisePicker
                            key={ex.id}
                            exercise={ex}
                            workoutId={workoutId}
                        />
                    ))
                ) : (
                    /* Empty State com estilo Glass Dashed */
                    <div className="py-10 px-4 border border-dashed border-zinc-800/50 bg-zinc-900/[0.02] rounded-2xl flex flex-col items-center justify-center">
                        <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center mb-3 opacity-20">
                            <span className="text-xs">✓</span>
                        </div>
                        <p className="text-center text-[10px] text-zinc-600 uppercase font-black tracking-widest italic">
                            All exercises added
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SessionLibraryPicker;
