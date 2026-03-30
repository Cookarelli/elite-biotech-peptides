import Image from "next/image";
import Link from "next/link";
import { products, getProductFormat } from "@elite-biotech/shared";
import { ProductVisual } from "@/components/ProductVisual";
import { SiteShell } from "@/components/SiteShell";

const popularSlugs = ["tirzepatide", "retatrutide", "ipamorelin", "bpc-157"];
const popularProducts = popularSlugs
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));

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
    title: "Growth Hormone",
    body: "Core GH-axis products structured for side-by-side review instead of buried inside a crowded catalog.",
  },
];

export default function Home() {
  return (
    <SiteShell>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_540px] lg:items-stretch">
        <div className="relative overflow-hidden rounded-[2rem] border border-neutral-800 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.20),transparent_34%),linear-gradient(135deg,#0c1425_0%,#0a1120_52%,#060915_100%)] p-8 sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,transparent_45%,rgba(255,255,255,0.02)_46%,transparent_52%)]" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.24em] text-sky-300">ELITE BIOTECH PEPTIDES</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Trusted Elite Research Peptides
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              A cleaner, more inviting peptide storefront for repeat buyers: better product browsing,
              stronger pricing, and real cart checkout that keeps launch simple without making the
              site feel unfinished.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-xl bg-sky-400 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
              >
                Shop Products
              </Link>
              <Link
                href="/cart"
                className="rounded-xl border border-neutral-700 px-6 py-3 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900/60"
              >
                View Cart
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <ValueCard label="Pricing" value="10-15% below major online pricing" />
              <ValueCard label="Ordering" value="Cart + PayPal checkout" />
              <ValueCard label="Support" value="COA info on request" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:grid-rows-[minmax(0,1fr)_220px]">
          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-800 sm:row-span-2">
            <Image
              src={editorialImages.labWide}
              alt="Researcher working with precision instruments in a laboratory"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 540px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Buyer Experience</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-200">
                Designed to feel more like a real brand storefront and less like a sterile internal demo.
              </p>
            </div>
          </div>

          <PhotoCard
            src={editorialImages.pipette}
            alt="Close-up of laboratory handling and pipetting"
            label="Research workflow"
          />
          <PhotoCard
            src={editorialImages.flask}
            alt="Laboratory flask and research prep scene"
            label="Precision presentation"
          />
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_420px]">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-sky-300">WHY THIS FEELS BETTER</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Made to feel familiar and easy to revisit</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              "Less dashboard-style clutter and fewer fake system badges.",
              "Friendlier product hierarchy so buyers know where to click first.",
              "More visual storytelling through editorial imagery and cleaner spacing.",
              "Documentation support moved off-center so products stay the focus.",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-neutral-800 bg-neutral-950/40 p-4 text-sm leading-relaxed text-neutral-300">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-sky-500/10 to-neutral-900/40 p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-sky-300">HOW ORDERING WORKS</p>
          <div className="mt-4 space-y-4">
            <StepCard number="01" title="Browse the catalog" body="Compare products without needing an account wall before buyers can evaluate the lineup." />
            <StepCard number="02" title="Build your cart" body="Add products directly from the catalog or product pages and let the active discount tier apply automatically." />
            <StepCard number="03" title="Pay in PayPal" body="Checkout finishes in PayPal while shipping and post-purchase support stay handled from the business side." />
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500">SHOP BY FOCUS</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Popular Research Lanes</h2>
          </div>
          <Link
            href="/products"
            className="rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
          >
            Browse Full Catalog
          </Link>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {collections.map((item) => (
            <div key={item.title} className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6">
              <p className="text-lg font-semibold text-neutral-100">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-center">
        <div className="relative overflow-hidden rounded-[2rem] border border-neutral-800 min-h-[320px]">
          <Image
            src={editorialImages.flask}
            alt="Laboratory glassware and peptide research prep"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 420px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-sky-300">RESEARCH SUPPORT</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Support that feels human, not hidden</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300">
            Instead of pushing technical documentation in front of every product, the site keeps the
            catalog clean and makes support available when it is actually needed. Buyers can request
            COA information, shipping clarification, or procurement help directly without leaving
            the cart-first shopping flow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/request-documentation"
              className="rounded-xl bg-sky-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
            >
              Request COA Info
            </Link>
            <Link
              href="/faq"
              className="rounded-xl border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
            >
              Read FAQ
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500">FEATURED</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Popular Right Now</h2>
          </div>
          <div className="rounded-full border border-neutral-700 bg-neutral-900/50 px-4 py-2 text-xs font-semibold text-neutral-300">
            100 products with low-friction pricing and fast checkout
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
    </SiteShell>
  );
}

function ValueCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/55 px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">{label}</p>
      <p className="mt-1 text-sm font-semibold text-neutral-100">{value}</p>
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

function PhotoCard({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-neutral-800 min-h-[220px]">
      <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 640px) 270px, 100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/15 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">{label}</p>
      </div>
    </div>
  );
}
