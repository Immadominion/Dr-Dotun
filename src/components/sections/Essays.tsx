"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container, Section } from "../ui/Container";
import { ArrowUpRight } from "lucide-react";

const essays = [
    {
        id: 1,
        title: "The Illusion of Protection: Why VCs Don't Sign ND...",
        fullTitle: "The Illusion of Protection: Why VCs Don't Sign NDAs—And Why Founders Shouldn't Ask Them To",
        category: "LEADERSHIP",
        readTime: "5 min read",
        excerpt: "I finished The House of Morgan last year. Ben Horowitz had recommended it to Kola and me back in 2018 when we visited his office, exploring our first fund. It was an apt recommendation. One story...",
        image: "/assets/images/Rectangle 14.png",
        bgColor: "bg-[#2d3a3a]",
        url: "https://drdotun.substack.com/",
    },
    {
        id: 2,
        title: "Thank you + Season 5 Recap",
        fullTitle: "Thank you + Season 5 Recap",
        category: "FAITH",
        readTime: "5 min read",
        excerpt: "I finished The House of Morgan last year. Ben Horowitz had recommended it to Kola and me back in 2018 when we visited his office, exploring our first fund. It was an apt recommendation. One story...",
        image: "/assets/images/thank-you.jpg",
        bgColor: "bg-[#6b7f2a]",
        url: "https://drdotun.substack.com/",
    },
    {
        id: 3,
        title: "Nothing beats boots in the dust",
        fullTitle: "Nothing beats boots in the dust",
        category: "FAITH",
        readTime: "5 min read",
        excerpt: "I finished The House of Morgan last year. Ben Horowitz had recommended it to Kola and me back in 2018 when we visited his office, exploring our first fund. It was an apt recommendation. One story...",
        image: "/assets/images/Rectangle 14-2.png",
        bgColor: "bg-[#6b6b6b]",
        url: "https://drdotun.substack.com/",
    },
    {
        id: 4,
        title: "The Big Four Fallacy: Rethinking African M...",
        fullTitle: "The Big Four Fallacy: Rethinking African Markets",
        category: "VENTURE",
        readTime: "5 min read",
        excerpt: "I finished The House of Morgan last year. Ben Horowitz had recommended it to Kola and me back in 2018 when we visited his office, exploring our first fund. It was an apt recommendation. One story...",
        image: "/assets/images/Rectangle 14-1.png",
        bgColor: "bg-[#3d2d24]",
        url: "https://drdotun.substack.com/",
    },
];

export function Essays() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <Section id="essays" className="py-24 md:py-32">
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
                        Essays on leadership, venture &amp; faith
                    </h2>
                </motion.div>
            </Container>

            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 px-[var(--section-padding-x)] scrollbar-hide snap-x snap-mandatory"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {essays.map((essay, idx) => (
                        <motion.article
                            key={essay.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex-shrink-0 w-[420px] md:w-[480px] lg:w-[520px] snap-start"
                        >
                            <a
                                href={essay.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block relative overflow-hidden rounded-[var(--radius-xl)] cursor-pointer h-[500px] md:h-[550px]"
                            >
                                <div className="absolute inset-0">
                                    <Image
                                        src={essay.image}
                                        alt={essay.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                <div className={`absolute inset-x-0 bottom-0 ${essay.bgColor} transition-all duration-500 ease-out h-[45%] group-hover:h-full`} />

                                {/* Content container - moves up with overlay on hover */}
                                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end transition-all duration-500 ease-out h-[50%] group-hover:h-full group-hover:justify-center">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-4 py-1.5 text-xs font-medium bg-white/90 text-gray-900 rounded-full">
                                            {essay.category}
                                        </span>
                                        <span className="text-sm text-white/80">
                                            {essay.readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-[40px] leading-[48px] tracking-[-0.04em] font-normal text-white mb-3 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 transition-all duration-300" style={{ fontFamily: 'Poppins, sans-serif', lineHeight: '1.2' }}>
                                        {essay.title}
                                    </h3>

                                    <p className="text-[24px] leading-[1.3] tracking-[-0.04em] font-normal text-white/80 line-clamp-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-4 max-h-0 group-hover:max-h-60 overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {essay.excerpt}
                                    </p>

                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                                        <span className="inline-flex items-center gap-2 text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 hover:bg-white/20 transition-colors text-sm">
                                            Continue on Substack
                                            <ArrowUpRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </a>
                        </motion.article>
                    ))}
                </div>

            </div>

            {/* Scroll Down indicator - bottom left, desktop only */}
            <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                onClick={() => {
                    const footer = document.querySelector('footer');
                    footer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
