import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductFormat, products } from "@elite-biotech/shared";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductVisual } from "@/components/ProductVisual";
import { SiteShell } from "@/components/SiteShell";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return notFound();

  return (
    <SiteShell>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
        <Link href="/products" className="transition-colors hover:text-neutral-200">
          Products
        </Link>
        <span>/</span>
        <span className="text-neutral-300">{p.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_420px]">
        <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40">
          <div className="p-4">
            <ProductVisual product={p} />
          </div>
          <div className="border-t border-neutral-800 p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold">{p.name}</h1>
                <p className="mt-2 text-sm text-neutral-400">{p.category}</p>
              </div>
              <div className="text-right">
                {p.benchmarkRetailPrice ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                    Mirrored retail benchmark
                  </p>
                ) : null}
                {p.benchmarkRetailPrice ? (
                  <p className="mt-1 text-sm text-neutral-500 line-through">{p.benchmarkRetailPrice}</p>
                ) : null}
                <p className="mt-1 text-2xl font-semibold text-neutral-100">{p.price}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1 text-xs font-semibold text-neutral-200">
                {getProductFormat(p)}
              </span>
              <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200">
                Elite Biotech label
              </span>
              <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1 text-xs font-semibold text-neutral-200">
                Research use only
              </span>
            </div>

            <p className="mt-5 text-neutral-300">{p.description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <InfoChip label="Format" value={getProductFormat(p)} />
              <InfoChip label="Fulfillment" value="US shipping handled manually" />
              <InfoChip label="Promo Tiers" value="$100 / $250" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-sky-500/10 to-neutral-900/40 p-7">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-200">Ready to order?</p>
              <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1 text-xs font-semibold text-neutral-200">
                {p.price}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              Add this item to cart and finish payment in PayPal. COA information stays available as
              a separate support request when buyers need it before checkout.
            </p>
            <p className="mt-3 text-sm text-neutral-300">Selected format: {getProductFormat(p)}.</p>

            <div className="mt-5 space-y-3">
              <AddToCartButton product={p} fullWidth />
              <Link
                href="/products"
                className="block w-full rounded-xl border border-neutral-700 px-4 py-3 text-center text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900/60"
              >
                Keep Browsing
              </Link>
              <Link
                href={`/request-documentation?product=${p.slug}`}
                className="block w-full rounded-xl border border-sky-500/40 bg-sky-500/10 px-4 py-3 text-center text-sm font-semibold text-sky-100 transition-colors hover:border-sky-400 hover:bg-sky-500/20"
              >
                Request COA Info
              </Link>
            </div>

            <div className="mt-5 rounded-2xl border border-neutral-800 bg-neutral-950/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
                Order incentives
              </p>
              <p className="mt-2 text-sm text-neutral-300">10% off orders over $100 with free shipping.</p>
              <p className="mt-1 text-sm text-neutral-300">25% off orders over $250 with free shipping.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-7">
            <p className="text-sm font-semibold text-neutral-200">Handling and Storage</p>
            <p className="mt-2 text-sm text-neutral-300">
              {p.storage ?? "Store refrigerated. Protect from light."}
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-7">
            <p className="text-sm font-semibold text-neutral-200">Documentation note</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              Pricing and format details are aligned to Elite’s current catalog. COA information is
              available on request instead of crowding the main buying path.
            </p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/40 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-neutral-100">{value}</p>
    </div>
  );
}
