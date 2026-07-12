"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function HeaderProductSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = query.trim();
    router.push(trimmed ? `/products?search=${encodeURIComponent(trimmed)}` : "/products");
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search products"
      className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="site-product-search" className="sr-only">
        Search products
      </label>
      <input
        id="site-product-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products by name"
        className="min-h-12 flex-1 rounded-xl border border-sky-300 bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition-colors placeholder:text-slate-500 focus:border-sky-500 focus:bg-sky-50"
      />
      <button
        type="submit"
        className="min-h-12 rounded-xl bg-sky-500 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-600"
      >
        Search
      </button>
    </form>
  );
}
