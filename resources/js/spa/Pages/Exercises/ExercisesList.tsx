import { LuTrash2, LuActivity } from "react-icons/lu";
import { Link } from "react-router-dom";

interface ExercisesDisplayProps {
    exercise: {
        id: number;
        name: string;
        muscle_group?: string;
    };
    onDelete: (id: number) => void;
}

const ExercisesDisplay = ({ exercise, onDelete }: ExercisesDisplayProps) => {
    return (
        <div className="group relative  border border-system/20 rounded-2xl flex justify-between items-center p-4 transition-all duration-300">
            {/* INFO: Border lateral discreta para indicar 'Informação' */}
            <div className="flex-1 min-w-0  pl-3 active:scale-[0.98] active:border-system/50 transition-colors">
                <h3
                    className="text-zinc-200 font-bold  text-base tracking-tight
              transition-colors truncate"
                >
                    {exercise.name}
                </h3>
                {exercise.muscle_group && (
                    <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-[0.2em] mt-0.5">
                        {exercise.muscle_group}
                    </p>
                )}
            </div>

            {/* AÇÕES */}
            <div className="flex items-center gap-3 ml-4">
                {/* INFO/HISTÓRICO: Border azul/cyan (Lógica de Dados/Info) */}
                <Link
                    to={`/exercises/${exercise.id}/history`}
                    className="p-2.5 rounded-xl bg-sky-500/5 border border-sky-500/20 text-sky-500/50 active:text-sky-400 active:border-sky-400/50 active:bg-sky-500/10 transition-all active:scale-90"
                >
                    <LuActivity size={18} />
                </Link>
                {/* DESTRUTIVO: Border vermelha (Lógica de Alerta/Ação Crítica) */}
                <button
                    onClick={() => onDelete(exercise.id)}
                    className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/20 text-red-500/40 active:text-red-500 active:border-red-500/50 active:bg-red-500/15 transition-all active:scale-90"
                >
                    <LuTrash2 size={18} />
                </button>
            </div>
        </div>
    );
};

export default ExercisesDisplay;
