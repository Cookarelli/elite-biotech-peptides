import Link from "next/link";
import { products } from "@elite-biotech/shared";
import { SiteShell } from "@/components/SiteShell";
import { ProductCatalog } from "@/components/ProductCatalog";

export default function ProductsPage() {
  return (
    <SiteShell>
      <section className="rounded-2xl border border-sky-200 bg-white p-5 shadow-[0_14px_36px_rgba(15,23,42,0.07)] sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-sky-700">PRODUCTS</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Shop Elite Biotech
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700">
              Search first, choose quantities, and check out through Venmo.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cart"
              className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-600"
            >
              View Cart
            </Link>
            <Link
              href="/request-documentation"
              className="rounded-xl border border-sky-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50"
            >
              COA Info
            </Link>
          </div>
        </div>
      </section>

      <ProductCatalog products={products} />
    </SiteShell>
  );
}
