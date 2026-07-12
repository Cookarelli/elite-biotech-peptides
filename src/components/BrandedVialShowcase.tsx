import Image from "next/image";

export function BrandedVialShowcase({
  title = "Elite Biotech labeled vials",
  body = "Clear vial labels, simple product names, and research-use-only packaging.",
  compact = false,
}: {
  title?: string;
  body?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-cyan-200 shadow-[0_24px_60px_rgba(14,116,144,0.16)] ${
        compact ? "min-h-[340px]" : "min-h-[420px]"
      }`}
    >
      <Image
        src="/brand/labeled-vials.png"
        alt="Elite Biotech Peptides labeled research vials"
        fill
        sizes={compact ? "(min-width: 1024px) 360px, 100vw" : "(min-width: 1024px) 420px, 100vw"}
        className="object-cover"
        priority={!compact}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.28)_36%,rgba(255,255,255,0.96)_68%,#fff_100%)]" />

      <div className="absolute inset-x-0 top-0 p-6">
        <div className="inline-flex rounded-full border border-sky-300 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-sky-800 shadow-sm">
          Elite Biotech Peptides
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-sky-50/95 to-transparent p-6 pt-20">
        <p className="text-xl font-bold text-slate-950">{title}</p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-700">{body}</p>
      </div>
    </div>
  );
}
