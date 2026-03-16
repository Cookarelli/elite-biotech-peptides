import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { products } from "@/data/products";

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
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} className="h-80 w-full object-cover opacity-90" />
          <div className="p-7">
            <h1 className="text-3xl font-semibold">{p.name}</h1>
            <p className="mt-2 text-sm text-neutral-400">{p.category}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1 text-xs font-semibold text-neutral-200">
                {p.strengthMg} mg
              </span>
              <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1 text-xs font-semibold text-neutral-200">
                {p.volumeMl} mL vial
              </span>
            </div>
            <p className="mt-4 text-neutral-300">{p.description}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-7">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-neutral-200">Procurement</p>
              <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1 text-xs font-semibold text-neutral-200">
                {p.price}
              </span>
            </div>

            <p className="mt-3 text-sm text-neutral-400">
              Demo storefront: payments disabled. This is where checkout or inquiry flow would go.
            </p>
            <p className="mt-3 text-sm text-neutral-300">
              Selected format: {p.strengthMg} mg in {p.volumeMl} mL.
            </p>

            <button
              disabled
              className="mt-4 w-full cursor-not-allowed rounded-xl bg-neutral-800 px-4 py-3 text-sm font-semibold text-neutral-400"
              title="Checkout disabled for demo"
            >
              Add to Cart (Disabled)
            </button>

            <button
              className="mt-3 w-full rounded-xl border border-neutral-700 px-4 py-3 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900/60"
              onClick={() => alert("Demo: procurement request flow goes here.")}
            >
              Request Procurement (Demo)
            </button>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-7">
            <p className="text-sm font-semibold text-neutral-200">Handling and Storage</p>
            <p className="mt-2 text-sm text-neutral-300">
              {p.storage ?? "Store refrigerated. Protect from light."}
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-7">
            <p className="text-sm font-semibold text-neutral-200">COA</p>
            <p className="mt-2 text-sm text-neutral-400">
              Placeholder for demo. Production: batch ID plus PDF COA plus testing metadata.
            </p>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
