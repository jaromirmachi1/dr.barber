import { useState } from "react";
import LegalPageShell from "../components/LegalPageShell";
import { siteContent } from "../content/siteContent";
import { useLegalPageSeo } from "../hooks/useLegalPageSeo";

export default function KontaktPage() {
  const [locale, setLocale] = useState("cs");
  const t = siteContent[locale];
  const k = t.kontakt;

  useLegalPageSeo({
    locale,
    title: k.seoTitle,
    description: k.seoDescription,
    path: "/kontakt",
  });

  return (
    <LegalPageShell t={t} locale={locale} setLocale={setLocale}>
      <article className="legal-content">
        <a href="/" className="legal-content__back">
          {k.backHome}
        </a>
        <h1>{k.title}</h1>
        <p className="legal-content__lead">{k.lead}</p>

        <section className="legal-section" aria-labelledby="kontakt-operator">
          <h2 id="kontakt-operator">{k.sections.operator}</h2>
          <dl className="legal-details">
            <div>
              <dt>{k.fields.businessName}</dt>
              <dd>{k.values.businessName}</dd>
            </div>
            <div>
              <dt>{k.fields.legalForm}</dt>
              <dd>{k.values.legalForm}</dd>
            </div>
            <div>
              <dt>{k.fields.ico}</dt>
              <dd>{k.values.ico}</dd>
            </div>
            <div>
              <dt>{k.fields.established}</dt>
              <dd>{k.values.established}</dd>
            </div>
            <div>
              <dt>{k.fields.registeredAddress}</dt>
              <dd>{k.values.registeredAddress}</dd>
            </div>
            <div>
              <dt>{k.fields.activity}</dt>
              <dd>{k.values.activity}</dd>
            </div>
            <div>
              <dt>{k.fields.taxOffice}</dt>
              <dd>{k.values.taxOffice}</dd>
            </div>
          </dl>
        </section>

        <section className="legal-section" aria-labelledby="kontakt-salon">
          <h2 id="kontakt-salon">{k.sections.salon}</h2>
          <dl className="legal-details">
            <div>
              <dt>{k.fields.salonAddress}</dt>
              <dd>{t.location.address}</dd>
            </div>
            <div>
              <dt>{k.fields.phone}</dt>
              <dd>
                <a href={`tel:${t.location.phoneHref}`}>{t.location.phone}</a>
              </dd>
            </div>
          </dl>
        </section>

        <p className="legal-content__note">
          {k.aresNote}{" "}
          <a href={k.aresLink} target="_blank" rel="noreferrer">
            {k.aresLinkLabel}
          </a>
        </p>
      </article>
    </LegalPageShell>
  );
}
