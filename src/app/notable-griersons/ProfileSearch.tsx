'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Profile, Era, Field } from '@/types';
import { profileInitial } from '@/lib/content';
import styles from './page.module.css';

const ERA_COLOURS: Record<Era, string> = {
  Colonial:     '#5C3317',
  'Post-War':   '#4A5568',
  Independence: '#1B4D2E',
  Modern:       '#1A365D',
};

export default function ProfileSearch({ profiles }: { profiles: Profile[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return profiles;
    return profiles.filter(
      (p) =>
        p.shortName.toLowerCase().includes(q) ||
        p.fullName.toLowerCase().includes(q) ||
        (p.era?.toLowerCase().includes(q) ?? false) ||
        p.fields.some((f) => f.toLowerCase().includes(q)) ||
        (p.meta.set && String(p.meta.set).includes(q))
    );
  }, [profiles, query]);

  const letters = [...new Set(filtered.map(profileInitial))].sort();
  const grouped = letters.reduce<Record<string, Profile[]>>((acc, letter) => {
    acc[letter] = filtered.filter((p) => profileInitial(p) === letter);
    return acc;
  }, {});

  return (
    <>
      {/* SEARCH BAR */}
      <div className={styles.searchBar}>
        <div className={styles.searchInner}>
          <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none" aria-hidden>
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, era, field or year set…"
            className={styles.searchInput}
            aria-label="Search notable Griersons"
          />
          {query && (
            <button className={styles.searchClear} onClick={() => setQuery('')} aria-label="Clear search">
              ×
            </button>
          )}
        </div>
        {query && (
          <p className={styles.searchCount}>
            {filtered.length === 0
              ? 'No profiles found'
              : `${filtered.length} profile${filtered.length === 1 ? '' : 's'} found`}
          </p>
        )}
      </div>

      {/* A–Z JUMP NAV — only when not searching */}
      {!query && (
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
      )}

      {/* PROFILE LISTING */}
      <section className={styles.listing}>
        <div className={styles.listingInner}>
          {filtered.length === 0 && (
            <p className={styles.emptyState}>No profiles match &ldquo;{query}&rdquo;.</p>
          )}
          {letters.map((letter) => (
            <div key={letter} className={styles.group} id={`letter-${letter}`}>
              {!query && <div className={styles.groupLetter}>{letter}</div>}
              <div className={styles.cards}>
                {grouped[letter].map((profile) => (
                  <Link
                    key={profile.slug}
                    href={`/notable-griersons/${profile.slug}`}
                    className={styles.card}
                  >
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
                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        {profile.era && (
                          <span className={styles.eraTag} style={{ background: ERA_COLOURS[profile.era] }}>
                            {profile.era}
                          </span>
                        )}
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
                        <span>{profile.meta.set > 0 ? `${profile.meta.set} Set` : ''}</span>
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
