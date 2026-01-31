import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const ADMIN_SECRET = process.env.ADMIN_EPISODES_SECRET;

function authorize(req: Request) {
    if (!ADMIN_SECRET) return false;
    const authHeader = req.headers.get("authorization") || "";
    const token = authHeader.replace(/bearer\s+/i, "");
    const headerSecret = token || req.headers.get("x-admin-secret") || "";
    return headerSecret === ADMIN_SECRET;
}

function validatePayload(body: any) {
    const guest = (body?.guest || "").trim();
    const role = (body?.role || "").trim();
    const image = (body?.image || "").trim();
    const url = (body?.url || "").trim();
    const published_at = body?.published_at ? new Date(body.published_at).toISOString() : new Date().toISOString();
    const id = (body?.id || "").trim() || crypto.randomUUID();

    if (!guest || guest.length > 80) throw new Error("Guest name is required and must be <= 80 chars");
    if (!role || role.length > 120) throw new Error("Role is required and must be <= 120 chars");
    if (!url) throw new Error("URL is required");
    if (image && image.length > 300) throw new Error("Image URL too long");

    return { id, guest, role, image, url, published_at };
}

export async function GET(req: Request) {
    try {
        if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const supabase = getSupabaseAdmin();
        const { data, error } = await supabase
            .from("episodes")
            .select("id, guest, role, image, url, published_at")
            .order("published_at", { ascending: false })
            .limit(50);
        if (error) throw error;
        return NextResponse.json({ items: data || [] });
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const payload = await req.json();
        const episode = validatePayload(payload);
        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from("episodes").upsert(episode, { onConflict: "id" });
        if (error) throw error;
        return NextResponse.json({ success: true, item: episode });
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    try {
        if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const payload = await req.json().catch(() => ({}));
        const id = (payload?.id || "").trim();
        if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

        const supabase = getSupabaseAdmin();
        const { error } = await supabase.from("episodes").delete().eq("id", id);
        if (error) throw error;

        return NextResponse.json({ success: true, id });
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 400 });
    }
}
