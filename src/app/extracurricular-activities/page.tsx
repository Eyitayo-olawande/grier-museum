import type { Metadata } from 'next';
import { getActivities } from '@/lib/content';
import Prose from '@/components/common/Prose';
import styles from './page.module.css';
import ArtStrip from '@/components/art/ArtStrip';

export const metadata: Metadata = {
  title: 'Extracurricular Activities',
  description:
    'Extracurricular activities for students living in Grier House: the Grier House Marching Band, Saturday Night Socials, the Mustard Seed editorial team and more.',
};

export default async function ExtracurricularPage() {
  const activities = await getActivities();
  const intro = activities.find((a) => a.slug === 'about');
  const sections = activities.filter((a) => a !== intro);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Grier House Museum &amp; Library</p>
          <h1 className={styles.title}>Extracurricular Activities</h1>
          {intro && <p className={styles.subtitle}>{intro.body}</p>}
          <nav className={styles.jump} aria-label="Activities">
            {sections.map((s) => (
              <a key={s.slug} href={`#${s.slug}`} className={styles.jumpLink}>{s.title}</a>
            ))}
          </nav>
        </div>
      </section>

      <div className={styles.container}>
        {intro && (intro.photos.length > 0 || intro.videos.length > 0) && (
          <section className={styles.featured}>
            {intro.photos.map((photo) => (
              <figure key={photo.url} className={styles.featuredVideo}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.url} alt={photo.alt} className={styles.video} />
                {photo.alt && <figcaption className={styles.videoCaption}>{photo.alt}</figcaption>}
              </figure>
            ))}
            {intro.videos.map((video) => (
              <figure key={video.url} className={styles.featuredVideo}>
                <video src={video.url} controls preload="metadata" className={styles.video} />
                {video.alt && <figcaption className={styles.videoCaption}>{video.alt}</figcaption>}
              </figure>
            ))}
          </section>
        )}
        {sections.map((activity) => (
          <section key={activity.slug} id={activity.slug} className={styles.activity}>
            <div className={styles.activityText}>
              <h2 className={styles.activityTitle}>{activity.title}</h2>
              <p className={styles.summary}>{activity.summary}</p>
              <Prose markdown={activity.body} />
            </div>
            {(activity.photos.length > 0 || activity.videos.length > 0) && (
              <div className={styles.photos}>
                {activity.photos.map((photo) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={photo.url} src={photo.url} alt={photo.alt} className={styles.photo} loading="lazy" />
                ))}
                {activity.videos.map((video) => (
                  <figure key={video.url} className={styles.sectionVideo}>
                    <video src={`${video.url}#t=0.5`} controls preload="metadata" playsInline className={styles.photo} />
                    {video.alt && <figcaption className={styles.videoCaption}>{video.alt}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* ORIGINAL ART WORKS FROM THE MUSEUM */}
      <ArtStrip start={4} />
    </>
  );
}
