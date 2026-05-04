import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/spa/db";
import WorkoutHistoryItem from "./WorkoutHistoryItem";
import WorkoutHistoryCategoryFilter from "./WorkoutHistoryCategoryFilter";
import { useState } from "react";

const WorkoutHistory = () => {
    // 1. Estado local para filtros (substitui os filtros que vinham do URL via Inertia)
    const [filterType, setFilterType] = useState<string | null>(null);

    // 2. Query ao Dexie (Archive)
    const workouts =
        useLiveQuery(async () => {
            let collection = db.workouts.toCollection();

            // Filtra apenas treinos completados
            collection = collection.filter((w) => w.completed_at !== null);

            let results = await collection.reverse().sortBy("completed_at");

            // Aplica o filtro de categoria se existir (ex: Push, Pull, Legs)
            if (filterType) {
                results = results.filter((w) =>
                    w.name?.toLowerCase().includes(filterType.toLowerCase()),
                );
            }

            return results;
        }, [filterType]) || [];

    return (
        <div className="  font-sans">
            {/* Removido o <Head /> do Inertia */}

            {/* HEADER */}
            <div className="text-center mb-6">
                <h1 className="text-system-light font-black uppercase italic tracking-tighter text-2xl ">
                    Archive
                </h1>
                <div className="inline-block px-3 py-1 bg-performance/10 border border-performance/20 rounded-full">
                    <p className="text-performance text-[9px] font-black uppercase tracking-[0.2em]">
                        {workouts.length} Total Sessions
                    </p>
                </div>
            </div>

            {/* FILTROS */}
            <div className="overflow-x-auto no-scrollbar mb-4">
                <div className="flex ">
                    {/* Passamos o setFilterType para o componente de filtro gerir o estado local */}
                    <WorkoutHistoryCategoryFilter
                        currentType={filterType}
                        onFilterChange={setFilterType}
                    />
                </div>
            </div>

            {/* LISTA DE TREINOS */}
            <div className="space-y-4">
                {workouts.length > 0 ? (
                    <div className="flex flex-col">
                        {workouts.map((workout) => (
                            <WorkoutHistoryItem
                                key={workout.id}
                                workout={workout}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <div className="mb-4 opacity-20 flex justify-center">
                            <div className="w-16 h-[1px] bg-zinc-500" />
                        </div>
                        <p className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.4em]">
                            No records found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutHistory;
