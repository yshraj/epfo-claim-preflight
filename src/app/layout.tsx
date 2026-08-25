import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MockBanner from "@/components/MockBanner";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600"],
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
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body">
        <MockBanner />
        {children}
      </body>
    </html>
  );
}
