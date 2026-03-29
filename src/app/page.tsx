import Image from "next/image";
import Link from "next/link";
import { products, getProductFormat } from "@elite-biotech/shared";
import { ProductVisual } from "@/components/ProductVisual";
import { SiteShell } from "@/components/SiteShell";

const popularSlugs = ["tirzepatide", "retatrutide", "ipamorelin", "bpc-157"];
const popularProducts = popularSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

const collections = [
  {
    title: "GLP & Metabolic",
    body: "Weight-management, mitochondrial, and appetite-related research compounds in one clear lane.",
  },
  {
    title: "Recovery & Repair",
    body: "Repair-focused peptides, blends, and support compounds grouped for easier browsing.",
  },
  {
    title: "Cognitive & Focus",
    body: "Nootropic and neuromodulation items presented with simpler product naming and format labels.",
  },
  {
    title: "Growth Hormone",
    body: "Core GHRH, secretagogue, and growth-factor products structured for side-by-side review.",
  },
];

export default function Home() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden rounded-[2rem] border border-neutral-800 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_36%),linear-gradient(135deg,#0b1326_0%,#09101d_48%,#050916_100%)] p-8 sm:p-10 lg:p-12">
        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-sky-300">ELITE BIOTECH PEPTIDES</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Trusted Elite Research Peptides
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              A more approachable peptide storefront: expanded catalog coverage, cleaner product
              formats, and manual invoice ordering that keeps launch simple while still feeling
              polished and easy to trust.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-xl bg-sky-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
              >
                Shop Products
              </Link>
              <Link
                href="/request-invoice"
                className="rounded-xl border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900/60"
              >
                Request Invoice
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

          <div className="rounded-[2rem] border border-neutral-800 bg-white/95 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
            <Image
              src="/brand/elite-biotech-peptides-logo.png"
              alt="Elite Biotech Peptides logo"
              width={420}
              height={280}
              className="h-auto w-full object-contain"
              priority
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ValueCard label="Expanded catalog" value={`${products.length} active products`} />
              <ValueCard label="Mirrored pricing" value="25%+ under key retail" />
              <ValueCard label="Ordering" value="Manual invoice at launch" />
              <ValueCard label="Trust signal" value="COA-ready batches" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_420px]">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-sky-300">WHY IT FEELS BETTER</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Built to be easier to browse</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              "Friendly category names instead of a wall of technical SKUs.",
              "Clear format labels so buyers know if they are looking at a vial, liquid, or capsules.",
              "Benchmark-aware pricing on mirrored products.",
              "A simple next step: browse, verify, then request an invoice.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-neutral-800 bg-neutral-950/40 p-4 text-sm leading-relaxed text-neutral-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-sky-500/10 to-neutral-900/40 p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-sky-300">HOW ORDERING WORKS</p>
          <div className="mt-4 space-y-4">
            <StepCard number="01" title="Browse the catalog" body="Compare formats, strengths, and benchmark pricing without needing an account first." />
            <StepCard number="02" title="Request a manual invoice" body="Send the item, quantity, and shipping details through the invoice form." />
            <StepCard number="03" title="Review and pay" body="Elite reviews the request and sends a PayPal invoice separately for launch-time checkout." />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500">SHOP BY FOCUS</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Popular Research Lanes</h2>
          </div>
          <Link
            href="/products"
            className="rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
          >
            Browse Full Catalog
          </Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {collections.map((item) => (
            <div key={item.title} className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6">
              <p className="text-lg font-semibold text-neutral-100">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500">FEATURED</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Popular Right Now</h2>
          </div>
          <div className="rounded-full border border-neutral-700 bg-neutral-900/50 px-4 py-2 text-xs font-semibold text-neutral-300">
            Mirrored products benchmarked below current Super Human retail
          </div>
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
                <p className="mt-2 text-xs text-neutral-400">{getProductFormat(p)} · {p.category}</p>
                {p.benchmarkRetailPrice ? (
                  <p className="mt-2 text-xs text-sky-200">
                    Benchmark retail <span className="line-through">{p.benchmarkRetailPrice}</span>
                  </p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

function ValueCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">{label}</p>
      <p className="mt-1 text-sm font-semibold text-neutral-800">{value}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-semibold text-sky-200">
          {number}
        </span>
        <div>
          <p className="text-sm font-semibold text-neutral-100">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-neutral-400">{body}</p>
        </div>
      </div>
    </div>
  );
}
