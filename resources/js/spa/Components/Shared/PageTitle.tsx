import React from "react";

interface PageTitleProps {
    children: React.ReactNode;
    className?: string;
    // Permite mudar a cor se houver uma exceção real
    variant?: "system" | "white" | "performance";
}

const PageTitle = ({
    children,
    className = "",
    variant = "system",
}: PageTitleProps) => {
    const variantStyles = {
        system: "text-system-light",
        white: "text-white",
        performance: "text-performance-light",
    };

    return (
        <h1
            className={`
            ${variantStyles[variant]}
            font-black
            uppercase
            italic
            tracking-tighter
            text-2xl
            leading-none
            ${className}
        `}
        >
            {children}
        </h1>
    );
};

export default PageTitle;
