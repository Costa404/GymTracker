import React, { useState } from "react";
import { HiOutlineTrash, HiOutlineCheck, HiOutlineX } from "react-icons/hi";

interface Set {
    weight: string | number;
    reps: string | number;
    rir: number;
}

interface LogSetListProps {
    sets: Set[];
    onDelete: (index: number) => void;
}

export const LogSetList = ({ sets, onDelete }: LogSetListProps) => {
    // Estado para controlar qual a série que está em modo de confirmação
    const [confirmingIndex, setConfirmingIndex] = useState<number | null>(null);

    return (
        <div className="mt-8 space-y-3 px-1">
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
                // Cálculo do index original para garantir que o delete apaga a série correta
                const originalIndex = sets.length - 1 - i;
                const isConfirming = confirmingIndex === originalIndex;

                return (
                    <div
                        key={originalIndex}
                        className="group relative overflow-hidden rounded-xl p-[1px] transition-all duration-300"
                    >
                        {/* Borda com gradiente glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-performance/20" />

                        <div className="relative bg-[#050505] rounded-xl p-3 flex items-center justify-between border border-white/5">
                            {/* LADO ESQUERDO: INDEX E PESO */}
                            <div className="flex items-center gap-4">
                                <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center">
                                    <span className="text-[9px] font-black text-zinc-500 group-hover:text-performance transition-colors">
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

                            {/* CENTRO: DIVISOR */}
                            <div className="h-4 w-[1px] bg-zinc-800" />

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

                                {/* SISTEMA DE CONFIRMAÇÃO INTEGRADO */}
                                <div className="flex items-center min-w-[40px] justify-end">
                                    {!isConfirming ? (
                                        <button
                                            onClick={() =>
                                                setConfirmingIndex(
                                                    originalIndex,
                                                )
                                            }
                                            className="p-2 rounded-lg bg-red-500/5 text-red-500/30 hover:text-red-500 hover:bg-red-500/20 transition-all duration-200"
                                        >
                                            <HiOutlineTrash className="text-sm" />
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-200">
                                            <button
                                                onClick={() =>
                                                    setConfirmingIndex(null)
                                                }
                                                className="p-1.5 rounded-md bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                                            >
                                                <HiOutlineX className="text-xs" />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    onDelete(originalIndex);
                                                    setConfirmingIndex(null);
                                                }}
                                                className="flex items-center gap-1.5 bg-red-600 px-2 py-1.5 rounded-md text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] active:scale-95 transition-all"
                                            >
                                                <HiOutlineCheck className="text-xs" />
                                                <span className="text-[8px] font-black uppercase tracking-tighter">
                                                    SURE?
                                                </span>
                                            </button>
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
