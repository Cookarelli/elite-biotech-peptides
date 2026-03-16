import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { products } from "@/data/products";

const popularSlugs = ["tirzepatide", "semaglutide", "cjc-1295-with-dac", "bpc157"];
const popularProducts = popularSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function Home() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.24),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.20),transparent_55%)]" />
        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.22em] text-emerald-300">CATALYST PEPTIDES</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            A Cleaner, Premium Research Storefront
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            Built for serious buyers: standardized 10 mL formats, clear concentrations, and a
            batch-ready COA workflow that feels investor-grade from first click.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-emerald-400"
            >
              Browse Compounds
            </Link>
            <Link
              href="/coa"
              className="rounded-xl border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900/60"
            >
              View COA Library
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["23", "Core catalog products"],
              ["10 mL", "Standardized vial format"],
              ["COA-ready", "Batch documentation structure"],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-2xl border border-neutral-800 bg-neutral-950/30 p-5">
                <p className="text-2xl font-semibold text-neutral-100">{title}</p>
                <p className="mt-1 text-sm text-neutral-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500">FEATURED</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Popular Right Now</h2>
          </div>
          <Link
            href="/products"
            className="rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
          >
            View Full Catalog
          </Link>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {popularProducts.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-colors hover:border-neutral-700 hover:bg-neutral-900/70"
            >
              <div className="relative h-36 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 to-transparent" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-neutral-100">{p.name}</h3>
                  <span className="rounded-full border border-neutral-700 bg-neutral-950/70 px-2.5 py-1 text-[11px] font-semibold text-neutral-200">
                    {p.price}
                  </span>
                </div>
                <p className="mt-2 text-xs text-neutral-400">
                  {p.strengthMg} mg · {p.volumeMl} mL · {p.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-7">
          <h2 className="text-xl font-semibold tracking-tight">Catalog Clarity</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-300">
            <li>One flagship mg format per product</li>
            <li>Searchable compounds and category chips</li>
            <li>Clean product detail pages for procurement review</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-7">
          <h2 className="text-xl font-semibold tracking-tight">Quality Positioning</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-300">
            <li>Batch-indexed COA library layout</li>
            <li>Storage guidance and handling notes</li>
            <li>Research-only messaging across all pages</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-7">
          <h2 className="text-xl font-semibold tracking-tight">Founder Demo Ready</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-300">
            <li>Dark biotech visual language</li>
            <li>Consistent pricing and concentration display</li>
            <li>Fast path to live inquiry or checkout later</li>
          </ul>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Why Buyers Switch</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-300">
            <p>
              Most peptide sites compete on discount noise. Catalyst competes on structure: clean
              catalog logic, consistent concentrations, and a quality framework teams can verify.
            </p>
            <p>
              That means faster procurement decisions and stronger founder confidence during partner
              conversations.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Research FAQ</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-300">
            <div>
              <p className="font-semibold text-neutral-100">What are peptides?</p>
              <p className="mt-1">
                Peptides are short amino-acid chains used in many laboratory signaling and pathway
                studies.
              </p>
            </div>
            <div>
              <p className="font-semibold text-neutral-100">What can these products be used for?</p>
              <p className="mt-1">
                Catalog items are presented for laboratory research purposes only. No products are
                intended for human consumption, and no medical claims are made.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
