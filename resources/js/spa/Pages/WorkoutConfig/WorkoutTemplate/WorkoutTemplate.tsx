import { LuTrash2 } from "react-icons/lu";
import GlassBtn from "@/Components/Shared/GlassBtn";
import PageTitle from "@/Components/Shared/PageTitle";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/spa/db";

const WorkoutTemplate = () => {
    const templates =
        useLiveQuery(() => db.table("workout_templates").toArray()) || [];

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this template?")) return;
        try {
            await db.table("workout_templates").delete(id);
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="w-full font-sans">
            <header className="mb-6">
                <PageTitle>Templates</PageTitle>
                <p className="text-[10px] font-black uppercase text-zinc-600 tracking-[0.2em] italic mt-1">
                    Manage your workout routines
                </p>
            </header>

            <div className="mb-8">
                <GlassBtn
                    to="/workout/config/templates/create"
                    variant="performance"
                    className="w-full py-6 rounded-2xl border-dashed border-performance/30 bg-performance/5"
                >
                    <span className="text-[11px] tracking-[0.5em] font-black uppercase italic text-performance">
                        New Template
                    </span>
                </GlassBtn>
            </div>

            {/* LISTAGEM CORRIGIDA AQUI */}
            <div
                className={`space-y-3 mb-6 transition-opacity duration-300 ${
                    templates.length > 0 ? "opacity-100" : "opacity-0"
                }`}
            >
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="bg-zinc-900/20 border border-white/5 p-4 rounded-2xl flex justify-between items-center"
                    >
                        <div className="flex-1 min-w-0 pr-4">
                            <h3 className="text-white font-black uppercase italic text-lg leading-tight tracking-tight truncate">
                                {template.name}
                            </h3>
                            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mt-0.5">
                                {template.exercises?.length || 0} Exercises
                            </p>
                        </div>
                        <GlassBtn
                            onClick={() => handleDelete(template.id!)}
                            variant="red"
                            className="p-3.5 rounded-xl shrink-0"
                        >
                            <LuTrash2 size={18} />
                        </GlassBtn>
                    </div>
                ))}
            </div>

            {templates.length === 0 && (
                <div className="py-12 text-center border border-dashed border-white/5 rounded-3xl opacity-30">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
                        No templates found
                    </p>
                </div>
            )}
        </div>
    );
};

export default WorkoutTemplate;
