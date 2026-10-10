import { team } from "@/data/team";

/** Team hub for members; the website only links to it. */
export const hubUrl = "https://boellerbande.fp-labs.net/hub";

// Operator details for § 5 DDG; Impressum and Datenschutz both read them from here.
// A postal address can be added as further `address` lines.
export const legalOperator: { name: string; address: string[]; email: string } = {
  name: "Fabio Pellegrino",
  address: [],
  email: "kontakt@boellerbande.fp-labs.net",
};

// Wording required verbatim by Riot Games' "Legal Jibber Jabber" policy on every public surface.
export const riotLegalNotice = `${team.name} was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.`;
