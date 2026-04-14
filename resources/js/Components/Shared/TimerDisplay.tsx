// Components/Shared/TimerDisplay.tsx

import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";
import { useEffect } from "react";

const TimerDisplay = () => {
    const elapsedSeconds = useWorkoutSessionStore((s) => s.elapsedSeconds);
    const tick = useWorkoutSessionStore((s) => s.tick);
    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);

    useEffect(() => {
        if (!activeSessionId) return;
        const interval = setInterval(() => {
            tick();
        }, 1000);
        return () => clearInterval(interval);
    }, [activeSessionId, tick]);

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        const timeArray = [hrs, mins, secs].map((v) => (v < 10 ? "0" + v : v));

        return timeArray[0] === "00"
            ? `${timeArray[1]}:${timeArray[2]}`
            : timeArray.join(":");
    };

    return (
        <div className="flex items-center gap-2 px-2 py-1">
            {/* Ponto de estado: usa a cor pura do sistema */}
            <div className="w-1.5 h-1.5 bg-system rounded-full animate-pulse shadow-[0_0_8px_var(--color-system)]" />

            {/* Tempo: tabular-nums impede que os números "saltem" ao mudar */}
            <span className="text-[10px] text-system-light font-black tabular-nums tracking-widest italic uppercase">
                {formatTime(elapsedSeconds)}
            </span>
        </div>
    );
};

export default TimerDisplay;
