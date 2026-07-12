import Image from "next/image";
import Link from "next/link";
import { CartLink } from "@/components/CartLink";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="whitespace-nowrap text-sm font-semibold text-slate-600 transition-colors hover:text-sky-700">
    {children}
  </Link>
);

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5fbff_0%,#eaf7ff_48%,#ffffff_100%)] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/92 shadow-sm backdrop-blur">
        <div className="border-b border-sky-100 bg-sky-50">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
            <p>$10.95 shipping under $150</p>
            <p className="text-sky-700">3+ Vial Discount - 15% Off</p>
            <p>COA information available on request</p>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="relative h-16 w-20 shrink-0 overflow-hidden">
              <Image
                src="/brand/elite-biotech-peptides-logo.png"
                alt="Elite Biotech Peptides"
                fill
                sizes="80px"
                className="object-contain scale-[2.35]"
                priority
              />
            </span>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-bold tracking-tight text-slate-950">Elite Biotech Peptides</div>
              <div className="text-[11px] text-slate-500">Research use only - US fulfillment</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="/products">Shop</NavLink>
            <NavLink href="/cart">Cart</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <NavLink href="/request-documentation">COA Request</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <CartLink />
            <Link
              href="/products"
              className="hidden rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-600 sm:inline-flex"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="border-t border-sky-100 md:hidden">
          <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 py-3">
            <NavLink href="/products">Shop</NavLink>
            <NavLink href="/cart">Cart</NavLink>
            <NavLink href="/request-documentation">COA Request</NavLink>
            <NavLink href="/faq">FAQ</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10">{children}</main>

      <footer className="border-t border-sky-100 bg-white/80">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-[auto_1fr] md:items-center">
          <div className="relative h-24 w-36 overflow-hidden">
            <Image
              src="/brand/elite-biotech-peptides-logo.png"
              alt="Elite Biotech Peptides"
              fill
              sizes="144px"
              className="object-contain scale-[2.2]"
            />
          </div>
          <div className="text-xs text-slate-500">
            <p className="font-semibold text-slate-800">Elite Biotech Peptides</p>
            <p className="mt-2 max-w-3xl">
              Products are intended for laboratory research purposes only and are not for human
              consumption. No medical claims are made.
            </p>
            <p className="mt-3">
              <Link href="/privacy-policy" className="text-sky-700 transition-colors hover:text-sky-600">
                Privacy Policy
              </Link>
              {" · "}
              <Link href="/data-deletion" className="text-sky-700 transition-colors hover:text-sky-600">
                Data Deletion
              </Link>
              {" · "}
              <Link href="/terms-of-service" className="text-sky-700 transition-colors hover:text-sky-600">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
