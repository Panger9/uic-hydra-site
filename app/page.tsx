import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { OpggTeamLink } from "@/components/opgg-team-link";
import { FreeSlotCard, PlayerRosterCard } from "@/components/roster-card";
import { Badge, buttonClasses } from "@/components/ui";
import { players, rosterUpdatedAt, team } from "@/data/team";
import { buildRoster, formatUpdatedAt, opggPlayerUrl, opggTeamUrl, rankedIconUrl, titleCase } from "@/lib/roster";
import { hubUrl, riotLegalNotice } from "@/lib/site";

const identityItems = [
  {
    title: "Respekt als Standard",
    text: "Maximaler Respekt vor uns, dem Game und den Gegnern. Wir wollen hart spielen, aber nicht auf Kosten von Umgang, Vorbereitung oder Fairness.",
  },
  {
    title: "Stärken nutzen",
    text: "Individuelle Stärken sollen sichtbar sein. Wenn ein Pick, ein Setup oder ein Stil funktioniert, darf er auch off Meta sein.",
  },
  {
    title: "Organisiert und verlässlich",
    text: "Termine, Reviews und Vorbereitung laufen strukturiert und für alle nachvollziehbar.",
  },
  {
    title: "Improvement zuerst",
    text: "Besser werden ist das Hauptziel. Egotrips, Rechthaberei und Schuldzuweisungen bringen uns nicht weiter und haben hier keinen Platz.",
  },
];

const navLinks = [
  { href: "#team", label: "Roster" },
  { href: "#identity", label: "Identity" },
  { href: "#contact", label: "Kontakt" },
];

const scrollRow =
  "rx-scroll -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-5 [&>*]:w-[80%] [&>*]:shrink-0 [&>*]:snap-center sm:[&>*]:w-auto";

function TeamLogo({ className }: { className: string }) {
  return <img alt={team.name} className={`rounded-xl bg-surface-3 object-cover ${className}`} src={team.logo} />;
}

export default function Home() {
  const roster = buildRoster(players);
  const mainPlayerCount = roster.mainPlayers.length;
  const subline = [team.organization, team.league].join(" · ");
  const heroBadges = [team.league, "Review-Kultur", "Scrim-ready"];
  const heroStats = [
    { value: "5", label: "Slots" },
    { value: String(mainPlayerCount), label: "Besetzt" },
    { value: String(roster.freeSlotCount), label: "Offen" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-canvas text-fg">
      <header className="sticky top-0 z-40 border-b border-line bg-canvas/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <a className="flex items-center gap-3" href="#">
            <TeamLogo className="size-9" />
            <span className="font-display text-[15px] font-semibold tracking-[-0.01em]">{team.name}</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                className="rounded-full px-3.5 py-2 text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a className={buttonClasses({ variant: "primary", size: "sm" })} href={hubUrl}>
            Hub
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </a>
        </nav>
      </header>

      <main>
        <section className="relative isolate overflow-hidden">
          <div aria-hidden="true" className="site-grid absolute inset-0 -z-10" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
            <div className="site-beam" />
            <div className="site-lane" />
          </div>

          <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:min-h-[calc(92dvh-4rem)] lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-28">
            <div>
              <div className="site-reveal">
                <Badge dot tone={roster.freeSlotCount > 0 ? "accent" : "win"}>
                  {roster.freeSlotCount > 0
                    ? `${roster.freeSlotCount} ${roster.freeSlotCount === 1 ? "Slot" : "Slots"} offen`
                    : "Lineup steht"}
                </Badge>
              </div>
              <h1
                className="site-reveal mt-6 font-display text-[clamp(3.25rem,10vw,7.25rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-fg"
                style={{ animationDelay: "80ms" }}
              >
                {team.name}
              </h1>
              <p className="site-reveal mt-3 text-lg text-fg-subtle" style={{ animationDelay: "140ms" }}>
                {subline}
              </p>
              <p
                className="site-reveal mt-7 max-w-xl text-lg leading-8 text-fg-muted sm:text-xl sm:leading-9"
                style={{ animationDelay: "200ms" }}
              >
                Ein League-of-Legends-Team mit klarer Struktur und Review-Kultur. Wir spielen organisiert, respektvoll und
                mit dem Ziel, als Team besser zu werden.
              </p>
              <div className="site-reveal mt-9 flex flex-wrap gap-3" style={{ animationDelay: "260ms" }}>
                <a className={buttonClasses({ variant: "primary", size: "lg" })} href="#team">
                  Roster ansehen
                </a>
                <a className={buttonClasses({ variant: "secondary", size: "lg" })} href="#contact">
                  Kontakt aufnehmen
                </a>
              </div>
              <ul className="site-reveal mt-10 flex flex-wrap gap-x-5 gap-y-2" style={{ animationDelay: "320ms" }}>
                {heroBadges.map((badge) => (
                  <li className="flex items-center gap-2 text-sm text-fg-subtle" key={badge}>
                    <span aria-hidden="true" className="size-1 rounded-full bg-fg-subtle" />
                    {badge}
                  </li>
                ))}
              </ul>
            </div>

            <div className="site-reveal lg:justify-self-end" style={{ animationDelay: "240ms" }}>
              <div className="rx-card w-full max-w-md rounded-[28px] p-2 lg:w-[26rem]">
                <div className="rounded-[22px] bg-surface-2/60 p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-base font-semibold">Lineup</p>
                    <p className="tabular text-sm text-fg-subtle">{mainPlayerCount}/5 besetzt</p>
                  </div>
                  <ol className="mt-4 grid gap-1.5">
                    {roster.mainCards.map((card, index) => (
                      <li
                        className="site-reveal flex items-center gap-3 rounded-2xl bg-surface px-3 py-2.5 ring-1 ring-line"
                        key={card.type === "player" ? card.player.name : `open-${card.slotNumber}`}
                        style={{ animationDelay: `${420 + index * 90}ms` }}
                      >
                        {card.type === "player" ? (
                          <>
                            <span className="w-16 shrink-0 text-xs text-fg-subtle">{card.player.position}</span>
                            <span className="min-w-0 flex-1 truncate font-medium">{card.player.name}</span>
                            {card.player.rank ? (
                              <span className="flex items-center gap-1.5 text-sm text-fg-muted">
                                <img alt="" className="size-5 object-contain" src={rankedIconUrl(card.player.rank.tier)} />
                                {titleCase(card.player.rank.tier)}
                              </span>
                            ) : (
                              <span className="text-sm text-fg-subtle">Unranked</span>
                            )}
                          </>
                        ) : (
                          <>
                            <span className="w-16 shrink-0 text-xs text-accent">Offen</span>
                            <span className="flex-1 text-fg-subtle">Slot {card.slotNumber}</span>
                            <a className="text-sm font-medium text-accent hover:underline" href="#contact">
                              Bewerben
                            </a>
                          </>
                        )}
                      </li>
                    ))}
                  </ol>
                  <dl className="mt-4 grid grid-cols-3 divide-x divide-line rounded-2xl bg-surface ring-1 ring-line">
                    {heroStats.map((stat) => (
                      <div className="px-3 py-3 text-center" key={stat.label}>
                        <dd className="tabular font-display text-xl font-semibold">{stat.value}</dd>
                        <dt className="mt-0.5 text-xs text-fg-subtle">{stat.label}</dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28" id="team">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Das Team</h2>
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-sm text-fg-subtle">Zuletzt aktualisiert: {formatUpdatedAt(rosterUpdatedAt)}</p>
                <OpggTeamLink href={opggTeamUrl(roster.mainPlayers)} />
              </div>
            </div>
            <div className={scrollRow}>
              {roster.mainCards.map((card, index) =>
                card.type === "player" ? (
                  <PlayerRosterCard index={index} key={card.player.name} player={card.player} />
                ) : (
                  <FreeSlotCard index={index} key={`free-slot-${card.slotNumber}`} slotNumber={card.slotNumber} />
                ),
              )}
            </div>

            {roster.subPlayers.length > 0 ? (
              <div className="mt-16">
                <h3 className="mb-5 font-display text-2xl font-semibold tracking-[-0.02em]">Ersatzspieler</h3>
                <div className={scrollRow}>
                  {roster.subPlayers.map((player, index) => (
                    <PlayerRosterCard index={index} key={player.name} player={player} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="scroll-mt-20 px-5 py-20 sm:px-8 lg:py-28" id="identity">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                Woran wir uns messen.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-8 text-fg-muted">
                Im Training, in Reviews und in offiziellen Games spürbar, nicht nur auf einer Website.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {identityItems.map((item, index) => (
                <article className="rx-card group rounded-3xl p-6 sm:p-7" key={item.title}>
                  <span className="tabular font-display text-sm font-semibold text-accent">0{index + 1}</span>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.015em]">{item.title}</h3>
                  <p className="mt-3 leading-7 text-fg-muted">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="scroll-mt-20 px-5 pb-24 pt-8 sm:px-8" id="contact">
          <div className="rx-card relative mx-auto max-w-7xl overflow-hidden rounded-[32px]">
            <div aria-hidden="true" className="absolute -left-24 -top-24 size-80 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
              <div>
                <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
                  Scrim oder Anfrage?
                </h2>
                <p className="mt-5 max-w-md text-lg leading-8 text-fg-muted">
                  Betreff, E-Mail und Nachricht reichen. Wir antworten direkt per Mail.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <TeamLogo className="size-8" />
            <div>
              <p className="text-sm font-medium">{team.name}</p>
              <p className="text-xs text-fg-subtle">{subline}</p>
            </div>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {players.map((player) => (
              <li key={player.name}>
                <a
                  className="inline-flex items-center gap-1 text-sm text-fg-subtle transition-colors hover:text-fg"
                  href={opggPlayerUrl(player)}
                  rel="noreferrer"
                  target="_blank"
                >
                  {player.riotId.gameName}
                  <ArrowUpRight aria-hidden="true" className="size-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 text-xs leading-relaxed text-fg-subtle md:flex-row md:items-start md:justify-between md:gap-8">
          <p lang="en">{riotLegalNotice}</p>
          <div className="flex shrink-0 gap-4">
            <Link className="transition-colors hover:text-fg" href="/impressum">
              Impressum
            </Link>
            <Link className="transition-colors hover:text-fg" href="/datenschutz">
              Datenschutz
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
