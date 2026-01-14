"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    delay?: number;
}

export function Card({
    children,
    className = "",
    hover = true,
    delay = 0,
}: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={
                hover
                    ? {
                        scale: 1.02,
                        transition: { duration: 0.2 },
                    }
                    : undefined
            }
            className={`squircle p-6 ${className}`}
        >
            {children}
        </motion.div>
    );
}

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function GlassCard({
    children,
    className = "",
    hover = true,
}: GlassCardProps) {
    return (
        <motion.div
            whileHover={
                hover
                    ? {
                        scale: 1.02,
                        transition: { duration: 0.2 },
                    }
                    : undefined
            }
            className={`glass rounded-[var(--radius-xl)] p-6 ${className}`}
        >
            {children}
        </motion.div>
    );
}
