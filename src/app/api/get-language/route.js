export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { sql } from "@vercel/postgres";

export async function GET(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const result = await sql`SELECT language FROM user_languages WHERE ip = ${ip} LIMIT 1`;

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ language: null }), { status: 200 });
    }

    return new Response(JSON.stringify({ language: result.rows[0].language }), { status: 200 });
  } catch (err) {
    console.error("Get language error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}