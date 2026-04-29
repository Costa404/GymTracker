import { Link } from "react-router-dom";

interface Props {
    to?: string; // MUDOU AQUI: Passa a aceitar 'to' em vez de 'href'
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    variant?:
        | "blue"
        | "zinc"
        | "green"
        | "fuchsia"
        | "lime"
        | "cyan"
        | "red"
        | "ghost"
        | "slate"
        | "white"
        | "performance"
        | "system";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

const GlassBtn = ({
    to, // MUDOU AQUI
    onClick,
    children,
    className = "",
    variant = "blue",
    type = "button",
    disabled,
}: Props) => {
    // CSS ORIGINAL SEM MEXER EM NADA
    const baseStyle =
        "inline-flex items-center justify-center px-4 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 font-black uppercase text-[10px] tracking-widest active:scale-95 touch-none select-none disabled:opacity-30 disabled:pointer-events-none";

    const variants = {
        performance:
            "bg-performance/10 text-performance-light border-performance/20 hover:bg-performance/20 shadow-[0_0_15px_rgba(var(--performance-rgb),0.1)]",
        system: "bg-system/10 text-system-light border-system/20 hover:bg-system/25 shadow-[0_0_15px_rgba(var(--color-system-rgb),0.1)]",
        blue: "bg-blue-600/20 text-white border-blue-500/30 hover:bg-blue-600/30 shadow-[0_0_15px_rgba(37,99,235,0.1)]",
        zinc: "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:bg-zinc-800/80",
        ghost: "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300",
        red: "bg-red-600/10 text-red-500 border-red-500/30 hover:bg-red-600/20 shadow-xl shadow-red-500/5",
        slate: "bg-slate-800/20 text-slate-400 border-slate-700/50 hover:bg-slate-800/40 hover:text-slate-300",
        white: "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white/90",
        green: "bg-emerald-600/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-600/20",
        fuchsia:
            "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30 hover:bg-fuchsia-500/20 shadow-[0_0_20px_rgba(217,70,239,0.15)]",
        lime: "bg-lime-400/10 text-lime-400 border-lime-400/30 hover:bg-lime-400/20 shadow-[0_0_15px_rgba(163,230,53,0.1)]",
        cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/20 hover:text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    };

    const combinedStyle = `${baseStyle} ${variants[variant]} ${className}`;

    if (to) {
        // MUDOU AQUI
        return (
            <Link
                to={to} // AGORA PASSA O 'to' DIRETAMENTE
                className={combinedStyle}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={combinedStyle}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default GlassBtn;
