"use client";

import Link from "next/link";
import { SHIPPING_RATE, VIAL_BUNDLE_DISCOUNT, formatUsd } from "@elite-biotech/shared";
import { useCart } from "@/components/CartProvider";
import { VenmoCheckout } from "@/components/VenmoCheckout";

export function CartClient({ venmoUrl }: { venmoUrl: string }) {
  const {
    items,
    summary,
    referralCode,
    updateItem,
    removeItem,
    setReferralCode,
    clearCart,
  } = useCart();
  const remainingEligibleVials = Math.max(
    0,
    VIAL_BUNDLE_DISCOUNT.minimumEligibleQuantity - summary.eligibleVialCount
  );

  if (summary.lines.length === 0) {
    return (
      <section className="mt-8 rounded-3xl border border-neutral-800 bg-neutral-900/40 p-8 text-center">
        <p className="text-lg font-semibold text-neutral-100">Your cart is empty.</p>
        <p className="mt-3 text-sm text-neutral-400">
          Add products from the catalog to start checkout.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/products"
            className="rounded-xl bg-sky-400 px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
          >
            Browse Products
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-neutral-700 px-5 py-3 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
          >
            Contact Support
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
      <div className="space-y-4">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
            <div>
              <p className="text-lg font-semibold text-neutral-100">Cart items</p>
              <p className="mt-1 text-sm text-neutral-400">
                Adjust quantities here before opening Venmo.
              </p>
            </div>
            <button
              type="button"
              onClick={clearCart}
              className="rounded-xl border border-neutral-700 px-3 py-2 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
            >
              Clear cart
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {summary.lines.map((line) => (
              <div
                key={line.product.slug}
                className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 sm:p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-neutral-100">
                      {line.product.name}
                    </p>
                    <p className="mt-1 text-sm text-neutral-400">
                      {line.product.formatLabel} · {line.product.category}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-neutral-400">
                      <Link
                        href={`/products/${line.product.slug}`}
                        className="text-sky-200 transition-colors hover:text-sky-100"
                      >
                        View product
                      </Link>
                      <Link
                        href={`/request-documentation?product=${line.product.slug}`}
                        className="text-neutral-300 transition-colors hover:text-neutral-100"
                      >
                        Request COA info
                      </Link>
                    </div>
                  </div>

                  <div className="grid gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-3 sm:grid-cols-[92px_minmax(0,1fr)_auto] sm:items-end sm:p-4 lg:min-w-[290px]">
                    <label className="text-xs text-neutral-400">
                      <span className="font-medium uppercase tracking-[0.16em] text-neutral-500">
                        Qty
                      </span>
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={line.quantity}
                        onChange={(e) =>
                          updateItem(
                            line.product.slug,
                            Number.parseInt(e.target.value, 10) || 1
                          )
                        }
                        className="mt-2 block w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm text-neutral-100 outline-none transition-colors focus:border-sky-400"
                      />
                    </label>
                    <div className="sm:text-right">
                      <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                        Item total
                      </p>
                      <p className="mt-2 text-sm text-neutral-400">{line.product.price} each</p>
                      <p className="mt-1 text-xl font-semibold text-neutral-100">
                        {formatUsd(line.lineTotal)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.product.slug)}
                      className="rounded-xl border border-neutral-700 px-4 py-2.5 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 lg:sticky lg:top-24">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6">
          <p className="text-lg font-semibold text-neutral-100">Order summary</p>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between text-neutral-300">
              <dt>Subtotal</dt>
              <dd>{formatUsd(summary.subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between text-neutral-300">
              <dt>Shipping</dt>
              <dd>{summary.shipping > 0 ? formatUsd(summary.shipping) : "Free"}</dd>
            </div>
            {summary.discountAmount > 0 ? (
              <div className="flex items-center justify-between text-sky-200">
                <dt>{summary.discountLabel}</dt>
                <dd>-{formatUsd(summary.discountAmount)}</dd>
              </div>
            ) : (
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-3 text-neutral-400">
                Add {remainingEligibleVials} more eligible vial
                {remainingEligibleVials === 1 ? "" : "s"} to unlock 15% off eligible vial items.
              </div>
            )}
            <div className="flex items-center justify-between border-t border-neutral-800 pt-3 text-base font-semibold text-neutral-100">
              <dt>Total</dt>
              <dd>{formatUsd(summary.total)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-neutral-500">
            {summary.shipping > 0
              ? `${SHIPPING_RATE.label}; ${SHIPPING_RATE.freeLabel.toLowerCase()}.`
              : SHIPPING_RATE.freeLabel}
          </p>

          <div className="mt-5 rounded-2xl border border-neutral-800 bg-neutral-950/50 p-4">
            <label htmlFor="referral-code" className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                Referral code
              </span>
              <input
                id="referral-code"
                type="text"
                value={referralCode}
                onChange={(event) => setReferralCode(event.target.value)}
                placeholder="Optional code"
                autoComplete="off"
                className="mt-3 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2.5 text-sm uppercase text-neutral-100 outline-none transition-colors placeholder:normal-case placeholder:text-neutral-500 focus:border-sky-400"
              />
            </label>
            <p className="mt-2 text-xs leading-relaxed text-neutral-500">
              Referral codes are recorded for order follow-up and do not change the cart total yet.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <TrustNote
              title="Venmo payment"
              body="Use the Venmo button with the exact total and order note shown below."
            />
            <TrustNote
              title="Discount applied"
              body="Eligible vial discounts are already reflected in the total shown here."
            />
            <TrustNote
              title="Shipping"
              body="$10.95 standard shipping applies under $150; orders at $150+ ship free."
            />
          </div>
        </div>

        <VenmoCheckout items={items} venmoUrl={venmoUrl} referralCode={referralCode} />

        <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            Need documentation first?
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-300">
            COA and supporting product documentation can be requested before purchase when needed.
          </p>
          <Link
            href="/request-documentation"
            className="mt-4 inline-flex rounded-xl border border-neutral-700 px-4 py-3 text-sm font-semibold text-neutral-100 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
          >
            Request COA Information
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrustNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-neutral-300">{body}</p>
    </div>
  );
}
