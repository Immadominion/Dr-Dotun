import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    size?: "default" | "narrow" | "wide";
}

export function Container({
    children,
    className = "",
    size = "default",
}: ContainerProps) {
    const sizes = {
        narrow: "max-w-4xl",
        default: "max-w-6xl",
        wide: "max-w-7xl",
    };

    return (
        <div className={`container-main ${sizes[size]} ${className}`}>
            {children}
        </div>
    );
}

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export function Section({ children, className = "", id }: SectionProps) {
    return (
        <section
            id={id}
            className={`relative py-[var(--section-padding-y)] ${className}`}
        >
            {children}
        </section>
    );
}
