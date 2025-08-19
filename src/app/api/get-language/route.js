export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import pkg from "pg";
const { Client } = pkg;

export async function GET(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const client = new Client({
      connectionString: process.env.DATABASE_URL, // ✅ use env var
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();

    const result = await client.query(
      `SELECT language FROM user_languages WHERE ip = $1 LIMIT 1`,
      [ip]
    );

    await client.end();

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ language: null }), { status: 200 });
    }

    return new Response(
      JSON.stringify({ language: result.rows[0].language }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Get language error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}