import useWorkoutSessionStore from "@/Hooks/SessionStore/useWorkoutSessionStore";
import { router } from "@inertiajs/react";
import GlassBtn from "@/Components/Shared/GlassBtn"; // O nosso salvador

const ActiveSession = () => {
    const { activeSessionId, sessionExercises, finishSession } =
        useWorkoutSessionStore();

    const finishWorkout = () => {
        const confirmacao = confirm(
            "Desejas finalizar o treino e gravar os resultados?",
        );
        if (!confirmacao) return;

        router.post(
            `/workouts/finish/${activeSessionId}`,
            { exercises: sessionExercises },
            {
                onSuccess: () => {
                    finishSession();
                    console.log("Treino gravado com sucesso!");
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
            {/* PAINEL DE ESTADO (Mantemos o Glass custom aqui por ser um painel, não um botão) */}
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
            <div className="grid grid-cols-1 gap-4">
                {/* BOTÃO PARA VOLTAR AO TREINO */}
                <GlassBtn
                    href={`/workouts/${activeSessionId}/workoutSession`}
                    variant="blue"
                    className="w-full py-6 text-sm"
                >
                    Continue Workout →
                </GlassBtn>

                {/* BOTÃO PARA FINALIZAR (RED) */}
                <GlassBtn
                    onClick={finishWorkout}
                    variant="red"
                    className="w-full py-5 flex flex-col gap-1"
                >
                    <span>— Finish Workout —</span>
                    <span className="opacity-50 text-[7px] tracking-widest normal-case font-bold">
                        (End current session)
                    </span>
                </GlassBtn>
            </div>
        </div>
    );
};

export default ActiveSession;
