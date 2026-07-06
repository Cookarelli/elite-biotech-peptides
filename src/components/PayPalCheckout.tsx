"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CartItem } from "@elite-biotech/shared";
import { useCart } from "@/components/CartProvider";

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError: (error: unknown) => void;
      }) => {
        render: (selectorOrElement: string | HTMLElement) => Promise<void>;
      };
    };
  }
}

export function PayPalCheckout({
  items,
  clientId,
  referralCode,
}: {
  items: CartItem[];
  clientId?: string;
  referralCode?: string;
}) {
  const router = useRouter();
  const { summary, clearCart } = useCart();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const payload = useMemo(
    () =>
      JSON.stringify({
        items: items.map((item) => ({ slug: item.slug, quantity: item.quantity })),
        referralCode,
      }),
    [items, referralCode]
  );

  useEffect(() => {
    async function renderButtons() {
      if (!scriptReady || !clientId || !window.paypal || !containerRef.current) {
        return;
      }

      containerRef.current.innerHTML = "";

      await window.paypal
        .Buttons({
          createOrder: async () => {
            setError(null);

            const response = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: payload,
            });

            const data = (await response.json()) as { id?: string; error?: string };

            if (!response.ok || !data.id) {
              throw new Error(data.error ?? "Unable to create PayPal order.");
            }

            return data.id;
          },
          onApprove: async (data) => {
            const response = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ orderId: data.orderID, items, referralCode }),
            });

            const payload = (await response.json()) as { error?: string };

            if (!response.ok) {
              throw new Error(payload.error ?? "Unable to capture PayPal payment.");
            }

            clearCart();
            router.push(`/cart/success?orderId=${encodeURIComponent(data.orderID)}`);
          },
          onError: (paypalError) => {
            const message =
              paypalError instanceof Error
                ? paypalError.message
                : "PayPal checkout could not be started.";
            setError(message);
          },
        })
        .render(containerRef.current);
    }

    renderButtons().catch((renderError) => {
      setError(
        renderError instanceof Error
          ? renderError.message
          : "PayPal checkout could not be loaded."
      );
    });
  }, [clearCart, clientId, items, payload, referralCode, router, scriptReady]);

  if (summary.lines.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
        Pay securely with PayPal
      </p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-300">
        Checkout runs through PayPal. Shipping is included in the total, and any 3+ vial discount is
        applied before payment.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
        <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1">
          Encrypted checkout
        </span>
        <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1">
          PayPal buyer protection
        </span>
        <span className="rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-1">
          Instant confirmation
        </span>
        {referralCode ? (
          <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sky-200">
            Referral {referralCode}
          </span>
        ) : null}
      </div>

      {!clientId ? (
        <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
          Add `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_ID`, and `PAYPAL_CLIENT_SECRET` in
          Vercel before launching live checkout.
        </div>
      ) : (
        <>
          <Script
            id="paypal-sdk"
            src={`https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture&components=buttons`}
            strategy="afterInteractive"
            onLoad={() => setScriptReady(true)}
          />
          <div ref={containerRef} className="mt-5 min-h-12 overflow-hidden rounded-2xl" />
        </>
      )}

      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
