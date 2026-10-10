import type { Player, Position } from "@/data/team";

const positionOrder: Position[] = ["Top", "Jungle", "Mid", "ADC", "Support"];

// Profile icons stay available under older patch folders; raise this only when a
// newer icon is missing.
const dataDragonVersion = "16.20.1";

export type RosterCard = { type: "player"; player: Player } | { type: "free-slot"; slotNumber: number };

/**
 * Splits the roster into five lineup slots and a second row. Starters take the
 * slots by position; starters beyond five join the subs instead of disappearing.
 */
export function buildRoster(players: readonly Player[], slotCount = 5) {
  const starters = players
    .filter((player) => player.status === "starter")
    .toSorted((first, second) => positionOrder.indexOf(first.position) - positionOrder.indexOf(second.position));
  const mainPlayers = starters.slice(0, slotCount);
  const subPlayers = [...starters.slice(slotCount), ...players.filter((player) => player.status === "sub")];
  const freeSlotCount = Math.max(slotCount - mainPlayers.length, 0);
  const mainCards: RosterCard[] = [
    ...mainPlayers.map((player) => ({ type: "player" as const, player })),
    ...Array.from({ length: freeSlotCount }, (_, index) => ({ type: "free-slot" as const, slotNumber: index + 1 })),
  ];

  return { mainCards, mainPlayers, subPlayers, freeSlotCount };
}

export function riotIdLabel(player: Pick<Player, "riotId">) {
  return `${player.riotId.gameName}#${player.riotId.tagLine}`;
}

export function opggPlayerUrl(player: Pick<Player, "riotId">) {
  const { gameName, tagLine } = player.riotId;
  return `https://op.gg/lol/summoners/euw/${encodeURIComponent(`${gameName}-${tagLine}`)}`;
}

/** EUW multi-search over the given players; null without players. */
export function opggTeamUrl(players: readonly Pick<Player, "riotId">[]) {
  if (players.length === 0) return null;
  return `https://op.gg/lol/multisearch/euw?summoners=${encodeURIComponent(players.map(riotIdLabel).join(","))}`;
}

export function profileIconUrl(player: Pick<Player, "profileIconId">) {
  return player.profileIconId === undefined
    ? null
    : `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/profileicon/${player.profileIconId}.png`;
}

/** Riot ranked mini crests, shipped in public/league/ranked. */
export function rankedIconUrl(tier: string | undefined) {
  return `/league/ranked/${tier ? tier.toLowerCase() : "unranked"}.svg`;
}

/** "MASTER" → "Master". */
export function titleCase(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

export function formatUpdatedAt(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year.slice(2)}`;
}
