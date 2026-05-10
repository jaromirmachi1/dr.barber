export default function AboutSection({ t }) {
  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="about-label">
        <span>{t.about.kicker}</span>
        <span>{t.about.established}</span>
      </div>

      <h2 id="about-title">{t.about.title}</h2>

      <div className="about-editorial">
        <article className="about-story">
          <p className="about-lede">{t.about.lede}</p>
          <p>{t.about.shopBody}</p>
        </article>

        <article className="about-owner">
          <span>{t.about.ownerLabel}</span>
          <h3>{t.about.ownerName}</h3>
          <p>{t.about.ownerBody}</p>
        </article>
      </div>

      <ul className="about-details" aria-label={t.about.detailsLabel}>
        {t.about.details.map((detail) => (
          <li key={detail.label}>
            <span>{detail.label}</span>
            <strong>{detail.value}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}
