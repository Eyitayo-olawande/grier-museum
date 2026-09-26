import Link from 'next/link';
import type { Profile } from '@/types';
import styles from './ProfileNav.module.css';

interface Props {
  prev: Profile | null;
  next: Profile | null;
}

export default function ProfileNav({ prev, next }: Props) {
  return (
    <nav className={styles.nav} aria-label="Profile navigation">
      <div className={styles.inner}>
        {prev ? (
          <Link href={`/notable-griersons/${prev.slug}`} className={`${styles.link} ${styles.left}`}>
            <span className={styles.dir}>&#8592; Previous</span>
            <span className={styles.name}>{prev.shortName}</span>
          </Link>
        ) : (
          <div />
        )}

        <Link href="/notable-griersons" className={styles.index}>
          All Notable Griersons
        </Link>

        {next ? (
          <Link href={`/notable-griersons/${next.slug}`} className={`${styles.link} ${styles.right}`}>
            <span className={styles.dir}>Next &#8594;</span>
            <span className={styles.name}>{next.shortName}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
