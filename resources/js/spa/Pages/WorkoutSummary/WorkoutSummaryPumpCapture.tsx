import { LuCamera } from "react-icons/lu";

interface Props {
    photo: string | null;
    setPhoto: (photoUrl: string) => void;
}

const WorkoutSummaryPumpCapture = ({ photo, setPhoto }: Props) => {
    return (
        <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[.3em] text-zinc-600 ml-1">
                Progress Visual
            </h3>
            <label className="relative flex flex-col items-center justify-center w-full aspect-video rounded-[2rem] border-2 border-dashed border-white/10 bg-white/[0.02] overflow-hidden active:scale-[0.98] transition-transform cursor-pointer">
                {photo ? (
                    <img
                        src={photo}
                        className="w-full h-full object-cover opacity-80"
                        alt="Pump"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <LuCamera size={20} className="text-zinc-500" />
                        </div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">
                            Capture Pump
                        </span>
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => {
                        // Lógica de foto: ex: setPhoto(URL.createObjectURL(e.target.files[0]));
                    }}
                />
            </label>
        </section>
    );
};

export default WorkoutSummaryPumpCapture;
