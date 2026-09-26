import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Grier House Museum & Library',
  description:
    'Home of the Grier House Museum & Library — custodian of the history and traditions of Grier House, Government College Ibadan.',
};

const HIGHLIGHTS = [
  { label: 'Notable Alumni', value: '24+', desc: 'Distinguished Griersons celebrated in our profiles' },
  { label: 'Photographs', value: '200', desc: 'Original photographs from the Museum collection' },
  { label: 'Years of History', value: '95+', desc: 'From the founding of Grier House in 1929' },
  { label: 'Archive Videos', value: '30', desc: 'Recordings documenting Grier House traditions' },
];

const QUICK_LINKS = [
  { href: '/notable-griersons', label: 'Notable Griersons', desc: 'Profiles of distinguished alumni' },
  { href: '/history', label: 'Grier House History', desc: 'Articles and an interactive timeline' },
  { href: '/traditions', label: 'House Traditions', desc: 'The House Song, House Supper and more' },
  { href: '/publications', label: 'News & Publications', desc: 'Mustard Seed, Newsletter and Stories' },
  { href: '/archives', label: 'Archives', desc: 'Photos, videos and historical documents' },
  { href: '/museum-library', label: 'Museum & Library', desc: 'About the Museum and its collection' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Government College Ibadan &nbsp;&middot;&nbsp; Founded 1929</p>
            <h1 className={styles.heroTitle}>Grier House Museum<br />&amp; Library</h1>
            <p className={styles.heroDesc}>
              Custodian of the history, traditions and legacy of Grier House &mdash; one of the four great houses of Government College Ibadan. Explore profiles of distinguished Griersons, centuries of house traditions, and an archive of photographs and recordings from the Museum.
            </p>
            <div className={styles.heroActions}>
              <Link href="/notable-griersons" className={styles.btnPrimary}>Notable Griersons</Link>
              <Link href="/history" className={styles.btnSecondary}>Explore History</Link>
            </div>
          </div>
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

      {/* ABOUT STRIP */}
      <section className={styles.about}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div>
              <h2 className={styles.aboutTitle}>About Grier House</h2>
              <p className={styles.aboutText}>
                Grier House is one of the four boarding houses of Government College Ibadan, one of Nigeria&rsquo;s most distinguished secondary schools. Founded in 1929, Government College Ibadan has produced some of Nigeria&rsquo;s most accomplished scholars, professionals, public servants and leaders.
              </p>
              <p className={styles.aboutText}>
                The Grier House Museum &amp; Library was established to preserve and celebrate the unique history and traditions of Grier House, and to honour the legacy of the distinguished men who have called Grier House their home.
              </p>
              <Link href="/museum-library" className={styles.aboutLink}>Learn about the Museum &rarr;</Link>
            </div>
            <div className={styles.aboutMission}>
              <div className={styles.missionLabel}>Our Mission</div>
              <blockquote className={styles.missionQuote}>
                &ldquo;To preserve and celebrate the history, traditions and legacy of Grier House for current and future generations of Griersons.&rdquo;
              </blockquote>
              <div className={styles.missionAttr}>Grier History and Traditions Committee</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
