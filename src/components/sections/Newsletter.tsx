"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Section } from "../ui/Container";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // Simulate API call - replace with actual Substack integration
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setStatus("success");
            setEmail("");
            setTimeout(() => setStatus("idle"), 3000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <Section className="bg-[var(--color-background-secondary)]">
            <Container size="narrow">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-8"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Join my newsletter
                    </h2>

                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                        <div
                            className={`relative flex items-center rounded-full transition-all duration-300 ${isFocused
                                ? "ring-4 ring-[var(--input-focus-glow)]"
                                : ""
                                }`}
                            style={{
                                background: "var(--card-background)",
                                border: "1px solid var(--card-border)",
                            }}
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Enter Email"
                                className="flex-1 px-6 py-4 bg-transparent text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-muted)] focus:outline-none text-base md:text-lg"
                                disabled={status === "loading" || status === "success"}
                                required
                            />

                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success" || !email}
                                className="mr-2 flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent-primary)] text-[var(--color-background)] rounded-full font-medium text-sm md:text-base transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : status === "success" ? (
                                    <Check size={18} />
                                ) : (
                                    <>
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20">
                                            <ArrowRight size={14} />
                                        </span>
                                        <span>Subscribe</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {status === "success" && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 text-green-600 dark:text-green-400 text-sm"
                            >
                                Thanks for subscribing! Check your inbox to confirm.
                            </motion.p>
                        )}

                        {status === "error" && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 text-red-600 dark:text-red-400 text-sm"
                            >
                                Something went wrong. Please try again.
                            </motion.p>
                        )}
                    </form>
                </motion.div>
            </Container>
        </Section>
    );
}
