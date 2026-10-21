import type { Metadata } from 'next';
import { getArchiveItems } from '@/lib/content';
import ArchiveBrowser, { ERA_LABELS } from '@/components/archives/ArchiveBrowser';
import styles from './page.module.css';
import ArtStrip from '@/components/art/ArtStrip';

export const metadata: Metadata = {
  title: 'Archives',
  description:
    'The digital archive of the Grier House Museum — photographs, video recordings, historical documents and artefacts spanning the full history of Grier House, Government College Ibadan, from 1930 to the present.',
};

export default async function ArchivesPage() {
  const items = await getArchiveItems();
  const count = (type: string) => items.filter((i) => i.type === type).length;
  const ARCHIVE_STATS = {
    photos: count('Photo'),
    videos: count('Video'),
    documents: count('Document'),
    artefacts: count('Artefact'),
    total: items.length,
  };

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Grier House Museum &amp; Library</p>
          <h1 className={styles.title}>Archives</h1>
          <p className={styles.subtitle}>
            Photographs, video recordings, historical documents and artefacts spanning the full history of Grier House — from its founding in 1930 to the present day.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <span className={styles.statIcon}>📸</span>
              <span className={styles.statNum}>{ARCHIVE_STATS.photos}</span>
              <span className={styles.statLabel}>Photographs</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statIcon}>🎥</span>
              <span className={styles.statNum}>{ARCHIVE_STATS.videos}</span>
              <span className={styles.statLabel}>Videos &amp; audio</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statIcon}>📜</span>
              <span className={styles.statNum}>{ARCHIVE_STATS.documents}</span>
              <span className={styles.statLabel}>Documents</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statIcon}>🏆</span>
              <span className={styles.statNum}>{ARCHIVE_STATS.artefacts}</span>
              <span className={styles.statLabel}>Artefacts</span>
            </div>
            <div className={`${styles.stat} ${styles.statTotal}`}>
              <span className={styles.statIcon}>🗂️</span>
              <span className={styles.statNum}>{ARCHIVE_STATS.total}</span>
              <span className={styles.statLabel}>Items catalogued</span>
            </div>
          </div>
        </div>
      </section>

      {/* ERAS */}
      <section className={styles.eras}>
        <div className={styles.container}>
          <div className={styles.erasGrid}>
            {(Object.entries(ERA_LABELS) as [string, string][]).map(([key, label]) => (
              <div key={key} className={styles.eraChip}>
                <span className={styles.eraKey}>{key}</span>
                <span className={styles.eraLabel}>{label.split('(')[1]?.replace(')', '') ?? ''}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHIVE BROWSER */}
      <section className={styles.browser}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Browse the Archive</h2>
            <p className={styles.sectionDesc}>
              Use the tabs to filter by collection type, and the era pills to narrow by period. Click any item to expand its full description.
            </p>
          </div>
          <ArchiveBrowser items={items} />
        </div>
      </section>

      {/* ORIGINAL ART WORKS FROM THE MUSEUM */}
      <ArtStrip start={12} />

      {/* NOTICE — DIGITISATION IN PROGRESS */}
      <section className={styles.notice}>
        <div className={styles.container}>
          <div className={styles.noticeInner}>
            <span className={styles.noticeIcon}>ℹ️</span>
            <p className={styles.noticeText}>
              The Grier House Museum archive is actively being digitised. This catalogue currently represents selected highlights from a larger physical collection. Further photographs, videos, scanned documents and past editions of the Mustard Seed will be added as they are received.
            </p>
          </div>
        </div>
      </section>

      {/* QUESTIONS AND CONTRIBUTIONS */}
      <section className={styles.access}>
        <div className={styles.container}>
          <div className={styles.accessBox}>
            <h2 className={styles.accessTitle}>Questions, corrections and contributions</h2>
            <p className={styles.accessBody}>
              Questions relating to the content of the Museum and Library, including errors or comments on the
              articles, profiles, images, photos and videos, are handled by Dr. Dele Olusanya and Yemi Adegoke.
            </p>
            <a href="mailto:museum@griermuseum.org" className={styles.accessBtn}>museum@griermuseum.org</a>
          </div>
        </div>
      </section>
    </>
  );
}
