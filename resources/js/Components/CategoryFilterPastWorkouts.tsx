import { Link } from "@inertiajs/react";

interface Props {
    currentType: string | null;
}

const CategoryFilterPastWorkouts = ({ currentType }: Props) => {
    const types = ["Upper Body", "Push Day", "Pull Day", "Legs Day"];

    const getStyle = (type: string | null) =>
        currentType === type
            ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            : "bg-white/5 text-zinc-500 border-white/10 backdrop-blur-md";

    return (
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar -mx-4 px-4 mask-fade-edges">
            <Link
                href="/workouts"
                className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border transition-all duration-300 ${getStyle(null)}`}
            >
                All
            </Link>
            {types.map((type) => (
                <Link
                    key={type}
                    href={`/workouts?type=${type}`}
                    className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap border transition-all duration-300 ${getStyle(type)}`}
                >
                    {type.replace(" Day", "")}
                </Link>
            ))}
        </div>
    );
};

export default CategoryFilterPastWorkouts;
