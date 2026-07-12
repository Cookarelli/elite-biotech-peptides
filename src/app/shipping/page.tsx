import { SiteShell } from "@/components/SiteShell";

export default function Shipping() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
          <h1 className="text-3xl font-semibold">Shipping & Handling</h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            Standard US shipping is $10.95 for orders under $150 and free at $150 or more.
            Most in-stock orders process in 1 to 2 business days.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <PolicyCard
            title="Processing Window"
            body="Most in-stock requests process in 1 to 2 business days."
          />
          <PolicyCard
            title="Packaging Standard"
            body="Insulated packing and temperature-aware handling notes when required."
          />
          <PolicyCard
            title="Tracking"
            body="Tracking details are issued as soon as fulfillment labels are created."
          />
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
          <h2 className="text-xl font-semibold">Shipping Coverage</h2>
          <div className="mt-4 space-y-3 text-sm text-neutral-300">
            <p>$10.95 standard shipping applies to orders under $150.</p>
            <p>Shipping is free for orders at $150 or more.</p>
            <p>Domestic US shipping with standard and expedited options.</p>
            <p>International requests are reviewed by destination before ordering.</p>
            <p>Cold-chain or specialty handling is disclosed per product as needed.</p>
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
          <h2 className="text-xl font-semibold">Returns & Resolution</h2>
          <div className="mt-4 space-y-3 text-sm text-neutral-300">
            <p>Report shipping damage within 48 hours of delivery with photos.</p>
            <p>Batch or documentation issues are reviewed through support and fulfillment records.</p>
            <p>Replacement and credit decisions are handled by support.</p>
          </div>
          <p className="mt-5 text-xs text-neutral-500">
            Products are listed for laboratory research use only.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}

function PolicyCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5">
      <h3 className="text-sm font-semibold text-neutral-100">{title}</h3>
      <p className="mt-2 text-sm text-neutral-300">{body}</p>
    </div>
  );
}
