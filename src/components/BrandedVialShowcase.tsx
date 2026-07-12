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
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,132,199,0.12),transparent_38%),radial-gradient(circle_at_82%_14%,rgba(212,175,55,0.22),transparent_24%)]" />
      <div className="absolute inset-x-10 bottom-16 h-10 rounded-full bg-slate-700/20 blur-2xl" />

      <div className="absolute inset-x-0 bottom-14 flex items-end justify-center gap-2 sm:gap-4">
        <ShowcaseVial size="small" label="Reta" />
        <ShowcaseVial size="large" label="Trizepatide" />
        <ShowcaseVial size="medium" label="Semaglutide" />
      </div>

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

function ShowcaseVial({
  label,
  size,
}: {
  label: string;
  size: "small" | "medium" | "large";
}) {
  const dimensions = {
    small: "h-48 w-24 translate-y-6 rotate-[-6deg]",
    medium: "h-56 w-28 translate-y-3 rotate-[5deg]",
    large: "h-64 w-32",
  }[size];

  return (
    <div className={`relative ${dimensions} drop-shadow-[0_34px_38px_rgba(15,23,42,0.26)]`}>
      <div className="absolute inset-x-[28%] top-0 h-[12%] rounded-t-lg border border-slate-400 bg-gradient-to-r from-slate-100 via-white to-slate-300" />
      <div className="absolute inset-x-[22%] top-[10%] h-[8%] rounded-md border border-slate-400 bg-gradient-to-r from-slate-200 via-white to-slate-300" />
      <div className="absolute inset-x-[10%] bottom-0 top-[16%] overflow-hidden rounded-[1.85rem] border border-sky-300 bg-gradient-to-r from-white via-sky-50 to-cyan-50 shadow-inner">
        <div className="absolute inset-y-0 left-3 w-3 bg-white/80 blur-sm" />
        <div className="absolute inset-y-0 right-4 w-px bg-sky-200/70" />
        <div className="absolute inset-x-3 top-[36%] rounded-2xl border border-sky-200 bg-white p-2 text-center shadow-[0_8px_20px_rgba(15,23,42,0.12)]">
          <div className="relative mx-auto h-10 w-16 overflow-hidden">
            <Image
              src="/brand/elite-biotech-peptides-logo.png"
              alt=""
              fill
              sizes="64px"
              className="object-contain scale-[2.4]"
            />
          </div>
          <p className="mt-1 truncate text-[10px] font-bold uppercase tracking-[0.12em] text-slate-800">
            {label}
          </p>
          <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-sky-700">
            Research Use Only
          </p>
        </div>
      </div>
    </div>
  );
}
