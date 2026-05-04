import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/spa/db";
import { LuPlus, LuSearch } from "react-icons/lu";
import GlassBtn from "@/Components/Shared/GlassBtn";
import ExerciseDisplay from "./ExerciseDisplay";


const ExercisesPage = () => {
    const [search, setSearch] = useState("");

    // 1. Subscreve aos exercícios no Dexie (reativo)
    const exercises = useLiveQuery(() => db.exercises.toArray()) || [];

    // 2. Filtro de pesquisa
    const filteredExercises = exercises.filter((ex) =>
        ex.name.toLowerCase().includes(search.toLowerCase()),
    );

    // 3. Função para apagar exercício
    const handleDelete = async (id: number) => {
        if (!confirm("Delete exercise?")) return;
        try {
            await db.exercises.delete(id);
        } catch (error) {
            console.error("Erro deleting:", error);
        }
    };

    return (
        <div className="w-full font-sans  animate-in fade-in duration-500">
            {/* HEADER & TITULO */}
            <div className="space-y-3 mb-6 text-center ">
                <h1 className="text-system-light font-black uppercase italic tracking-tighter text-2xl">
                    Exercise Library
                </h1>

                {/* BOTÃO CRIAR: Focado em Adição */}
                <GlassBtn
                    to="/exercises/create"
                    variant="performance"
                    className="w-full py-5 rounded-2xl mb-6"
                >
                    <div className="flex items-center justify-center gap-2">
                        <span className="tracking-[0.2em] font-black uppercase text-[11px] ">
                            Create New Exercise
                        </span>
                    </div>
                </GlassBtn>

                {/* BARRA DE PESQUISA */}
                <div className="relative group">
                    <LuSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-performance transition-colors" />
                    <input
                        type="text"
                        placeholder="FIND EXERCISE..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-zinc-900/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-[0.2em] text-white outline-none focus:border-performance/30 transition-all placeholder:text-zinc-700"
                    />
                </div>
            </div>

            {/* LISTA DE CARDS DE GESTÃO */}
            <div className="space-y-3 pb-24">
                {filteredExercises.length > 0 ? (
                    filteredExercises.map((ex) => (
                        <ExerciseDisplay
                            key={ex.id}
                            exercise={ex}
                            onDelete={handleDelete}
                        />
                    ))
                ) : (
                    <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl opacity-20">
                        <p className="text-zinc-500 font-black uppercase text-[10px] tracking-[0.4em]">
                            {search ? "No Results Found" : "Library is Empty"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExercisesPage;
