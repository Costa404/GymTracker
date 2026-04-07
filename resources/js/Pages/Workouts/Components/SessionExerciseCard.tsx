import { Link } from "@inertiajs/react";

const SessionExerciseCard = ({ name, setsCount, exerciseId, workoutId }) => (
    <Link
        href={`/workout/${workoutId}/exercise/${exerciseId}`}
        className="block bg-gradient-to-br from-cyan-900/20 to-black border border-cyan-500/30 p-6 rounded-3xl active:scale-[0.98] transition-all group shadow-[0_0_20px_rgba(6,182,212,0.1)]"
    >
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-cyan-400 font-black uppercase italic tracking-widest text-base group-active:text-white">
                    {name}
                </h3>
                <div className="mt-1">
                    <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-md font-black uppercase italic">
                        {setsCount} Sets
                    </span>
                </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500 transition-colors">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-cyan-500 group-hover:text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </div>
        </div>
    </Link>
);

export default SessionExerciseCard;
