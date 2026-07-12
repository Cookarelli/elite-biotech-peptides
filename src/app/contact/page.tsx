import { BrandedVialShowcase } from "@/components/BrandedVialShowcase";
import { SiteShell } from "@/components/SiteShell";

export default function Contact() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div className="rounded-3xl border border-sky-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <h1 className="text-3xl font-bold text-slate-950">Procurement Contact</h1>
            <p className="mt-3 max-w-2xl text-slate-700">
              Clear inquiry channels, response expectations, and launch-time support for research buyers.
            </p>
          </div>

          <BrandedVialShowcase compact title="Clear support around each order" />
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title="General Inquiries"
            value="support@elitebiotechpeptides.com"
            note="Catalog questions, account setup, and order workflow."
          />
          <Card
            title="Procurement Desk"
            value="procurement@elitebiotechpeptides.com"
            note="Bulk quotes, documentation requests, and checkout support."
          />
          <Card
            title="Response Window"
            value="< 1 business day"
            note="Priority response for active procurement conversations."
          />
        </div>

        <div className="rounded-3xl border border-sky-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <h2 className="text-xl font-bold text-slate-950">Inquiry Intake Template</h2>
          <p className="mt-2 text-sm text-slate-600">
            Use this structure for faster procurement routing.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Compound name(s)",
              "Target quantity per item",
              "Required format or strength",
              "Documentation needed upon request",
              "Shipping destination and timeline",
              "Organization name and point of contact",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-sky-200 bg-sky-100/70 px-4 py-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-slate-600">
            Research use only. Not for human consumption. No medical claims.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}

function Card({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-sky-200 bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.07)]">
      <p className="text-xs font-bold uppercase tracking-wide text-sky-700">{title}</p>
      <p className="mt-2 text-sm font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-xs text-slate-600">{note}</p>
    </div>
  );
}
