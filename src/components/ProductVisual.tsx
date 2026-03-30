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
        compact ? "h-48 rounded-t-3xl" : "h-[26rem] rounded-3xl"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.14),transparent_22%),radial-gradient(circle_at_82%_25%,rgba(125,211,252,0.18),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%)]" />
      <div className="absolute inset-y-0 right-[12%] w-px bg-white/8" />
      <div className="absolute inset-y-0 right-[17%] w-px bg-white/6" />
      <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute right-10 bottom-10 h-20 w-20 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="absolute left-5 top-5">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur-sm">
          Elite Biotech
        </div>
      </div>

      <div className="absolute left-5 right-5 bottom-5">
        <div className="max-w-[74%] rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-sm">
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

      <div className="absolute right-4 top-4 rounded-2xl border border-white/10 bg-black/35 p-2 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
        <Image
          src="/brand/elite-biotech-peptides-logo.png"
          alt="Elite Biotech Peptides"
          width={compact ? 46 : 64}
          height={compact ? 30 : 42}
          className="h-auto w-auto rounded-md"
          priority={false}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
    </div>
  );
}
