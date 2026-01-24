"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
    const [mounted, setMounted] = useState(false);
    const [scrolledPastHero, setScrolledPastHero] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const heroRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            // Hide scroll indicator and Stay in Touch when user scrolls past hero
            setScrolledPastHero(window.scrollY > window.innerHeight * 0.6);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleStayInTouch = () => {
        if (isLoading) return;

        setIsLoading(true);

        // Animate for a moment then redirect
        setTimeout(() => {
            window.open('https://drdotun.substack.com/subscribe', '_blank');
            setIsLoading(false);
        }, 800);
    };

    return (
        <section ref={heroRef} className="relative h-[500px] md:h-[700px] lg:h-[1024px] max-w-[1440px] mx-auto snap-section overflow-visible">
            {/* Background */}
            <div className="absolute inset-0 bg-[var(--color-background)] pointer-events-none" />

            {/* Hero Title - Figma specs: 128px, positioned from top */}
            {/* Distance from top to title baseline area: allows for nav bar height (~68px) + spacing */}
            <div className="relative text-center" style={{ paddingTop: 'calc(68px + 80px)', zIndex: 30 }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="hero-title-figma text-[var(--color-foreground)] relative"
                    style={{ zIndex: 30 }}
                >
                    <span className="hero-title-hi">Hi I&apos;m </span>
                    <span className="hero-title-name">Dr Dotun</span>
                </motion.h1>
            </div>

            {/* Main Hero Content with Image */}
            <motion.div className="relative z-10 w-full">
                {/* Hero Image - 253.86px from top of screen, or 121.86px from bottom of header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex justify-center"
                >
                    {/* Container for image - based on 1440px reference width */}
                    <div className="relative w-full max-w-[1440px] mx-auto flex justify-center items-start">
                        {/* Left side text - 193px from left, 323px from top of header bar */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="absolute z-20 text-left hidden lg:block hover-text-left"
                            style={{
                                left: 'calc((100% - 1440px) / 2 + 200px)',
                                top: 'calc(323px - 185px)', // 323px from header bar top, adjusted for hero title offset
                            }}
                        >
                            <div className="hover-text-block cursor-default">
                                <p className="text-lg xl:text-xl leading-relaxed">
                                    <span className="witchcraft italic font-bold">Scientist</span>
                                    <span className="text-[var(--color-foreground)]"> at heart.</span>
                                </p>
                                <p className="text-lg xl:text-xl leading-relaxed">
                                    <span className="witchcraft italic font-bold">Entrepreneur</span>
                                    <span className="text-[var(--color-foreground)]"> by accident.</span>
                                </p>
                                <p className="text-lg xl:text-xl leading-relaxed">
                                    <span className="witchcraft italic font-bold">Investor</span>
                                    <span className="text-[var(--color-foreground)]"> by calling.</span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Mobile left text */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="absolute left-4 md:left-8 top-[180px] md:top-[220px] z-20 text-left lg:hidden"
                        >
                            <div className="hover-text-block cursor-default">
                                <p className="text-sm md:text-base leading-relaxed">
                                    <span className="witchcraft italic font-medium">Scientist</span>
                                    <span className="text-[var(--color-foreground)]"> at heart.</span>
                                </p>
                                <p className="text-sm md:text-base leading-relaxed">
                                    <span className="witchcraft italic font-medium">Entrepreneur</span>
                                    <span className="text-[var(--color-foreground)]"> by accident.</span>
                                </p>
                                <p className="text-sm md:text-base leading-relaxed">
                                    <span className="witchcraft italic font-medium">Investor</span>
                                    <span className="text-[var(--color-foreground)]"> by calling.</span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Right side quote - 942px from left (on 1440 screen), 408px from bottom of header */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="absolute z-20 text-left max-w-[280px] hidden lg:block hover-text-left"
                            style={{
                                left: 'calc((100% - 1440px) / 2 + 942px)',
                                top: 'calc(408px - 180px)', // 408px from header bar, adjusted
                            }}
                        >
                            <div className="hover-text-block cursor-default">
                                <p className="text-lg xl:text-xl font-medium leading-snug" style={{ fontFamily: "var(--font-sans)" }}>
                                    &quot;Faithful in little, faithful in much&quot; <span className="witchcraft">Luke 16:10</span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Mobile right text */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="absolute right-4 md:right-8 top-[260px] md:top-[300px] z-20 text-right max-w-[180px] md:max-w-[220px] lg:hidden"
                        >
                            <div className="hover-text-block cursor-default">
                                <p className="text-sm md:text-base font-medium leading-snug" style={{ fontFamily: "var(--font-sans)" }}>
                                    &quot;Faithful in little, faithful in much&quot; <span className="witchcraft">Luke 16:10</span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Main Image - responsive sizing and positioning */}
                        {/* Mobile: positioned lower, Tablet: centered, Desktop: exact Figma specs */}
                        <div
                            className="hero-main-image absolute w-[280px] h-[350px] md:w-[500px] md:h-[630px] lg:w-[913px] lg:h-[1146px]"
                            style={{
                                left: '50%',
                                transform: 'translateX(-50%)',
                                zIndex: 5,
                            }}
                        >
                            <Image
                                src="/assets/images/main-img.png"
                                alt="Dr. Dotun Olowoporoku"
                                width={913}
                                height={1146}
                                className="grayscale"
                                priority
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />

                            {/* Wave stacked below image - desktop only */}
                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 0.6, scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="absolute hidden lg:flex justify-center items-center"
                                style={{
                                    top: '45px',
                                    left: '10%',
                                    transform: 'translateX(-50%)',
                                    zIndex: -1,
                                }}
                            >
                                <svg width="300" height="30" viewBox="0 0 400 30" fill="none" className="text-[#808080]" style={{ marginLeft: '425px' }}>
                                    <path d="M10 15 Q20 7, 30 15 Q40 23, 50 15 Q60 7, 70 15 Q80 23, 90 15 Q100 7, 110 15 Q120 23, 130 15 Q140 7, 150 15 Q160 23, 170 15 Q180 7, 190 15 Q200 23, 210 15 Q220 7, 230 15 Q240 23, 250 15 Q260 7, 270 15 Q280 23, 290 15 Q300 7, 310 15 Q320 23, 330 15 Q340 7, 350 15 Q360 23, 370 15 Q380 7, 390 15"
                                        stroke="currentColor"
                                        strokeWidth="8.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Image mask overlay - smooth blend with shadow blur at bottom */}
                        <div
                            className="absolute pointer-events-none hero-image-overlay"
                            style={{
                                top: '0',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '100vw',
                                height: '120%',
                                mixBlendMode: 'multiply',
                                zIndex: 6,
                                filter: 'blur(0px)',
                                maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
                            }}
                        />
                    </div>
                </motion.div>
            </motion.div>

            {/* Wave removed - now stacked below image */}

            {/* Scroll Indicator - moved further left for better spacing */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: scrolledPastHero ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                    const aboutSection = document.getElementById('about');
                    aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="absolute z-40 hidden lg:flex items-center gap-2 cursor-pointer bg-transparent border-none"
                style={{
                    left: '100px',
                    bottom: '105px',
                    pointerEvents: scrolledPastHero ? 'none' : 'auto'
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

            {/* Stay in Touch Button - Simple redirect to Substack */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: scrolledPastHero ? 0 : 1, y: scrolledPastHero ? 20 : 0 }}
                transition={{ duration: 0.5 }}
                className="fixed lg:absolute z-40 bottom-6 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto lg:right-[100px] lg:bottom-[105px]"
                style={{
                    pointerEvents: scrolledPastHero ? 'none' : 'auto'
                }}
            >
                <motion.button
                    onClick={handleStayInTouch}
                    disabled={isLoading}
                    className="flex items-center relative cursor-pointer"
                    style={{
                        height: '64px',
                        borderRadius: '64px',
                        padding: '4px',
                        backgroundColor: '#000000',
                    }}
                    animate={{
                        width: isLoading ? 72 : 200,
                    }}
                    transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                >
                    {/* Text Label - Fades out when loading */}
                    <motion.span
                        initial={false}
                        animate={{
                            opacity: isLoading ? 0 : 1,
                            x: isLoading ? -20 : 0,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        className="font-medium text-white text-sm lg:text-base whitespace-nowrap absolute pointer-events-none"
                        style={{
                            left: '72px',
                        }}
                    >
                        Stay in Touch
                    </motion.span>

                    {/* Circle Icon - Animates to center when loading */}
                    <motion.div
                        initial={false}
                        animate={{
                            x: isLoading ? 4 : 0,
                        }}
                        transition={{
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        className="absolute left-[4px] flex items-center justify-center rounded-full flex-shrink-0 z-10"
                        style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.2) 100%)',
                            backdropFilter: 'blur(4px) saturate(120%)',
                            WebkitBackdropFilter: 'blur(4px) saturate(120%)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        {/* Arrow icon - shown when not loading */}
                        <motion.div
                            initial={false}
                            animate={{
                                opacity: isLoading ? 0 : 1,
                                scale: isLoading ? 0.5 : 1,
                            }}
                            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </motion.div>

                        {/* Loading spinner - shown when loading */}
                        <motion.div
                            initial={false}
                            animate={{
                                opacity: isLoading ? 1 : 0,
                                scale: isLoading ? 1 : 0.5,
                            }}
                            transition={{ duration: 0.2, delay: isLoading ? 0.1 : 0, ease: [0.4, 0, 0.2, 1] }}
                            className="absolute"
                        >
                            <motion.svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            >
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </motion.svg>
                        </motion.div>
                    </motion.div>
                </motion.button>
            </motion.div>
        </section>
    );
}