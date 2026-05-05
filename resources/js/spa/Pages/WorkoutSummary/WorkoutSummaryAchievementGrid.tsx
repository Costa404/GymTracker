import { LuTrophy } from "react-icons/lu";

interface PRData {
    name: string;
    value: string;
    diff: string;
}

interface Props {
    prs: PRData[];
}

const WorkoutSummaryAchievementGrid = ({ prs }: Props) => {
    // Se não houver PRs, podemos não renderizar a secção
    if (!prs || prs.length === 0) return null;

    return (
        <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[.3em] text-performance/50 ml-1">
                Achievements
            </h3>
            <div className="grid gap-3">
                {prs.map((pr, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 p-5 rounded-2xl bg-performance/5 border border-performance/20 shadow-lg shadow-performance/5"
                    >
                        <LuTrophy className="text-performance" size={22} />
                        <div className="flex-1">
                            <p className="text-white font-black uppercase text-xs italic tracking-widest">
                                {pr.name}
                            </p>
                            <p className="text-zinc-500 text-[10px] font-mono font-bold mt-0.5">
                                {pr.value}
                            </p>
                        </div>
                        <span className="text-[10px] font-black text-performance bg-performance/10 px-2.5 py-1.5 rounded-lg border border-performance/20 uppercase tracking-widest">
                            {pr.diff}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkoutSummaryAchievementGrid;
