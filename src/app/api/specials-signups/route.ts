import { NextResponse } from "next/server";
import { normalizeSpecialsSignup, type SpecialsSignupPayload } from "@elite-biotech/shared";
import { env } from "@/lib/env";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<SpecialsSignupPayload>;
    const { signup, error } = normalizeSpecialsSignup(payload);

    if (!signup) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const result = await processSignup(signup);

    return NextResponse.json(
      {
        ok: true,
        stored: false,
        notified: result.notified,
        integration: result.integration,
        message: result.notified
          ? "Thanks. Your signup has been sent to Elite Biotech for follow-up."
          : "Thanks. We are preparing this list and will connect birthday and specials delivery soon.",
      },
      { status: 202 }
    );
  } catch (error) {
    console.error("Failed to process specials signup", error);
    return NextResponse.json(
      { error: "Unable to save specials signup right now." },
      { status: 500 }
    );
  }
}

async function processSignup(signup: {
  name: string;
  email: string;
  birthdayMonth: number | null;
  birthdayDay: number | null;
  source: string;
}) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL || !env.NOTIFY_EMAIL_TO) {
    return { notified: false, integration: "not_configured" as const };
  }

  const birthday =
    signup.birthdayMonth && signup.birthdayDay
      ? `${String(signup.birthdayMonth).padStart(2, "0")}/${String(signup.birthdayDay).padStart(2, "0")}`
      : "Not provided";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: [env.NOTIFY_EMAIL_TO],
      subject: "New Elite Biotech birthday and specials signup",
      text: [
        "A customer submitted the birthday and specials signup form.",
        "",
        `Name: ${signup.name}`,
        `Email: ${signup.email}`,
        `Birthday: ${birthday}`,
        `Source: ${signup.source}`,
        "Consent: Customer agreed to receive birthday notes, specials, promotions, and product updates.",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Specials signup notification failed: ${body}`);
  }

  return { notified: true, integration: "resend_notification" as const };
}
