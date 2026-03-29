import Link from "next/link";
import { products } from "@elite-biotech/shared";
import { SiteShell } from "@/components/SiteShell";
import { ProductCatalog } from "@/components/ProductCatalog";

export default function ProductsPage() {
  return (
    <SiteShell>
      <section className="relative overflow-hidden rounded-[2rem] border border-neutral-800 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_30%),linear-gradient(140deg,#0b1326_0%,#09111f_52%,#050916_100%)] p-8 sm:p-10">
        <div className="relative max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-sky-300">PRODUCTS</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Easier catalog browsing, broader selection, stronger pricing
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-300 sm:text-base">
            The catalog now mirrors the competitor’s visible assortment more closely, while keeping
            Elite’s friendlier browsing flow and manual invoice launch process. Mirrored products are
            set at least 25% below current Super Human retail where we have a direct public match.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/request-invoice"
              className="rounded-xl bg-sky-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
            >
              Request Invoice
            </Link>
            <Link
              href="/coa"
              className="rounded-xl border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
            >
              Open COA Library
            </Link>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-4">
              <p className="text-xs font-semibold tracking-wide text-sky-200">PRICING RULE</p>
              <p className="mt-2 text-sm text-neutral-200">25%+ under mirrored retail products.</p>
            </div>
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
              <p className="text-xs font-semibold tracking-wide text-cyan-200">ORDER TIER 1</p>
              <p className="mt-2 text-sm text-neutral-200">10% off orders over $100 plus free shipping.</p>
            </div>
            <div className="rounded-2xl border border-neutral-700 bg-neutral-950/60 p-4">
              <p className="text-xs font-semibold tracking-wide text-neutral-300">ORDER TIER 2</p>
              <p className="mt-2 text-sm text-neutral-200">25% off orders over $250 plus free shipping.</p>
            </div>
          </div>
        </div>
      </section>

      <ProductCatalog products={products} />
    </SiteShell>
  );
}
