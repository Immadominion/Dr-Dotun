"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container, Section } from "../ui/Container";
import { Mic } from "lucide-react";

const podcastEpisodes = [
    {
        id: 1,
        guest: "DEEPANKAR RUSTAGI",
        role: "CEO, OmniRetail",
        image: "/assets/svg/latest-episodes-spotify-4.svg",
        spotifyUrl: "#",
    },
    {
        id: 2,
        guest: "DARE OKOUDJOU",
        role: "Founder & CEO, Onafriq",
        image: "/assets/svg/latest-episodes-spotify-2.svg",
        spotifyUrl: "#",
    },
    {
        id: 3,
        guest: "UKA EJE",
        role: "Founder/CEO ThriveAgric",
        image: "/assets/svg/latest-episodes-spotify-3.svg",
        spotifyUrl: "#",
    },
    {
        id: 4,
        guest: "DEEPANKAR RUSTAGI",
        role: "CEO, OmniRetail",
        image: "/assets/svg/latest-episodes-spotify-4.svg",
        spotifyUrl: "#",
    },
    {
        id: 5,
        guest: "INDUSTRY EXPERT",
        role: "Venture Partner",
        image: "/assets/svg/latest-episodes-spotify-5.svg",
        spotifyUrl: "#",
    },
];

export function LatestPodcasts() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <Section id="podcast" className="overflow-hidden py-24 md:py-32">
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
                </motion.div>
            </Container>

            {/* Horizontal Scroll Container */}
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 px-[var(--section-padding-x)] scrollbar-hide snap-x snap-mandatory"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {podcastEpisodes.map((episode, idx) => (
                        <motion.div
                            key={episode.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex-shrink-0 w-[340px] md:w-[400px] lg:w-[440px] snap-start"
                        >
                            <a
                                href={episode.spotifyUrl}
                                className="group block podcast-card aspect-[3/4] relative bg-[#00A3FF] cursor-pointer rounded-[var(--radius-xl)] overflow-hidden"
                            >
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
                                            #{episode.id}: {episode.guest} - On {episode.role}
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

                    {/* See More Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: podcastEpisodes.length * 0.1 }}
                        className="flex-shrink-0 w-[340px] md:w-[400px] lg:w-[440px] snap-start"
                    >
                        <a
                            href="https://youtube.com/@dotunolowoporoku7147"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block aspect-[3/4] relative bg-[var(--color-background-secondary)] cursor-pointer rounded-[var(--radius-xl)] overflow-hidden border-2 border-dashed border-[var(--color-foreground-muted)] hover:border-[var(--color-foreground)] transition-all duration-300"
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-[var(--color-foreground-muted)] group-hover:text-[var(--color-foreground)] transition-colors">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                                <h3 className="text-2xl md:text-3xl font-normal text-[var(--color-foreground)] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    See More Episodes
                                </h3>
                                <p className="text-sm text-[var(--color-foreground-secondary)]" style={{ fontFamily: 'var(--font-sans)' }}>
                                    Watch all episodes on YouTube
                                </p>
                            </div>
                        </a>
                    </motion.div>
                </div>

                {/* Scroll fade indicators */}
            </div>

            {/* Scroll Down indicator - bottom left, desktop only */}
            <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                onClick={() => {
                    const essaysSection = document.getElementById('essays');
                    essaysSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="absolute hidden lg:flex items-center gap-2 z-40 cursor-pointer bg-transparent border-none"
                style={{
                    left: '192px',
                    bottom: '50px',
                }}
            >
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut"
                    }}
                    className="flex items-center gap-2"
                >
                    <span className="text-sm font-medium text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-sans)' }}>Scroll Down</span>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" className="text-[var(--color-foreground)]">
                        <path d="M6 0v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M1 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </motion.button>
        </Section>
    );
}
