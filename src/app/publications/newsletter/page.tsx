import type { Metadata } from 'next';
import Link from 'next/link';
import { NEWSLETTER_ISSUES } from '@/data/publications';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Grier House Newsletter',
  description:
    'The quarterly newsletter of the Grier House Museum — news from the house, alumni achievements, reunion reports and announcements from the Grier History and Traditions Committee.',
};

export default function NewsletterPage() {
  const [latest, ...archive] = NEWSLETTER_ISSUES;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/publications" className={styles.backLink}>&larr; News &amp; Publications</Link>
          <div className={styles.pubLabel}>📰 Newsletter &middot; Quarterly &middot; Since 1992</div>
          <h1 className={styles.title}>Grier House Newsletter</h1>
          <p className={styles.subtitle}>
            Quarterly news from the house and the Old Griersons community — covering house events, alumni achievements, reunion reports and committee announcements.
          </p>
        </div>
      </section>

      {/* LATEST ISSUE */}
      <section className={styles.latest}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Latest Issue</p>
          <div className={styles.latestCard}>
            <div className={styles.latestHeader}>
              <div>
                <span className={styles.issueBadge}>{latest.season} {latest.year}</span>
                <h2 className={styles.latestHeadline}>{latest.headline}</h2>
              </div>
            </div>
            <ul className={styles.itemList}>
              {latest.items.map((item, i) => (
                <li key={i} className={styles.item}>
                  <span className={styles.itemBullet} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className={styles.archive}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Previous Issues</h2>
          <div className={styles.archiveGrid}>
            {archive.map((issue) => (
              <div key={issue.slug} className={styles.archiveCard}>
                <span className={styles.archiveBadge}>{issue.season} {issue.year}</span>
                <h3 className={styles.archiveHeadline}>{issue.headline}</h3>
                <ul className={styles.archiveItems}>
                  {issue.items.slice(0, 3).map((item, i) => (
                    <li key={i} className={styles.archiveItem}>{item}</li>
                  ))}
                  {issue.items.length > 3 && (
                    <li className={styles.archiveMore}>+{issue.items.length - 3} more items</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className={styles.subscribe}>
        <div className={styles.container}>
          <div className={styles.subscribeInner}>
            <div>
              <h2 className={styles.subscribeTitle}>Subscribe to the Newsletter</h2>
              <p className={styles.subscribeBody}>
                Old Griersons and friends of Grier House can receive the newsletter by email each quarter. Contact us with your email address and set year to subscribe.
              </p>
            </div>
            <Link href="/contact" className={styles.subscribeBtn}>Subscribe &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  );
}
