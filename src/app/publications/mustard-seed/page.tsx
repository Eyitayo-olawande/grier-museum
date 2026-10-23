import type { Metadata } from 'next';
import Link from 'next/link';
import { getMustardSeedIssues } from '@/lib/content';
import PublicationEntries from '@/components/publications/PublicationEntries';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'The Mustard Seed',
  description: 'The Mustard Seed, the Grier House magazine, restarted as an online publication created by Grier House students.',
};

export default async function MustardSeedPage() {
  const issues = await getMustardSeedIssues();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/publications" className={styles.backLink}>&larr; News &amp; Publications</Link>
          <div className={styles.pubLabel}>📖 House magazine &middot; December and June</div>
          <h1 className={styles.title}>The Mustard Seed</h1>
          {/* from the committee's "Promoting extracurricular activities" document */}
          <p className={styles.subtitle}>
            An Editorial team has set to work to restart the &ldquo;Mustard Seed&rdquo; House magazine as an online
            publication on our website. This magazine which will be solely created, edited, published and managed by
            Grier House students, is planned to be published twice a year, December and June.
          </p>
        </div>
      </section>

      <section className={styles.entries}>
        <div className={styles.container}>
          <PublicationEntries entries={issues} empty="No issues of the Mustard Seed have been published on the website yet." />
        </div>
      </section>
    </>
  );
}
