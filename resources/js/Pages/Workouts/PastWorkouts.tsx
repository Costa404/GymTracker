import { Head } from "@inertiajs/react";
import WorkoutCard from "../../Components/WorkoutCard";
import CategoryFilterPastWorkouts from "@/Components/CategoryFilterPastWorkouts";

interface Props {
    workouts: any[];
    filters: {
        type: string | null;
    };
}

const PastWorkouts = ({ workouts, filters }: Props) => {
    return (
        <div className="max-w-md mx-auto pt-4 px-4 pb-20">
            <Head title="Past Workouts" />

            <h1 className="text-white font-black uppercase tracking-widest mb-8 text-center italic text-xl">
                Past Workouts
            </h1>

            <CategoryFilterPastWorkouts currentType={filters.type} />

            <div className="space-y-3">
                {workouts.length > 0 ? (
                    workouts.map((workout) => (
                        <WorkoutCard key={workout.id} workout={workout} />
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

export default PastWorkouts;
