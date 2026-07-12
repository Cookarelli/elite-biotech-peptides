import Image from "next/image";
import Link from "next/link";
import { CartLink } from "@/components/CartLink";
import { HeaderProductSearch } from "@/components/HeaderProductSearch";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="whitespace-nowrap text-sm font-semibold text-slate-600 transition-colors hover:text-sky-700">
    {children}
  </Link>
);

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#e6f7ff_0%,#d8effb_48%,#f8fcff_100%)] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-sky-200 bg-white/95 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="border-b border-sky-200 bg-sky-100/70">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
            <p>$10.95 shipping under $150</p>
            <p className="text-sky-700">3+ Vial Discount - 15% Off</p>
            <p>COA information available on request</p>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="flex min-w-0 items-center gap-4">
            <span className="relative h-20 w-32 shrink-0 sm:h-24 sm:w-36">
              <Image
                src="/brand/elite-biotech-peptides-logo.png"
                alt="Elite Biotech Peptides"
                fill
                sizes="(min-width: 640px) 144px, 128px"
                className="object-contain"
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

        <div className="border-t border-sky-200 bg-sky-50/80 px-4 py-3">
          <HeaderProductSearch />
        </div>

        <div className="border-t border-sky-200 md:hidden">
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

      <footer className="border-t border-sky-200 bg-white/90">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-[auto_1fr] md:items-center">
          <div className="relative h-28 w-44">
            <Image
              src="/brand/elite-biotech-peptides-logo.png"
              alt="Elite Biotech Peptides"
              fill
              sizes="176px"
              className="object-contain"
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
