import Image from "next/image";
import { getProductFormat, type Product } from "@elite-biotech/shared";

const tones: Record<string, string> = {
  "Growth Hormone Axis":
    "from-sky-500/22 via-blue-500/10 to-amber-400/12 border-sky-400/20",
  "Metabolic Signaling":
    "from-cyan-500/22 via-sky-500/10 to-blue-500/12 border-cyan-400/20",
  "Repair / Recovery":
    "from-amber-400/18 via-sky-500/10 to-cyan-500/12 border-amber-300/20",
  "Specialty Signaling":
    "from-blue-500/22 via-indigo-500/10 to-amber-400/10 border-blue-400/20",
  Neuromodulation:
    "from-indigo-500/22 via-sky-500/10 to-cyan-500/12 border-indigo-400/20",
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

  return (
    <div
      className={`relative overflow-hidden border bg-neutral-950 ${tone} ${
        compact ? "h-48 rounded-t-3xl" : "h-80 rounded-3xl"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.14),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)]" />
      <div className="absolute inset-y-0 right-[14%] w-px bg-white/8" />
      <div className="absolute inset-y-0 right-[18%] w-px bg-white/6" />

      <div className="absolute top-5 left-5 right-5">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80">
          Elite Biotech
        </div>
      </div>

      <div className="absolute left-5 right-5 bottom-5">
        <div className="max-w-[78%] rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200/90">
            {product.category}
          </p>
          <h3
            className={`mt-2 font-semibold text-white ${
              compact ? "text-lg leading-tight" : "text-2xl leading-tight"
            }`}
          >
            {product.name}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
            <span className="rounded-full border border-white/12 bg-white/6 px-2.5 py-1 text-white/85">
              {getProductFormat(product)}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-5 right-5 rounded-2xl border border-white/10 bg-white/95 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <Image
          src="/brand/elite-biotech-peptides-logo.png"
          alt="Elite Biotech Peptides"
          width={compact ? 76 : 104}
          height={compact ? 50 : 68}
          className="h-auto w-auto"
          priority={false}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
    </div>
  );
}
