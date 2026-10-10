import Link from "next/link";
import type { ReactNode } from "react";
import { team } from "@/data/team";
import { riotLegalNotice } from "@/lib/site";

/** Shell for Impressum and Datenschutz; both are German-language legal texts. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-fg">
      <header className="border-b border-line">
        <nav className="mx-auto flex h-16 max-w-3xl items-center px-5 sm:px-8">
          <Link className="flex items-center gap-3" href="/">
            <img alt="" className="size-8 rounded-xl bg-surface-3 object-cover" src={team.logo} />
            <span className="font-display text-[15px] font-semibold tracking-[-0.01em]">{team.name}</span>
          </Link>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{title}</h1>
        <div className="mt-8 grid gap-4 text-[15px] leading-7 text-fg-muted [&_a]:text-fg [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-fg">
          {children}
        </div>
      </main>
      <footer className="border-t border-line py-8">
        <p className="mx-auto max-w-3xl px-5 text-xs leading-relaxed text-fg-subtle sm:px-8" lang="en">
          {riotLegalNotice}
        </p>
      </footer>
    </div>
  );
}
