import { NextResponse } from "next/server";
import { team } from "@/data/team";

const resendEndpoint = "https://api.resend.com/emails";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(value: string) {
  // Addresses are capped at 254 characters (RFC 5321); the bound also keeps
  // the pattern from backtracking on long untrusted input.
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const recipient = process.env.CONTACT_TO;

  if (!apiKey || !from || !recipient) {
    return NextResponse.json({ error: "Mail-Service ist noch nicht konfiguriert." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as {
    subject?: string;
    email?: string;
    message?: string;
    website?: string;
  } | null;

  // Bots fill the hidden field; they get a success answer and nothing is sent.
  if (!body || body.website) {
    return NextResponse.json({ ok: true });
  }

  const subject = body.subject?.trim() || "";
  const email = body.email?.trim() || "";
  const message = body.message?.trim() || "";

  if (!subject || !email || !message) {
    return NextResponse.json({ error: "Betreff, E-Mail und Nachricht sind Pflichtfelder." }, { status: 400 });
  }

  if (subject.length > 140 || email.length > 254 || message.length > 4000) {
    return NextResponse.json({ error: "Betreff oder Nachricht ist zu lang." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Bitte eine gültige E-Mail-Adresse eintragen." }, { status: 400 });
  }

  const safeSubject = escapeHtml(subject);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [recipient],
      reply_to: email,
      subject: `${team.name} Kontakt: ${subject}`,
      text: [`Betreff: ${subject}`, `Antwort an: ${email}`, "", message].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>${escapeHtml(team.name)} Kontaktanfrage</h2>
          <p><strong>Betreff:</strong> ${safeSubject}</p>
          <p><strong>Antwort an:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Nachricht:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Mail konnte nicht gesendet werden." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
