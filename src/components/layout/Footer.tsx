import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logos}>
          <Image
            src="/images/gci-logo.jpeg"
            alt="Government College Ibadan"
            width={56}
            height={56}
            className={styles.logoImg}
          />
          <div className={styles.sep} />
          <Image
            src="/images/grier-crest.jpeg"
            alt="Grier House Crest"
            width={56}
            height={56}
            className={styles.logoImg}
          />
        </div>

        <div className={styles.textBlock}>
          <div className={styles.inst}>
            Grier House Museum &amp; Library &nbsp;&middot;&nbsp; Government College Ibadan
          </div>
          <div className={styles.tagline}>The Voice of Grier House</div>
        </div>

        <div className={styles.right}>
          <div className={styles.url}>griermuseum.org</div>
          <div className={styles.copy}>&copy; {year} Grier House Museum &amp; Library</div>
        </div>
      </div>
    </footer>
  );
}
