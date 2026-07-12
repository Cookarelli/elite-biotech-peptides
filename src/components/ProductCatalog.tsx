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
      const matchesQuery =
        normalized.length === 0 ? true : p.name.toLowerCase().includes(normalized);

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
    <div className="mt-6 space-y-5">
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-4 sm:p-5">
        <label htmlFor="catalog-search" className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
            Search products
          </span>
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, e.g. Tirzepatide"
            className="mt-3 w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-4 text-base text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-sky-400"
          />
        </label>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-300">
            Showing <span className="font-semibold text-neutral-100">{filtered.length}</span> of{" "}
            {products.length} products
            {activeCategory !== "All" ? <span className="text-neutral-400"> in {activeCategory}</span> : null}
          </p>
          <div className="flex flex-wrap gap-2">
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-100"
              >
                Clear search
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
                setSortKey("featured");
              }}
              className="rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-2 text-xs font-semibold text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-100"
            >
              Reset filters
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/45 p-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Categories
            </p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                const count = category === "All" ? products.length : (categoryCounts.get(category) ?? 0);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                      isActive
                        ? "border-sky-400 bg-sky-400/15 text-sky-100"
                        : "border-neutral-700 bg-neutral-950 text-neutral-300 hover:border-neutral-600"
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <label htmlFor="catalog-sort" className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Sort
            </span>
            <select
              id="catalog-sort"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-sky-400"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>
      </section>

      {filtered.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-10 text-center">
          <p className="text-sm font-semibold text-neutral-200">No products match that search.</p>
          <p className="mt-2 text-sm text-neutral-400">
            Try another product name or clear the search to browse the full catalog.
          </p>
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-5 rounded-xl bg-sky-400 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
            >
              Clear search
            </button>
          ) : null}
        </section>
      )}
    </div>
  );
}

function toNumber(price: string): number {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}
