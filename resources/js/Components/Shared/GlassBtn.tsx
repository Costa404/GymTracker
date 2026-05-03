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
    to,
    onClick,
    children,
    className = "",
    variant = "blue",
    type = "button",
    disabled,
}: Props) => {
    // 1. Removemos o duration-300 (muito lento para touch)
    // 2. O active:scale-95 é o que realmente importa aqui
    const baseStyle =
        "inline-flex items-center justify-center px-4 py-2 rounded-xl border backdrop-blur-md transition-all duration-75 font-black uppercase text-[10px] tracking-widest active:scale-95 touch-none select-none disabled:opacity-30 disabled:pointer-events-none";

    const variants = {
        // Removemos todas as classes 'hover:'
        performance:
            "bg-performance/10 text-performance-light border-performance/20 active:bg-performance/30",
        system: "bg-system/10 text-system-light border-system/20 active:bg-system/30",
        blue: "bg-blue-600/20 text-white border-blue-500/30 active:bg-blue-600/40",
        zinc: "bg-zinc-900/50 text-zinc-400 border-zinc-800 active:bg-zinc-800",
        ghost: "bg-transparent text-zinc-500 border-zinc-800 active:border-zinc-600 active:text-zinc-300",
        red: "bg-red-600/10 text-red-500 border-red-500/30 active:bg-red-600/20",
        slate: "bg-slate-800/20 text-slate-400 border-slate-700/50 active:bg-slate-800/40",
        white: "bg-white/5 text-white/60 border-white/10 active:bg-white/20 active:text-white",
        green: "bg-emerald-600/10 text-emerald-400 border-emerald-500/30 active:bg-emerald-600/20",
        fuchsia:
            "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30 active:bg-fuchsia-500/20",
        lime: "bg-lime-400/10 text-lime-400 border-lime-400/30 active:bg-lime-400/20",
        cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/40 active:bg-cyan-500/30",
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
