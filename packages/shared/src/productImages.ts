import type { Product } from "./catalog";

export const PRODUCT_IMAGE_BASE_PATH = "/products/labeled-bottles";

export type ProductImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const productImageAssets: Partial<Record<Product["slug"], ProductImageAsset>> = {};

export function getProductImage(product: Product) {
  return productImageAssets[product.slug];
}

export function getExpectedProductImagePath(productOrSlug: Product | string) {
  const slug = typeof productOrSlug === "string" ? productOrSlug : productOrSlug.slug;
  return `${PRODUCT_IMAGE_BASE_PATH}/${slug}.webp`;
}

export function getProductImageAlt(product: Product) {
  const format = product.formatLabel ? `, ${product.formatLabel}` : "";
  return `${product.name}${format} product bottle labeled for research purposes only`;
}
