export default function AboutSection({ t }) {
  return (
    <section id="about" className="about-section">
      <div className="about-image" aria-hidden="true" />
      <article>
        <h2>{t.about.title}</h2>
        <p>{t.about.body}</p>
      </article>
    </section>
  )
}
