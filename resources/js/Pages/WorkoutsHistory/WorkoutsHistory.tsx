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
        <div className="max-w-md mx-auto pt-4 px-4 pb-20">
            <Head title="Past Workouts" />

            <h1 className="text-white font-black uppercase tracking-widest mb-8 text-center italic text-xl">
                Workouts History
            </h1>

            <CategoryFilterWorkoutsHistory currentType={filters.type} />

            <div className="space-y-3">
                {workouts.length > 0 ? (
                    workouts.map((workout) => (
                        <WorkoutsHistoryItem
                            key={workout.id}
                            workout={workout}
                        />
                    ))
                ) : (
                    <div className="py-20 text-center opacity-30">
                        <p className="text-zinc-500 font-black text-xs uppercase tracking-[0.3em]">
                            No workouts found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutsHistory;
