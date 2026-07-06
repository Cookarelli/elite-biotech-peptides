export const REFERRAL_CODE = {
  maxLength: 40,
} as const;

export function normalizeReferralCode(input?: string | null) {
  if (!input) return "";

  return input
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .toUpperCase()
    .slice(0, REFERRAL_CODE.maxLength);
}
