import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import type { ReactNode } from "react";
import { ImageFallback } from "@/components/image-fallback";
import { team } from "@/data/team";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://uichydra.fp-labs.net"),
  title: { default: team.name, template: `%s · ${team.name}` },
  description: `${team.name} ist ein ${team.league}-Team der ${team.organization}. Roster, Werte und Kontakt für Scrims und Bewerbungen.`,
  icons: { icon: team.logo, apple: team.logo },
};

export const viewport: Viewport = { themeColor: "#05080d" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className={`${inter.variable} ${interTight.variable}`} lang="de">
      <body>
        <ImageFallback />
        {children}
      </body>
    </html>
  );
}
