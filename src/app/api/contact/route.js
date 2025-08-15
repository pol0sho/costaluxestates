import { Resend } from 'resend';

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const { name, email, phone, subject, message } = await request.json();

  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'info@costaluxestates.com', 
    to: 'info@costaluxestates.com',
    reply_to: email, 
    subject,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}