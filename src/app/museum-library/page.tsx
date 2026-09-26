import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Museum & Library',
  description:
    'The Grier House Museum and Library preserves the history, traditions and achievements of Grier House, Government College Ibadan. Visit us, explore the collections, or contribute to the archive.',
};

const COLLECTIONS = [
  {
    icon: '📜',
    title: 'Historical Documents',
    desc: 'Original correspondence, administrative records, and school documents spanning from the founding of Grier House in 1929 to the present day.',
    count: '200+ items',
  },
  {
    icon: '📸',
    title: 'Photograph Archive',
    desc: 'Over two hundred photographs documenting house life, sporting events, Prize Giving Days, and the notable Griersons who shaped the house across nine decades.',
    count: '200+ photographs',
  },
  {
    icon: '🎥',
    title: 'Video & Audio',
    desc: 'Filmed recordings of house events, oral history interviews with notable alumni, and audio recordings of the house song from various eras.',
    count: '30+ recordings',
  },
  {
    icon: '📚',
    title: 'The Mustard Seed Collection',
    desc: 'The complete run of Grier House\'s literary magazine, from its founding edition in 1962 to the present day, including limited-circulation early editions.',
    count: 'All editions, 1962–present',
  },
  {
    icon: '🏆',
    title: 'Trophies & Artefacts',
    desc: 'Inter-house athletics shields, academic cups, and personal artefacts donated by Old Griersons, forming a tangible record of the house\'s competitive achievements.',
    count: 'On permanent display',
  },
  {
    icon: '📖',
    title: 'Published Works',
    desc: 'Books, monographs, academic papers, and journalism by Old Griersons — a library of the intellectual output of men who passed through Grier House.',
    count: '500+ works',
  },
];

const VISIT_INFO = [
  { label: 'Location', value: 'Grier House, Government College Ibadan, Ibadan, Oyo State, Nigeria' },
  { label: 'Opening Hours', value: 'By appointment — contact us to arrange a visit' },
  { label: 'Research Access', value: 'Archives available to researchers and journalists by prior arrangement' },
  { label: 'Digital Access', value: 'Selected collections available online at griermuseum.org' },
];

export default function MuseumLibraryPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Grier House Museum &amp; Library</p>
          <h1 className={styles.title}>Museum &amp; Library</h1>
          <p className={styles.subtitle}>
            Preserving the history, traditions and achievements of Grier House for present and future generations of Griersons and the broader community of Government College Ibadan.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className={styles.mission}>
        <div className={styles.container}>
          <div className={styles.missionInner}>
            <div className={styles.missionText}>
              <p className={styles.missionEyebrow}>Our Mission</p>
              <h2 className={styles.missionTitle}>A living archive for a remarkable legacy</h2>
              <p className={styles.missionBody}>
                The Grier House Museum and Library was established in 2024 by the Grier History and Traditions Committee, with the support of Old Griersons from across Nigeria and the diaspora. Its purpose is to collect, preserve, document and present the history and traditions of Grier House, Government College Ibadan — one of the oldest and most distinguished houses in one of Nigeria's finest schools.
              </p>
              <p className={styles.missionBody}>
                From the founding of the house in 1929 to the alumni who have shaped Nigerian public life across every generation since Independence, the Grier House story is one of remarkable continuity, intellectual achievement, and service to Nigeria. This museum exists to tell that story in full.
              </p>
            </div>

            <div className={styles.missionStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>1929</span>
                <span className={styles.statLabel}>Year Founded</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>95+</span>
                <span className={styles.statLabel}>Years of History</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>1,000+</span>
                <span className={styles.statLabel}>Old Griersons</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>2024</span>
                <span className={styles.statLabel}>Museum Established</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className={styles.collections}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>The Collections</h2>
            <p className={styles.sectionDesc}>
              The museum holds six core collections spanning documents, photographs, recordings, publications and artefacts.
            </p>
          </div>

          <div className={styles.grid}>
            {COLLECTIONS.map((item) => (
              <div key={item.title} className={styles.collCard}>
                <div className={styles.collIcon}>{item.icon}</div>
                <h3 className={styles.collTitle}>{item.title}</h3>
                <p className={styles.collDesc}>{item.desc}</p>
                <p className={styles.collCount}>{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT & ACCESS */}
      <section className={styles.visit}>
        <div className={styles.container}>
          <div className={styles.visitInner}>
            <div className={styles.visitText}>
              <h2 className={styles.sectionTitle}>Visit &amp; Access</h2>
              <p className={styles.visitDesc}>
                The Grier House Museum is located within the grounds of Government College Ibadan. Visits are by appointment; researchers, journalists and members of the Grier House family are welcome to arrange access to the collections.
              </p>
              <table className={styles.visitTable}>
                <tbody>
                  {VISIT_INFO.map((row) => (
                    <tr key={row.label}>
                      <td className={styles.visitLabel}>{row.label}</td>
                      <td className={styles.visitValue}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href="/contact" className={styles.visitBtn}>
                Arrange a visit &rarr;
              </Link>
            </div>

            <div className={styles.visitContrib}>
              <div className={styles.contribBox}>
                <p className={styles.contribEyebrow}>Contribute to the Archive</p>
                <h3 className={styles.contribTitle}>Do you have something to share?</h3>
                <p className={styles.contribBody}>
                  Old Griersons and their families are invited to donate or loan items to the museum — photographs, documents, publications, artefacts or any material relating to Grier House and Government College Ibadan.
                </p>
                <p className={styles.contribBody}>
                  Your contribution helps us build the most comprehensive record of Grier House history ever assembled. All donations are gratefully acknowledged and properly attributed in the collection.
                </p>
                <Link href="/contact" className={styles.contribBtn}>
                  Make a contribution
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMITTEE */}
      <section className={styles.committee}>
        <div className={styles.container}>
          <div className={styles.committeeInner}>
            <h2 className={styles.committeeTitle}>Grier History and Traditions Committee</h2>
            <p className={styles.committeeBody}>
              The museum is governed by the Grier History and Traditions Committee, formed in 2020 by Old Griersons with a commitment to preserving the legacy of Grier House. The Committee oversees the collection, commissions research, and manages the museum and its digital presence.
            </p>
            <Link href="/contact" className={styles.committeeLink}>
              Contact the Committee &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
