import type { Media } from '@/lib/strapi';
import styles from './ProfileGallery.module.css';

export default function ProfileGallery({ name, photos }: { name: string; photos: Media[] }) {
  return (
    <section className={styles.gallery} aria-label={`Photographs and video of ${name}`}>
      <div className={styles.sectionLabel}>
        {photos.some((p) => p.isVideo) ? 'Photographs and Video' : 'Photographs'}
      </div>
      <div className={styles.grid}>
        {photos.map((photo) =>
          photo.isVideo ? (
            <figure key={photo.url} className={`${styles.item} ${styles.videoItem}`}>
              <video src={`${photo.url}#t=0.5`} controls preload="metadata" playsInline className={styles.video} />
              {photo.alt && <figcaption className={styles.caption}>{photo.alt}</figcaption>}
            </figure>
          ) : (
            <a key={photo.url} href={photo.url} target="_blank" rel="noopener" className={styles.item}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.thumb} alt={photo.alt} loading="lazy" className={styles.img} />
              {photo.alt && <span className={styles.caption}>{photo.alt}</span>}
            </a>
          )
        )}
      </div>
    </section>
  );
}
