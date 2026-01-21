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
        <Section id="podcast" className="overflow-hidden py-32 md:py-40 lg:py-48">
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
                    className="flex gap-6 overflow-x-auto py-4 pr-[var(--section-padding-x)] scrollbar-hide snap-x snap-mandatory"
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
                            viewport={{ once: true, margin: "-500px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex-shrink-0 w-[315px] md:w-[415px] lg:w-[530px] snap-start"
                        >
                            <a
                                href={episode.spotifyUrl}
                                className="group block podcast-card relative bg-[#00A3FF] cursor-pointer rounded-[var(--radius-xl)] lg:rounded-[56px] overflow-hidden aspect-[5/4.85]"
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
                        className="flex-shrink-0 w-[315px] md:w-[415px] lg:w-[530px] snap-start"
                    >
                        <a
                            href="https://youtube.com/@dotunolowoporoku7147"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            {/* Glassmorphism Card */}
                            <div className="glass-card-container relative rounded-[var(--radius-xl)] lg:rounded-[56px] overflow-hidden aspect-[5/4.45] flex items-center justify-center">
                                {/* Centered Circle Button - Liquid Glass */}
                                <div className="glass-circle-button w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-800 dark:text-neutral-200">
                                        <path d="M7 17L17 7" />
                                        <path d="M7 7h10v10" />
                                    </svg>
                                </div>
                            </div>

                            {/* Text and Icons below card */}
                            <div className="flex items-center justify-between mt-4 px-1">
                                <h3 className="text-xl md:text-2xl font-medium text-[var(--color-foreground)]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                    See more
                                </h3>
                                <div className="flex items-center gap-2">
                                    {/* Spotify Icon */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-foreground)]">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.26.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.019.6-1.141 4.38-1.379 9.9-.719 13.74 1.621.418.24.539.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.4-1.02 14.881 1.02.54.36.66 1.02.36 1.56-.24.42-.899.539-1.441.24z" />
                                    </svg>
                                    {/* Apple Music Icon */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--color-foreground)]">
                                        <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.6-1.965-1.483-.18-.965.39-1.927 1.343-2.236.263-.085.532-.143.802-.2.545-.115 1.093-.22 1.636-.346.3-.07.46-.3.51-.602.014-.086.02-.173.02-.26V8.43c0-.25-.09-.4-.33-.472l-.023-.005-4.57 1.073c-.066.016-.1.04-.1.12v7.328c0 .386-.043.768-.2 1.125-.292.66-.796 1.087-1.483 1.286-.37.108-.75.166-1.136.18-.852.03-1.65-.517-1.878-1.27-.34-1.13.24-2.26 1.35-2.6.376-.117.766-.18 1.15-.27.39-.09.78-.18 1.16-.29.27-.078.41-.28.46-.55.02-.1.02-.2.02-.31V6.35c0-.28.07-.5.32-.63.1-.05.21-.08.32-.1l5.323-1.267c.187-.043.378-.076.57-.082.25-.01.43.14.48.39.02.1.02.2.02.31z" />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    </motion.div>
                </div>

                {/* Scroll fade indicators */}
            </div>

            {/* Scroll Down indicator - bottom left, desktop only */}
            <div className="max-w-[1440px] mx-auto relative">
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
                        left: '100px',
                        bottom: '-75px',
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
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-foreground)] rotate-90">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </motion.div>
                </motion.button>
            </div>
        </Section>
    );
}
