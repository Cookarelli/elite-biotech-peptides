import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProductFormat } from "@elite-biotech/shared";
import { InvoiceRequestForm } from "@/components/InvoiceRequestForm";
import { ProductVisual } from "@/components/ProductVisual";
import { SiteShell } from "@/components/SiteShell";

export default async function RequestInvoicePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: productSlug } = await searchParams;
  const product = getProductBySlug(productSlug);

  return (
    <SiteShell>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
        <Link href="/products" className="transition-colors hover:text-neutral-200">
          Compounds
        </Link>
        <span>/</span>
        <span className="text-neutral-300">Request Invoice</span>
      </div>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_460px]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40">
            <div className="border-b border-neutral-800 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-transparent px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                Elite Biotech Peptides
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl">
                Request a Manual Invoice
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
                For launch, Elite Biotech Peptides can review your request and send a PayPal invoice
                separately after confirming the order details. This keeps the storefront clean while
                you finalize payment operations.
              </p>
            </div>

            <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-200">
                    Manual PayPal invoice
                  </span>
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                    Free shipping promos still apply
                  </span>
                  <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1 text-xs font-semibold text-neutral-300">
                    Research use only
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <DetailCard
                    label="Orders over $100"
                    value="10% off"
                    note="Free shipping included"
                  />
                  <DetailCard
                    label="Orders over $250"
                    value="25% off"
                    note="Free shipping included"
                  />
                  <DetailCard
                    label="Turnaround"
                    value="Manual review"
                    note="Invoice sent after order review"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-neutral-800 bg-white/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
                <Image
                  src="/brand/elite-biotech-peptides-logo.png"
                  alt="Elite Biotech Peptides logo"
                  width={280}
                  height={220}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {product ? (
            <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40">
              <div className="p-4">
                <ProductVisual product={product} compact />
              </div>
              <div className="border-t border-neutral-800 p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                      Selected Product
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-neutral-100">{product.name}</h2>
                    <p className="mt-2 text-sm text-neutral-400">{product.description}</p>
                  </div>
                  <span className="rounded-full border border-neutral-700 bg-neutral-950/70 px-3 py-1 text-sm font-semibold text-neutral-100">
                    {product.price}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1 text-xs font-semibold text-neutral-200">
                    {getProductFormat(product)}
                  </span>
                  <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1 text-xs font-semibold text-neutral-200">
                    {product.category}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                Catalog Inquiry
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-neutral-100">
                Start with a general request
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
                If you are still deciding on compounds or want a mixed order, send one request here
                and we can quote the final lineup before invoicing.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
            Invoice Request
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-100">
            Send order details for review
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300">
            Fill this out once and the product, pricing, and format details will be included in the
            request. Elite can then reply with next steps and a PayPal invoice from the business side.
          </p>

          <div className="mt-6">
            <InvoiceRequestForm product={product} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function DetailCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-base font-semibold text-neutral-100">{value}</p>
      <p className="mt-1 text-sm text-neutral-400">{note}</p>
    </div>
  );
}
