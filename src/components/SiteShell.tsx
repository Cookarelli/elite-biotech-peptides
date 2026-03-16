import Link from "next/link";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-sm font-medium text-neutral-300 transition-colors hover:text-white">
    {children}
  </Link>
);

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="border-b border-neutral-800/80 bg-gradient-to-r from-emerald-500/12 via-cyan-500/8 to-transparent">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-neutral-200">
            <p className="text-emerald-200">COA-ready batches</p>
            <p className="text-neutral-300">US fulfillment</p>
            <p className="text-neutral-300">Procurement replies in 24h (demo)</p>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
              <span className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-indigo-500/20" />
              <span className="relative text-xs font-bold tracking-widest text-neutral-200">CP</span>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Catalyst Peptides</div>
              <div className="text-[11px] text-neutral-400">Research use only - Demo storefront</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="/products">Compounds</NavLink>
            <NavLink href="/coa">COA Library</NavLink>
            <NavLink href="/about">Quality</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          <Link
            href="/products"
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-emerald-400"
          >
            View Catalog
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">{children}</main>

      <footer className="border-t border-neutral-800 bg-neutral-950/60">
        <div className="mx-auto max-w-7xl px-4 py-10 text-xs text-neutral-400">
          <p className="font-semibold text-neutral-200">Research Use Only</p>
          <p className="mt-2 max-w-3xl">
            Products are intended for laboratory research purposes only and are not for human
            consumption. No medical claims are made.
          </p>
        </div>
      </footer>
    </div>
  );
}
