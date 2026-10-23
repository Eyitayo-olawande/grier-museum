import type { Metadata } from 'next';
import Link from 'next/link';
import { getDeskPosts } from '@/lib/content';
import PublicationEntries from '@/components/publications/PublicationEntries';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'From the Desk of the House Governor',
  description: 'Latest news and developments from the Governor of Grier House.',
};

export default async function FromTheDeskPage() {
  const posts = await getDeskPosts();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/publications" className={styles.backLink}>&larr; News &amp; Publications</Link>
          <div className={styles.pubLabel}>🏛️ Gboyega Akin-Deko &middot; Grierson &rsquo;70 set &middot; Governor, Grier House</div>
          <h1 className={styles.title}>From the Desk of the House Governor</h1>
          {/* brief: "click to view latest news and developments by the House Governor" */}
          <p className={styles.subtitle}>Latest news and developments by the House Governor.</p>
        </div>
      </section>

      <section className={styles.entries}>
        <div className={styles.container}>
          <PublicationEntries entries={posts} empty="Nothing has been published from the desk of the House Governor yet." />
        </div>
      </section>
    </>
  );
}
