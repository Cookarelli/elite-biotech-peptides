function required(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
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
};
