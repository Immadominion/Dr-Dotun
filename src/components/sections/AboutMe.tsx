"use client";

import { motion } from "framer-motion";
import { Container, Section } from "../ui/Container";

export function AboutMe() {
    return (
        <div id="about" className="relative overflow-visible pt-8 pb-12 md:py-16 lg:py-0 lg:h-[1024px] max-w-[1440px] mx-auto snap-section">
            {/* Background overlay - theme-aware with soft top edge */}
            <div
                className="absolute pointer-events-none z-20 about-overlay"
                style={{
                    width: '100vw',
                    height: 'calc(100% + 500px)',
                    top: '-500px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            />

            {/* Content container - flexbox for proper positioning */}
            <div className="relative z-30 h-full flex flex-col justify-center lg:justify-end lg:pb-[227px]">
                {/* All text content - centered */}
                <div
                    className="mx-auto text-center px-6 lg:px-0"
                    style={{
                        maxWidth: '1024px',
                        width: '100%',
                    }}
                >
                    {/* Section Title - responsive sizing */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl lg:text-[64px]"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 400,
                            lineHeight: '100%',
                            letterSpacing: '-0.05em',
                            textAlign: 'center',
                            marginBottom: '24px'
                        }}
                    >
                        About Me
                    </motion.h2>

                    {/* Introduction paragraph - responsive sizing */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-base md:text-xl lg:text-2xl"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 400,
                            lineHeight: '140%',
                            letterSpacing: '-0.05em',
                            textAlign: 'center',
                            color: 'var(--color-foreground)',
                            marginBottom: '24px'
                        }}
                    >
                        I back founders building Africa&apos;s future and share lessons from the journey. Explore my writing, podcast conversations, and work across venture, startups, and impact.
                    </motion.p>

                    {/* Main bio paragraph - responsive sizing */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-xl lg:text-2xl"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 400,
                            lineHeight: '140%',
                            letterSpacing: '-0.05em',
                            textAlign: 'center',
                            color: 'var(--color-foreground)',
                            marginBottom: '24px'
                        }}
                    >
                        I&apos;m a Nigerian-born venture capitalist, entrepreneur, and former operator whose career spans academia, high-growth startups, and institutional investing. Currently Managing Partner at Ventures Platform, he hosts Building the Future, a podcast exploring innovation, leadership, and market creation in Africa.
                    </motion.p>

                    {/* Closing statement - responsive sizing */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-base md:text-xl lg:text-2xl"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 400,
                            lineHeight: '140%',
                            letterSpacing: '-0.05em',
                            textAlign: 'center',
                            color: 'var(--color-foreground)'
                        }}
                    >
                        From academic research to entrepreneurship to institutional investing — a career built on curiosity, conviction, and a commitment to expanding prosperity in Africa.
                    </motion.p>
                </div>
            </div>

            {/* Scroll Down indicator - desktop only, positioned relative to section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute hidden lg:flex items-center gap-2 z-30"
                style={{
                    left: '192px',
                    bottom: '97px',
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
                    <span className="text-sm font-medium text-[var(--color-foreground)]">Scroll Down</span>
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="text-[var(--color-foreground)]">
                        <path d="M8 0v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M2 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
}
