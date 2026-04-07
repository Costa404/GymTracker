import { Link } from "@inertiajs/react";

interface Props {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    variant?: "blue" | "zinc" | "green";
}

const GlassBtn = ({
    href,
    onClick,
    children,
    className = "",
    variant = "blue",
}: Props) => {
    // Base do estilo Glass
    const baseStyle =
        "inline-flex items-center justify-center px-4 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 font-black uppercase text-[10px]  tracking-widest active:scale-95";

    // Cores específicas
    const variants = {
        blue: "bg-blue-600/20 text-white-500 border-blue-500/30 hover:bg-blue-600/30 shadow-[0_0_15px_rgba(37,99,235,0.1)]",
        zinc: "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:bg-zinc-800/80",

        // OPÇÃO 1: Ghost (Apenas borda e texto)
        ghost: "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300",
        red: "bg-red-600/10 text-red-500 border-red-500/30 hover:bg-red-600/20 shadow-xl shadow-red-500/5",
        // OPÇÃO 2: Slate (Azul Tech Profundo)
        slate: "bg-slate-800/20 text-slate-400 border-slate-700/50 hover:bg-slate-800/40 hover:text-slate-300",

        // OPÇÃO 3: Glass White (Vidro Fosco claro)
        white: "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white/90",
    };

    const combinedStyle = `${baseStyle} ${variants[variant]} ${className}`;

    // Se tiver href, renderiza um Link do Inertia, se não, renderiza um botão normal
    if (href) {
        return (
            <Link href={href} className={combinedStyle}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={combinedStyle}>
            {children}
        </button>
    );
};

export default GlassBtn;
