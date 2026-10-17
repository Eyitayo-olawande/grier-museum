import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getExcerpt, getExcerpts } from '@/lib/content';
import Prose from '@/components/common/Prose';
import styles from '@/app/history/[slug]/page.module.css';

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getExcerpts()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const excerpt = await getExcerpt(slug);
  if (!excerpt) return {};
  return { title: `${excerpt.title} | Dare to Learn`, description: excerpt.excerpt };
}

export default async function ExcerptPage({ params }: Props) {
  const { slug } = await params;
  const excerpt = await getExcerpt(slug);
  if (!excerpt) notFound();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/publications/dare-to-learn" className={styles.backLink}>
            &larr; Dare to Learn
          </Link>
          <div className={styles.meta}>
            <span className={styles.catBadge}>Book Excerpt</span>
          </div>
          <h1 className={styles.title}>{excerpt.title}</h1>
        </div>
      </section>

      <article className={styles.body}>
        <div className={styles.bodyInner}>
          <Prose markdown={excerpt.body} />
          <p>
            <em>Excerpt from the forthcoming book &lsquo;Dare to Learn: the Grier House story&rsquo; by O. Olusanya and A. Tewe, copyright 2026.</em>
          </p>
        </div>
      </article>

      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <Link href="/publications/dare-to-learn" className={styles.footerBack}>
            &larr; All excerpts
          </Link>
        </div>
      </div>
    </>
  );
}
