"use client";

import { useState } from "react";
import type { SpecialsSignupPayload } from "@elite-biotech/shared";

const monthOptions = [
  { value: "", label: "Month" },
  { value: "1", label: "Jan" },
  { value: "2", label: "Feb" },
  { value: "3", label: "Mar" },
  { value: "4", label: "Apr" },
  { value: "5", label: "May" },
  { value: "6", label: "Jun" },
  { value: "7", label: "Jul" },
  { value: "8", label: "Aug" },
  { value: "9", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
];

export function SpecialsSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdayMonth, setBirthdayMonth] = useState("");
  const [birthdayDay, setBirthdayDay] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const payload: SpecialsSignupPayload = {
      name,
      email,
      birthdayMonth: birthdayMonth ? Number.parseInt(birthdayMonth, 10) : null,
      birthdayDay: birthdayDay ? Number.parseInt(birthdayDay, 10) : null,
      consent,
      source: "home",
    };

    try {
      const response = await fetch("/api/specials-signups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setStatus({
          type: "error",
          message: data.error ?? "Unable to save your signup right now.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: data.message ?? "Thanks. You are on the specials interest list.",
      });
      setName("");
      setEmail("");
      setBirthdayMonth("");
      setBirthdayDay("");
      setConsent(false);
    } catch {
      setStatus({
        type: "error",
        message: "Unable to save your signup right now.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Name"
          value={name}
          onChange={setName}
          required
          autoComplete="name"
          placeholder="Your name"
        />
        <Field
          label="Email"
          value={email}
          onChange={setEmail}
          required
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-neutral-200">Birthday</p>
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_120px]">
          <select
            value={birthdayMonth}
            onChange={(event) => setBirthdayMonth(event.target.value)}
            className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-sky-400"
            aria-label="Birthday month"
          >
            {monthOptions.map((option) => (
              <option key={option.value || "empty"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={1}
            max={31}
            value={birthdayDay}
            onChange={(event) => setBirthdayDay(event.target.value)}
            placeholder="Day"
            aria-label="Birthday day"
            className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-sky-400"
          />
        </div>
        <p className="mt-2 text-xs text-neutral-500">Optional. Month and day only.</p>
      </div>

      <label className="flex gap-3 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
          className="mt-1 h-4 w-4 rounded border-neutral-700 bg-neutral-950 accent-sky-400"
        />
        <span className="text-sm leading-relaxed text-neutral-300">
          I agree to receive birthday notes, specials, promotions, and product updates from Elite
          Biotech Peptides. I understand I can opt out at any time.
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-2xl bg-sky-400 px-4 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
      >
        {submitting ? "Saving..." : "Join Specials List"}
      </button>

      {status ? (
        <p
          className={`text-sm ${
            status.type === "success" ? "text-sky-200" : "text-red-300"
          }`}
          role="status"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-neutral-200">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-sky-400"
      />
    </label>
  );
}
