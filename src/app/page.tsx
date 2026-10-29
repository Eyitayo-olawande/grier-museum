import type { Metadata } from 'next';
import Link from 'next/link';
import { getArchiveItems, getHomePage, getProfiles } from '@/lib/content';
import Prose from '@/components/common/Prose';
import SupportAppeal from '@/components/home/SupportAppeal';
import styles from './page.module.css';
import ArtStrip from '@/components/art/ArtStrip';

export const metadata: Metadata = {
  title: 'Grier House Museum & Library',
  description:
    'Home of the Grier House Museum & Library, custodian of the history and traditions of Grier House, Government College Ibadan.',
};

const QUICK_LINKS = [
  { href: '/notable-griersons', label: 'Notable Griersons', desc: 'Profiles of distinguished alumni' },
  { href: '/history', label: 'Grier House History', desc: 'Articles and an interactive timeline' },
  { href: '/traditions', label: 'House Traditions', desc: 'The House Song, House Supper and more' },
  { href: '/publications', label: 'News & Publications', desc: 'Dare to Learn, the Mustard Seed and Stories of Griersons' },
  { href: '/archives', label: 'Archives', desc: 'Photos, videos and historical documents' },
  { href: '/museum-library', label: 'Museum & Library', desc: 'About the Museum and its collection' },
  { href: '/extracurricular-activities', label: 'Extracurricular Activities', desc: 'Marching Band, Mustard Seed Editorial Board, Chess Club and more' },
  { href: '/museum-library/original-art-works', label: 'Original Art Works', desc: 'Paintings and drawings in the Grier Museum' },
];

export default async function HomePage() {
  const [home, profiles, archive] = await Promise.all([getHomePage(), getProfiles(), getArchiveItems()]);
  const HIGHLIGHTS = [
    { label: 'Notable Griersons', value: String(profiles.length), desc: 'Distinguished Griersons celebrated in our profiles' },
    { label: 'Photographs', value: String(archive.filter((i) => i.type === 'Photo').length), desc: 'Original photographs from the Museum collection' },
    { label: 'Grier House Founded', value: '1930', desc: 'Founded in January 1930 at Government College Ibadan (founded 1929)' },
    { label: 'Museum Opened', value: '2026', desc: 'The Grier Museum and Library, October 2026' },
  ];

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={`${styles.heroInner} ${home?.introVideo ? styles.heroWithVideo : ''}`}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Government College Ibadan, founded 1929 &nbsp;&middot;&nbsp; Grier House, founded 1930</p>
            <h1 className={styles.heroTitle}>Grier House Museum<br />&amp; Library</h1>
            <p className={styles.heroDesc}>
              Home of the Grier House Museum &amp; Library, custodian of the history and traditions of Grier House, Government College Ibadan. Explore profiles of notable Griersons, the traditions of the House, and an archive of photographs and videos from the Museum.
            </p>
            <div className={styles.heroActions}>
              <Link href="/notable-griersons" className={styles.btnPrimary}>Notable Griersons</Link>
              <Link href="/history" className={styles.btnSecondary}>Explore History</Link>
              {home?.supportBank && (
                <a href="#support" className={styles.btnSecondary}>Support the Museum</a>
              )}
            </div>
          </div>
          {home?.introVideo && (
            <figure className={styles.heroVideo}>
              <video src={`${home.introVideo.url}#t=0.5`} controls preload="metadata" playsInline className={styles.heroVideoPlayer} />
              <figcaption className={styles.heroVideoCaption}>{home.introVideo.alt}</figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* HIGHLIGHTS STRIP */}
      <section className={styles.highlights}>
        <div className={styles.highlightsInner}>
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className={styles.highlightItem}>
              <div className={styles.highlightValue}>{h.value}</div>
              <div className={styles.highlightLabel}>{h.label}</div>
              <div className={styles.highlightDesc}>{h.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className={styles.quickLinks}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Explore the Museum</h2>
            <p className={styles.sectionDesc}>Everything the Grier House Museum &amp; Library has to offer</p>
          </div>
          <div className={styles.linkGrid}>
            {QUICK_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={styles.linkCard}>
                <div className={styles.linkCardTitle}>{l.label}</div>
                <div className={styles.linkCardDesc}>{l.desc}</div>
                <div className={styles.linkCardArrow}>&#8594;</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ORIGINAL ART WORKS FROM THE MUSEUM */}
      <ArtStrip start={0} />

      {/* WELCOME */}
      <section className={styles.about}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div>
              <h2 className={styles.aboutTitle}>{home?.welcomeTitle ?? 'About Grier House'}</h2>
              <Prose markdown={home?.welcomeText} className={styles.aboutText} />
              <Link href="/museum-library" className={styles.aboutLink}>Learn about the Museum &rarr;</Link>
            </div>
            <div className={styles.aboutMission}>
              <div className={styles.missionLabel}>Motto of the Grier Museum and Library</div>
              <blockquote className={styles.missionQuote}>
                &ldquo;If you know anything, share it. If you don&rsquo;t know something, search for it.&rdquo;
              </blockquote>
              <div className={styles.missionAttr}>Grier History and Traditions Committee</div>
              {home && home.featuredPhotos.length > 0 && (
                <div className={styles.featuredPhotos}>
                  {home.featuredPhotos.map((photo) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={photo.url} src={photo.thumb} alt={photo.alt} className={styles.featuredPhoto} loading="lazy" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PLEASE SUPPORT THE GRIER MUSEUM & LIBRARY */}
      {home && <SupportAppeal home={home} />}
    </>
  );
}
