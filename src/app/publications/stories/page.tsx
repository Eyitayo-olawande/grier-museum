import type { Metadata } from 'next';
import Link from 'next/link';
import { STORIES } from '@/data/publications';
import StorySubmitForm from '@/components/publications/StorySubmitForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Stories of Griersons',
  description:
    "First-person accounts of life in Grier House — school memories, friendships, and formative experiences from Old Griersons. Submissions welcome.",
};

export default function StoriesPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/publications" className={styles.backLink}>&larr; News &amp; Publications</Link>
          <div className={styles.pubLabel}>💬 Alumni Stories &middot; Ongoing &middot; Since 2020</div>
          <h1 className={styles.title}>Stories of Griersons</h1>
          <p className={styles.subtitle}>
            First-person accounts of life in Grier House — school memories, friendships, formative moments and the experiences that shaped a lifetime. Old Griersons are invited to share their own.
          </p>
        </div>
      </section>

      {/* STORIES */}
      <section className={styles.stories}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Published Stories</h2>
            <p className={styles.sectionDesc}>{STORIES.length} stories from the Grier House archive</p>
          </div>

          <div className={styles.storiesList}>
            {STORIES.map((story) => (
              <article key={story.id} className={styles.storyCard}>
                <div className={styles.storyMeta}>
                  <span className={styles.storyAuthor}>{story.author}</span>
                  <span className={styles.storySet}>Set {story.set}</span>
                  <span className={styles.storyDate}>
                    {new Date(story.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <h3 className={styles.storyTitle}>{story.title}</h3>
                <p className={styles.storyExcerpt}>{story.excerpt}</p>

                <details className={styles.storyDetails}>
                  <summary className={styles.storyReadMore}>Read in full</summary>
                  <div className={styles.storyBody}>
                    {story.body.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </details>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SUBMIT */}
      <section className={styles.submit}>
        <div className={styles.container}>
          <div className={styles.submitLayout}>
            <div className={styles.submitIntro}>
              <h2 className={styles.submitTitle}>Share your story</h2>
              <p className={styles.submitBody}>
                Every Grierson has a story. The night before WAEC. The match that won the athletics shield. The conversation in the common room that changed how you saw the world. The teacher whose words you still carry.
              </p>
              <p className={styles.submitBody}>
                We invite Old Griersons to submit short personal accounts — 300 to 1,500 words — for publication on this website and in print. Your story is part of the living record of Grier House.
              </p>
              <div className={styles.guidelines}>
                <h3 className={styles.guidelinesTitle}>Submission guidelines</h3>
                <ul className={styles.guidelinesList}>
                  <li>300 to 1,500 words in length</li>
                  <li>First-person, personal accounts only</li>
                  <li>Must relate to your time in Grier House or GCI</li>
                  <li>Will be lightly edited for clarity; not substantially changed</li>
                  <li>You will be credited by name and set year</li>
                </ul>
              </div>
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
