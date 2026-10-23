import type { PublicationEntry } from '@/lib/content';
import Prose from '@/components/common/Prose';
import styles from './PublicationEntries.module.css';

/* Lists published entries, or says plainly that nothing has been published yet. */
export default function PublicationEntries({ entries, empty }: { entries: PublicationEntry[]; empty: string }) {
  if (entries.length === 0) {
    return <p className={styles.empty}>{empty}</p>;
  }
  return (
    <div className={styles.list}>
      {entries.map((e) => (
        <article key={e.key} className={styles.entry}>
          {e.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={e.image.thumb} alt={e.image.alt || e.title} className={styles.image} loading="lazy" />
          )}
          <div className={styles.text}>
            {e.meta.length > 0 && <p className={styles.meta}>{e.meta.join(' · ')}</p>}
            <h3 className={styles.title}>{e.title}</h3>
            {e.summary && <p className={styles.summary}>{e.summary}</p>}
            {e.body && (
              <details className={styles.details}>
                <summary className={styles.readMore}>Read in full</summary>
                <Prose markdown={e.body} />
              </details>
            )}
            {e.pdfUrl && (
              <a href={e.pdfUrl} target="_blank" rel="noopener" className={styles.pdf}>Open the PDF &rarr;</a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
