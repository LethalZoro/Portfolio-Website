import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/data/site";

export const runtime = "nodejs";

const TO_EMAIL = site.email;
const FROM_EMAIL = site.contactFrom;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { name, email, subject, message, company } = parsed.data;

  // Honeypot filled: pretend success, send nothing.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { ok: false, error: "Email service not configured" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = subject ? escapeHtml(subject) : "New message from your portfolio";
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Portfolio: ${safeSubject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="margin-bottom: 4px;">${safeName}</h2>
          <p style="margin-top: 0; color: #666;">${safeEmail}</p>
          <hr style="border: none; border-top: 1px solid #ddd;" />
          <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send" }, { status: 500 });
  }
}
