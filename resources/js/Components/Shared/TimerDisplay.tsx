// Components/Shared/TimerDisplay.tsx

import { useWorkoutSessionStore } from "@/Hooks/SessionStore/useWorkoutSessionStore";
import { useEffect } from "react";

const TimerDisplay = () => {
    // BUSCAS AS VARIÁVEIS DIRETAMENTE AQUI
    const elapsedSeconds = useWorkoutSessionStore((s) => s.elapsedSeconds);
    const tick = useWorkoutSessionStore((s) => s.tick);
    const activeSessionId = useWorkoutSessionStore((s) => s.activeSessionId);

    useEffect(() => {
        if (!activeSessionId) return;
        const interval = setInterval(() => {
            tick();
        }, 1000);
        return () => clearInterval(interval);
    }, [activeSessionId]); // ← sem tick aqui]);

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        const timeArray = [hrs, mins, secs].map((v) => (v < 10 ? "0" + v : v));

        // Se horas for "00", removemos para mostrar apenas MM:SS
        if (timeArray[0] === "00") {
            return `${timeArray[1]}:${timeArray[2]}`;
        }

        return timeArray.join(":");
    };

    return (
        <div className="flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 px-3 py-1.5 rounded-full ">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-white font-black tabular-nums tracking-widest">
                {formatTime(elapsedSeconds)}
            </span>
        </div>
    );
};

export default TimerDisplay;
