import useWorkoutSessionStore from "@/Hooks/useWorkoutSessionStore";
import { Link, router } from "@inertiajs/react";

const ActiveSession = () => {
    const { activeSessionId, sessionExercises, finishSession } =
        useWorkoutSessionStore();

    const finishWorkout = () => {
        // 1. Bloqueio imediato se o user não tiver a certeza
        const confirmacao = confirm(
            "Desejas finalizar o treino e gravar os resultados?",
        );
        if (!confirmacao) return;

        // 2. Envio dos dados "voláteis" para o servidor
        router.post(
            `/workouts/finish/${activeSessionId}`,
            { exercises: sessionExercises }, // Mudei para 'exercises' para ser mais descritivo no PHP
            {
                // 3. Só limpamos o telemóvel se o servidor confirmar que gravou com sucesso
                onSuccess: () => {
                    finishSession();
                    console.log("Treino gravado no SQLite com sucesso!");
                },
                onError: (errors) => {
                    console.error("Erro ao gravar na DB:", errors);
                    alert(
                        "Erro ao gravar. O treino continua guardado no buffer local.",
                    );
                },
            },
        );
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-300 pb-8">
            {/* PAINEL DE ESTADO EMERALD (Glass) */}
            <div className="bg-emerald-950/10 backdrop-blur-md border border-emerald-500/10 p-6 rounded-3xl text-center shadow-lg shadow-black/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <h3 className="text-emerald-500 font-black uppercase italic tracking-[0.3em] text-xs">
                        Recording Active
                    </h3>
                </div>
                <p className="text-white font-black uppercase text-xl italic tracking-tighter leading-none mb-1">
                    Session: #{activeSessionId}
                </p>
                <div className="mt-4 pt-3 border-t border-emerald-500/10">
                    <p className="text-emerald-500/60 font-black text-[8px] uppercase tracking-[0.2em]">
                        {sessionExercises.length} Exercises in Local Buffer
                    </p>
                </div>
            </div>

            {/* AÇÕES EM GLASS */}
            <div className="grid grid-cols-1 gap-5">
                {/* GO TO WORKOUT (Blue Glass) */}
                <Link
                    href={`/workouts/${activeSessionId}/workoutSession`}
                    className="flex items-center justify-center gap-3 w-full bg-blue-500/10 backdrop-blur-lg border border-blue-500/20 hover:bg-blue-500/20 active:scale-[0.97] transition-all text-blue-100 py-6 rounded-2xl shadow-xl shadow-blue-500/5 group"
                >
                    <span className="text-base font-black uppercase italic tracking-widest text-blue-200 group-hover:text-white transition-colors">
                        GO TO WORKOUT
                    </span>
                    <span className="text-lg text-blue-300 group-hover:text-white transition-colors">
                        →
                    </span>
                </Link>

                {/* FINISH WORKOUT (Intense Red Glass) */}
                <button
                    onClick={finishWorkout}
                    className="w-full bg-red-600/10 backdrop-blur-lg border border-red-500/30 hover:bg-red-600/20 active:scale-[0.97] transition-all py-5 rounded-2xl group shadow-xl shadow-red-500/5"
                >
                    <span className="text-red-500 group-hover:text-red-400 font-black uppercase text-xs italic tracking-[0.2em] transition-colors">
                        — Finish Workout —
                    </span>
                    <span className="block text-red-300/60 text-[8px] font-bold uppercase tracking-widest mt-1 group-hover:text-red-200 transition-colors">
                        (End current session)
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ActiveSession;
