"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Section } from "../ui/Container";
import { Button } from "../ui/Button";
import { Loader2, Check } from "lucide-react";

export function BookCall() {
    const [formData, setFormData] = useState({ name: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.message) return;

        setStatus("loading");

        // Simulate API call - replace with actual form handler
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setStatus("success");
            setFormData({ name: "", message: "" });
            setTimeout(() => setStatus("idle"), 3000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <Section id="book">
            <Container size="narrow">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h2
                        className="text-4xl md:text-5xl font-bold italic mb-12"
                        style={{ fontFamily: "var(--font-serif)" }}
                    >
                        Book a Call
                    </h2>

                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                        {/* Name Input */}
                        <div className="text-left">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-[var(--color-foreground-secondary)] mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter Name"
                                className="input-premium"
                                disabled={status === "loading" || status === "success"}
                                required
                            />
                        </div>

                        {/* Message Input */}
                        <div className="text-left">
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium text-[var(--color-foreground-secondary)] mb-2"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Type your message"
                                rows={4}
                                className="input-premium resize-none"
                                disabled={status === "loading" || status === "success"}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={status === "loading" || status === "success" || !formData.name || !formData.message}
                            className="btn-primary mx-auto"
                            whileHover={{ scale: status === "loading" ? 1 : 1.03 }}
                            whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                        >
                            <span className="btn-icon-circle">
                                {status === "loading" ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : status === "success" ? (
                                    <Check size={20} />
                                ) : (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                )}
                            </span>
                            <span>
                                {status === "loading"
                                    ? "Sending..."
                                    : status === "success"
                                        ? "Sent!"
                                        : "Book Now"}
                            </span>
                        </motion.button>

                        {status === "success" && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-green-600 dark:text-green-400 text-sm"
                            >
                                Your message has been sent! I&apos;ll get back to you soon.
                            </motion.p>
                        )}

                        {status === "error" && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-600 dark:text-red-400 text-sm"
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
