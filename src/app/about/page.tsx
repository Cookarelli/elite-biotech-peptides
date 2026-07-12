import { BrandedVialShowcase } from "@/components/BrandedVialShowcase";
import { SiteShell } from "@/components/SiteShell";

export default function About() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div className="rounded-3xl border border-sky-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
            <h1 className="text-3xl font-bold text-slate-950">Quality Framework</h1>
            <p className="mt-3 max-w-2xl text-slate-700">
              Elite Biotech Peptides is positioned around clean operations, consistent product
              presentation, and responsive procurement support instead of overloaded technical pages.
            </p>
          </div>

          <BrandedVialShowcase compact title="Quality starts with clear product presentation" />
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            [
              "1. Source & Intake",
              "Document supplier intake, lot references, and receiving condition checks before inventory release.",
            ],
            [
              "2. Storage Controls",
              "Use standardized handling and temperature guidance by product format to reduce process drift.",
            ],
            [
              "3. Inventory Traceability",
              "Keep internal lot mapping organized so support questions can be answered quickly during procurement review.",
            ],
            [
              "4. Documentation Requests",
              "Provide documentation during procurement conversations when buyers need batch or supplier support.",
            ],
            [
              "5. Customer Communication",
              "Keep labeling and policy language consistent across product, support, cart, and checkout pages.",
            ],
            [
              "6. Compliance Guardrails",
              "Maintain research-use-only positioning and avoid therapeutic or medical efficacy claims.",
            ],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-sky-200 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.07)]">
              <h2 className="text-base font-bold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm text-slate-700">{body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-sky-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <h2 className="text-xl font-bold text-slate-950">Compliance Note</h2>
          <p className="mt-3 text-sm text-slate-700">
            Products listed on this site are intended for laboratory research use only and are not
            for human consumption. No medical claims are made on this website.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
