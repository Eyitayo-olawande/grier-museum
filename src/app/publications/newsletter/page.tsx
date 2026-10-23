import type { Metadata } from 'next';
import Link from 'next/link';
import { getNewsletterIssues } from '@/lib/content';
import PublicationEntries from '@/components/publications/PublicationEntries';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'The Grier House Newsletter.',
};

export default async function NewsletterPage() {
  const issues = await getNewsletterIssues();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/publications" className={styles.backLink}>&larr; News &amp; Publications</Link>
          <div className={styles.pubLabel}>📰 Newsletter</div>
          <h1 className={styles.title}>Newsletter</h1>
        </div>
      </section>

      <section className={styles.entries}>
        <div className={styles.container}>
          <PublicationEntries entries={issues} empty="No newsletters have been published yet." />
        </div>
      </section>
    </>
  );
}
