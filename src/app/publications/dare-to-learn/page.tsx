import type { Metadata } from 'next';
import Link from 'next/link';
import { getDareToLearnBook, getExcerpts } from '@/lib/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Dare to Learn',
  description:
    'Excerpts from Dare to Learn: the Grier House story, a forthcoming book on the history of Grier House by O. Olusanya and A. Tewe.',
};

export default async function DareToLearnPage() {
  const [book, excerpts] = await Promise.all([getDareToLearnBook(), getExcerpts()]);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/publications" className={styles.backLink}>&larr; News &amp; Publications</Link>
          <div className={styles.pubLabel}>✍️ Book in press &middot; O. Olusanya and A. Tewe &middot; 2026</div>
          <h1 className={styles.title}>{book?.title ?? 'Dare to Learn'}</h1>
          {book?.description && <p className={styles.subtitle}>{book.description}</p>}
        </div>
      </section>

      {/* EXCERPTS, alphabetical by title */}
      <section className={styles.archive}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Excerpts</h2>
          <div className={styles.archiveList}>
            {excerpts.map((excerpt) => (
              <Link key={excerpt.slug} href={`/publications/dare-to-learn/${excerpt.slug}`} className={styles.archiveRow}>
                <div className={styles.archiveContent}>
                  <h3 className={styles.archiveTheme}>{excerpt.title}</h3>
                  <p className={styles.archiveExcerpt}>{excerpt.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE TO BUY */}
      <section className={styles.about}>
        <div className={styles.container}>
          <div className={styles.submitBox}>
            <p className={styles.submitEyebrow}>The Book</p>
            <h3 className={styles.submitTitle}>Where to buy Dare to Learn</h3>
            {book?.purchaseLinks.length ? (
              book.purchaseLinks.map((link) => (
                <a key={link.url} href={link.url} className={styles.submitBtn} target="_blank" rel="noopener">
                  {link.label}
                </a>
              ))
            ) : (
              <p className={styles.submitBody}>Book in press.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
