import { Link } from "@inertiajs/react";

interface Props {
    href?: string;
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
        | "white";
    preserveState?: boolean;
    preserveScroll?: boolean;
    type?: "button" | "submit" | "reset"; // ← adiciona isto
    disabled?: boolean; // ← e isto
}
const GlassBtn = ({
    href,
    onClick,
    children,
    className = "",
    variant = "blue",
    preserveState = true,
    preserveScroll = true,
    type = "button", // ← default continua "button"
    disabled,
}: Props) => {
    // Base do estilo Glass - Adicionado focus e active para mobile
    const baseStyle =
        "inline-flex items-center justify-center px-4 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 font-black uppercase text-[10px] tracking-widest active:scale-95 touch-none select-none";

    // O teu dicionário de cores completo
    const variants = {
        blue: "bg-blue-600/20 text-white border-blue-500/30 hover:bg-blue-600/30 shadow-[0_0_15px_rgba(37,99,235,0.1)]",
        zinc: "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:bg-zinc-800/80",
        ghost: "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300",
        red: "bg-red-600/10 text-red-500 border-red-500/30 hover:bg-red-600/20 shadow-xl shadow-red-500/5",
        slate: "bg-slate-800/20 text-slate-400 border-slate-700/50 hover:bg-slate-800/40 hover:text-slate-300",
        white: "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white/90",
        green: "bg-emerald-600/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-600/20 shadow-xl shadow-emerald-500/5",
        fuchsia:
            "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30 hover:bg-fuchsia-500/20 shadow-[0_0_20px_rgba(217,70,239,0.15)]",
        lime: "bg-lime-400/10 text-lime-400 border-lime-400/30 hover:bg-lime-400/20 shadow-[0_0_15px_rgba(163,230,53,0.1)]",
        cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/40 hover:bg-cyan-500/20 hover:text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]",
    };

    const combinedStyle = `${baseStyle} ${variants[variant]} ${className}`;

    // Renderização condicional (Link vs Button)
    if (href) {
        return (
            <Link
                href={href}
                className={combinedStyle}
                preserveState={preserveState}
                preserveScroll={preserveScroll}
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
