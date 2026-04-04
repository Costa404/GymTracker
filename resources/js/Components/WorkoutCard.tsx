import { Link } from "@inertiajs/react";

interface Workout {
    id: number;
    name: string;
    created_at: string;
}

const WorkoutCard = ({ workout }: { workout: Workout }) => (
    <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#252525] flex justify-between items-center active:scale-[0.98] transition-all">
        <div>
            <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-1">
                {workout.name}
            </p>
            <p className="text-white font-bold text-lg">
                {new Date(workout.created_at).toLocaleDateString("pt-PT")}
            </p>
        </div>
        <Link
            href={`/workouts/${workout.id}`}
            className="text-gray-500 hover:text-white font-black text-[10px] uppercase tracking-widest"
        >
            View
        </Link>
    </div>
);

export default WorkoutCard;
