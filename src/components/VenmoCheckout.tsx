"use client";

import type { CartItem } from "@elite-biotech/shared";
import { formatUsd } from "@elite-biotech/shared";
import { useCart } from "@/components/CartProvider";

export function VenmoCheckout({
  items,
  venmoUrl,
  referralCode,
}: {
  items: CartItem[];
  venmoUrl: string;
  referralCode?: string;
}) {
  const { summary } = useCart();

  if (summary.lines.length === 0) {
    return null;
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const paymentNote = [
    `Elite Biotech order`,
    `${itemCount} item${itemCount === 1 ? "" : "s"}`,
    `Total ${formatUsd(summary.total)}`,
    referralCode ? `Referral ${referralCode}` : null,
  ]
    .filter(Boolean)
    .join(" - ");

  const checkoutUrl = buildVenmoUrl(venmoUrl, paymentNote);

  return (
    <div className="rounded-3xl border border-sky-500/25 bg-sky-500/10 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
        Pay with Venmo
      </p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-200">
        Tap the button below to open Venmo. Send the exact cart total shown here, then include the
        order note so fulfillment can match your payment.
      </p>

      <div className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-950/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Venmo note
        </p>
        <p className="mt-2 break-words text-sm font-semibold text-neutral-100">{paymentNote}</p>
      </div>

      <a
        href={checkoutUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex w-full justify-center rounded-xl bg-sky-400 px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
      >
        Open Venmo to Pay {formatUsd(summary.total)}
      </a>

      <p className="mt-3 text-xs leading-relaxed text-neutral-400">
        This is a temporary Venmo payment link. The final Venmo QR or profile URL can be swapped in
        without changing the cart flow.
      </p>
    </div>
  );
}

function buildVenmoUrl(baseUrl: string, note: string) {
  try {
    const url = new URL(baseUrl);
    if (!url.searchParams.has("note")) {
      url.searchParams.set("note", note);
    }
    return url.toString();
  } catch {
    return baseUrl;
  }
}
