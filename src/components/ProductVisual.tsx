import Image from "next/image";
import {
  getProductImage,
  getProductImageAlt,
  type Product,
} from "@elite-biotech/shared";

const tones: Record<string, string> = {
  "GLP & Metabolic":
    "from-cyan-200 via-white to-blue-200 border-sky-300",
  "Recovery & Repair":
    "from-amber-200 via-white to-sky-200 border-amber-300",
  "Cognitive & Focus":
    "from-indigo-200 via-white to-cyan-200 border-indigo-300",
  "Longevity & Immune":
    "from-fuchsia-200 via-white to-amber-200 border-fuchsia-300",
  "Specialty Research":
    "from-violet-200 via-white to-cyan-200 border-violet-300",
  "Support Supplies":
    "from-emerald-200 via-white to-cyan-200 border-emerald-300",
};

export function ProductVisual({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const tone =
    tones[product.category] ??
    "from-sky-500/20 via-cyan-500/10 to-amber-400/10 border-sky-400/20";
  const productImage = getProductImage(product);
  const productImageAlt = productImage?.alt ?? getProductImageAlt(product);

  if (productImage) {
    return (
      <div
        className={`relative overflow-hidden border bg-white shadow-[0_16px_36px_rgba(14,116,144,0.14)] ${tone} ${
          compact ? "aspect-[4/3] rounded-t-2xl" : "aspect-[4/3] rounded-3xl"
        }`}
      >
        <Image
          src={productImage.src}
          alt={productImageAlt}
          fill
          sizes={compact ? "(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 60vw, 100vw"}
          className="object-contain p-5"
          priority={false}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={productImageAlt}
      className={`relative overflow-hidden border bg-gradient-to-br ${tone} shadow-[0_16px_36px_rgba(14,116,144,0.16)] ${
        compact ? "h-56 rounded-t-2xl" : "h-[28rem] rounded-3xl"
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,132,199,0.16),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.68),rgba(255,255,255,0.12))]" />
      <div className="absolute inset-x-8 bottom-6 h-6 rounded-full bg-slate-700/22 blur-xl" />

      <div className="absolute inset-x-0 top-4 flex justify-center">
        <div className="rounded-full border border-sky-200 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-sky-800 shadow-sm">
          Elite Biotech
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <div
          className={`relative ${
            compact ? "h-40 w-24" : "h-72 w-40"
          } drop-shadow-[0_28px_34px_rgba(15,23,42,0.28)]`}
        >
          <div className="absolute inset-x-[26%] top-0 h-[12%] rounded-t-lg border border-slate-400 bg-gradient-to-r from-slate-100 via-white to-slate-300" />
          <div className="absolute inset-x-[20%] top-[10%] h-[8%] rounded-md border border-slate-400 bg-gradient-to-r from-slate-200 via-white to-slate-300" />
          <div className="absolute inset-x-[12%] bottom-0 top-[16%] overflow-hidden rounded-[1.65rem] border border-sky-300 bg-gradient-to-r from-white via-sky-50 to-cyan-50 shadow-inner">
            <div className="absolute inset-y-0 left-3 w-3 bg-white/70 blur-sm" />
            <div className="absolute inset-y-0 right-4 w-px bg-sky-200/70" />
            <div className="absolute inset-x-3 top-[36%] rounded-2xl border border-sky-200 bg-white p-2 text-center shadow-[0_8px_20px_rgba(15,23,42,0.12)]">
              <div className="relative mx-auto h-10 w-16 overflow-hidden">
                <Image
                  src="/brand/elite-biotech-peptides-logo.png"
                  alt=""
                  fill
                  sizes="64px"
                  className="object-contain scale-[2.4]"
                  priority={false}
                />
              </div>
              <p className="mt-1 truncate text-[10px] font-bold uppercase tracking-[0.12em] text-slate-800">
                {product.name}
              </p>
              <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-sky-700">
                Research Use Only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
