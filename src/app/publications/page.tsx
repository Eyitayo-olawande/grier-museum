import type { Metadata } from 'next';
import Link from 'next/link';
import { PUBLICATION_HUBS } from '@/data/publications';
import styles from './page.module.css';
import ArtStrip from '@/components/art/ArtStrip';

export const metadata: Metadata = {
  title: 'News & Publications',
  description:
    'News and publications from the Grier House Museum — including the Mustard Seed literary magazine, the Dare to Learn journal, the quarterly newsletter, alumni stories and messages from the House Governor.',
};

export default function PublicationsPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Grier House Museum &amp; Library</p>
          <h1 className={styles.title}>News &amp; Publications</h1>
          <p className={styles.subtitle}>
            Writing, journalism and the living record of Grier House — five publications across literary, intellectual, news and community voices.
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
                  <div className={styles.meta}>
                    <span className={styles.frequency}>{pub.frequency}</span>
                    <span className={styles.since}>Since {pub.since}</span>
                  </div>
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
              <h2 className={styles.ctaTitle}>Contribute to our publications</h2>
              <p className={styles.ctaDesc}>
                Old Griersons, current students, and members of the Government College Ibadan community are invited to submit writing, photographs and memories across all our publications.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <Link href="/publications/stories" className={styles.ctaBtnPrimary}>
                Share your story
              </Link>
              <Link href="/contact" className={styles.ctaBtnSecondary}>
                Other submissions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
