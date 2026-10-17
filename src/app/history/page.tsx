import type { Metadata } from 'next';
import Link from 'next/link';
import { getHistoryArticles, getTimeline } from '@/lib/content';
import Timeline from '@/components/history/Timeline';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Grier House History',
  description:
    'A series of articles on the history of Grier House, Government College Ibadan, from its founding in 1929 to the present day. Includes an interactive timeline.',
};

const CATEGORY_COLOURS: Record<string, string> = {
  Founding:   '#800000',
  Traditions: '#4A5568',
  National:   '#5C3317',
  Academic:   '#1A365D',
  Sport:      '#1B4D2E',
};

export default async function HistoryPage() {
  const [articles, timeline] = await Promise.all([getHistoryArticles(), getTimeline()]);

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Grier House Museum &amp; Library</p>
          <h1 className={styles.title}>Grier House History</h1>
          <p className={styles.subtitle}>
            Articles and an interactive timeline tracing the story of Grier House from its founding in 1929 to the present day.
          </p>
        </div>
      </section>

      {/* ARTICLES */}
      <section className={styles.articles}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Articles</h2>
            <p className={styles.sectionDesc}>{articles.length} articles &middot; click to read in full</p>
          </div>

          <div className={styles.grid}>
            {articles.map((article) => (
              <Link key={article.slug} href={`/history/${article.slug}`} className={styles.card}>
                <div className={styles.cardTop}>
                  <span
                    className={styles.catBadge}
                    style={{ background: CATEGORY_COLOURS[article.category] ?? 'var(--slate)' }}
                  >
                    {article.category}
                  </span>
                  <span className={styles.era}>{article.era}</span>
                </div>
                <h3 className={styles.cardTitle}>{article.title}</h3>
                <p className={styles.cardExcerpt}>{article.excerpt}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.readTime}>{article.readingTime} min read</span>
                  <span className={styles.readMore}>Read article &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className={styles.divider}>
        <div className={styles.dividerInner}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerLabel}>Interactive Timeline</span>
          <div className={styles.dividerLine} />
        </div>
      </div>

      {/* TIMELINE */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Timeline of Grier House</h2>
            <p className={styles.sectionDesc}>Select any milestone to expand it and read the full account</p>
          </div>
          <Timeline items={timeline} />
        </div>
      </section>
    </>
  );
}
