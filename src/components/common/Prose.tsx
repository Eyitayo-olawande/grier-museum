import { Fragment, type ReactNode } from 'react';
import styles from './Prose.module.css';

/* Renders the Markdown subset used in the content: paragraphs, ## headings,
   **bold** lines and words, > quoted verse with a "— attribution" line,
   - lists, *** rules, and single line breaks (for songs and prayers). */

function inline(text: string): ReactNode {
  const lines = text.split('\n');
  return lines.map((line, i) => (
    <Fragment key={i}>
      {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
        part.startsWith('**') && part.endsWith('**') ? <strong key={j}>{part.slice(2, -2)}</strong> : part
      )}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ));
}

function block(md: string, key: number): ReactNode {
  const lines = md.split('\n');
  if (/^\*{3,}$/.test(md)) return <hr key={key} className={styles.rule} />;
  if (md.startsWith('## ')) return <h2 key={key} className={styles.heading}>{md.slice(3)}</h2>;
  if (/^\*\*[^*]+\*\*$/.test(md)) return <h3 key={key} className={styles.subheading}>{md.slice(2, -2)}</h3>;
  if (lines.every((l) => l.startsWith('- '))) {
    return (
      <ul key={key} className={styles.list}>
        {lines.map((l, i) => <li key={i}>{inline(l.slice(2))}</li>)}
      </ul>
    );
  }
  if (lines.every((l) => l.startsWith('> '))) {
    const verse = lines.map((l) => l.slice(2));
    const attribution = verse.at(-1)!.startsWith('— ') ? verse.pop() : undefined;
    return (
      <blockquote key={key} className={styles.verse}>
        <p>{inline(verse.join('\n'))}</p>
        {attribution && <cite className={styles.cite}>{attribution}</cite>}
      </blockquote>
    );
  }
  return <p key={key}>{inline(md)}</p>;
}

export default function Prose({ markdown, className }: { markdown: string | null | undefined; className?: string }) {
  if (!markdown) return null;
  const blocks = markdown.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return <div className={`${styles.prose} ${className ?? ''}`}>{blocks.map(block)}</div>;
}
