import Link from "next/link";
import { products, getProductFormat } from "@elite-biotech/shared";
import { BrandedVialShowcase } from "@/components/BrandedVialShowcase";
import { ProductVisual } from "@/components/ProductVisual";
import { SiteShell } from "@/components/SiteShell";
import { SpecialsSignupForm } from "@/components/SpecialsSignupForm";

const popularSlugs = ["tirzepatide", "reta", "semaglutide", "bpc-157"];
const popularProducts = popularSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));
const newArrivals = products.slice(0, 4);

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
        <div className="rounded-[2rem] border border-sky-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">Elite Biotech Peptides</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Trusted Elite Research Peptides
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
            A brighter, product-first storefront built for repeat buyers, quick quantities, and a
            catalog that is easy to browse on desktop or mobile.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-600"
            >
              Shop all products
            </Link>
            <Link
              href="/cart"
              className="rounded-xl border border-sky-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-sky-300 hover:bg-sky-50"
            >
              View cart
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <ValueCard label="Pricing" value="About 10% below major online pricing" />
            <ValueCard label="Checkout" value="Venmo payment ready" />
            <ValueCard label="Support" value="COA info on request" />
          </div>
        </div>

        <div className="grid gap-4">
          <BrandedVialShowcase
            title="Branded vial presentation"
            body="Storefront visuals now focus on Elite Biotech labeled research vials instead of stock lab photography."
          />
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
            <p className="text-xs font-bold tracking-[0.18em] text-sky-700">BEST SELLERS</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Popular Right Now</h2>
          </div>
          <div className="rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm">
            {productCountLabel} with low-friction pricing and fast checkout
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {popularProducts.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.07)] transition-colors hover:border-sky-200 hover:bg-sky-50/50"
            >
              <ProductVisual product={p} compact />
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                  <span className="rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-800">
                    {p.price}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-600">{getProductFormat(p)} · {p.category}</p>
                <p className="mt-2 text-xs font-semibold text-sky-700">Documentation available on request</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-3xl border border-sky-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-sky-700">SHOP BY CATEGORY</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Popular Research Lanes</h2>
            </div>
            <Link
              href="/products"
              className="rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50"
            >
              Browse full catalog
            </Link>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {collections.map((item) => (
              <div key={item.title} className="rounded-3xl border border-sky-200 bg-sky-100/60 p-6">
                <p className="text-lg font-bold text-slate-900">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <BrandedVialShowcase
          compact
          title="Documentation stays simple"
          body="COA requests stay available while the main path stays focused on finding products and building a cart."
        />
      </section>

      <section className="mt-12 rounded-[2rem] border border-sky-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-sky-700">NEW IN THE CATALOG</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">New Arrivals</h2>
          </div>
          <Link
            href="/products"
            className="rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50"
          >
            View all products
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {newArrivals.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="rounded-3xl border border-sky-200 bg-sky-100/60 p-5 transition-colors hover:border-sky-300"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">{p.category}</p>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{p.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{getProductFormat(p)}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-bold text-slate-950">{p.price}</span>
                <span className="text-xs font-semibold text-sky-700">View product</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_420px]">
        <div className="rounded-3xl border border-sky-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-bold tracking-[0.18em] text-sky-700">WHY BUYERS COME BACK</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Cleaner shopping flow, easier repeat orders</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              "Straightforward category organization without overloading each card with technical clutter.",
              "Consistent add-to-cart flow across desktop and mobile.",
              "Promotions and pricing are easy to understand before checkout starts.",
              "Support and documentation stay available without slowing down the storefront.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-sky-200 bg-sky-100/60 p-4 text-sm leading-relaxed text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-sky-200 bg-white p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-bold tracking-[0.18em] text-sky-700">HOW ORDERING WORKS</p>
          <div className="mt-4 space-y-4">
            <StepCard number="01" title="Browse the catalog" body="Start with best sellers or shop by category and compare products without distractions." />
            <StepCard number="02" title="Build your cart" body="Add products from the catalog or product page and let discounts apply automatically." />
            <StepCard number="03" title="Pay with Venmo" body="Checkout opens Venmo with the exact cart total and order note." />
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-6 rounded-[2rem] border border-sky-200 bg-white p-6 shadow-[0_14px_36px_rgba(15,23,42,0.07)] sm:p-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
            Birthday and Specials
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            Get optional updates without changing checkout
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-base">
            Join the interest list for birthday notes, occasional specials, and product updates.
            Signup is optional and never required to browse, cart, or purchase.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <ValueCard label="Optional" value="Purchase flow stays open" />
            <ValueCard label="Birthday" value="Month and day only" />
            <ValueCard label="Consent" value="Promos require opt-in" />
          </div>
        </div>

        <div className="rounded-3xl border border-sky-200 bg-sky-100/70 p-5 sm:p-6">
          <SpecialsSignupForm />
        </div>
      </section>
    </SiteShell>
  );
}

function ValueCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-sky-200 bg-sky-100 px-4 py-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

function MetricBox({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-sky-200 bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
      <p className="text-lg font-bold text-slate-950">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
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
    <div className="rounded-2xl border border-sky-200 bg-sky-100/70 p-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sky-200 bg-white text-xs font-bold text-sky-700">
          {number}
        </span>
        <div>
          <p className="text-sm font-bold text-slate-900">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">{body}</p>
        </div>
      </div>
    </div>
  );
}
