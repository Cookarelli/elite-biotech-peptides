import { SiteShell } from "@/components/SiteShell";

export default function About() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
          <h1 className="text-3xl font-semibold">Quality Framework</h1>
          <p className="mt-3 text-neutral-300">
            Elite Biotech Peptides is designed to lead with transparent quality operations instead
            of generic marketing claims. This page is built as a founder-ready framework you can
            present to partners and cofounders.
          </p>
        </div>

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
              "3. Batch Traceability",
              "Assign internal batch IDs that map directly to COA entries and procurement records.",
            ],
            [
              "4. COA Publication",
              "Publish lot-level COA files with test date, assay method, and reporting lab metadata.",
            ],
            [
              "5. Customer Communication",
              "Keep labeling and policy language consistent across product, COA, and support pages.",
            ],
            [
              "6. Compliance Guardrails",
              "Maintain research-use-only positioning and avoid therapeutic or medical efficacy claims.",
            ],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
              <h2 className="text-base font-semibold text-neutral-100">{title}</h2>
              <p className="mt-2 text-sm text-neutral-300">{body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
          <h2 className="text-xl font-semibold">Compliance Note</h2>
          <p className="mt-3 text-sm text-neutral-300">
            Products listed on this site are intended for laboratory research use only and are not
            for human consumption. No medical claims are made on this website.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
