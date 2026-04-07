import { Link } from "@inertiajs/react";

const SessionExercisePicker = ({ exercise, workoutId }) => (
    <Link
        href={`/workout/${workoutId}/exercise/${exercise.id}`}
        className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl flex justify-between items-center active:bg-orange-500/10 active:border-orange-500/40 transition-all group"
    >
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 group-active:text-orange-500 font-black text-xs">
                #
            </div>
            <span className="text-zinc-300 group-active:text-white font-black uppercase text-[11px] italic tracking-widest">
                {exercise.name}
            </span>
        </div>
        <div className="w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center group-active:border-orange-500">
            <span className="text-zinc-700 group-active:text-orange-500 text-xs font-black">
                +
            </span>
        </div>
    </Link>
);

export default SessionExercisePicker;
