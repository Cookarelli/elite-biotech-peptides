"use client";

import { useId, useMemo, useState } from "react";
import { clampQuantity, type Product } from "@elite-biotech/shared";
import { useCart } from "@/components/CartProvider";

export function AddToCartButton({
  product,
  quantity = 1,
  fullWidth = false,
  showQuantity = false,
}: {
  product: Product;
  quantity?: number;
  fullWidth?: boolean;
  showQuantity?: boolean;
}) {
  const { addItem } = useCart();
  const quantityInputId = useId();
  const [added, setAdded] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(clampQuantity(quantity));

  const className = useMemo(
    () =>
      `${fullWidth ? "w-full justify-center" : ""} inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-600`,
    [fullWidth]
  );

  const activeQuantity = showQuantity ? selectedQuantity : clampQuantity(quantity);

  return (
    <div className={`${fullWidth ? "w-full" : ""} flex flex-col gap-2`}>
      {showQuantity ? (
        <div className="grid grid-cols-[44px_minmax(0,1fr)_44px] overflow-hidden rounded-xl border border-sky-200 bg-white">
          <button
            type="button"
            aria-label={`Decrease ${product.name} quantity`}
            onClick={() => setSelectedQuantity((current) => clampQuantity(current - 1))}
            className="min-h-11 border-r border-sky-100 text-lg font-bold text-slate-700 transition-colors hover:bg-sky-50"
          >
            -
          </button>
          <label className="sr-only" htmlFor={quantityInputId}>
            Quantity for {product.name}
          </label>
          <input
            id={quantityInputId}
            type="number"
            min={1}
            max={99}
            inputMode="numeric"
            value={selectedQuantity}
            onChange={(event) =>
              setSelectedQuantity(clampQuantity(Number.parseInt(event.target.value, 10) || 1))
            }
            className="min-h-11 w-full bg-white px-2 text-center text-sm font-bold text-slate-900 outline-none"
          />
          <button
            type="button"
            aria-label={`Increase ${product.name} quantity`}
            onClick={() => setSelectedQuantity((current) => clampQuantity(current + 1))}
            className="min-h-11 border-l border-sky-100 text-lg font-bold text-slate-700 transition-colors hover:bg-sky-50"
          >
            +
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className={className}
        onClick={() => {
          addItem(product, activeQuantity);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1400);
        }}
      >
        {added ? `Added ${activeQuantity}` : "Add to Cart"}
      </button>
    </div>
  );
}
