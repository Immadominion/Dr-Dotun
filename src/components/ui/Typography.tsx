interface SectionHeadingProps {
    children: React.ReactNode;
    className?: string;
    as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
    children,
    className = "",
    as: Tag = "h2",
}: SectionHeadingProps) {
    return (
        <Tag
            className={`heading-section text-[var(--color-foreground)] ${className}`}
            style={{ fontFamily: "var(--font-serif)" }}
        >
            {children}
        </Tag>
    );
}

interface SectionSubheadingProps {
    children: React.ReactNode;
    className?: string;
}

export function SectionSubheading({
    children,
    className = "",
}: SectionSubheadingProps) {
    return (
        <p className={`text-body max-w-2xl ${className}`}>
            {children}
        </p>
    );
}
