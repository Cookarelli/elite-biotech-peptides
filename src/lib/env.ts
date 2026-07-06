function required(name: string, fallback?: string) {
  const envValue = process.env[name];
  const raw =
    typeof envValue === "string" && envValue.trim().length > 0 ? envValue : fallback;
  const value = typeof raw === "string" ? raw.trim() : raw;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name: string, fallback?: string) {
  const envValue = process.env[name];
  const raw =
    typeof envValue === "string" && envValue.trim().length > 0 ? envValue : fallback;
  if (typeof raw !== "string") {
    return raw;
  }
  const value = raw.trim();
  return value.length > 0 ? value : undefined;
}

export const env = {
  DATABASE_URL: required("DATABASE_URL", "file:./prisma/dev.db"),
  NEXT_PUBLIC_SITE_URL: required("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
  NEXT_PUBLIC_COMPANY_NAME: required(
    "NEXT_PUBLIC_COMPANY_NAME",
    "Elite Biotech Peptides"
  ),
  NEXT_PUBLIC_SUPPORT_EMAIL: required(
    "NEXT_PUBLIC_SUPPORT_EMAIL",
    "support@elitebiotechpeptides.com"
  ),
  NEXT_PUBLIC_PROCUREMENT_EMAIL: required(
    "NEXT_PUBLIC_PROCUREMENT_EMAIL",
    "procurement@elitebiotechpeptides.com"
  ),
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: optional("NEXT_PUBLIC_PAYPAL_CLIENT_ID"),
  PAYPAL_CLIENT_ID: optional("PAYPAL_CLIENT_ID") ?? optional("NEXT_PUBLIC_PAYPAL_CLIENT_ID"),
  PAYPAL_CLIENT_SECRET: optional("PAYPAL_CLIENT_SECRET"),
  PAYPAL_ENVIRONMENT: (optional("PAYPAL_ENVIRONMENT", "sandbox") ?? "sandbox").toLowerCase(),
  RESEND_API_KEY: optional("RESEND_API_KEY"),
  RESEND_FROM_EMAIL: optional("RESEND_FROM_EMAIL"),
  NOTIFY_EMAIL_TO: optional("NOTIFY_EMAIL_TO"),
  TWILIO_ACCOUNT_SID: optional("TWILIO_ACCOUNT_SID"),
  TWILIO_AUTH_TOKEN: optional("TWILIO_AUTH_TOKEN"),
  TWILIO_FROM_NUMBER: optional("TWILIO_FROM_NUMBER"),
  ALERT_SMS_TO: optional("ALERT_SMS_TO"),
  INSTAGRAM_APP_ID: optional("INSTAGRAM_APP_ID"),
  INSTAGRAM_APP_SECRET: optional("INSTAGRAM_APP_SECRET"),
  INSTAGRAM_REDIRECT_URI: optional("INSTAGRAM_REDIRECT_URI"),
  INSTAGRAM_SCOPES: optional(
    "INSTAGRAM_SCOPES",
    [
      "instagram_business_basic",
      "instagram_business_content_publish",
      "instagram_business_manage_insights",
      "instagram_business_manage_comments",
      "instagram_business_manage_messages",
    ].join(",")
  ),
};
