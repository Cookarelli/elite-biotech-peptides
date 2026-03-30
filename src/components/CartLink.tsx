"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export function CartLink({ mobile = false }: { mobile?: boolean }) {
  const { summary } = useCart();

  return (
    <Link
      href="/cart"
      className={
        mobile
          ? "inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950 px-3 py-1.5 text-sm font-medium text-neutral-200"
          : "inline-flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-100 transition-colors hover:border-sky-400 hover:bg-sky-500/20"
      }
    >
      <span>Cart</span>
      <span className="rounded-full bg-neutral-950/70 px-2 py-0.5 text-xs text-neutral-100">
        {summary.count}
      </span>
    </Link>
  );
}
