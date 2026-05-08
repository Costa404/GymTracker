// SyncButton.tsx
import { useState } from "react";
import { useDataPull } from "@/spa/hooks/SyncData/useDataPull";
import { useSyncData } from "@/spa/hooks/SyncData/useSyncData";
import GlassBtn from "@/spa/Components/Shared/GlassBtn";

export const SyncButton = () => {
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncUrl, setSyncUrl] = useState("");
    const { pullDataFromPC } = useDataPull();
    const { pushToPC } = useSyncData();

    const handle = (fn: (url: string) => Promise<void>) => async () => {
        if (!syncUrl.trim()) {
            alert("Cola o URL do ngrok primeiro");
            return;
        }
        const baseUrl = syncUrl.replace(/\/$/, "");
        setIsSyncing(true);
        try {
            await fn(baseUrl);
        } catch (error) {
            console.error(error);
            alert("Sync falhou.");
        } finally {
            setIsSyncing(false);
        }
    };

    const spinner = (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );

    return (
        <div className="flex flex-col gap-3">
            <input
                type="url"
                value={syncUrl}
                onChange={(e) => setSyncUrl(e.target.value)}
                placeholder="https://xxx.ngrok.io"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none placeholder:text-white/20"
            />

            {/* Pull — PC → iPhone */}
            <GlassBtn
                onClick={handle(pullDataFromPC)}
                variant="white"
                disabled={isSyncing || !syncUrl.trim()}
                className="w-full py-6 gap-3"
            >
                {isSyncing ? (
                    spinner
                ) : (
                    <svg
                        className="h-4 w-4 opacity-40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                )}
                <span className="text-[10px] tracking-[0.3em] font-bold uppercase italic">
                    {isSyncing ? "Syncing..." : "Pull from PC"}
                </span>
            </GlassBtn>

            {/* Push — iPhone → PC */}
            <GlassBtn
                onClick={handle(pushToPC)}
                variant="system"
                disabled={isSyncing || !syncUrl.trim()}
                className="w-full py-6 gap-3"
            >
                {isSyncing ? (
                    spinner
                ) : (
                    <svg
                        className="h-4 w-4 opacity-40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                )}
                <span className="text-[10px] tracking-[0.3em] font-bold uppercase italic">
                    {isSyncing ? "Syncing..." : "Push to PC"}
                </span>
            </GlassBtn>
        </div>
    );
};
