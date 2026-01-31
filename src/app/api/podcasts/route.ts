import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const FALLBACK_EPISODES = [
    {
        id: "fallback-1",
        guest: "DEEPANKAR RUSTAGI",
        role: "CEO, OmniRetail",
        image: "/assets/svg/latest-episodes-spotify-4.svg",
        url: "https://open.spotify.com/show/5Hybu09bbEWOoU3xxJZ3Gg",
        published_at: new Date().toISOString(),
    },
];

export async function GET() {
    try {
        const supabase = getSupabaseAdmin();
        const { data, error } = await supabase
            .from("episodes")
            .select("id, guest, role, image, url, published_at")
            .order("published_at", { ascending: false })
            .limit(10);

        if (error) throw error;

        const items = (data || []).map((ep) => ({
            id: ep.id,
            guest: ep.guest,
            role: ep.role,
            image: ep.image || "/assets/svg/latest-episodes-spotify-4.svg",
            url: ep.url,
        }));

        return NextResponse.json({ items: items.length ? items : FALLBACK_EPISODES }, { status: 200 });
    } catch (err) {
        console.error("/api/podcasts error", err);
        return NextResponse.json({ items: FALLBACK_EPISODES, error: "Fallback due to error" }, { status: 200 });
    }
}