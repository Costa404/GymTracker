export const createTimerSlice = (set: any, get: any) => ({
    startTime: null,
    elapsedSeconds: 0,

    tick: () => {
        const start = get().startTime;
        if (start) {
            set({ elapsedSeconds: Math.floor((Date.now() - start) / 1000) });
        }
    },

    resetTimer: () => set({ startTime: Date.now(), elapsedSeconds: 0 }),
});
