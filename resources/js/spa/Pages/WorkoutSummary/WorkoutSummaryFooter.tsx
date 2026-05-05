import GlassBtn from "@/spa/Components/Shared/GlassBtn";
import { LuCheck } from "react-icons/lu";

interface Props {
    onComplete: () => void;
}

const WorkoutSummaryFooter = ({ onComplete }: Props) => {
    return (
        <footer className="mt-8 pt-4 pb-2">
            <GlassBtn
                variant="performance"
                className="w-full py-6 flex items-center justify-center gap-3 rounded-2xl border border-performance/40 bg-performance/10 text-performance font-black uppercase tracking-widest italic text-[11px]"
                onClick={onComplete}
            >
                <LuCheck size={18} />
                Complete Mission
            </GlassBtn>
        </footer>
    );
};

export default WorkoutSummaryFooter;
