"use client";

import { useMemo, useState } from "react";
import type { Product } from "@elite-biotech/shared";
import { ProductCard } from "@/components/ProductCard";

type SortKey = "featured" | "price-low" | "price-high" | "name";

export function ProductCatalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("featured");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const categoryCounts = useMemo(() => {
    const countMap = new Map<string, number>();
    products.forEach((p) => {
      countMap.set(p.category, (countMap.get(p.category) ?? 0) + 1);
    });
    return countMap;
  }, [products]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const matches = products.filter((p) => {
      const matchesCategory =
        activeCategory === "All" ? true : p.category === activeCategory;

      const haystack = `${p.name} ${p.category} ${p.description} ${p.strengthMg}mg ${p.aliases?.join(" ") ?? ""}`.toLowerCase();
      const matchesQuery = normalized.length === 0 ? true : haystack.includes(normalized);

      return matchesCategory && matchesQuery;
    });

    if (sortKey === "price-low") {
      return [...matches].sort((a, b) => toNumber(a.price) - toNumber(b.price));
    }

    if (sortKey === "price-high") {
      return [...matches].sort((a, b) => toNumber(b.price) - toNumber(a.price));
    }

    if (sortKey === "name") {
      return [...matches].sort((a, b) => a.name.localeCompare(b.name));
    }

    return matches;
  }, [products, query, activeCategory, sortKey]);

  return (
    <div className="mt-8 space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Compounds" value={`${products.length}`} />
        <Metric label="Format" value="10 mL standard" />
        <Metric label="Categories" value={`${categories.length - 1}`} />
        <Metric label="Status" value="Catalog live" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="h-fit rounded-3xl border border-neutral-800 bg-neutral-900/40 p-5 lg:sticky lg:top-24">
          <label htmlFor="catalog-search" className="text-xs font-semibold tracking-wide text-neutral-400">
            Search compounds
          </label>
          <input
            id="catalog-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: ipamorelin, mitochondrial..."
            className="mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-emerald-400"
          />

          <div className="mt-4">
            <label htmlFor="catalog-sort" className="text-xs font-semibold tracking-wide text-neutral-400">
              Sort
            </label>
            <select
              id="catalog-sort"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-emerald-400"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          <div className="mt-5 border-t border-neutral-800 pt-4">
            <p className="text-xs font-semibold tracking-wide text-neutral-400">Categories</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                const count = category === "All" ? products.length : (categoryCounts.get(category) ?? 0);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                      isActive
                        ? "border-emerald-400 bg-emerald-400/15 text-emerald-200"
                        : "border-neutral-700 bg-neutral-950 text-neutral-300 hover:border-neutral-600"
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
                setSortKey("featured");
              }}
              className="mt-3 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-100"
            >
              Reset all filters
            </button>
          </div>
        </aside>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/30 px-4 py-3">
            <p className="text-sm text-neutral-300">
              Showing{" "}
              <span className="font-semibold text-neutral-100">{filtered.length}</span>{" "}
              result{filtered.length === 1 ? "" : "s"}
              {activeCategory !== "All" ? (
                <span className="text-neutral-400"> in {activeCategory}</span>
              ) : null}
            </p>
            {query ? (
              <p className="rounded-full border border-neutral-700 bg-neutral-950 px-3 py-1 text-xs text-neutral-300">
                Search: {query}
              </p>
            ) : null}
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-10 text-center">
              <p className="text-sm font-semibold text-neutral-200">No compounds match this filter.</p>
              <p className="mt-2 text-sm text-neutral-400">
                Try a broader search term or select a different category chip.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-neutral-100">{value}</p>
    </div>
  );
}

function toNumber(price: string): number {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}
