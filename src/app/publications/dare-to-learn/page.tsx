import type { Metadata } from 'next';
import Link from 'next/link';
import { DARE_TO_LEARN_ISSUES } from '@/data/publications';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dare to Learn',
  description:
    'The intellectual journal of Grier House — long-form essays, academic writing and reflections on education, public life and the Nigerian experience by Old Griersons.',
};

export default function DareToLearnPage() {
  const [latest, ...archive] = DARE_TO_LEARN_ISSUES;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/publications" className={styles.backLink}>&larr; News &amp; Publications</Link>
          <div className={styles.pubLabel}>✍️ Intellectual Journal &middot; Biannual &middot; Since 1985</div>
          <h1 className={styles.title}>Dare to Learn</h1>
          <p className={styles.subtitle}>
            Long-form essays and academic writing by Old Griersons — on education, public life, the professions, and the Nigerian experience. Published twice yearly since 1985.
          </p>
        </div>
      </section>

      {/* LATEST */}
      <section className={styles.latest}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Latest Issue</p>
          <div className={styles.latestCard}>
            <div className={styles.latestMeta}>
              <span className={styles.volBadge}>Vol. {latest.volume} · {latest.season} {latest.year}</span>
            </div>
            <h2 className={styles.latestTheme}>"{latest.theme}"</h2>
            <p className={styles.latestExcerpt}>{latest.excerpt}</p>
            <p className={styles.latestEssays}>{latest.essays} essays</p>
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className={styles.archive}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Previous Issues</h2>
          <div className={styles.archiveList}>
            {archive.map((issue) => (
              <div key={`${issue.volume}-${issue.season}`} className={styles.archiveRow}>
                <div className={styles.archiveMeta}>
                  <span className={styles.archiveVol}>Vol. {issue.volume}</span>
                  <span className={styles.archiveSeason}>{issue.season} {issue.year}</span>
                  <span className={styles.archiveEssays}>{issue.essays} essays</span>
                </div>
                <div className={styles.archiveContent}>
                  <h3 className={styles.archiveTheme}>"{issue.theme}"</h3>
                  <p className={styles.archiveExcerpt}>{issue.excerpt}</p>
                </div>
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
              <h2 className={styles.aboutTitle}>About Dare to Learn</h2>
              <p className={styles.aboutBody}>
                Founded in 1985 as a forum for long-form intellectual exchange among Old Griersons, Dare to Learn publishes essays that engage seriously with ideas — on education, law, science, public life and the cultural and political history of Nigeria.
              </p>
              <p className={styles.aboutBody}>
                The journal takes its name from the motto of Grier House: a belief that intellectual courage — the willingness to engage with difficult questions and to pursue knowledge with genuine ambition — is the defining characteristic of a Grierson education.
              </p>
              <p className={styles.aboutBody}>
                Contributors have included professors, judges, physicians, civil servants, economists and business leaders. The journal does not seek consensus — it seeks rigour and seriousness of argument.
              </p>
            </div>
            <div className={styles.submitBox}>
              <p className={styles.submitEyebrow}>Submissions</p>
              <h3 className={styles.submitTitle}>Contribute an essay</h3>
              <p className={styles.submitBody}>
                Old Griersons and invited contributors are welcome to submit essays of 2,000 to 5,000 words on any topic of intellectual substance. The editorial board meets quarterly to review submissions.
              </p>
              <p className={styles.submitBody}>
                Essays should demonstrate seriousness of argument, clarity of expression and engagement with relevant scholarship or evidence. Personal reflection is welcome where grounded in broader analysis.
              </p>
              <Link href="/contact" className={styles.submitBtn}>Submit an essay</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
