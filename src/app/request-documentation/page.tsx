import Link from "next/link";
import { getProductBySlug, getProductFormat } from "@elite-biotech/shared";
import { DocumentationRequestForm } from "@/components/DocumentationRequestForm";
import { ProductVisual } from "@/components/ProductVisual";
import { SiteShell } from "@/components/SiteShell";

export default async function RequestDocumentationPage({
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
          Products
        </Link>
        <span>/</span>
        <span className="text-neutral-300">Request COA Information</span>
      </div>

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_460px]">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40">
            <div className="border-b border-neutral-800 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-transparent px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
                Elite Biotech Peptides
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl">
                Request COA Information
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300">
                Documentation is available upon request. Use this page when a buyer wants a closer
                review before checking out.
              </p>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-3">
              <DetailCard
                label="Focus"
                value="Product-first"
                note="COA stays secondary to checkout"
              />
              <DetailCard
                label="Turnaround"
                value="Manual reply"
                note="Support handles requests directly"
              />
              <DetailCard
                label="Ordering"
                value="Cart stays live"
                note="Buyers can still check out in PayPal"
              />
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
          ) : null}
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">
            Documentation Request
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-neutral-100">
            Open a support email with the details prefilled
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300">
            This keeps documentation requests available without pushing every buyer into a separate
            ordering workflow.
          </p>

          <div className="mt-6">
            <DocumentationRequestForm product={product} />
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
