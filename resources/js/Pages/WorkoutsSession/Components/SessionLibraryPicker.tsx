// Components/SessionLibraryPicker.tsx
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
        <section className="space-y-4">
            {/* Divisor Visual Estilizado */}
            <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-zinc-800 flex-1" />
                <h2 className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em]">
                    Add to Session
                </h2>
                <div className="h-px bg-zinc-800 flex-1" />
            </div>

            {/* Lista de Exercícios Disponíveis */}
            <div className="grid grid-cols-1 gap-2">
                {libraryToDisplay.length > 0 ? (
                    libraryToDisplay.map((ex) => (
                        <SessionExercisePicker
                            key={ex.id}
                            exercise={ex}
                            workoutId={workoutId}
                        />
                    ))
                ) : (
                    <div className="py-8 px-4 border border-dashed border-zinc-800 rounded-2xl">
                        <p className="text-center text-[10px] text-zinc-600 uppercase font-bold tracking-widest">
                            All category exercises added
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SessionLibraryPicker;
