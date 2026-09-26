import type { Metadata } from 'next';
import Link from 'next/link';
import { GOVERNOR_ADDRESSES } from '@/data/publications';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "From the Desk of the House Governor",
  description:
    "Addresses and reflections from the serving and former House Governors of Grier House — the elected student leaders who have guided the house across generations.",
};

export default function FromTheDeskPage() {
  const [latest, ...archive] = GOVERNOR_ADDRESSES;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/publications" className={styles.backLink}>&larr; News &amp; Publications</Link>
          <div className={styles.pubLabel}>🏛️ House Governor &middot; Each Term &middot; Since 2021</div>
          <h1 className={styles.title}>From the Desk of the House Governor</h1>
          <p className={styles.subtitle}>
            Addresses and reflections from the elected student Governors of Grier House — the senior prefects who have led the house and spoken on its behalf across nearly a century.
          </p>
        </div>
      </section>

      {/* LATEST ADDRESS */}
      <section className={styles.latest}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Most Recent Address</p>
          <div className={styles.latestCard}>
            <div className={styles.latestMeta}>
              <div className={styles.governorInfo}>
                <div className={styles.governorAvatar}>{latest.governor.split(' ').map(n => n[0]).join('')}</div>
                <div>
                  <div className={styles.governorName}>{latest.governor}</div>
                  <div className={styles.governorDetail}>House Governor · Set {latest.set} · {latest.term} {latest.year}</div>
                </div>
              </div>
            </div>
            <h2 className={styles.latestTitle}>{latest.title}</h2>
            <p className={styles.latestExcerpt}>"{latest.excerpt}"</p>
            <details className={styles.latestDetails}>
              <summary className={styles.readMore}>Read full address</summary>
              <div className={styles.latestBody}>
                {latest.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className={styles.archive}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Previous Addresses</h2>
          <div className={styles.archiveList}>
            {archive.map((addr) => (
              <div key={addr.id} className={styles.archiveCard}>
                <div className={styles.archiveMeta}>
                  <div className={styles.archiveAvatar}>{addr.governor.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <div className={styles.archiveGovernor}>{addr.governor}</div>
                    <div className={styles.archiveDetail}>Set {addr.set} · {addr.term} {addr.year}</div>
                  </div>
                </div>
                <h3 className={styles.archiveTitle}>{addr.title}</h3>
                <p className={styles.archiveExcerpt}>"{addr.excerpt}"</p>
                <details className={styles.archiveDetails}>
                  <summary className={styles.archiveReadMore}>Read full address</summary>
                  <div className={styles.archiveBody}>
                    {addr.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className={styles.about}>
        <div className={styles.container}>
          <div className={styles.aboutInner}>
            <h2 className={styles.aboutTitle}>The House Governor tradition</h2>
            <p className={styles.aboutBody}>
              The House Governor is the elected senior student leader of Grier House — a position of considerable responsibility within the Government College Ibadan house system. The Governor leads house assemblies, represents the house at school-level events, mentors junior students, and maintains the standards of the house.
            </p>
            <p className={styles.aboutBody}>
              The tradition of the Governor addressing the full house at the start of each term has continued unbroken since the 1930s. This section of the museum publishes selected addresses from current and recent Governors as part of the living record of Grier House.
            </p>
            <p className={styles.aboutBody}>
              Old Griersons who served as House Governors and wish to share their own recollections or addresses are invited to contribute to the archive.
            </p>
            <Link href="/contact" className={styles.aboutLink}>Contribute to the archive &rarr;</Link>
          </div>
        </div>
      </section>
    </>
  );
}
