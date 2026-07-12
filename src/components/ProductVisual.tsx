import Image from "next/image";
import {
  getProductImage,
  getProductImageAlt,
  type Product,
} from "@elite-biotech/shared";

const tones: Record<string, string> = {
  "GLP & Metabolic":
    "from-cyan-100 via-sky-50 to-blue-100 border-sky-200",
  "Recovery & Repair":
    "from-amber-100 via-white to-sky-100 border-amber-200",
  "Cognitive & Focus":
    "from-indigo-100 via-white to-cyan-100 border-indigo-200",
  "Longevity & Immune":
    "from-fuchsia-100 via-white to-amber-100 border-fuchsia-200",
  "Specialty Research":
    "from-violet-100 via-white to-cyan-100 border-violet-200",
  "Support Supplies":
    "from-emerald-100 via-white to-cyan-100 border-emerald-200",
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
        className={`relative overflow-hidden border bg-white ${tone} ${
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
      className={`relative overflow-hidden border bg-gradient-to-br ${tone} shadow-sm ${
        compact ? "h-56 rounded-t-2xl" : "h-[28rem] rounded-3xl"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(14,165,233,0.20),transparent_28%),radial-gradient(circle_at_80%_25%,rgba(34,211,238,0.18),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.15))]" />
      <div className="absolute inset-x-8 bottom-6 h-6 rounded-full bg-slate-400/20 blur-xl" />

      <div className="absolute inset-x-0 top-4 flex justify-center">
        <div className="rounded-full border border-white/80 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-sky-700 shadow-sm">
          Elite Biotech
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <div
          className={`relative ${
            compact ? "h-40 w-24" : "h-72 w-40"
          } drop-shadow-[0_24px_34px_rgba(15,23,42,0.20)]`}
        >
          <div className="absolute inset-x-[26%] top-0 h-[12%] rounded-t-lg border border-slate-300 bg-gradient-to-r from-slate-100 via-white to-slate-200" />
          <div className="absolute inset-x-[20%] top-[10%] h-[8%] rounded-md border border-slate-300 bg-gradient-to-r from-slate-200 via-white to-slate-300" />
          <div className="absolute inset-x-[12%] bottom-0 top-[16%] overflow-hidden rounded-[1.65rem] border border-sky-200 bg-gradient-to-r from-white/90 via-sky-50/90 to-white/80 shadow-inner">
            <div className="absolute inset-y-0 left-3 w-3 bg-white/70 blur-sm" />
            <div className="absolute inset-y-0 right-4 w-px bg-sky-200/70" />
            <div className="absolute inset-x-3 top-[36%] rounded-2xl border border-sky-100 bg-white/95 p-2 text-center shadow-sm">
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
