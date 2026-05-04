import GlassBtn from "@/Components/Shared/GlassBtn";
import React, { useState } from "react";
import { HiOutlineTrash, HiOutlineCheck, HiOutlineX } from "react-icons/hi";

interface Set {
    weight: string | number;
    reps: string | number;
    rir: number;
}

interface ExerciseLogSetListProps {
    sets: Set[];
    onDelete: (index: number) => void;
}

const ExerciseLogSetList = ({ sets, onDelete }: ExerciseLogSetListProps) => {
    const [confirmingIndex, setConfirmingIndex] = useState<number | null>(null);

    return (
        <div className="mt-8 space-y-3 ">
            {/* HEADER: SETS ADDED */}
            <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-performance/20 to-transparent" />
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-performance/60 flex items-center gap-2">
                    <span className="w-1 h-1 bg-performance rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    Sets Added
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-performance/20 to-transparent" />
            </div>

            {/* LISTA DE SÉRIES (INVERTIDA) */}
            {[...sets].reverse().map((set, i) => {
                const originalIndex = sets.length - 1 - i;
                const isConfirming = confirmingIndex === originalIndex;

                return (
                    <div
                        key={originalIndex}
                        className="relative rounded-xl p-[1px] overflow-hidden transition-all"
                    >
                        {/* Background Glow sutil */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-performance/10" />

                        <div className="relative bg-[#050505] rounded-xl p-3 flex items-center justify-between border border-white/5">
                            {/* LADO ESQUERDO: INDEX E PESO */}
                            <div className="flex items-center gap-4">
                                <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center">
                                    <span className="text-[9px] font-black text-zinc-500">
                                        #{originalIndex + 1}
                                    </span>
                                </div>

                                <div className="flex items-baseline gap-1">
                                    <span className="text-xl font-black italic text-white tracking-tighter leading-none">
                                        {set.weight}
                                    </span>
                                    <span className="text-[8px] font-bold text-performance uppercase tracking-widest">
                                        kg
                                    </span>
                                </div>
                            </div>

                            {/* DIVISOR */}
                            <div className="h-4 w-[1px] bg-zinc-800/50" />

                            {/* LADO DIREITO: REPS, RIR E AÇÕES */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-[10px] font-bold text-zinc-600 italic">
                                        x
                                    </span>
                                    <span className="text-xl font-black italic text-white tracking-tighter leading-none">
                                        {set.reps}
                                    </span>
                                </div>

                                <div className="flex flex-col items-end min-w-[35px]">
                                    <span className="text-[6px] text-zinc-600 font-black uppercase tracking-widest mb-0.5">
                                        RIR
                                    </span>
                                    <div className="bg-performance/10 border border-performance/20 px-2 py-0.5 rounded-md text-[10px] font-black text-performance-light">
                                        {set.rir === -1 ? "F" : set.rir}
                                    </div>
                                </div>

                                <div className="flex items-center min-w-[44px] justify-end">
                                    {!isConfirming ? (
                                        <GlassBtn
                                            variant="red"
                                            onClick={() =>
                                                setConfirmingIndex(
                                                    originalIndex,
                                                )
                                            }
                                            className="w-10 h-10 p-0 rounded-xl"
                                        >
                                            <HiOutlineTrash size={18} />
                                        </GlassBtn>
                                    ) : (
                                        <div className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-150">
                                            {/* BOTÃO CANCELAR (ZINC/GHOST) */}
                                            <GlassBtn
                                                variant="zinc"
                                                onClick={() =>
                                                    setConfirmingIndex(null)
                                                }
                                                className="w-8 h-8 p-0 rounded-lg"
                                            >
                                                <HiOutlineX size={14} />
                                            </GlassBtn>

                                            {/* BOTÃO CONFIRMAR (RED) */}
                                            <GlassBtn
                                                variant="red"
                                                onClick={() => {
                                                    onDelete(originalIndex);
                                                    setConfirmingIndex(null);
                                                }}
                                                className="h-8 px-3 gap-1.5 rounded-lg border-red-500/50 bg-red-600/20"
                                            >
                                                <HiOutlineCheck size={14} />
                                                <span className="text-[9px] font-black tracking-tighter">
                                                    SURE?
                                                </span>
                                            </GlassBtn>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ExerciseLogSetList;
