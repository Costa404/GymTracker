import { Head, Link } from "@inertiajs/react";

const Dashboard = () => {
    return (
        <>
            <Head title="Command Center" />
            <div className="relative w-full px-8 space-y-4 max-w-md mx-auto pt-14">
                <Link
                    href="/workouts/setup"
                    className="block w-full bg-blue-600 active:scale-[0.98] text-white text-center text-lg font-black py-8 rounded-3xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all uppercase italic tracking-[0.2em] leading-none"
                >
                    Start Workout
                </Link>

                <Link
                    href="/workouts"
                    className="block w-full bg-zinc-900 border border-zinc-800 active:scale-[0.98] text-zinc-400 text-center text-xs font-black py-5 rounded-2xl transition-all uppercase italic tracking-[0.3em] leading-none hover:text-white hover:border-zinc-700"
                >
                    Past Workouts
                </Link>
            </div>
        </>
    );
};

export default Dashboard;
