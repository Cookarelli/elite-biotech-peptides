import Image from "next/image";
import Link from "next/link";
import { products, getProductFormat } from "@elite-biotech/shared";
import { ProductVisual } from "@/components/ProductVisual";
import { SiteShell } from "@/components/SiteShell";

const popularSlugs = ["tirzepatide", "retatrutide", "semaglutide", "bpc-157"];
const popularProducts = popularSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));
const newArrivals = products.slice(0, 4);

const editorialImages = {
  labWide:
    "https://images.pexels.com/photos/3912481/pexels-photo-3912481.jpeg?cs=srgb&dl=pexels-thisisengineering-3912481.jpg&fm=jpg",
  pipette:
    "https://images.pexels.com/photos/3735709/pexels-photo-3735709.jpeg?cs=srgb&dl=pexels-polina-tankilevitch-3735709.jpg&fm=jpg",
  flask:
    "https://images.pexels.com/photos/3735706/pexels-photo-3735706.jpeg?cs=srgb&dl=pexels-polina-tankilevitch-3735706.jpg&fm=jpg",
};

const collections = [
  {
    title: "Metabolic Research",
    body: "GLP, mitochondrial, and appetite-related compounds presented in a way that is easier to scan and compare.",
  },
  {
    title: "Recovery & Repair",
    body: "Repair-focused peptides, blends, and support compounds grouped into one straightforward lane.",
  },
  {
    title: "Cognitive & Focus",
    body: "Neuro and nootropic compounds with cleaner naming, friendlier product cards, and consistent call-to-action flow.",
  },
  {
    title: "Specialty Research",
    body: "High-interest specialty compounds and blends grouped into a cleaner section for repeat buyers.",
  },
];

export default function Home() {
  const productCountLabel = `${products.length} products`;

  return (
    <SiteShell>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_420px] lg:items-stretch">
        <div className="rounded-[2rem] border border-neutral-800 bg-neutral-900 p-8 sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Elite Biotech Peptides</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Trusted Elite Research Peptides
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            A cleaner, more familiar peptide storefront built for repeat buyers, fast checkout, and
            a catalog that is easy to browse on desktop or mobile.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-sky-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
            >
              Shop all products
            </Link>
            <Link
              href="/cart"
              className="rounded-xl border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-800"
            >
              View cart
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <ValueCard label="Pricing" value="About 10% below major online pricing" />
            <ValueCard label="Checkout" value="PayPal and card ready" />
            <ValueCard label="Support" value="COA info on request" />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-800 min-h-[280px]">
            <Image
              src={editorialImages.labWide}
              alt="Researcher working with precision instruments in a laboratory"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 420px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Fast browsing</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-200">
                Familiar storefront structure, straightforward pricing, and quicker reorders.
              </p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricBox title={productCountLabel} body="Broader catalog coverage." />
            <MetricBox title="US fulfillment" body="Handled from the business side." />
            <MetricBox title="Documentation" body="Available on request." />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500">BEST SELLERS</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Popular Right Now</h2>
          </div>
          <div className="rounded-full border border-neutral-700 bg-neutral-900/50 px-4 py-2 text-xs font-semibold text-neutral-300">
            {productCountLabel} with low-friction pricing and fast checkout
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
                <p className="mt-2 text-xs text-sky-200">Documentation available on request</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500">SHOP BY CATEGORY</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Popular Research Lanes</h2>
            </div>
            <Link
              href="/products"
              className="rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-600 hover:bg-neutral-800"
            >
              Browse full catalog
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {collections.map((item) => (
              <div key={item.title} className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6">
                <p className="text-lg font-semibold text-neutral-100">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-neutral-800 min-h-[360px]">
          <Image
            src={editorialImages.flask}
            alt="Laboratory glassware and research prep"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 360px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Research support</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Keep documentation available without cluttering the buy path</h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-200">
              Buyers can request COA information or product documentation when needed, while the storefront stays focused on products and checkout.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/request-documentation"
                className="rounded-xl bg-sky-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
              >
                Request COA info
              </Link>
              <Link
                href="/faq"
                className="rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10"
              >
                Read FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] border border-neutral-800 bg-neutral-900 p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500">NEW IN THE CATALOG</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">New Arrivals</h2>
          </div>
          <Link
            href="/products"
            className="rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-600 hover:bg-neutral-800"
          >
            View all products
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {newArrivals.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="rounded-3xl border border-neutral-800 bg-neutral-950 p-5 transition-colors hover:border-sky-500/30"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">{p.category}</p>
              <h3 className="mt-3 text-lg font-semibold text-neutral-100">{p.name}</h3>
              <p className="mt-2 text-sm text-neutral-400">{getProductFormat(p)}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-semibold text-white">{p.price}</span>
                <span className="text-xs font-semibold text-neutral-500">View product</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_420px]">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-sky-300">WHY BUYERS COME BACK</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Cleaner shopping flow, easier repeat orders</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              "Straightforward category organization without overloading each card with technical clutter.",
              "Consistent add-to-cart flow across desktop and mobile.",
              "Promotions and pricing are easy to understand before checkout starts.",
              "Support and documentation stay available without slowing down the storefront.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-sm leading-relaxed text-neutral-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-sky-300">HOW ORDERING WORKS</p>
          <div className="mt-4 space-y-4">
            <StepCard number="01" title="Browse the catalog" body="Start with best sellers or shop by category and compare products without distractions." />
            <StepCard number="02" title="Build your cart" body="Add products from the catalog or product page and let discounts apply automatically." />
            <StepCard number="03" title="Pay with PayPal" body="Checkout finishes in PayPal while fulfillment and support stay handled from the business side." />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function ValueCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">{label}</p>
      <p className="mt-1 text-sm font-semibold text-neutral-100">{value}</p>
    </div>
  );
}

function MetricBox({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm text-neutral-400">{body}</p>
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
