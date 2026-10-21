import type { Metadata } from 'next';
import Link from 'next/link';
import { getArtworks } from '@/lib/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Original Art Works in the Grier Museum',
  description:
    'Paintings and drawings in the Grier Museum and Library: portraits of notable Griersons, scenes of Grier House and original works by Griersons.',
};

export default async function OriginalArtWorksPage() {
  const works = await getArtworks();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/museum-library" className={styles.backLink}>&larr; Museum &amp; Library</Link>
          <h1 className={styles.title}>Original Art Works in the Grier Museum</h1>
          <p className={styles.subtitle}>
            Paintings and drawings in the collection of the Grier Museum and Library: portraits of notable Griersons,
            scenes of Grier House through the years, and original works by Griersons.
          </p>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.grid}>
          {works.map((w) => (
            <figure key={w.slug} id={w.slug} className={styles.work}>
              {w.image ? (
                <a href={w.image.url} target="_blank" rel="noopener" className={styles.frame}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.image.url} alt={w.image.alt || w.title} loading="lazy" className={styles.img} />
                </a>
              ) : (
                <div className={styles.frame} />
              )}
              <figcaption className={styles.caption}>
                <span className={styles.workTitle}>{w.title}</span>
                <span className={styles.meta}>
                  {[w.artist, w.medium, w.year].filter(Boolean).join(' · ')}
                </span>
                {w.description && <span className={styles.desc}>{w.description}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
