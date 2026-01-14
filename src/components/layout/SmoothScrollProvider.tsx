"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.6, // Slower, more premium feel
            easing: (t) => {
                // Custom easing for silky smooth scrolling
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            },
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 1.5,
            wheelMultiplier: 0.8, // Slower wheel for more control
            infinite: false,
        });

        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Expose lenis to window for external control if needed
        if (typeof window !== 'undefined') {
            (window as Window & { lenis?: Lenis }).lenis = lenisRef.current;
        }

        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    return <>{children}</>;
}
