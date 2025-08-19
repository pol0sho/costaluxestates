export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { sql } from "@vercel/postgres"; // or pg if you’re not on Vercel

export async function POST(request) {
  try {
    const body = await request.json();
    const { language } = body;

    if (!language) {
      return new Response(JSON.stringify({ error: "Missing language" }), { status: 400 });
    }

    // get client IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // save/update IP → language
    await sql`
      INSERT INTO user_languages (ip, language)
      VALUES (${ip}, ${language})
      ON CONFLICT (ip) DO UPDATE SET language = EXCLUDED.language, updated_at = NOW()
    `;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Set language error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}