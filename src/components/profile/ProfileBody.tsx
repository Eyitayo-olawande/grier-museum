import type { Profile } from '@/types';
import styles from './ProfileBody.module.css';

export default function ProfileBody({ profile }: { profile: Profile }) {
  return (
    <div className={styles.body}>
      <div className={styles.sectionLabel}>Profile</div>

      <div className={styles.achTags}>
        {profile.achievements.map((a) => (
          <span key={a.label} className={styles.achTag}>{a.label}</span>
        ))}
      </div>

      <div className={styles.bioText}>
        {profile.bio.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}
