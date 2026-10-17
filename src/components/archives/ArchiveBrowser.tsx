'use client';

import { useState } from 'react';
import type { Era } from '@/types';
import type { ArchiveItem, ArchiveType } from '@/lib/content';
import styles from './ArchiveBrowser.module.css';

export const ERA_LABELS: Record<Era, string> = {
  Colonial: 'Colonial Era (1930–1947)',
  'Post-War': 'Post-War Era (1948–1959)',
  Independence: 'Independence Era (1960–1989)',
  Modern: 'Modern Era (1990–present)',
};

const TYPE_COLOURS: Record<ArchiveType, string> = {
  Photo:    '#800000',
  Video:    '#1B4D2E',
  Document: '#1A365D',
  Artefact: '#B5862A',
};

const TYPES: ArchiveType[] = ['Photo', 'Video', 'Document', 'Artefact'];
const ERAS = Object.keys(ERA_LABELS) as Era[];
const UNDATED = 'Undated' as const;

const TYPE_ICONS: Record<ArchiveType, string> = {
  Photo:    '📸',
  Video:    '🎥',
  Document: '📜',
  Artefact: '🏆',
};

export default function ArchiveBrowser({ items }: { items: ArchiveItem[] }) {
  const [activeType, setActiveType] = useState<ArchiveType | 'All'>('All');
  const [activeEra,  setActiveEra]  = useState<Era | typeof UNDATED | 'All'>('All');
  const [expanded,   setExpanded]   = useState<string | null>(null);

  const types = TYPES.filter((t) => items.some((i) => i.type === t));
  const eras: (Era | typeof UNDATED)[] = [
    ...ERAS.filter((e) => items.some((i) => i.era === e)),
    ...(items.some((i) => !i.era) ? [UNDATED] : []),
  ];

  const filtered = items.filter((item) => {
    if (activeType !== 'All' && item.type !== activeType) return false;
    if (activeEra === UNDATED) return !item.era;
    if (activeEra !== 'All' && item.era !== activeEra) return false;
    return true;
  });

  return (
    <div className={styles.browser}>

      {/* TYPE TABS */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeType === 'All' ? styles.tabActive : ''}`}
          onClick={() => setActiveType('All')}
        >
          All collections
          <span className={styles.tabCount}>{items.length}</span>
        </button>
        {types.map((t) => {
          const count = items.filter(i => i.type === t).length;
          return (
            <button
              key={t}
              className={`${styles.tab} ${activeType === t ? styles.tabActive : ''}`}
              style={activeType === t ? { borderBottomColor: TYPE_COLOURS[t], color: TYPE_COLOURS[t] } : {}}
              onClick={() => setActiveType(t)}
            >
              <span>{TYPE_ICONS[t]}</span> {t}s
              <span className={styles.tabCount}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* ERA FILTER */}
      <div className={styles.filters}>
        <span className={styles.filterLabel}>Filter by era:</span>
        <div className={styles.filterPills}>
          <button
            className={`${styles.pill} ${activeEra === 'All' ? styles.pillActive : ''}`}
            onClick={() => setActiveEra('All')}
          >All eras</button>
          {eras.map((era) => (
            <button
              key={era}
              className={`${styles.pill} ${activeEra === era ? styles.pillActive : ''}`}
              onClick={() => setActiveEra(era)}
            >
              {era}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS COUNT */}
      <p className={styles.resultCount}>
        {filtered.length} item{filtered.length !== 1 ? 's' : ''}
        {activeType !== 'All' || activeEra !== 'All' ? ' matching filters' : ' in the archive'}
      </p>

      {/* GRID */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>No archive items match these filters.</div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((item) => {
            const isOpen = expanded === item.id;
            const media = item.media;
            return (
              <div
                key={item.id}
                className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`}
                onClick={() => setExpanded(isOpen ? null : item.id)}
              >
                <div className={styles.thumb} style={media ? undefined : { background: TYPE_COLOURS[item.type] }}>
                  {media?.isVideo ? (
                    <video className={styles.thumbMedia} src={media.url} preload="metadata" muted playsInline />
                  ) : media ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className={styles.thumbMedia} src={media.thumb} alt={media.alt} loading="lazy" />
                  ) : (
                    <span className={styles.thumbIcon}>{TYPE_ICONS[item.type]}</span>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span
                      className={styles.typeBadge}
                      style={{ background: TYPE_COLOURS[item.type] }}
                    >
                      {item.type}
                    </span>
                    {item.era && <span className={styles.cardEra}>{item.era}</span>}
                    {item.year && <span className={styles.cardYear}>{item.year}</span>}
                  </div>

                  <h3 className={styles.cardTitle}>{item.title}</h3>

                  {isOpen && (
                    <div className={styles.cardDetail} onClick={(e) => e.stopPropagation()}>
                      {media?.isVideo && (
                        <video className={styles.player} src={media.url} controls preload="metadata" />
                      )}
                      {item.description && <p className={styles.cardDesc}>{item.description}</p>}
                      {media && !media.isVideo && (
                        <a href={media.url} target="_blank" rel="noopener" className={styles.fullLink}>
                          View full size &rarr;
                        </a>
                      )}
                      {item.credit && (
                        <p className={styles.cardCredit}>Credit: {item.credit}</p>
                      )}
                    </div>
                  )}

                  <span className={styles.toggle}>{isOpen ? '−' : '+'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
