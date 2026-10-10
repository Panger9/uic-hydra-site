import { describe, expect, it } from "vitest";
import type { Player } from "@/data/team";
import { buildRoster, opggPlayerUrl, opggTeamUrl } from "./roster";

const player = (name: string, position: Player["position"], status: Player["status"] = "starter"): Player => ({
  name,
  position,
  status,
  riotId: { gameName: `UIC ${name}`, tagLine: "EUW" },
});

describe("buildRoster", () => {
  it("orders starters by position and fills open slots", () => {
    const roster = buildRoster([player("Sup", "Support"), player("Top", "Top"), player("Sub", "Mid", "sub")]);
    expect(roster.mainCards.map((card) => (card.type === "player" ? card.player.name : `open ${card.slotNumber}`))).toEqual([
      "Top",
      "Sup",
      "open 1",
      "open 2",
      "open 3",
    ]);
    expect(roster.freeSlotCount).toBe(3);
    expect(roster.subPlayers.map((entry) => entry.name)).toEqual(["Sub"]);
  });

  it("moves the last starter by position order into the second row when there are more than five", () => {
    const roster = buildRoster(["Top", "Jungle", "Mid", "ADC", "Support", "Mid"].map((position, index) => player(`P${index}`, position as Player["position"])));
    expect(roster.freeSlotCount).toBe(0);
    expect(roster.subPlayers.map((entry) => entry.name)).toEqual(["P4"]);
  });
});

describe("OP.GG links", () => {
  it("encodes Riot IDs like OP.GG expects", () => {
    expect(opggPlayerUrl(player("Nutty", "Top"))).toBe("https://op.gg/lol/summoners/euw/UIC%20Nutty-EUW");
    expect(opggTeamUrl([player("A", "Top"), player("B", "Mid")])).toBe(
      "https://op.gg/lol/multisearch/euw?summoners=UIC%20A%23EUW%2CUIC%20B%23EUW",
    );
    expect(opggTeamUrl([])).toBeNull();
  });
});
