import { Link } from "@inertiajs/react";

interface Props {
    currentType: string | null;
}

const CategoryFilterWorkoutsHistory = ({ currentType }: Props) => {
    const types = ["Upper ", "Push Day", "Pull Day", "Legs Day"];

    const getStyle = (type: string | null) =>
        currentType === type
            ? "bg-blue-500/10 text-blue-400 border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.15)]"
            : "bg-zinc-900/60 text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300";

    return (
        <div className="flex justify-center w-full mb-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 items-center">
                <Link
                    href="/workouts/history"
                    className={`px-4 py-1.5 rounded-md border text-[9px] font-black uppercase italic tracking-[0.15em] transition-all duration-200 flex-shrink-0 ${getStyle(null)}`}
                >
                    All
                </Link>

                {types.map((type) => (
                    <Link
                        key={type}
                        href={`/workouts/history?type=${type}`}
                        className={`px-4 py-1.5 rounded-md border text-[9px] font-black uppercase italic tracking-[0.15em] whitespace-nowrap transition-all duration-200 flex-shrink-0 ${getStyle(type)}`}
                    >
                        {type.replace(" Day", "")}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilterWorkoutsHistory;
