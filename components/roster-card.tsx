import { ArrowUpRight, Plus } from "lucide-react";
import type { Player, Rank } from "@/data/team";
import { opggPlayerUrl, profileIconUrl, rankedIconUrl, riotIdLabel, titleCase } from "@/lib/roster";
import { Avatar, Badge, buttonClasses, cn } from "./ui";

function formatRank(rank: Rank) {
  return `${titleCase(rank.tier)} ${rank.division}`.trim();
}

export function PlayerRosterCard({ player, index }: { player: Player; index: number }) {
  const rank = player.rank;
  const stats = [
    { label: "LP", value: rank ? `${rank.lp}` : "–" },
    { label: "Winrate", value: rank ? `${rank.winRate} %` : "–" },
    { label: "Games", value: rank ? `${rank.games}` : "0" },
    { label: "Level", value: player.level ?? "–" },
  ];

  return (
    <article
      className="site-reveal rx-card group relative flex flex-col overflow-hidden rounded-3xl p-5 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-line-strong"
      style={{ animationDelay: `${120 + index * 70}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <Avatar className="ring-2 ring-line-strong" name={player.name} size={56} src={profileIconUrl(player)} />
        <Badge>{player.position}</Badge>
      </div>

      <h3 className="mt-5 truncate font-display text-2xl font-semibold tracking-[-0.02em] text-fg">{player.name}</h3>
      <p className="mt-0.5 truncate text-sm text-fg-subtle">{riotIdLabel(player)}</p>

      <div className="mt-5 flex items-center gap-2.5">
        {rank ? <img alt="" className="size-7 object-contain" src={rankedIconUrl(rank.tier)} /> : null}
        <span className={cn("font-medium", rank ? "text-fg" : "text-fg-muted")}>{rank ? formatRank(rank) : "Unranked"}</span>
      </div>

      <dl className="mt-4 grid grid-cols-4 gap-2 border-t border-line pt-4">
        {stats.map((stat) => (
          <div className="min-w-0" key={stat.label}>
            <dt className="truncate text-[11px] text-fg-subtle">{stat.label}</dt>
            <dd className="tabular mt-0.5 truncate text-sm font-medium text-fg">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <a
        className={buttonClasses({ variant: "secondary", size: "md", className: "mt-5 w-full" })}
        href={opggPlayerUrl(player)}
        rel="noreferrer"
        target="_blank"
      >
        OP.GG öffnen
        <ArrowUpRight aria-hidden="true" className="size-4 text-fg-subtle" />
      </a>
    </article>
  );
}

export function FreeSlotCard({ slotNumber, index }: { slotNumber: number; index: number }) {
  return (
    <article
      className="site-reveal group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-dashed border-accent/40 bg-accent/[0.04] p-5"
      style={{ animationDelay: `${120 + index * 70}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-14 place-items-center rounded-full border border-dashed border-accent/50 text-accent">
          <Plus aria-hidden="true" className="size-6" strokeWidth={1.6} />
        </span>
        <Badge tone="accent">Slot {slotNumber}</Badge>
      </div>
      <div className="mt-6">
        <p className="text-sm font-medium text-accent">Spieler gesucht</p>
        <h3 className="mt-1 font-display text-2xl font-semibold tracking-[-0.02em] text-fg">Free slot</h3>
        <p className="mt-2 text-sm leading-6 text-fg-muted">
          Offen für Spieler, die verlässlich trainieren, Reviews ernst nehmen und in unsere Teamstruktur passen.
        </p>
      </div>
      <a className={buttonClasses({ variant: "accent", size: "md", className: "mt-6 w-full" })} href="#contact">
        Auf Slot bewerben
      </a>
    </article>
  );
}
