import Image from "next/image";
import Link from "next/link";
import { CartLink } from "@/components/CartLink";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="whitespace-nowrap text-sm font-medium text-neutral-300 transition-colors hover:text-white">
    {children}
  </Link>
);

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
        <div className="border-b border-neutral-800 bg-neutral-900">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-300">
            <p>Free shipping on all orders</p>
            <p className="text-sky-200">10% off orders over $100</p>
            <p>COA information available on request</p>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="rounded-2xl border border-neutral-700 bg-white p-2 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
              <Image
                src="/brand/elite-biotech-peptides-logo.png"
                alt="Elite Biotech Peptides"
                width={52}
                height={52}
                className="h-10 w-10 object-contain"
                priority
              />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-semibold tracking-tight">Elite Biotech Peptides</div>
              <div className="text-[11px] text-neutral-400">Research use only - US fulfillment</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="/products">Shop</NavLink>
            <NavLink href="/products">Compounds</NavLink>
            <NavLink href="/cart">Cart</NavLink>
            <NavLink href="/about">Quality</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <NavLink href="/request-documentation">COA Request</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <CartLink />
            <Link
              href="/products"
              className="hidden rounded-xl bg-sky-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-cyan-300 sm:inline-flex"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="border-t border-neutral-800/60 md:hidden">
          <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 py-3">
            <NavLink href="/products">Shop</NavLink>
            <NavLink href="/products">Compounds</NavLink>
            <NavLink href="/cart">Cart</NavLink>
            <NavLink href="/request-documentation">COA Request</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
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
