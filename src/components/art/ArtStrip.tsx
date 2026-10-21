import Link from 'next/link';
import { getArtworks, type Artwork } from '@/lib/content';
import styles from './ArtStrip.module.css';

export const ART_PAGE = '/museum-library/original-art-works';

/* A band of three works from the Museum's collection. Each page passes a
   different start so the paintings and drawings are spread across the site. */
export default async function ArtStrip({ start, count = 3 }: { start: number; count?: number }) {
  const works = (await getArtworks()).filter((w): w is Artwork & { image: NonNullable<Artwork['image']> } =>
    Boolean(w.image)
  );
  if (works.length === 0) return null;
  const shown = Array.from({ length: Math.min(count, works.length) }, (_, i) => works[(start + i) % works.length]);

  return (
    <section className={styles.strip} aria-label="Original art works in the Grier Museum">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>From the Grier Museum collection</p>
          <Link href={ART_PAGE} className={styles.all}>See all original art works &rarr;</Link>
        </div>
        <div className={styles.grid}>
          {shown.map((w) => (
            <Link key={w.slug} href={`${ART_PAGE}#${w.slug}`} className={styles.work}>
              <span className={styles.frame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.image.thumb} alt={w.image.alt || w.title} loading="lazy" className={styles.img} />
              </span>
              <span className={styles.title}>{w.title}</span>
              {w.artist && <span className={styles.artist}>{w.artist}</span>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
