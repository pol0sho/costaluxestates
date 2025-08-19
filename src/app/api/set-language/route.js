export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import pkg from "pg";
const { Client } = pkg;

export async function POST(request) {
  try {
    const { language } = await request.json();

    // expect `language` like "en", "es", "nl", "fr", "de"
    if (!language) {
      return new Response(
        JSON.stringify({ error: "Missing language" }),
        { status: 400 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    await client.query(
      `INSERT INTO user_languages (ip, language, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (ip)
       DO UPDATE SET language = EXCLUDED.language, updated_at = NOW()`,
      [ip, language]
    );

    await client.end();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Set language error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}