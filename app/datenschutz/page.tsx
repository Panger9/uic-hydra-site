import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { legalOperator } from "@/lib/site";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>Verantwortlicher</h2>
      <p>
        {[legalOperator.name, ...legalOperator.address].join(", ")}. E-Mail:{" "}
        <a href={`mailto:${legalOperator.email}`}>{legalOperator.email}</a>. Weitere Angaben im{" "}
        <Link href="/impressum">Impressum</Link>.
      </p>

      <h2>Aufruf der Website</h2>
      <p>
        Beim Aufruf verarbeitet der Server technisch notwendige Daten: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite,
        Browser und Betriebssystem. Das dient dem sicheren Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO). Die Website
        läuft auf einem gemieteten Server; der Anbieter verarbeitet die Daten in unserem Auftrag. Protokolle werden nur so
        lange aufbewahrt, wie es für Betrieb und Fehlersuche nötig ist.
      </p>

      <h2>Kontaktformular und E-Mail</h2>
      <p>
        Wenn du uns über das Formular oder per E-Mail schreibst, verarbeiten wir deine E-Mail-Adresse, den Betreff und
        deine Nachricht, um die Anfrage zu beantworten (Art. 6 Abs. 1 lit. b und f DSGVO). Das Formular wird über den
        E-Mail-Dienst Resend (Resend, Inc., USA) zugestellt; das Postfach liegt bei Zoho. Beide verarbeiten die Daten in
        unserem Auftrag. Bei Resend können Daten in die USA übermittelt werden; Grundlage sind die Garantien des
        Anbieters nach Art. 46 DSGVO. Wir löschen Anfragen, sobald sie erledigt sind und keine Aufbewahrungspflicht
        besteht.
      </p>

      <h2>Cookies, Messung und Schriften</h2>
      <p>
        Diese Website setzt keine Cookies und misst keine Besuche. Schriften werden von unserem eigenen Server geladen.
      </p>

      <h2>Spielgrafiken</h2>
      <p>
        Die Profilbilder der Spieler lädt die Website von Servern von Riot Games (ddragon.leagueoflegends.com). Dabei
        wird deine IP-Adresse an diese Server übermittelt (Art. 6 Abs. 1 lit. f DSGVO). Rangsymbole liefern wir selbst
        aus.
      </p>

      <h2>Deine Rechte</h2>
      <p>
        Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
        Widerspruch (Art. 15 bis 21 DSGVO). Schreib dafür an{" "}
        <a href={`mailto:${legalOperator.email}`}>{legalOperator.email}</a>. Außerdem kannst du dich bei einer
        Datenschutz-Aufsichtsbehörde beschweren.
      </p>

      <p>Stand: Oktober 2026</p>
    </LegalPage>
  );
}
