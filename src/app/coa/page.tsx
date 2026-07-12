import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

export default function DocumentationPage() {
  return (
    <SiteShell>
      <div className="space-y-6">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8">
          <h1 className="text-3xl font-semibold">Documentation Requests</h1>
          <p className="mt-3 max-w-2xl text-neutral-300">
            COA information is available upon request. If you need a closer product review before
            ordering, request it here and Elite Biotech Peptides will follow up.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/request-documentation"
              className="rounded-xl bg-sky-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
            >
              Request COA Info
            </Link>
            <Link
              href="/cart"
              className="rounded-xl border border-neutral-700 px-5 py-2.5 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
            >
              View Cart
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <SupportCard title="COA Information" body="Available upon request before checkout." />
          <SupportCard title="Response" body="Requests are reviewed and answered by support." />
          <SupportCard title="Ordering" body="You can request documentation first or continue shopping when ready." />
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
