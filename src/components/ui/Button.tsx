"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit";
    disabled?: boolean;
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    href,
    onClick,
    className = "",
    type = "button",
    disabled = false,
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center gap-4 font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "btn-primary",
        secondary:
            "bg-[var(--color-background-secondary)] text-[var(--color-foreground)] hover:bg-[var(--color-background-tertiary)] border border-[var(--glass-border)] rounded-full",
        ghost:
            "bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-background-secondary)] rounded-full",
    };

    const sizes = {
        sm: "text-sm py-1 px-4",
        md: "text-base",
        lg: "text-lg",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    const content = (
        <>
            {variant === "primary" && (
                <span className="btn-icon-circle flex items-center justify-center">
                    <ArrowRight size={20} strokeWidth={2} />
                </span>
            )}
            <span>{children}</span>
        </>
    );

    if (href) {
        return (
            <motion.a
                href={href}
                className={combinedClassName}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedClassName}
            whileHover={{ scale: disabled ? 1 : 1.03 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
        >
            {content}
        </motion.button>
    );
}
