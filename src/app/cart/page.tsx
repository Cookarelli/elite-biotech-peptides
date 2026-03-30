import Link from "next/link";
import { env } from "@/lib/env";
import { SiteShell } from "@/components/SiteShell";
import { CartClient } from "@/components/CartClient";

export default function CartPage() {
  return (
    <SiteShell>
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
        <Link href="/products" className="transition-colors hover:text-neutral-200">
          Products
        </Link>
        <span>/</span>
        <span className="text-neutral-300">Cart</span>
      </div>

      <section className="rounded-[2rem] border border-neutral-800 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_30%),linear-gradient(140deg,#0b1326_0%,#09111f_52%,#050916_100%)] p-8 sm:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-sky-300">CHECKOUT</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Review your cart and pay with PayPal
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
            Your cart applies the same order incentives shown across the site. Documentation stays
            available on request, but the storefront now supports a real checkout path for launch.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-200">
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1">
              Secure PayPal checkout
            </span>
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1">
              Free shipping built in
            </span>
            <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1">
              COA information on request
            </span>
          </div>
        </div>
      </section>

      <CartClient clientId={env.NEXT_PUBLIC_PAYPAL_CLIENT_ID} />
    </SiteShell>
  );
}
