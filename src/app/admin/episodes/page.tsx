"use client";

import { useEffect, useState } from "react";
import { Container, Section } from "@/components/ui/Container";

const helpText = {
    image: "Use a square image around 1200x1200px; keep URL reachable (Supabase storage or CDN).",
    guest: "Guest name max 80 characters.",
    role: "Role/title max 120 characters.",
    url: "Use the public episode link (Spotify/YouTube/Anchor/etc.).",
};

type Episode = {
    id: string;
    guest: string;
    role: string;
    image: string;
    url: string;
    published_at?: string;
};

export default function EpisodesAdminPage() {
    const [secret, setSecret] = useState("");
    const [form, setForm] = useState({ guest: "", role: "", image: "", url: "", published_at: "" });
    const [status, setStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(false);
    const hasSecret = secret.trim().length > 0;

    const fetchEpisodes = async (adminSecret: string) => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/episodes", {
                headers: { Authorization: `Bearer ${adminSecret}` },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Failed to load episodes");
            setEpisodes(data.items || []);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!secret) return;
        const ok = window.confirm("Delete this episode?");
        if (!ok) return;
        setStatus(null);
        setError(null);
        try {
            const res = await fetch("/api/admin/episodes", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${secret}`,
                },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Delete failed");
            setStatus("Deleted");
            fetchEpisodes(secret);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    useEffect(() => {
        if (secret) fetchEpisodes(secret);
    }, [secret]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(null);
        setError(null);
        try {
            const res = await fetch("/api/admin/episodes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${secret}`,
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Save failed");
            setStatus("Saved");
            setForm({ guest: "", role: "", image: "", url: "", published_at: "" });
            fetchEpisodes(secret);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <Section className="py-16">
            <Container>
                <div className="max-w-3xl mx-auto space-y-6">
                    <h1 className="text-3xl font-semibold">Episodes Admin</h1>
                    <p className="text-sm text-neutral-500">Enter the admin secret, then add/update an episode. The latest 6 show on the site.</p>

                    <label className="block text-sm font-medium">Admin secret (view, add, delete)</label>
                    <input
                        type="password"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"
                        placeholder="Enter shared secret"
                    />

                    {!hasSecret && (
                        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-sm text-neutral-600">
                            Enter the admin secret to load existing episodes and enable adding or deleting.
                        </div>
                    )}

                    {hasSecret && (
                        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                            <div>
                                <label className="block text-sm font-medium">Guest name</label>
                                <input
                                    value={form.guest}
                                    onChange={(e) => setForm({ ...form, guest: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
                                    maxLength={80}
                                    placeholder="e.g., Dare Okoudjou"
                                    required
                                />
                                <p className="text-xs text-neutral-500 mt-1">{helpText.guest}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Role / Title</label>
                                <input
                                    value={form.role}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
                                    maxLength={120}
                                    placeholder="e.g., Founder & CEO, Onafriq"
                                    required
                                />
                                <p className="text-xs text-neutral-500 mt-1">{helpText.role}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Episode URL</label>
                                <input
                                    value={form.url}
                                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
                                    placeholder="https://open.spotify.com/episode/..."
                                    required
                                />
                                <p className="text-xs text-neutral-500 mt-1">{helpText.url}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Image URL</label>
                                <input
                                    value={form.image}
                                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
                                    placeholder="https://.../image.jpg"
                                />
                                <p className="text-xs text-neutral-500 mt-1">{helpText.image}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Published date (optional)</label>
                                <input
                                    type="date"
                                    value={form.published_at}
                                    onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-800"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!secret}
                                className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-white text-sm font-medium hover:bg-neutral-800 disabled:opacity-50"
                            >
                                Save episode
                            </button>

                            {status && <p className="text-sm text-green-600">{status}</p>}
                            {error && <p className="text-sm text-red-600">{error}</p>}
                        </form>
                    )}

                    {hasSecret && (
                        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-lg font-semibold">Latest episodes</h2>
                                <button
                                    onClick={() => secret && fetchEpisodes(secret)}
                                    disabled={!secret || loading}
                                    className="text-sm text-neutral-700 hover:underline disabled:opacity-50"
                                >
                                    Refresh
                                </button>
                            </div>
                            {loading && <p className="text-sm text-neutral-500">Loading…</p>}
                            {!loading && !episodes.length && <p className="text-sm text-neutral-500">No episodes yet.</p>}
                            <ul className="space-y-3">
                                {episodes.map((ep) => (
                                    <li key={ep.id} className="text-sm text-neutral-800">
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <div className="font-medium">{ep.guest}</div>
                                                <div className="text-neutral-500">{ep.role}</div>
                                                <div className="text-neutral-500 truncate">{ep.url}</div>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(ep.id)}
                                                className="text-xs text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Container>
        </Section>
    );
}
