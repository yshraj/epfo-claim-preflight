import type { Metadata } from "next";
import "./globals.css";
import MockBanner from "@/components/MockBanner";

export const metadata: Metadata = {
  title: "EPFO Claim Pre-Flight (Prototype)",
  description:
    "Hackathon prototype: catch PF claim rejections before you submit. Independent, unaffiliated, simulated data only.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MockBanner />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
