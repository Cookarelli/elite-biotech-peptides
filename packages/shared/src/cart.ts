import { getProductBySlug, type Product } from "./catalog";

export type CartItem = {
  slug: string;
  quantity: number;
};

export type CartLine = {
  product: Product;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type CartSummary = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  discountRate: number;
  discountLabel: string | null;
  discountAmount: number;
  shipping: number;
  total: number;
};

export function parsePrice(price: string) {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function clampQuantity(quantity: number) {
  return Math.min(99, Math.max(1, Math.floor(quantity) || 1));
}

export function getCartSummary(items: CartItem[]): CartSummary {
  const lines = items
    .map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return null;

      const quantity = clampQuantity(item.quantity);
      const unitPrice = parsePrice(product.price);

      return {
        product,
        quantity,
        unitPrice,
        lineTotal: unitPrice * quantity,
      };
    })
    .filter((line): line is CartLine => Boolean(line));

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);

  let discountRate = 0;
  let discountLabel: string | null = null;

  if (subtotal >= 250) {
    discountRate = 0.25;
    discountLabel = "25% off orders over $250";
  } else if (subtotal >= 100) {
    discountRate = 0.1;
    discountLabel = "10% off orders over $100";
  }

  const discountAmount = subtotal * discountRate;
  const shipping = 0;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  return {
    lines,
    count,
    subtotal,
    discountRate,
    discountLabel,
    discountAmount,
    shipping,
    total,
  };
}
