'use client';

import { useState } from 'react';
import styles from './SupportAppeal.module.css';

export default function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard blocked: the number stays visible to copy by hand
    }
  }

  return (
    <button type="button" className={styles.copy} onClick={copy} aria-live="polite">
      {copied ? 'Copied' : label}
    </button>
  );
}
