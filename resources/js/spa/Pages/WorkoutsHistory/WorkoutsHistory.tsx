import { Head } from "@inertiajs/react";
import WorkoutsHistoryItem from "./WorkoutsHistoryItem";
import CategoryFilterWorkoutsHistory from "@/Pages/WorkoutsHistory/CategoryFilterWorkoutsHistory";

interface Props {
    workouts: any[];
    filters: {
        type: string | null;
    };
}

const WorkoutsHistory = ({ workouts, filters }: Props) => {
    return (
        <div className="max-w-2xl mx-auto pb-24 font-sans">
            <Head title="Past Workouts" />

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
                <div className="flex justify-center min-w-max">
                    <CategoryFilterWorkoutsHistory currentType={filters.type} />
                </div>
            </div>

            {/* LISTA DE TREINOS */}
            <div className="space-y-4">
                {workouts.length > 0 ? (
                    <div className="flex flex-col">
                        {workouts.map((workout) => (
                            <WorkoutsHistoryItem
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

export default WorkoutsHistory;
