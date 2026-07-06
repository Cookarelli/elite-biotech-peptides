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
  bundleDiscountEligible: boolean;
};

export type CartSummary = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  merchandiseTotal: number;
  discountableSubtotal: number;
  eligibleVialCount: number;
  discountRate: number;
  discountLabel: string | null;
  discountAmount: number;
  shipping: number;
  total: number;
};

export const VIAL_BUNDLE_DISCOUNT = {
  minimumEligibleQuantity: 3,
  rate: 0.15,
  label: "3+ Vial Discount – 15% Off",
  excludedSlugs: ["bacteriostatic-water"],
} as const;

const bundleDiscountExcludedSlugs = new Set<string>(
  VIAL_BUNDLE_DISCOUNT.excludedSlugs
);

export const SHIPPING_RATE = {
  standard: 10.95,
  freeThreshold: 150,
  label: "$10.95 standard shipping under $150",
  freeLabel: "Free shipping at $150+",
} as const;

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

export function isBundleDiscountEligibleVial(product: Product) {
  if (bundleDiscountExcludedSlugs.has(product.slug)) return false;
  return /\bvial\b/i.test(product.formatLabel);
}

function roundCurrency(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function getCartSummary(items: CartItem[]): CartSummary {
  const lines = items
    .map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return null;

      const quantity = clampQuantity(item.quantity);
      const unitPrice = parsePrice(product.price);
      const bundleDiscountEligible = isBundleDiscountEligibleVial(product);

      return {
        product,
        quantity,
        unitPrice,
        lineTotal: unitPrice * quantity,
        bundleDiscountEligible,
      };
    })
    .filter((line): line is CartLine => Boolean(line));

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const eligibleVialCount = lines.reduce(
    (sum, line) => sum + (line.bundleDiscountEligible ? line.quantity : 0),
    0
  );
  const discountableSubtotal =
    eligibleVialCount >= VIAL_BUNDLE_DISCOUNT.minimumEligibleQuantity
      ? lines.reduce(
          (sum, line) => sum + (line.bundleDiscountEligible ? line.lineTotal : 0),
          0
        )
      : 0;

  let discountRate = 0;
  let discountLabel: string | null = null;

  if (discountableSubtotal > 0) {
    discountRate = VIAL_BUNDLE_DISCOUNT.rate;
    discountLabel = VIAL_BUNDLE_DISCOUNT.label;
  }

  const discountAmount = roundCurrency(discountableSubtotal * discountRate);
  const merchandiseTotal = Math.max(0, roundCurrency(subtotal - discountAmount));
  const shipping =
    merchandiseTotal >= SHIPPING_RATE.freeThreshold ? 0 : SHIPPING_RATE.standard;
  const total = Math.max(0, roundCurrency(merchandiseTotal + shipping));

  return {
    lines,
    count,
    subtotal,
    merchandiseTotal,
    discountableSubtotal,
    eligibleVialCount,
    discountRate,
    discountLabel,
    discountAmount,
    shipping,
    total,
  };
}
