"use client";

import { useState } from "react";
import Link from "next/link";
import { getProductFormat, type Product } from "@elite-biotech/shared";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductVisual } from "@/components/ProductVisual";

export function ProductCard({ p }: { p: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)] transition-colors hover:border-sky-400">
        <Link href={`/products/${p.slug}`} className="block">
          <ProductVisual product={p} compact />
        </Link>

        <div className="flex flex-1 flex-col p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700">{p.category}</p>

          <div className="mt-2 flex items-start justify-between gap-3">
            <Link href={`/products/${p.slug}`} className="text-lg font-bold text-slate-950 transition-colors hover:text-sky-700">
              {p.name}
            </Link>
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-bold text-sky-800">
              {p.price}
            </span>
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-700">{p.description}</p>

          <div className="mt-4 grid gap-2 rounded-xl border border-sky-200 bg-sky-50 p-3 text-xs">
            <span className="font-bold text-slate-800">{getProductFormat(p)}</span>
            <span className="text-slate-600">Research use only</span>
            <span className="text-slate-600">Documentation available on request</span>
          </div>

          <div className="mt-auto grid gap-2 border-t border-sky-200 pt-4 text-xs">
            <AddToCartButton product={p} showQuantity fullWidth />
            <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/products/${p.slug}`}
              className="rounded-xl border border-sky-200 px-3 py-2 text-center font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50"
            >
              Details
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-xl border border-sky-200 bg-white px-3 py-2 font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50"
            >
              Quick view
            </button>
            </div>
          </div>
        </div>
      </article>

      {open ? (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-xl rounded-3xl border border-sky-200 bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${p.name} quick view`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-wide text-slate-500">Quick View</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-950">{p.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{p.category}</p>
              </div>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-bold text-sky-800">
                {p.price}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">{p.description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3 border-y border-sky-200 py-3 text-xs">
              <span className="font-semibold text-slate-700">{getProductFormat(p)}</span>
              <span className="h-3.5 w-px bg-sky-100" aria-hidden="true" />
              <span className="text-slate-500">COA on request</span>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Research use only. Not for human consumption. No medical claims.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <AddToCartButton product={p} showQuantity />
              <Link
                href={`/products/${p.slug}`}
                className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
                onClick={() => setOpen(false)}
              >
                Open Product Page
              </Link>
              <Link
                href={`/request-documentation?product=${p.slug}`}
                className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 transition-colors hover:border-sky-300 hover:bg-sky-100"
                onClick={() => setOpen(false)}
              >
                Request COA Info
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-sky-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
