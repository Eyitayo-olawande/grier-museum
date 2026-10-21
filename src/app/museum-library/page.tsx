import type { Metadata } from 'next';
import Link from 'next/link';
import { getContactPage, getMuseumPage } from '@/lib/content';
import Prose from '@/components/common/Prose';
import type { Media } from '@/lib/strapi';
import styles from './page.module.css';
import ArtStrip from '@/components/art/ArtStrip';

export const metadata: Metadata = {
  title: 'Museum & Library',
  description:
    'The Grier House Museum and Library preserves the history, traditions and achievements of Grier House, Government College Ibadan. Visit us, explore the collections, or contribute to the archive.',
};


function MediaGrid({ items }: { items: Media[] }) {
  return (
    <div className={styles.mediaGrid}>
      {items.map((m) =>
        m.isVideo ? (
          <video key={m.url} src={m.url} controls preload="metadata" className={styles.mediaItem} />
        ) : (
          <a key={m.url} href={m.url} target="_blank" rel="noopener">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.thumb} alt={m.alt} loading="lazy" className={styles.mediaItem} />
          </a>
        )
      )}
    </div>
  );
}

export default async function MuseumLibraryPage() {
  const [museum, contact] = await Promise.all([getMuseumPage(), getContactPage()]);
  const volumes = (museum?.goals.match(/^- /gm) ?? []).length;

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

      {/* INTRODUCTORY VIDEOS: a tour of the Museum and Library */}
      {museum && museum.introVideos.length > 0 && (
        <section className={styles.introVideos}>
          <div className={styles.container}>
            <div className={styles.introVideoGrid}>
              {museum.introVideos.map((v) => (
                <figure key={v.url} className={styles.introVideo}>
                  <video src={`${v.url}#t=1`} controls preload="metadata" playsInline className={styles.introVideoPlayer} />
                  {v.alt && <figcaption className={styles.introVideoCaption}>{v.alt}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MISSION */}
      <section className={styles.mission}>
        <div className={styles.container}>
          <div className={styles.missionInner}>
            <div className={styles.missionText}>
              <p className={styles.missionEyebrow}>Our Mission</p>
              <h2 className={styles.missionTitle}>A living repository of the Grier House legacy</h2>
              <p className={styles.missionBody}>{museum?.intro}</p>
              <p className={styles.missionBody}>
                The Museum holds framed iconic photographs, original oil paintings and trophies, and the Library gives Grier House students access to encyclopedias, atlases, classic literature and biographies.
              </p>
            </div>

            <div className={styles.missionStats}>
              <div className={styles.stat}>
                <span className={styles.statNum}>1930</span>
                <span className={styles.statLabel}>Grier House Founded</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>2026</span>
                <span className={styles.statLabel}>Museum Established</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>{museum?.galleryImages.length ?? 0}</span>
                <span className={styles.statLabel}>Images from the Museum</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>{volumes}</span>
                <span className={styles.statLabel}>Library Volumes Listed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGES FROM THE MUSEUM */}
      {museum && museum.galleryImages.length > 0 && (
        <section className={styles.collections}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Images from the Museum</h2>
            </div>
            <MediaGrid items={museum.galleryImages} />
          </div>
        </section>
      )}

      {/* CREATING THE MUSEUM */}
      {museum && museum.creatingTheMuseumMedia.length > 0 && (
        <section className={styles.collections} id="creating-the-museum">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{museum.creatingTheMuseumTitle}</h2>
            </div>
            <MediaGrid items={museum.creatingTheMuseumMedia} />
          </div>
        </section>
      )}

      {/* ORIGINAL ART WORKS FROM THE MUSEUM */}
      <ArtStrip start={1} />

      {/* THE LIBRARY */}
      <section className={styles.library}>
        <div className={styles.container}>
          <div className={styles.libraryGrid}>
            <Prose markdown={museum?.history} />
            <Prose markdown={museum?.goals} className={styles.volumes} />
          </div>
        </div>
      </section>

      {/* VISIT & ACCESS */}
      <section className={styles.visit}>
        <div className={styles.container}>
          <div className={styles.visitInner}>
            <div className={styles.visitText}>
              <h2 className={styles.sectionTitle}>Visit &amp; Access</h2>
              {/* address and opening hours as given by the committee (Contact Page entry) */}
              <table className={styles.visitTable}>
                <tbody>
                  {contact?.address && (
                    <tr>
                      <td className={styles.visitLabel}>Address</td>
                      <td className={styles.visitValue}>
                        {contact.address.split('\n').map((line, i) => <span key={i} style={{ display: 'block' }}>{line}</span>)}
                      </td>
                    </tr>
                  )}
                  {contact?.openingHours && (
                    <tr>
                      <td className={styles.visitLabel}>Opening hours</td>
                      <td className={styles.visitValue}><Prose markdown={contact.openingHours} /></td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Link href="/contact" className={styles.visitBtn}>
                Arrange a visit &rarr;
              </Link>
            </div>

            <div className={styles.visitContrib}>
              <div className={styles.contribBox}>
                {/* the chairman's appeal for books and cash donations is on the Home page */}
                <p className={styles.contribEyebrow}>Donations</p>
                <h3 className={styles.contribTitle}>Please Support the Grier Museum &amp; Library</h3>
                <p className={styles.contribBody}>
                  To maintain the Grier Museum and Library we need both books and cash donations.
                </p>
                <Link href="/#support" className={styles.contribBtn}>
                  How to support the Museum
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
              The Grier Museum and Library is a project of the Grier History and Traditions Committee, chaired by Oladele Olusanya. Beyond the Museum and Library, the Committee organizes extracurricular activities for students living in Grier House.
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
