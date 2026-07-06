export const SPECIALS_SIGNUP = {
  maxNameLength: 80,
  maxEmailLength: 120,
} as const;

export type SpecialsSignupPayload = {
  name: string;
  email: string;
  birthdayMonth?: number | null;
  birthdayDay?: number | null;
  consent: boolean;
  source?: string;
};

export type NormalizedSpecialsSignup = {
  name: string;
  email: string;
  birthdayMonth: number | null;
  birthdayDay: number | null;
  consent: true;
  source: string;
};

export function normalizeSpecialsSignup(
  payload: Partial<SpecialsSignupPayload>
): { signup?: NormalizedSpecialsSignup; error?: string } {
  const name = sanitizeText(payload.name, SPECIALS_SIGNUP.maxNameLength);
  const email = sanitizeText(payload.email, SPECIALS_SIGNUP.maxEmailLength).toLowerCase();
  const source = sanitizeText(payload.source, 40) || "web";

  if (!name || !email) {
    return { error: "Name and email are required." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }

  if (payload.consent !== true) {
    return { error: "Consent is required for specials and promotional messages." };
  }

  const birthdayMonth = toOptionalInteger(payload.birthdayMonth);
  const birthdayDay = toOptionalInteger(payload.birthdayDay);
  const hasBirthdayMonth = birthdayMonth !== null;
  const hasBirthdayDay = birthdayDay !== null;

  if (hasBirthdayMonth !== hasBirthdayDay) {
    return { error: "Birthday month and day must be entered together." };
  }

  if (birthdayMonth !== null && (birthdayMonth < 1 || birthdayMonth > 12)) {
    return { error: "Birthday month must be between 1 and 12." };
  }

  if (
    birthdayMonth !== null &&
    birthdayDay !== null &&
    (birthdayDay < 1 || birthdayDay > getDaysInBirthdayMonth(birthdayMonth))
  ) {
    return { error: "Enter a valid birthday month and day." };
  }

  return {
    signup: {
      name,
      email,
      birthdayMonth,
      birthdayDay,
      consent: true,
      source,
    },
  };
}

function sanitizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : "";
}

function toOptionalInteger(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = typeof value === "number" ? value : Number.parseInt(String(value), 10);
  return Number.isInteger(number) ? number : null;
}

function getDaysInBirthdayMonth(month: number) {
  if (month === 2) {
    return 29;
  }

  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}
