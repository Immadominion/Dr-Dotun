"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatCounterProps {
    value: number | string;
    label: string;
    prefix?: string;
    suffix?: string;
    duration?: number;
    delay?: number;
}

export function StatCounter({
    value,
    label,
    prefix = "+",
    suffix = "",
    duration = 2,
    delay = 0,
}: StatCounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(0);

    const numericValue = typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) : value;
    const isKFormat = typeof value === "string" && value.toLowerCase().includes("k");

    useEffect(() => {
        if (!isInView) return;

        const startTime = performance.now();
        const animate = (currentTime: number) => {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setDisplayValue(Math.floor(easeOutQuart * numericValue));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const timeoutId = setTimeout(() => {
            requestAnimationFrame(animate);
        }, delay * 1000);

        return () => clearTimeout(timeoutId);
    }, [isInView, numericValue, duration, delay]);

    const formattedValue = isKFormat ? `${displayValue}k` : displayValue.toLocaleString();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
        >
            <div className="text-4xl md:text-5xl font-light tracking-tight mb-1">
                <span className="text-[var(--color-foreground-muted)]">{prefix}</span>
                <span className="font-medium">{formattedValue}</span>
                <span>{suffix}</span>
            </div>
            <div className="text-sm text-[var(--color-foreground-muted)] flex items-center justify-center gap-1.5">
                {label}
            </div>
        </motion.div>
    );
}
