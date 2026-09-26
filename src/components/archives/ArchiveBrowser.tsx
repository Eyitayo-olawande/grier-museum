'use client';

import { useState } from 'react';
import {
  ARCHIVE_ITEMS,
  TYPE_COLOURS,
  ERA_LABELS,
  type ArchiveType,
  type ArchiveEra,
} from '@/data/archives';
import styles from './ArchiveBrowser.module.css';

const TYPES: ArchiveType[] = ['Photo', 'Video', 'Document', 'Artefact'];
const ERAS = Object.keys(ERA_LABELS) as ArchiveEra[];

const TYPE_ICONS: Record<ArchiveType, string> = {
  Photo:    '📸',
  Video:    '🎥',
  Document: '📜',
  Artefact: '🏆',
};

export default function ArchiveBrowser() {
  const [activeType, setActiveType] = useState<ArchiveType | 'All'>('All');
  const [activeEra,  setActiveEra]  = useState<ArchiveEra  | 'All'>('All');
  const [expanded,   setExpanded]   = useState<string | null>(null);

  const filtered = ARCHIVE_ITEMS.filter((item) => {
    if (activeType !== 'All' && item.type !== activeType) return false;
    if (activeEra  !== 'All' && item.era  !== activeEra)  return false;
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
          <span className={styles.tabCount}>{ARCHIVE_ITEMS.length}</span>
        </button>
        {TYPES.map((t) => {
          const count = ARCHIVE_ITEMS.filter(i => i.type === t).length;
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
          {ERAS.map((era) => (
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
            return (
              <div
                key={item.id}
                className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`}
                onClick={() => setExpanded(isOpen ? null : item.id)}
              >
                {/* Placeholder swatch */}
                <div className={styles.thumb} style={{ background: item.colour }}>
                  <span className={styles.thumbIcon}>{TYPE_ICONS[item.type]}</span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span
                      className={styles.typeBadge}
                      style={{ background: TYPE_COLOURS[item.type] }}
                    >
                      {item.type}
                    </span>
                    <span className={styles.cardEra}>{item.era}</span>
                    <span className={styles.cardYear}>{item.year}</span>
                  </div>

                  <h3 className={styles.cardTitle}>{item.title}</h3>

                  {isOpen && (
                    <div className={styles.cardDetail}>
                      <p className={styles.cardDesc}>{item.description}</p>
                      <div className={styles.cardTags}>
                        {item.tags.map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
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
