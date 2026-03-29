import Image from "next/image";
import Link from "next/link";
import { products } from "@elite-biotech/shared";
import { ProductVisual } from "@/components/ProductVisual";
import { SiteShell } from "@/components/SiteShell";

const popularSlugs = ["tirzepatide", "semaglutide", "cjc-1295-with-dac", "bpc157"];
const popularProducts = popularSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

export default function Home() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.24),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.20),transparent_55%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-sky-300">ELITE BIOTECH PEPTIDES</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Trusted Elite Research Peptides
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              Premium research peptides for serious buyers: standardized 10 mL formats, clear
              concentrations, and a batch-ready COA workflow built to make Elite Biotech Peptides
              feel credible from first click.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-xl bg-sky-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
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

            <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold">
              <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-sky-200">
                10% off orders over $100
              </span>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-cyan-200">
                25% off orders over $250
              </span>
              <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1.5 text-neutral-300">
                Free shipping on both tiers
              </span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-neutral-800 bg-white/96 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <Image
              src="/brand/elite-biotech-peptides-logo.png"
              alt="Elite Biotech Peptides logo"
              width={420}
              height={280}
              className="h-auto w-full object-contain"
              priority
            />
            <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                Elite Biotech Peptides
              </p>
              <p className="mt-1 text-sm text-neutral-700">
                Branded research catalog with standardized formats and COA-ready batches.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 mt-2 grid gap-4 sm:grid-cols-3">
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

        <div className="mt-5 rounded-2xl border border-neutral-800 bg-neutral-900/30 px-4 py-4 text-sm text-neutral-300">
          High-intent buyers get rewarded fast: spend over <span className="font-semibold text-neutral-100">$100</span> for
          <span className="font-semibold text-emerald-300"> 10% off + free shipping</span>, or go over
          <span className="font-semibold text-neutral-100"> $250</span> for
          <span className="font-semibold text-cyan-300"> 25% off + free shipping</span>.
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {popularProducts.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-colors hover:border-neutral-700 hover:bg-neutral-900/70"
            >
              <ProductVisual product={p} compact />
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
              Most peptide sites compete on discount noise. Elite Biotech competes on structure: clean
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
