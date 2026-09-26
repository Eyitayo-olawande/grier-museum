import type { Profile } from '@/types';
import styles from './ProfileHero.module.css';

export default function ProfileHero({ profile }: { profile: Profile }) {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        {/* Photo column */}
        <div className={styles.photoCol}>
          {profile.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.photo} alt={profile.shortName} className={styles.photo} />
          ) : (
            <div className={styles.placeholder}>
              <svg viewBox="0 0 48 60" fill="none" className={styles.phIcon}>
                <circle cx="24" cy="17" r="10" fill="white" opacity=".15" />
                <path d="M2 56c0-12.15 9.85-22 22-22s22 9.85 22 22" stroke="white" strokeWidth="2" opacity=".1" fill="none" />
              </svg>
              <span className={styles.phLabel}>Portrait Photograph</span>
              <span className={styles.phSub}>Original collection only</span>
            </div>
          )}
        </div>

        {/* Text column */}
        <div className={styles.textCol}>
          <div className={styles.tags}>
            {profile.heroTags.map((tag) => (
              <span key={tag} className={styles.fieldTag}>{tag}</span>
            ))}
            {profile.meta.distinctions.map((d) => (
              <span key={d} className={styles.awardTag}>{d}</span>
            ))}
          </div>
          <h1 className={styles.name}>{profile.fullName}</h1>
          <div className={styles.school}>
            <span>School No. #{profile.meta.schoolNumber}</span>
            <span>{profile.meta.set} Set</span>
            {profile.meta.distinctions.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
