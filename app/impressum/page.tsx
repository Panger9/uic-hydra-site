import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { legalOperator } from "@/lib/site";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {[legalOperator.name, ...legalOperator.address].map((line, index) => (
          <span key={line}>
            {index > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </p>
      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${legalOperator.email}`}>{legalOperator.email}</a>
      </p>
    </LegalPage>
  );
}
