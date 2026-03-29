import Image from "next/image";
import Link from "next/link";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-sm font-medium text-neutral-300 transition-colors hover:text-sky-100">
    {children}
  </Link>
);

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="border-b border-neutral-800/80 bg-gradient-to-r from-sky-500/14 via-cyan-500/10 to-transparent">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-neutral-200">
            <p className="text-sky-200">10% off orders over $100 + free shipping</p>
            <p className="text-neutral-300">25% off orders over $250 + free shipping</p>
            <p className="text-neutral-300">Expanded catalog, invoice-first checkout</p>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="rounded-2xl border border-neutral-800 bg-white/95 p-2 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <Image
                src="/brand/elite-biotech-peptides-logo.png"
                alt="Elite Biotech Peptides"
                width={52}
                height={52}
                className="h-10 w-10 object-contain"
                priority
              />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Elite Biotech Peptides</div>
              <div className="text-[11px] text-neutral-400">Research use only - US fulfillment</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="/products">Compounds</NavLink>
            <NavLink href="/coa">COA Library</NavLink>
            <NavLink href="/about">Quality</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <NavLink href="/request-invoice">Invoices</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          <Link
            href="/products"
            className="rounded-xl bg-sky-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300"
          >
            View Catalog
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">{children}</main>

      <footer className="border-t border-neutral-800 bg-neutral-950/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-[auto_1fr] md:items-center">
          <div className="rounded-3xl border border-neutral-800 bg-white/95 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <Image
              src="/brand/elite-biotech-peptides-logo.png"
              alt="Elite Biotech Peptides"
              width={120}
              height={80}
              className="h-auto w-auto"
            />
          </div>
          <div className="text-xs text-neutral-400">
            <p className="font-semibold text-neutral-200">Elite Biotech Peptides</p>
            <p className="mt-2 max-w-3xl">
              Products are intended for laboratory research purposes only and are not for human
              consumption. No medical claims are made.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
