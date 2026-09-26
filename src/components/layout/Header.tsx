'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/types';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/logo.png"
              alt="Grier House Museum & Library"
              width={76}
              height={76}
              className={styles.logo}
              priority
            />
          </Link>
          <div className={styles.titleBlock}>
            <span className={styles.titleMain}>Grier House</span>
            <span className={styles.titleSub}>Museum &amp; Library</span>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
