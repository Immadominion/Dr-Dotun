"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Section } from "../ui/Container";
import { SectionHeading } from "../ui/Typography";
import { Play } from "lucide-react";

const YOUTUBE_VIDEO_ID = "seo9YccDDGw";

export function FeaturedTalk() {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <Section id="talks">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <SectionHeading>Featured Talk</SectionHeading>
                </motion.div>

                {/* Video Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative aspect-video rounded-[var(--radius-2xl)] overflow-hidden bg-[#0a0a0a]"
                >
                    {!isPlaying ? (
                        <>
                            {/* Video Thumbnail */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url(https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg)`,
                                }}
                            />
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/40" />

                            {/* Play Button */}
                            <button
                                onClick={handlePlay}
                                className="absolute inset-0 flex items-center justify-center group"
                                aria-label="Play video"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full glass-heavy flex items-center justify-center shadow-2xl"
                                >
                                    <Play
                                        size={32}
                                        className="text-white ml-1 group-hover:scale-110 transition-transform"
                                        fill="white"
                                    />
                                </motion.div>
                            </button>
                        </>
                    ) : (
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                            title="Featured Talk - Dr Dotun"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                    )}
                </motion.div>
            </Container>
        </Section>
    );
}
