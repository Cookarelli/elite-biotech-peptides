import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

export default async function CartSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-neutral-800 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_30%),linear-gradient(140deg,#0b1326_0%,#09111f_52%,#050916_100%)] p-8 text-center sm:p-10">
        <p className="text-xs font-semibold tracking-[0.22em] text-sky-300">PAYMENT CONFIRMED</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Your order was sent to PayPal successfully
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
          We can now handle fulfillment from the business side. Keep the order ID below for your
          records while shipping is processed manually.
        </p>

        {orderId ? (
          <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              PayPal order ID
            </p>
            <p className="mt-2 break-all text-sm font-semibold text-neutral-100">{orderId}</p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/products"
            className="rounded-xl bg-sky-400 px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
          >
            Continue Shopping
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-neutral-700 px-5 py-3 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
          >
            Contact Support
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
