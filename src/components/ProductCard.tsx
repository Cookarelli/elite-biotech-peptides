"use client";

import { useState } from "react";
import Link from "next/link";
import { getProductFormat, type Product } from "@elite-biotech/shared";
import { ProductVisual } from "@/components/ProductVisual";

export function ProductCard({ p }: { p: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/50 transition-all hover:-translate-y-0.5 hover:border-neutral-600 hover:bg-neutral-900/80">
        <Link href={`/products/${p.slug}`} className="block">
          <ProductVisual product={p} compact />
        </Link>

        <div className="flex flex-1 flex-col p-5">
          {p.benchmarkRetailPrice ? (
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
              <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 text-sky-100">
                25%+ under retail
              </span>
              <span className="text-neutral-500 line-through">{p.benchmarkRetailPrice}</span>
            </div>
          ) : null}

          <div className="flex items-start justify-between gap-3">
            <Link href={`/products/${p.slug}`} className="text-base font-semibold text-neutral-100 transition-colors hover:text-white">
              {p.name}
            </Link>
            <span className="rounded-full border border-neutral-700 bg-neutral-950/70 px-3 py-1 text-xs font-semibold text-neutral-200">
              {p.price}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-neutral-400">{p.description}</p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-neutral-700 bg-neutral-950/70 px-2.5 py-1 text-neutral-300">
              {getProductFormat(p)}
            </span>
            <span className="rounded-full border border-neutral-700 bg-neutral-950/70 px-2.5 py-1 text-neutral-300">
              Batch tracked
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-neutral-800 pt-4 text-xs">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 font-semibold text-neutral-200 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
            >
              Quick View
            </button>
            <Link
              href={`/products/${p.slug}`}
              className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 font-semibold text-sky-100 transition-colors hover:border-sky-400 hover:bg-sky-500/20"
            >
              View Details
            </Link>
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
            className="w-full max-w-xl rounded-3xl border border-neutral-700 bg-neutral-950 p-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${p.name} quick view`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wide text-neutral-500">Quick View</p>
                <h3 className="mt-1 text-2xl font-semibold text-neutral-100">{p.name}</h3>
                <p className="mt-1 text-sm text-neutral-400">{p.category}</p>
              </div>
              <span className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-sm font-semibold text-neutral-100">
                {p.price}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-neutral-300">{p.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs text-neutral-300">
                {getProductFormat(p)}
              </span>
              <span className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs text-neutral-300">
                COA-ready
              </span>
            </div>

            {p.benchmarkRetailPrice ? (
              <p className="mt-4 text-xs text-sky-200">
                Retail benchmark: <span className="line-through">{p.benchmarkRetailPrice}</span>
              </p>
            ) : null}

            <p className="mt-4 text-xs text-neutral-500">
              Research use only. Not for human consumption. No medical claims.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={`/products/${p.slug}`}
                className="rounded-xl bg-sky-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
                onClick={() => setOpen(false)}
              >
                Open Product Page
              </Link>
              <Link
                href={`/request-invoice?product=${p.slug}`}
                className="rounded-xl border border-sky-500/40 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-100 transition-colors hover:border-sky-400 hover:bg-sky-500/20"
                onClick={() => setOpen(false)}
              >
                Request Invoice
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-600 hover:bg-neutral-900"
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
