import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui";

export const metadata: Metadata = { title: "Seite nicht gefunden", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-5 text-center text-fg">
      <div>
        <p className="font-display text-6xl font-semibold tracking-[-0.04em]">404</p>
        <p className="mt-3 text-fg-muted">Diese Seite gibt es nicht.</p>
        <Link className={buttonClasses({ variant: "secondary", className: "mt-8" })} href="/">
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
