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
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/products" className="transition-colors hover:text-sky-700">
          Products
        </Link>
        <span>/</span>
        <span className="text-slate-700">{p.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_420px]">
        <div className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm">
          <div className="p-4">
            <ProductVisual product={p} />
          </div>
          <div className="border-t border-sky-100 p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-950">{p.name}</h1>
                <p className="mt-2 text-sm text-slate-500">{p.category}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
                  Elite pricing
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-950">{p.price}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-slate-700">
                {getProductFormat(p)}
              </span>
              <span className="rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold text-sky-700">
                Elite Biotech label
              </span>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-slate-700">
                Research use only
              </span>
            </div>

            <p className="mt-5 text-slate-600">{p.description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <InfoChip label="Format" value={getProductFormat(p)} />
              <InfoChip label="Fulfillment" value="US shipping handled manually" />
              <InfoChip label="Order Benefit" value="15% off 3+ eligible vials" />
              <InfoChip label="Shipping" value="$10.95 under $150; free at $150+" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-sky-100 bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-slate-800">Ready to order?</p>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800">
                {p.price}
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Choose a quantity, add this item to cart, and finish payment through Venmo. COA information stays available as
              a separate support request when buyers need it before checkout.
            </p>
            <p className="mt-3 text-sm text-slate-600">Selected format: {getProductFormat(p)}.</p>

            <div className="mt-5 space-y-3">
              <AddToCartButton product={p} fullWidth showQuantity />
              <Link
                href="/products"
                className="block w-full rounded-xl border border-sky-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50"
              >
                Keep Browsing
              </Link>
              <Link
                href={`/request-documentation?product=${p.slug}`}
                className="block w-full rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-center text-sm font-semibold text-sky-700 transition-colors hover:border-sky-300 hover:bg-sky-100"
              >
                Request COA Info
              </Link>
            </div>

            <div className="mt-5 rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                Order incentives
              </p>
              <p className="mt-2 text-sm text-slate-600">
                3+ Vial Discount – 15% Off eligible vial items, with shipping calculated separately.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-sky-100 bg-white p-7 shadow-sm">
            <p className="text-sm font-bold text-slate-800">Handling and Storage</p>
            <p className="mt-2 text-sm text-slate-600">
              {p.storage ?? "Store refrigerated. Protect from light."}
            </p>
          </div>

          <div className="rounded-3xl border border-sky-100 bg-white p-7 shadow-sm">
            <p className="text-sm font-bold text-slate-800">Documentation note</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
    <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}
