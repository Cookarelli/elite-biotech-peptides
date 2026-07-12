import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import type { Viewport } from "next";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/CartProvider";
import { PwaRegistrar } from "@/components/PwaRegistrar";

const GA_MEASUREMENT_ID = "G-T5EEZ86LCN";

export const metadata: Metadata = {
  title: "Elite Biotech Peptides",
  description:
    "Elite Biotech Peptides research catalog with competitive pricing, approachable product browsing, and Venmo checkout.",
  manifest: "/manifest.webmanifest",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/pwa-192.png", sizes: "192x192", type: "image/png" },
      { url: "/pwa-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-neutral-950 text-neutral-100 antialiased"
      >
        <CartProvider>
          <PwaRegistrar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
