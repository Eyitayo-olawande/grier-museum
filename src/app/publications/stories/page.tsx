import type { Metadata } from 'next';
import Link from 'next/link';
import { getStories } from '@/lib/content';
import PublicationEntries from '@/components/publications/PublicationEntries';
import StorySubmitForm from '@/components/publications/StorySubmitForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Stories of Griersons',
  description:
    'Stories of Griersons, submitted to the webpage editor, Mr Kenny Oladipo, for review and editing before they are uploaded.',
};

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/publications" className={styles.backLink}>&larr; News &amp; Publications</Link>
          <div className={styles.pubLabel}>💬 Stories of Griersons</div>
          <h1 className={styles.title}>Stories of Griersons</h1>
          {/* from the project brief */}
          <p className={styles.subtitle}>
            Individual Griersons will submit articles to the webpage editor, Mr Kenny Oladipo, for review and editing
            before any story or article is uploaded.
          </p>
        </div>
      </section>

      <section className={styles.entries}>
        <div className={styles.container}>
          <PublicationEntries entries={stories} empty="No stories have been published yet." />
        </div>
      </section>

      {/* SUBMIT */}
      <section className={styles.submit}>
        <div className={styles.container}>
          <div className={styles.submitLayout}>
            <div className={styles.submitIntro}>
              <h2 className={styles.submitTitle}>Submit your story</h2>
              <p className={styles.submitBody}>
                Stories are sent to the webpage editor, Mr Kenny Oladipo, for review and editing before they are
                uploaded.
              </p>
            </div>
            <div className={styles.submitFormCol}>
              <StorySubmitForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
