import PageTitle from "@/spa/Components/Shared/PageTitle";

const WorkoutSummaryHeader = () => {
    return (
        <header className="text-center space-y-2">
            <PageTitle>Session Report</PageTitle>
            <div className="inline-flex items-center justify-center gap-2 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-xl">
                <span className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.2em] mt-[1px]">
                    May 4, 2026
                </span>
                <div className="w-1 h-1 rounded-full bg-performance/50" />
                <span className="text-performance text-[9px] font-black uppercase tracking-[0.2em] mt-[1px]">
                    01:12:45
                </span>
            </div>
        </header>
    );
};

export default WorkoutSummaryHeader;
