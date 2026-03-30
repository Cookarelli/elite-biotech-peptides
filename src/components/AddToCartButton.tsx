"use client";

import { useMemo, useState } from "react";
import type { Product } from "@elite-biotech/shared";
import { useCart } from "@/components/CartProvider";

export function AddToCartButton({
  product,
  quantity = 1,
  fullWidth = false,
}: {
  product: Product;
  quantity?: number;
  fullWidth?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const className = useMemo(
    () =>
      `${fullWidth ? "w-full justify-center" : ""} inline-flex items-center rounded-xl bg-sky-400 px-4 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300`,
    [fullWidth]
  );

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        addItem(product, quantity);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
    >
      {added ? "Added to cart" : "Add to Cart"}
    </button>
  );
}
