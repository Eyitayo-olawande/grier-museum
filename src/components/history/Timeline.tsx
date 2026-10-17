'use client';

import { useState } from 'react';
import type { TimelineMilestone } from '@/lib/content';
import styles from './Timeline.module.css';

const CATEGORY_COLOURS: Record<TimelineMilestone['category'], string> = {
  Founding:          '#800000',
  Academic:          '#1A365D',
  Sport:             '#1B4D2E',
  National:          '#5C3317',
  'Notable Grierson': '#4A0E0E',
  Museum:            '#4A5568',
};

export default function Timeline({ items }: { items: TimelineMilestone[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className={styles.timeline}>
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        const isLeft = idx % 2 === 0;

        return (
          <div key={idx} className={`${styles.row} ${isLeft ? styles.left : styles.right}`}>
            {/* Year marker */}
            <div className={styles.yearCol}>
              <button
                className={`${styles.yearBtn} ${isOpen ? styles.yearOpen : ''}`}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                aria-expanded={isOpen}
              >
                <span className={styles.yearNum}>{item.year}</span>
              </button>
            </div>

            {/* Spine dot */}
            <div className={styles.spine}>
              <div
                className={`${styles.dot} ${isOpen ? styles.dotOpen : ''}`}
                style={{ background: isOpen ? CATEGORY_COLOURS[item.category] : undefined }}
              />
            </div>

            {/* Content card */}
            <div className={styles.cardCol}>
              <div
                className={`${styles.card} ${isOpen ? styles.cardOpen : ''}`}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <div className={styles.cardTop}>
                  <span
                    className={styles.catBadge}
                    style={{ background: CATEGORY_COLOURS[item.category] }}
                  >
                    {item.category}
                  </span>
                  <span className={styles.toggle}>{isOpen ? '−' : '+'}</span>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                {isOpen && (
                  <p className={styles.cardBody}>{item.body}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
