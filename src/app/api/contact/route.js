export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const nodemailer = require("nodemailer");

  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      subject, 
      message, 
      contactMethod, 
      propertyRef, 
      propertyTitle 
    } = body;

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@costaluxestates.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    const finalSubject = propertyRef || propertyTitle
      ? `Inquiry for ${propertyTitle || "Property"}${propertyRef ? ` (Ref: ${propertyRef})` : ""}`
      : subject;

    await transporter.sendMail({
      from: `"${name}" <info@costaluxestates.com>`,
      to: "info@costaluxestates.com",
      replyTo: email,
      subject: finalSubject,
      text: `
Property Ref: ${propertyRef || "N/A"}
Property Title: ${propertyTitle || "N/A"}

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Preferred contact method: ${contactMethod}

Message:
${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Property Ref:</strong> ${propertyRef || "N/A"}</p>
        <p><strong>Property Title:</strong> ${propertyTitle || "N/A"}</p>
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
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      { status: 500 }
    );
  }
}