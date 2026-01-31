"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container, Section } from "../ui/Container";
type Episode = {
    id: string;
    guest: string;
    role: string;
    image: string;
    url: string;
};

const fallbackEpisodes: Episode[] = [
    {
        id: "1",
        guest: "DEEPANKAR RUSTAGI",
        role: "CEO, OmniRetail",
        image: "/assets/svg/latest-episodes-spotify-4.svg",
        url: "https://open.spotify.com/show/5Hybu09bbEWOoU3xxJZ3Gg",
    },
    {
        id: "2",
        guest: "DARE OKOUDJOU",
        role: "Founder & CEO, Onafriq",
        image: "/assets/svg/latest-episodes-spotify-2.svg",
        url: "https://open.spotify.com/show/5Hybu09bbEWOoU3xxJZ3Gg",
    },
    {
        id: "3",
        guest: "UKA EJE",
        role: "Founder/CEO ThriveAgric",
        image: "/assets/svg/latest-episodes-spotify-3.svg",
        url: "https://open.spotify.com/show/5Hybu09bbEWOoU3xxJZ3Gg",
    },
];

export function LatestPodcasts() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [episodes, setEpisodes] = useState<Episode[]>(fallbackEpisodes);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPodcasts = async () => {
            try {
                const res = await fetch("/api/podcasts");
                if (!res.ok) throw new Error("Failed to load podcasts");
                const data = await res.json();
                setEpisodes(Array.isArray(data?.items) ? data.items : fallbackEpisodes);
            } catch (err) {
                setError((err as Error).message);
                setEpisodes(fallbackEpisodes);
            } finally {
                setLoading(false);
            }
        };

        loadPodcasts();
    }, []);

    return (
        <Section id="podcast" className="overflow-visible py-32 md:py-40 lg:py-48">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-normal"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Latest Podcast Episodes
                    </h2>
                    <p className="sr-only" aria-live="polite">
                        {loading ? "Loading episodes" : error ? "Showing latest saved episodes" : "Latest episodes loaded"}
                    </p>
                </motion.div>
            </Container>

            {/* Horizontal Scroll Container */}
            <div className="relative overflow-y-visible">
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto overflow-y-visible -mt-36 pt-40 pb-4 pl-[var(--section-padding-x)] pr-[calc(var(--section-padding-x)+16px)] scrollbar-hide snap-x snap-mandatory"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        scrollPaddingLeft: "var(--section-padding-x)",
                        scrollPaddingRight: "calc(var(--section-padding-x) + 16px)",
                    }}
                >
                    {episodes.map((episode, idx) => (
                        <motion.div
                            key={episode.id}
                            initial={{ opacity: 0, y: 150, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 10,
                                delay: idx * 0.18,
                            }}
                            className="flex-shrink-0 w-[315px] md:w-[415px] lg:w-[530px] snap-start"
                        >
                            <a
                                href={episode.url}
                                className="group block podcast-card relative bg-[#00A3FF] cursor-pointer rounded-[var(--radius-xl)] lg:rounded-[56px] overflow-hidden aspect-[5/4.85]"
                            >
                                {/* Inset shadow overlay - sits above image for depth effect */}
                                <div
                                    className="absolute inset-0 z-10 pointer-events-none rounded-[inherit]"
                                    style={{
                                        boxShadow: 'inset 0px 8px 16px 0px hsla(0, 0%, 0%, 0.35), inset 0px -8px 16px 0px hsla(0, 0%, 0%, 0.35), inset 0px 0px 40px 0px hsla(0, 0%, 0%, 0.1)',
                                    }}
                                />
                                {/* Episode Image */}
                                <Image
                                    src={episode.image}
                                    alt={episode.guest}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Guest info overlay - visible on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-primary)] via-[var(--color-accent-primary)]/80 to-[var(--color-accent-primary)]/40 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    {/* Episode info row - name and icons on same line with ellipsis */}
                                    <div className="flex items-center gap-3 w-full">
                                        <h3 className="flex-1 text-[24px] md:text-[28px] lg:text-[32px] leading-tight tracking-[-0.05em] font-normal text-white truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                            #{idx + 1}: {episode.guest} - On {episode.role}
                                        </h3>

                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            {/* Spotify Icon */}
                                            <div className="w-[47px] h-[25px] bg-black/20 rounded flex items-center justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.26.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.019.6-1.141 4.38-1.379 9.9-.719 13.74 1.621.418.24.539.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 14.881 1.02.54.36.66 1.02.36 1.56-.24.42-.899.539-1.441.24z" />
                                                </svg>
                                            </div>
                                            {/* Apple Music Icon */}
                                            <div className="w-[47px] h-[25px] bg-black/20 rounded flex items-center justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 17.455c-3.007 0-5.455-2.448-5.455-5.455S8.993 6.545 12 6.545 17.455 8.993 17.455 12s-2.448 5.455-5.455 5.455zm2.97-8.086l-4.14 2.385v-4.77l4.14 2.385z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Scroll fade indicators */}
            </div>

            {/* Check out more link */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-center gap-6 mt-12"
            >
                <span
                    className="text-[16px] text-[var(--color-foreground)]"
                    style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 400,
                        lineHeight: '100%',
                        letterSpacing: '-0.05em',
                    }}
                >
                    Check out More
                </span>
                <svg
                    width="21"
                    height="11"
                    viewBox="0 0 21 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[var(--color-foreground)]"
                >
                    <path d="M0.666748 5.33337H20.0001" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.3333 10L19.9999 5.33333L15.3333 0.666665" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a
                    href="https://open.spotify.com/show/5Hybu09bbEWOoU3xxJZ3Gg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] text-[var(--color-foreground)] underline hover:opacity-70 transition-opacity"
                    style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 400,
                        lineHeight: '100%',
                        letterSpacing: '-0.05em',
                        textDecorationLine: 'underline',
                        textUnderlineOffset: '2px',
                    }}
                >
                    Listen on Spotify
                </a>
            </motion.div>
        </Section>
    );
}
