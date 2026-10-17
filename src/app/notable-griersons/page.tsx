import type { Metadata } from 'next';
import Link from 'next/link';
import { getProfiles, profileInitial } from '@/lib/content';
import type { Era, Field } from '@/types';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Notable Griersons',
  description:
    'Profiles of distinguished alumni of Grier House, Government College Ibadan, presented in alphabetical order.',
};

const ERA_COLOURS: Record<Era, string> = {
  Colonial:     '#5C3317',
  'Post-War':   '#4A5568',
  Independence: '#1B4D2E',
  Modern:       '#1A365D',
};

export default async function NotableGriersonsPage() {
  const profiles = await getProfiles();

  // Build A–Z index of letters that actually appear
  const letters = [...new Set(
    profiles.map(profileInitial)
  )].sort();

  // Group profiles by first letter of surname
  const grouped = letters.reduce<Record<string, typeof profiles>>((acc, letter) => {
    acc[letter] = profiles.filter((p) => profileInitial(p) === letter);
    return acc;
  }, {});

  return (
    <>
      {/* PAGE HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Grier House Museum &amp; Library</p>
          <h1 className={styles.title}>Notable Griersons</h1>
          <p className={styles.subtitle}>
            Distinguished alumni of Grier House, Government College Ibadan &mdash; presented in alphabetical order by surname.
          </p>
          <div className={styles.stat}>
            <span className={styles.statNum}>{profiles.length}</span>
            <span className={styles.statLabel}>profiles at launch &middot; ongoing additions</span>
          </div>
        </div>
      </section>

      {/* A–Z JUMP NAV */}
      <nav className={styles.alphaNav} aria-label="Alphabetical index">
        <div className={styles.alphaInner}>
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
            letters.includes(letter) ? (
              <a key={letter} href={`#letter-${letter}`} className={styles.alphaActive}>
                {letter}
              </a>
            ) : (
              <span key={letter} className={styles.alphaInactive}>{letter}</span>
            )
          ))}
        </div>
      </nav>

      {/* PROFILE LISTING */}
      <section className={styles.listing}>
        <div className={styles.listingInner}>
          {letters.map((letter) => (
            <div key={letter} className={styles.group} id={`letter-${letter}`}>
              <div className={styles.groupLetter}>{letter}</div>
              <div className={styles.cards}>
                {grouped[letter].map((profile) => (
                  <Link
                    key={profile.slug}
                    href={`/notable-griersons/${profile.slug}`}
                    className={styles.card}
                  >
                    {/* Photo area */}
                    <div className={styles.cardPhoto}>
                      {profile.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={profile.photo} alt={profile.shortName} className={styles.cardImg} />
                      ) : (
                        <div className={styles.cardPhotoPlaceholder}>
                          <svg viewBox="0 0 40 48" fill="none" className={styles.phIcon}>
                            <circle cx="20" cy="14" r="8" fill="currentColor" opacity=".25" />
                            <path d="M2 44c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="currentColor" strokeWidth="2" opacity=".2" fill="none" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Card body */}
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span
                          className={styles.eraTag}
                          style={{ background: ERA_COLOURS[profile.era] }}
                        >
                          {profile.era}
                        </span>
                        {profile.fields.map((f: Field) => (
                          <span key={f} className={styles.fieldTag}>{f}</span>
                        ))}
                      </div>
                      <h2 className={styles.cardName}>{profile.shortName}</h2>
                      <p className={styles.cardFull}>{profile.fullName}</p>
                      <div className={styles.cardDetails}>
                        {profile.meta.schoolNumber && (
                          <>
                            <span>No. {profile.meta.schoolNumber}</span>
                            <span className={styles.dot}>&middot;</span>
                          </>
                        )}
                        <span>{profile.meta.set} Set</span>
                      </div>
                      {profile.meta.distinctions[0] && (
                        <p className={styles.cardDistinction}>{profile.meta.distinctions[0]}</p>
                      )}
                    </div>

                    <div className={styles.cardArrow}>&#8594;</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
