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
        <div className="max-w-2xl mx-auto  pb-24  font-sans">
            <Head title="Past Workouts" />

            {/* HEADER REFORMULADO */}
            <div className="text-center mb-4">
                <h1 className="text-system-light font-black uppercase tracking-italic text-xl ">
                    Archive
                </h1>
                <div className="h-[1px] w-12 bg-system/20 mx-auto mt-4" />
            </div>

            {/* FILTROS COM SCROLL HORIZONTAL (Caso cresçam) */}
            <div className=" overflow-x-auto no-scrollbar">
                <div className="flex justify-center min-w-max">
                    <CategoryFilterWorkoutsHistory currentType={filters.type} />
                </div>
            </div>

            {/* LISTA DE TREINOS */}
            <div className="space-y-4">
                {workouts.length > 0 ? (
                    <div className="flex flex-col">
                        {workouts.map((workout, index) => (
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
                            No records in this category
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutsHistory;
