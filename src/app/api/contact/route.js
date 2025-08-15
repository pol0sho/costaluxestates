export const runtime = "nodejs"; // Force Node.js runtime so nodemailer works
export const dynamic = "force-dynamic"; // Avoid static optimization

export async function POST(request) {
  // Require here so Webpack doesn't bundle it
  const nodemailer = require("nodemailer");

  try {
    const body = await request.json();
    const { name, email, phone, subject, message, contactMethod } = body;

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: "info@costaluxestates.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <info@costaluxestates.com>`,
      to: "info@costaluxestates.com",
      replyTo: email,
      subject,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Preferred contact method: ${contactMethod}
Message:
${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Preferred contact method:</strong> ${contactMethod}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error("Email send error:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}