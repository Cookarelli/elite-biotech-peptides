import Link from "next/link";
import { products } from "@elite-biotech/shared";
import { SiteShell } from "@/components/SiteShell";
import { ProductCatalog } from "@/components/ProductCatalog";

export default function ProductsPage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 p-8 sm:p-10">
        <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_18%_20%,rgba(16,185,129,0.20),transparent_42%),radial-gradient(circle_at_85%_24%,rgba(14,165,233,0.18),transparent_48%)]" />
        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.2em] text-sky-300">CATALOG</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Research Compound Storefront
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-neutral-300 sm:text-base">
            Founder-ready dark catalog built to look premium at first glance: strong product cards,
            structured concentrations, and a manual invoice flow that keeps launch operations simple.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/coa"
              className="rounded-xl bg-sky-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
            >
              Open COA Library
            </Link>
            <Link
              href="/request-invoice"
              className="rounded-xl border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
            >
              Request Invoice
            </Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-4">
              <p className="text-xs font-semibold tracking-wide text-sky-200">ORDER TIER 1</p>
              <p className="mt-2 text-sm text-neutral-200">10% off orders over $100 with free shipping.</p>
            </div>
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
              <p className="text-xs font-semibold tracking-wide text-cyan-200">ORDER TIER 2</p>
              <p className="mt-2 text-sm text-neutral-200">25% off orders over $250 with free shipping.</p>
            </div>
          </div>
        </div>
      </section>

      <ProductCatalog products={products} />
    </SiteShell>
  );
}
