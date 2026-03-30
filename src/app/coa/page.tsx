import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

export default function DocumentationPage() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
          <h1 className="text-3xl font-semibold">Documentation Requests</h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            Supporting documentation is handled during procurement review instead of being shown as a
            front-and-center product feature. If your team needs batch support or supplier-facing
            documentation, request it directly and Elite can provide it upon review.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/request-invoice"
              className="rounded-xl bg-sky-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
            >
              Request Invoice
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
            >
              Contact Procurement
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <SupportCard title="Documentation" body="Available upon request during active procurement conversations." />
          <SupportCard title="Response" body="Requests are reviewed by the procurement support desk." />
          <SupportCard title="Workflow" body="Product browsing stays clean while support stays available when it matters." />
        </div>
      </div>
    </SiteShell>
  );
}

function SupportCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-5">
      <p className="text-sm font-semibold text-neutral-100">{title}</p>
      <p className="mt-2 text-sm text-neutral-300">{body}</p>
    </div>
  );
}
