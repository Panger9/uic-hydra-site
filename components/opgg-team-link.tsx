"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IconButton, buttonClasses } from "./ui";

type CopyState = "idle" | "copied" | "error";

export function OpggTeamLink({ href }: { href: string | null }) {
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  if (!href) return null;

  async function copyTeamLink() {
    if (!href) return;
    if (resetTimer.current) clearTimeout(resetTimer.current);

    try {
      await navigator.clipboard.writeText(href);
      setCopyState("copied");
      resetTimer.current = setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("error");
      resetTimer.current = setTimeout(() => setCopyState("idle"), 2400);
    }
  }

  const buttonLabel =
    copyState === "copied"
      ? "Team-Link kopiert"
      : copyState === "error"
        ? "Team-Link kopieren fehlgeschlagen"
        : "Team-Link kopieren";

  return (
    <div className="inline-flex items-center gap-1.5">
      <a
        className={buttonClasses({ size: "sm", variant: "secondary", className: "min-h-10" })}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        Team auf OP.GG
        <ExternalLink aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
      </a>
      <IconButton
        className={copyState === "copied" ? "text-win" : copyState === "error" ? "text-loss" : undefined}
        label={buttonLabel}
        onClick={copyTeamLink}
      >
        {copyState === "copied" ? (
          <Check aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
        ) : (
          <Copy aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
        )}
      </IconButton>
      <span aria-live="polite" className="sr-only" role="status">
        {copyState === "copied"
          ? "Team-Link in die Zwischenablage kopiert."
          : copyState === "error"
            ? "Kopieren fehlgeschlagen. Prüfe die Browser-Berechtigung für die Zwischenablage."
            : ""}
      </span>
    </div>
  );
}
