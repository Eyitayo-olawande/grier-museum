import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, HISTORY_ARTICLES } from '@/data/articles';
import styles from './page.module.css';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return HISTORY_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const date = new Date(article.date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <>
      {/* ARTICLE HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/history" className={styles.backLink}>
            &larr; Grier House History
          </Link>
          <div className={styles.meta}>
            <span className={styles.catBadge}>{article.category}</span>
            <span className={styles.era}>{article.era}</span>
            <span className={styles.readTime}>{article.readingTime} min read</span>
          </div>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.excerpt}>{article.excerpt}</p>
          <p className={styles.date}>{date}</p>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className={styles.body}>
        <div className={styles.bodyInner}>
          {article.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      {/* BACK LINK */}
      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <Link href="/history" className={styles.footerBack}>
            &larr; Back to Grier House History
          </Link>
        </div>
      </div>
    </>
  );
}
