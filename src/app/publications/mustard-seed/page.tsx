import type { Metadata } from 'next';
import Link from 'next/link';
import { MUSTARD_SEED_ISSUES } from '@/data/publications';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'The Mustard Seed',
  description:
    "The oldest continuously published literary magazine at Government College Ibadan, produced by Grier House since 1962. Poetry, fiction, essays and art by Griersons.",
};

export default function MustardSeedPage() {
  const [latest, ...archive] = MUSTARD_SEED_ISSUES;

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/publications" className={styles.backLink}>&larr; News &amp; Publications</Link>
          <div className={styles.pubLabel}>📖 Literary Magazine &middot; Annual &middot; Since 1962</div>
          <h1 className={styles.title}>The Mustard Seed</h1>
          <p className={styles.subtitle}>
            The oldest continuously published literary magazine at Government College Ibadan. Poetry, fiction, essays and art by current and former Griersons — in unbroken publication since 1962.
          </p>
        </div>
      </section>

      {/* LATEST ISSUE */}
      <section className={styles.latest}>
        <div className={styles.container}>
          <p className={styles.sectionEyebrow}>Latest Issue</p>
          <div className={styles.latestCard}>
            <div className={styles.latestLeft}>
              <div className={styles.volBadge}>Vol. {latest.volume}</div>
              <div className={styles.latestYear}>{latest.year}</div>
              {latest.theme && <h2 className={styles.latestTheme}>"{latest.theme}"</h2>}
              <p className={styles.latestExcerpt}>{latest.excerpt}</p>
              <p className={styles.latestPieces}>{latest.pieces} pieces published</p>
            </div>
            <div className={styles.latestRight}>
              <div className={styles.coverPlaceholder}>
                <span className={styles.coverIcon}>📖</span>
                <span className={styles.coverVol}>Mustard Seed<br />Vol. {latest.volume}</span>
                <span className={styles.coverYear}>{latest.year}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className={styles.archive}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Previous Issues</h2>
            <p className={styles.sectionDesc}>Archive of selected Mustard Seed volumes</p>
          </div>

          <div className={styles.archiveGrid}>
            {archive.map((issue) => (
              <div key={issue.year} className={styles.archiveCard}>
                <div className={styles.archiveTop}>
                  <span className={styles.archiveVol}>Vol. {issue.volume}</span>
                  <span className={styles.archiveYear}>{issue.year}</span>
                </div>
                {issue.theme && <h3 className={styles.archiveTheme}>"{issue.theme}"</h3>}
                <p className={styles.archiveExcerpt}>{issue.excerpt}</p>
                <p className={styles.archivePieces}>{issue.pieces} pieces</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + SUBMIT */}
      <section className={styles.about}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div>
              <h2 className={styles.aboutTitle}>About the Mustard Seed</h2>
              <p className={styles.aboutBody}>
                The Mustard Seed was founded in 1962 by a group of Grier House students inspired by the creative renaissance of post-Independence Nigeria. It takes its name from the New Testament parable — the belief that something small, properly nurtured, can grow into something remarkable.
              </p>
              <p className={styles.aboutBody}>
                Over more than six decades, the magazine has published the early work of writers, poets, essayists and thinkers who went on to distinguished careers. The complete archive, from Volume 1 (1962) to the present, is held by the Grier House Museum.
              </p>
            </div>
            <div className={styles.submitBox}>
              <p className={styles.submitEyebrow}>Submissions</p>
              <h3 className={styles.submitTitle}>Contribute to the Mustard Seed</h3>
              <p className={styles.submitBody}>
                Current Grier House students and Old Griersons are invited to submit poetry, fiction, essays, visual art and photography for consideration in the annual edition. Submissions open each January.
              </p>
              <Link href="/contact" className={styles.submitBtn}>
                Submit a piece
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
