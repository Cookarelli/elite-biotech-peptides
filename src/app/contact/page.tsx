import { SiteShell } from "@/components/SiteShell";

export default function Contact() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
          <h1 className="text-3xl font-semibold">Procurement Contact</h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            Built for founder demos: clear inquiry channels, response expectations, and intake
            details for research buyers.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title="General Inquiries"
            value="support@catalystpeptides.com"
            note="Catalog questions, account setup, and order workflow."
          />
          <Card
            title="Procurement Desk"
            value="procurement@catalystpeptides.com"
            note="Bulk quotes, batch requests, and COA documentation."
          />
          <Card
            title="Response Window"
            value="< 1 business day"
            note="Priority response for active procurement conversations."
          />
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
          <h2 className="text-xl font-semibold">Inquiry Intake Template</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Use this structure for faster procurement routing.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Compound name(s)",
              "Target quantity per item",
              "Required concentration and vial format",
              "COA/batch documentation needed",
              "Shipping destination and timeline",
              "Organization name and point of contact",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-neutral-800 bg-neutral-950/40 px-4 py-3 text-sm text-neutral-300">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-neutral-500">
            Research use only. Not for human consumption. No medical claims.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}

function Card({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{title}</p>
      <p className="mt-2 text-sm font-semibold text-neutral-100">{value}</p>
      <p className="mt-2 text-xs text-neutral-400">{note}</p>
    </div>
  );
}
