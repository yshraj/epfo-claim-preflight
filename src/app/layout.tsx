import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono, Noto_Sans_Devanagari } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import MockBanner from "@/components/MockBanner";
import DemoSwitcher from "@/components/DemoSwitcher";
import { SessionProvider } from "@/context/SessionContext";
import { LocaleProvider } from "@/i18n/client";
import { getLocale } from "@/i18n/server";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});
const body = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body", 
  weight: ["400", "500", "600"] 
});
// Inter and Outfit carry no Devanagari glyphs, so Hindi would otherwise fall
// back to an arbitrary system font. Loaded for every visitor rather than
// conditionally, because next/font needs a static call — the cost is one
// extra woff2 that only renders when Hindi is active.
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "EPFO Claim Pre-Flight (Prototype)",
  description:
    "Hackathon prototype: catch PF claim rejections before you submit. Independent, unaffiliated, simulated data only.",
};

// The two route-group layouts ((marketing) and (app)) each supply their
// own header/footer/<main> — this root layout only owns what's truly
// global: fonts and the persistent mock-data disclosure banner.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resolved once here and handed to the client provider, so client
  // components never have to re-read the cookie and there is no flash of
  // English before Hindi appears.
  const locale = getLocale();

  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable} ${devanagari.variable}`}>
      <body className="font-body">
        <LocaleProvider locale={locale}>
        <SessionProvider>
          <MockBanner />
          {children}
          <Suspense fallback={null}>
            <DemoSwitcher />
          </Suspense>
        </SessionProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
