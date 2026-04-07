import GlassBtn from "@/Components/Shared/GlassBtn";
import { Head } from "@inertiajs/react";

const Dashboard = () => {
    return (
        <>
            <Head title="Command Center" />
            <div className="relative w-full px-8 space-y-4 max-w-md mx-auto pt-14">
                {/* BOTÃO PRINCIPAL: Azul e Grande */}
                <GlassBtn
                    href="/workouts/setup"
                    variant="blue"
                    className="w-full py-8 rounded-3xl text-lg shadow-[0_10px_30px_rgba(37,99,235,0.2)]"
                >
                    Start Workout
                </GlassBtn>

                {/* BOTÃO SECUNDÁRIO: Zinc (Cinzento Glass) */}
                <GlassBtn
                    href="/workouts/history"
                    variant="zinc"
                    className="w-full py-5 rounded-2xl"
                >
                    Past Workouts
                </GlassBtn>
            </div>
        </>
    );
};

export default Dashboard;
