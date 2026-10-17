import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getHistoryArticle, getHistoryArticles } from '@/lib/content';
import Prose from '@/components/common/Prose';
import styles from './page.module.css';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getHistoryArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getHistoryArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getHistoryArticle(slug);
  if (!article) notFound();

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
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className={styles.body}>
        <div className={styles.bodyInner}>
          <Prose markdown={article.body} />
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
