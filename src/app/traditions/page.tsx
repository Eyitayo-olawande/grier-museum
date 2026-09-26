import type { Metadata } from 'next';
import { TRADITIONS, FEATURED_TRADITION_ID, getTraditionById } from '@/data/traditions';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Traditions',
  description:
    'The living traditions of Grier House, Government College Ibadan — from the Mustard Seed literary magazine and the annual House Governor address to inter-house sports and the Old Griersons reunion.',
};

const CATEGORY_COLOURS: Record<string, string> = {
  Literary:    '#800000',
  Sport:       '#1B4D2E',
  Leadership:  '#1A365D',
  Cultural:    '#5C3317',
  Academic:    '#4A5568',
  Social:      '#5C0050',
};

export default function TraditionsPage() {
  const featured = getTraditionById(FEATURED_TRADITION_ID);
  const rest = TRADITIONS.filter((t) => t.id !== FEATURED_TRADITION_ID);

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Grier House Museum &amp; Library</p>
          <h1 className={styles.title}>Traditions</h1>
          <p className={styles.subtitle}>
            The customs, ceremonies and practices that have defined Grier House across nearly a century — from literary culture and sport to leadership and fellowship.
          </p>
        </div>
      </section>

      {/* FEATURED TRADITION */}
      {featured && (
        <section className={styles.featured}>
          <div className={styles.container}>
            <div className={styles.featuredCard}>
              <div className={styles.featuredMeta}>
                <span
                  className={styles.catBadge}
                  style={{ background: CATEGORY_COLOURS[featured.category] ?? 'var(--slate)' }}
                >
                  {featured.category}
                </span>
                <span className={styles.featuredEra}>{featured.era}</span>
                <span className={styles.featuredLabel}>Featured Tradition</span>
              </div>

              <div className={styles.featuredBody}>
                <div className={styles.featuredLeft}>
                  <div className={styles.featuredIcon}>{featured.icon}</div>
                  <h2 className={styles.featuredTitle}>{featured.title}</h2>
                  <p className={styles.featuredDesc}>{featured.description}</p>
                </div>

                <div className={styles.featuredRight}>
                  {featured.details.map((detail, i) => (
                    <p key={i} className={styles.featuredDetail}>
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TRADITIONS GRID */}
      <section className={styles.gridSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>All Traditions</h2>
            <p className={styles.sectionDesc}>{TRADITIONS.length} living traditions of Grier House</p>
          </div>

          <div className={styles.grid}>
            {rest.map((tradition) => (
              <div key={tradition.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.cardIcon}>{tradition.icon}</span>
                  <span
                    className={styles.catBadge}
                    style={{ background: CATEGORY_COLOURS[tradition.category] ?? 'var(--slate)' }}
                  >
                    {tradition.category}
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{tradition.title}</h3>
                <p className={styles.cardEra}>{tradition.era}</p>
                <p className={styles.cardDesc}>{tradition.description}</p>

                <details className={styles.details}>
                  <summary className={styles.detailsSummary}>Read more</summary>
                  <div className={styles.detailsBody}>
                    {tradition.details.map((detail, i) => (
                      <p key={i}>{detail}</p>
                    ))}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaText}>
              <h2 className={styles.ctaTitle}>Share a Grier House Tradition</h2>
              <p className={styles.ctaDesc}>
                Old Griersons are invited to contribute recollections, photographs and artefacts that document the living traditions of Grier House. Your memories are part of our archive.
              </p>
            </div>
            <a href="/contact" className={styles.ctaBtn}>
              Get in touch &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
