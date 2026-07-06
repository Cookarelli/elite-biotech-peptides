# Product Images

Place future labeled product bottle photos in:

`public/products/labeled-bottles/`

Use the product slug as the filename:

`public/products/labeled-bottles/{product-slug}.webp`

Examples:

- `public/products/labeled-bottles/semaglutide.webp`
- `public/products/labeled-bottles/tirzepatide.webp`
- `public/products/labeled-bottles/reta.webp`
- `public/products/labeled-bottles/bacteriostatic-water.webp`

After adding a real product photo, register it in `packages/shared/src/productImages.ts`.
Do not add placeholder label copy, placeholder mg amounts, or mock "research purposes only"
text to images. The image file should contain only the real approved product label.
