"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navItems = [
    { label: "About Me", href: "#about", scrollTarget: "about" },
    { label: "Podcast", href: "#podcast", scrollTarget: "podcast" },
    { label: "Blogs", href: "#essays", scrollTarget: "essays" },
];

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, scrollTarget: string) => {
        // Allow Lenis to handle smooth scrolling via href
        // The scroll animation with spring is handled by Lenis configuration
    };

    return (
        <>
            {/* Desktop Navigation */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block transition-all duration-300 ${isScrolled ? "top-4" : "top-6"
                    }`}
            >
                {/* Frosted glass container */}
                <nav
                    className="nav-frosted-glass flex items-center justify-between"
                    style={{
                        width: '849px',
                        height: '68px',
                        paddingLeft: '40px',
                        paddingRight: '8px',
                        borderRadius: '16px',
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        className="px-6 py-2 font-serif text-xl font-bold italic tracking-tight text-[var(--color-foreground)] hover-text-scale"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Dr Dotun
                    </Link>

                    {/* Nav Items */}
                    <div className="flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleSmoothScroll(e, item.scrollTarget)}
                                className="nav-link text-sm font-medium transition-all text-[var(--color-foreground-secondary)] hover:text-[var(--color-foreground)]"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button - Redesigned solid pill */}
                    <Link
                        href="https://it1j673lesy.typeform.com/to/piDzHmqS?typeform-source=www.venturesplatform.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-pill"
                        style={{ marginLeft: '8px' }}
                    >
                        <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-serif)' }}>Get funded</span>
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="cta-pill-icon"
                        >
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                        </svg>
                    </Link>
                </nav>
            </motion.header>

            {/* Mobile Navigation */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-4 left-4 right-4 z-50 md:hidden"
            >
                <nav className="mobile-nav-glass flex items-center justify-between px-4 py-3 rounded-2xl">
                    <Link
                        href="/"
                        className="font-serif text-lg font-bold tracking-tight text-[var(--color-foreground)]"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Dr Dotun
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-full hover:bg-[var(--color-background-secondary)] transition-colors text-[var(--color-foreground)]"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 p-4 rounded-2xl mobile-nav-glass"
                        >
                            <div className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-3 text-base font-medium transition-colors hover:bg-[var(--color-background-secondary)] rounded-xl text-[var(--color-foreground)]"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <Link
                                    href="https://it1j673lesy.typeform.com/to/piDzHmqS?typeform-source=www.venturesplatform.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsOpen(false)}
                                    className="cta-pill justify-center mt-2"
                                >
                                    <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-serif)' }}>Get funded</span>
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="cta-pill-icon"
                                    >
                                        <path d="M7 17L17 7" />
                                        <path d="M7 7h10v10" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </>
    );
}