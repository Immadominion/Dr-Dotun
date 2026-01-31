import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";

const SUBSTACK_FEED_URL = process.env.SUBSTACK_FEED_URL || "https://drdotun.substack.com/feed";
const DEFAULT_LIMIT = 6;

export async function GET() {
    try {
        const rssRes = await fetch(SUBSTACK_FEED_URL, { next: { revalidate: 1800 } });
        if (!rssRes.ok) {
            return NextResponse.json({ error: "Failed to fetch Substack feed" }, { status: 502 });
        }

        const xml = await rssRes.text();
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
        const parsed = parser.parse(xml);

        const items = parsed?.rss?.channel?.item || [];
        const normalized = items.slice(0, DEFAULT_LIMIT).map((item: any, idx: number) => {
            const enclosure = item.enclosure || item["media:content"];
            const enclosureUrl = enclosure?.["@_url"];
            const imageFromMedia = item["media:thumbnail"]?.["@_url"] || item["media:content"]?.["@_url"];
            const isImage = typeof enclosureUrl === "string" && /(png|jpe?g|webp|gif|svg)$/i.test(enclosureUrl);
            const image = isImage ? enclosureUrl : imageFromMedia || "/assets/images/Rectangle 14.png";

            const rawGuid = typeof item.guid === "object" ? item.guid?.["#text"] : item.guid;
            const baseId = rawGuid || item.link || item.title || `item-${idx}`;

            return {
                id: `${baseId}-${idx}`,
                title: item.title || "Untitled",
                url: item.link,
                excerpt: item.description?.replace(/<[^>]+>/g, " ").trim().slice(0, 220) || "",
                category: (Array.isArray(item.category) ? item.category[0] : item.category) || "ESSAY",
                readTime: "5 min read",
                image,
                bgColor: "bg-[#2d3a3a]",
            };
        });

        return NextResponse.json({ items: normalized });
    } catch (err) {
        console.error("/api/essays error", err);
        return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
    }
}