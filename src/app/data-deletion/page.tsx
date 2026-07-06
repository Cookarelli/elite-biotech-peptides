import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Data Deletion Instructions | Elite Biotech Peptides",
  description:
    "Instructions for requesting deletion of personal data associated with Elite Biotech Peptides website and connected business tools."
};

const steps = [
  "Email support@elitebiotechpeptides.com with the subject line 'Data Deletion Request'.",
  "Include the name, email address, and any account or platform details associated with your request so we can locate the correct records.",
  "If your request relates to Instagram, Facebook, YouTube, TikTok, or another connected platform, include the profile handle or link used to interact with Elite Biotech Peptides.",
  "We may request reasonable verification to confirm the request is being made by the correct person before deleting data.",
  "Once verified, we will review the request and delete or anonymize eligible data within a commercially reasonable timeframe, subject to any legal, tax, fraud-prevention, payment, or record-keeping obligations."
];

export default function DataDeletionPage() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <section className="rounded-[2rem] border border-neutral-800 bg-neutral-900/40 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
            Data Deletion
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Data Deletion Instructions
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-300">
            If you want Elite Biotech Peptides to delete personal information associated with
            your website inquiry, purchase-related communication, or approved connected platform
            interaction, follow the instructions below.
          </p>
        </section>

        <section className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white">How to request deletion</h2>
          <ol className="mt-4 space-y-4 text-sm leading-7 text-neutral-300">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-400/20 text-xs font-semibold text-sky-200">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white">Important notes</h2>
          <div className="mt-3 space-y-3 text-sm leading-7 text-neutral-300">
            <p>
              Some records may need to be retained for legal compliance, transaction integrity,
              fraud prevention, dispute handling, tax reporting, or security purposes.
            </p>
            <p>
              If your request involves data collected directly by a third-party platform, that
              platform may also require you to submit a deletion request through its own tools
              and policies.
            </p>
            <p>
              For questions about privacy or deletion requests, contact{" "}
              <a
                href="mailto:support@elitebiotechpeptides.com"
                className="text-sky-300 transition-colors hover:text-sky-200"
              >
                support@elitebiotechpeptides.com
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
