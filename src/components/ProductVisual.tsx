import Image from "next/image";
import { getProductFormat, type Product } from "@elite-biotech/shared";

const tones: Record<string, string> = {
  "Growth Hormone":
    "from-sky-500/22 via-blue-500/10 to-amber-400/12 border-sky-400/20",
  "GLP & Metabolic":
    "from-cyan-500/22 via-sky-500/10 to-blue-500/12 border-cyan-400/20",
  "Repair & Recovery":
    "from-amber-400/18 via-sky-500/10 to-cyan-500/12 border-amber-300/20",
  Neuromodulation:
    "from-indigo-500/22 via-sky-500/10 to-cyan-500/12 border-indigo-400/20",
  "Sexual Wellness":
    "from-fuchsia-500/18 via-sky-500/10 to-amber-400/10 border-fuchsia-400/20",
  "Support Supplies":
    "from-emerald-500/18 via-sky-500/10 to-cyan-500/12 border-emerald-400/20",
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
      className={`relative overflow-hidden border bg-[linear-gradient(180deg,#fcfdff_0%,#f3f7fb_100%)] ${tone} ${
        compact ? "h-56 rounded-t-3xl" : "h-[28rem] rounded-3xl"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.12),transparent_24%),radial-gradient(circle_at_82%_25%,rgba(59,130,246,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.8),rgba(241,245,249,0.35))]" />
      <div className="absolute inset-y-0 right-[12%] w-px bg-neutral-200" />
      <div className="absolute inset-y-0 right-[17%] w-px bg-neutral-100" />
      <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute right-10 bottom-10 h-20 w-20 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="absolute left-5 top-5">
        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-700 backdrop-blur-sm">
          Elite Biotech
        </div>
      </div>

      <div className="absolute inset-x-0 top-[4.8rem] flex justify-center">
        <div className="rounded-[2rem] border border-neutral-200 bg-white px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
          <Image
            src="/brand/elite-biotech-peptides-logo.png"
            alt="Elite Biotech Peptides"
            width={compact ? 150 : 190}
            height={compact ? 95 : 120}
            className="h-auto w-auto"
            priority={false}
          />
        </div>
      </div>

      <div className="absolute left-5 right-5 bottom-5">
        <div className="max-w-[78%] rounded-2xl border border-neutral-200 bg-white/92 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:max-w-[75%]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-700">
            {product.category}
          </p>
          <h3
            className={`mt-2 font-semibold text-neutral-900 ${
              compact ? "text-lg leading-tight" : "text-2xl leading-tight"
            }`}
          >
            {product.name}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
            <span className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-neutral-700">
              {getProductFormat(product)}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/10 to-transparent" />
    </div>
  );
}
