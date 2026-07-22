import { useState } from "react";
import LegalPageShell from "../components/LegalPageShell";
import { siteContent } from "../content/siteContent";
import { useLegalPageSeo } from "../hooks/useLegalPageSeo";

export default function GdprPage() {
  const [locale, setLocale] = useState("cs");
  const t = siteContent[locale];
  const g = t.gdpr;

  useLegalPageSeo({
    locale,
    title: g.seoTitle,
    description: g.seoDescription,
    path: "/gdpr",
  });

  return (
    <LegalPageShell t={t} locale={locale} setLocale={setLocale}>
      <article className="legal-content">
        <a href="/" className="legal-content__back">
          {g.backHome}
        </a>
        <h1>{g.title}</h1>
        <p className="legal-content__lead">{g.lead}</p>

        {g.sections.map((section) => (
          <section key={section.title} className="legal-section" aria-labelledby={section.id}>
            <h2 id={section.id}>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <p className="legal-content__note">
          {g.contactNote}{" "}
          <a href="/kontakt">{g.contactLink}</a>
        </p>
      </article>
    </LegalPageShell>
  );
}
