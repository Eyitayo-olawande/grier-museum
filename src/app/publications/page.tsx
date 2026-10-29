import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import ArtStrip from '@/components/art/ArtStrip';

export const metadata: Metadata = {
  title: 'News & Publications',
  description:
    'News and publications from the Grier House Museum: the Mustard Seed literary magazine, the Dare to Learn journal, the quarterly newsletter, alumni stories and messages from the House Governor.',
};

/* Descriptions use the wording of the project brief and the committee's documents */
const PUBLICATION_HUBS = [
  {
    id: 'mustard-seed',
    title: 'The Mustard Seed',
    tagline: 'The Grier House magazine',
    description:
      'Restarted as an online publication, created, edited, published and managed by Grier House students, planned for December and June.',
    href: '/publications/mustard-seed',
    icon: '📖',
    colour: '#800000',
  },
  {
    id: 'dare-to-learn',
    title: 'Dare to Learn',
    tagline: 'The Grier House story',
    description: 'Excerpts from the book on the history of Grier House by O. Olusanya and A. Tewe. Book in press.',
    href: '/publications/dare-to-learn',
    icon: '✍️',
    colour: '#1A365D',
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    tagline: 'Grier House Newsletter',
    description: 'Newsletters of Grier House.',
    href: '/publications/newsletter',
    icon: '📰',
    colour: '#4A5568',
  },
  {
    id: 'stories',
    title: 'Stories of Griersons',
    tagline: 'Submitted by individual Griersons',
    description:
      'Articles submitted by Griersons to the webpage editor, Mr Kenny Oladipo, for review and editing before they are uploaded.',
    href: '/publications/stories',
    icon: '💬',
    colour: '#5C3317',
  },
  {
    id: 'from-the-desk',
    title: 'From the Desk of the House Governor',
    tagline: 'Gboyega Akin-Deko, Grierson \u201970 set',
    description: 'Latest news and developments by the House Governor.',
    href: '/publications/from-the-desk',
    icon: '🏛️',
    colour: '#1B4D2E',
  },
];

export default function PublicationsPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Grier House Museum &amp; Library</p>
          <h1 className={styles.title}>News &amp; Publications</h1>
          <p className={styles.subtitle}>
            The Mustard Seed, Dare to Learn, the Newsletter, Stories of Griersons and From the Desk of the House Governor.
          </p>
        </div>
      </section>

      {/* PUBLICATIONS GRID */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {PUBLICATION_HUBS.map((pub) => (
              <Link key={pub.id} href={pub.href} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.icon}>{pub.icon}</span>
                </div>

                <div className={styles.stripe} style={{ background: pub.colour }} />

                <h2 className={styles.cardTitle}>{pub.title}</h2>
                <p className={styles.tagline}>{pub.tagline}</p>
                <p className={styles.cardDesc}>{pub.description}</p>

                <span className={styles.readMore}>Browse &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ORIGINAL ART WORKS FROM THE MUSEUM */}
      <ArtStrip start={7} />

      {/* SUBMIT CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>
            <div>
              <h2 className={styles.ctaTitle}>Stories of Griersons</h2>
              <p className={styles.ctaDesc}>
                Individual Griersons submit articles to the webpage editor, Mr Kenny Oladipo, for review and editing
                before any story or article is uploaded. Questions about the Mustard Seed and other publications go
                to editor@griermuseum.org.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/publications/stories" className={styles.ctaBtnPrimary}>
                Submit a story
              </Link>
              <a href="mailto:editor@griermuseum.org" className={styles.ctaBtnSecondary}>
                editor@griermuseum.org
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
