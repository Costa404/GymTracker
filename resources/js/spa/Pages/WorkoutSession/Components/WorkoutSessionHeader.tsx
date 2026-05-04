interface WorkoutSessionHeaderProps {
    workout: {
        name: string;
    };
}

const WorkoutSessionHeader = ({ workout }: WorkoutSessionHeaderProps) => {
    return (
        <header className=" p">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Badge de Status LIVE: Alinhado com o tema Performance */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-performance/5 border border-performance/15 rounded-xl backdrop-blur-sm">
                        {/* Dot Pulsante com a variável oficial */}
                        <span className="w-1.5 h-1.5 bg-performance rounded-full animate-pulse shadow-[0_0_8px_var(--color-performance)]" />

                        <p className="text-[9px] text-performance-light font-black uppercase tracking-[0.25em] italic">
                            {workout.name}{" "}
                            <span className="opacity-50 ml-1">// LIVE</span>
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default WorkoutSessionHeader;
