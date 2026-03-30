import Image from "next/image";
import { SiteShell } from "@/components/SiteShell";

const qualityImage =
  "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?cs=srgb&dl=pexels-polina-tankilevitch-3735709.jpg&fm=jpg";

export default function About() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
            <h1 className="text-3xl font-semibold">Quality Framework</h1>
            <p className="mt-3 max-w-2xl text-neutral-300">
              Elite Biotech Peptides is positioned around clean operations, consistent product
              presentation, and responsive procurement support instead of overloaded technical pages.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-800 min-h-[280px]">
            <Image
              src={qualityImage}
              alt="Laboratory workflow and sample preparation"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
          </div>
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
