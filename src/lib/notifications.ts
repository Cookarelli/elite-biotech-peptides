import { getCartSummary, type CartItem } from "@elite-biotech/shared";
import { env } from "@/lib/env";

type NotificationInput = {
  orderId: string;
  items: CartItem[];
  referralCode?: string;
};

function getOrderSummaryLines(items: CartItem[]) {
  const summary = getCartSummary(items);

  return {
    summary,
    lines: summary.lines.map(
      (line) =>
        `- ${line.product.name} x${line.quantity} @ ${line.product.price} (${line.product.formatLabel})`
    ),
  };
}

async function sendOrderEmail(subject: string, text: string) {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL || !env.NOTIFY_EMAIL_TO) {
    return { channel: "email", skipped: true as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: [env.NOTIFY_EMAIL_TO],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Email notification failed: ${body}`);
  }

  return { channel: "email", skipped: false as const };
}

async function sendOrderSms(message: string) {
  if (
    !env.TWILIO_ACCOUNT_SID ||
    !env.TWILIO_AUTH_TOKEN ||
    !env.TWILIO_FROM_NUMBER ||
    !env.ALERT_SMS_TO
  ) {
    return { channel: "sms", skipped: true as const };
  }

  const auth = Buffer.from(
    `${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`
  ).toString("base64");

  const payload = new URLSearchParams({
    To: env.ALERT_SMS_TO,
    From: env.TWILIO_FROM_NUMBER,
    Body: message,
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    }
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`SMS notification failed: ${body}`);
  }

  return { channel: "sms", skipped: false as const };
}

export async function sendOrderNotifications({
  orderId,
  items,
  referralCode,
}: NotificationInput) {
  const { summary, lines } = getOrderSummaryLines(items);

  const subject = `New Elite Biotech order ${orderId}`;
  const text = [
    `A checkout notification was created.`,
    ``,
    `Order ID: ${orderId}`,
    `Total: $${summary.total.toFixed(2)}`,
    `Subtotal: $${summary.subtotal.toFixed(2)}`,
    `Discount: $${summary.discountAmount.toFixed(2)}`,
    `Shipping: $${summary.shipping.toFixed(2)}`,
    referralCode ? `Referral Code: ${referralCode}` : null,
    ``,
    `Items:`,
    ...lines,
  ]
    .filter(Boolean)
    .join("\n");

  const sms = [
    `New Elite Biotech order`,
    `Order ${orderId}`,
    `Total $${summary.total.toFixed(2)}`,
    referralCode ? `Referral ${referralCode}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const [emailResult, smsResult] = await Promise.allSettled([
    sendOrderEmail(subject, text),
    sendOrderSms(sms),
  ]);

  return {
    email:
      emailResult.status === "fulfilled"
        ? emailResult.value
        : { channel: "email", error: emailResult.reason instanceof Error ? emailResult.reason.message : "Email notification failed." },
    sms:
      smsResult.status === "fulfilled"
        ? smsResult.value
        : { channel: "sms", error: smsResult.reason instanceof Error ? smsResult.reason.message : "SMS notification failed." },
  };
}
