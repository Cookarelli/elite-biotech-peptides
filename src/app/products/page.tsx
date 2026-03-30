import Image from "next/image";
import Link from "next/link";
import { products } from "@elite-biotech/shared";
import { SiteShell } from "@/components/SiteShell";
import { ProductCatalog } from "@/components/ProductCatalog";

const catalogImage =
  "https://images.pexels.com/photos/3735736/pexels-photo-3735736.jpeg?cs=srgb&dl=pexels-polina-tankilevitch-3735736.jpg&fm=jpg";

export default function ProductsPage() {
  return (
    <SiteShell>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center">
        <div className="rounded-[2rem] border border-neutral-800 bg-neutral-900 p-8 sm:p-10">
          <div className="relative max-w-4xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-sky-300">PRODUCTS</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Shop the full Elite Biotech catalog
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-300 sm:text-base">
              Built to feel more like a familiar peptide storefront: cleaner product cards,
              straightforward pricing, and a full catalog that is easier to scan from first visit to repeat order.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/cart"
                className="rounded-xl bg-sky-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
              >
                View Cart
              </Link>
              <Link
                href="/request-documentation"
                className="rounded-xl border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
              >
                Request COA Info
              </Link>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-4">
                <p className="text-xs font-semibold tracking-wide text-sky-200">PRICING RULE</p>
                <p className="mt-2 text-sm text-neutral-200">Core products run about 10-15% below major online pricing.</p>
              </div>
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                <p className="text-xs font-semibold tracking-wide text-cyan-200">ORDER TIER 1</p>
                <p className="mt-2 text-sm text-neutral-200">10% off orders over $100 plus free shipping.</p>
              </div>
              <div className="rounded-2xl border border-neutral-700 bg-neutral-950/60 p-4">
                <p className="text-xs font-semibold tracking-wide text-neutral-300">ORDER TIER 2</p>
                <p className="mt-2 text-sm text-neutral-200">15% off orders over $250 plus free shipping.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-neutral-800 min-h-[340px]">
          <Image
            src={catalogImage}
            alt="Researcher preparing compounds in a laboratory"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 380px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Storefront refresh</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-200">
              Cleaner product cards, clearer click targets, and a more familiar shop layout.
            </p>
          </div>
        </div>
      </section>

      <ProductCatalog products={products} />
    </SiteShell>
  );
}
