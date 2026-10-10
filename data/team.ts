// Everything the website shows about the team. Edit this file to change the
// roster or ranks, then push to main; the site deploys itself.

export const team = {
  name: "UIC Hydra",
  organization: "Ultra Instinct Crew",
  league: "Prime League",
  logo: "/team/logo.webp",
} as const;

/** Day the ranks below were copied from OP.GG (YYYY-MM-DD). */
export const rosterUpdatedAt = "2026-10-10";

export type Position = "Top" | "Jungle" | "Mid" | "ADC" | "Support";

export type Rank = {
  /** IRON … CHALLENGER, as Riot writes it. */
  tier: "IRON" | "BRONZE" | "SILVER" | "GOLD" | "PLATINUM" | "EMERALD" | "DIAMOND" | "MASTER" | "GRANDMASTER" | "CHALLENGER";
  /** I–IV; Riot reports "I" for Master and above. */
  division: "I" | "II" | "III" | "IV";
  lp: number;
  /** Win rate in percent, e.g. 54. */
  winRate: number;
  games: number;
};

export type Player = {
  name: string;
  position: Position;
  /** Starters fill the five lineup slots; subs are listed below. */
  status: "starter" | "sub";
  riotId: { gameName: string; tagLine: string };
  /** Number from the profile icon URL on OP.GG or in the client; optional. */
  profileIconId?: number;
  level?: number;
  /** Solo/Duo rank; leave out for unranked players. */
  rank?: Rank;
};

export const players: Player[] = [
  {
    name: "Resul",
    position: "Top",
    status: "starter",
    riotId: { gameName: "UIC Nutty", tagLine: "Biggu" },
    profileIconId: 6084,
    level: 687,
    rank: { tier: "MASTER", division: "I", lp: 278, winRate: 54, games: 205 },
  },
  {
    name: "Panger",
    position: "Jungle",
    status: "starter",
    riotId: { gameName: "UIC Panger", tagLine: "JGA" },
    profileIconId: 657,
    level: 356,
    rank: { tier: "MASTER", division: "I", lp: 492, winRate: 56, games: 289 },
  },
  {
    name: "Juli",
    position: "Mid",
    status: "starter",
    riotId: { gameName: "UIC Lanzus", tagLine: "AEGIS" },
    profileIconId: 6629,
    level: 944,
    rank: { tier: "MASTER", division: "I", lp: 1079, winRate: 53, games: 370 },
  },
  {
    name: "Voracity",
    position: "ADC",
    status: "starter",
    riotId: { gameName: "UIC Voracity", tagLine: "0711" },
    profileIconId: 6872,
    level: 1717,
    rank: { tier: "MASTER", division: "I", lp: 710, winRate: 51, games: 584 },
  },
  {
    name: "Efe",
    position: "Support",
    status: "starter",
    riotId: { gameName: "UIC PeaPuffer", tagLine: "PUFFY" },
    profileIconId: 1625,
    level: 772,
    rank: { tier: "MASTER", division: "I", lp: 1222, winRate: 51, games: 877 },
  },
  {
    name: "Makz",
    position: "Mid",
    status: "sub",
    riotId: { gameName: "MakZkovich", tagLine: "610" },
    profileIconId: 4096,
    level: 523,
    rank: { tier: "MASTER", division: "I", lp: 875, winRate: 51, games: 898 },
  },
];
