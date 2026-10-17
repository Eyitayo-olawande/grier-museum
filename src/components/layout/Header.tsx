'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/types';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logoLink} onClick={() => setMenuOpen(false)}>
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
          <button
            className={styles.menuBtn}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? '✕ Close' : '☰ Menu'}
          </button>
        </div>

        <nav
          id="main-nav"
          className={styles.nav}
          data-open={menuOpen}
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)) ? styles.active : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
