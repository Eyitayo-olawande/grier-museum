import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Grier House Museum and Library. We welcome enquiries from Old Griersons, researchers, journalists and members of the public.',
};

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Grier House Museum &amp; Library</p>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            We welcome enquiries from Old Griersons, researchers, journalists and members of the public. Use the form below or reach us directly.
          </p>
        </div>
      </section>

      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.layout}>

            {/* FORM COLUMN */}
            <div className={styles.formCol}>
              <h2 className={styles.formTitle}>Send us a message</h2>
              <ContactForm />
            </div>

            {/* SIDEBAR */}
            <aside className={styles.sidebar}>
              <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>Get in touch</h3>
                <dl className={styles.infoList}>
                  <div className={styles.infoRow}>
                    <dt className={styles.infoLabel}>Email</dt>
                    <dd className={styles.infoValue}>
                      <a href="mailto:hello@griermuseum.org" className={styles.infoLink}>
                        hello@griermuseum.org
                      </a>
                    </dd>
                  </div>
                  <div className={styles.infoRow}>
                    <dt className={styles.infoLabel}>Website</dt>
                    <dd className={styles.infoValue}>
                      <a href="https://griermuseum.org" className={styles.infoLink}>
                        griermuseum.org
                      </a>
                    </dd>
                  </div>
                  <div className={styles.infoRow}>
                    <dt className={styles.infoLabel}>Physical address</dt>
                    <dd className={styles.infoValue}>
                      Grier House, Government College Ibadan<br />
                      Ibadan, Oyo State<br />
                      Nigeria
                    </dd>
                  </div>
                  <div className={styles.infoRow}>
                    <dt className={styles.infoLabel}>Response time</dt>
                    <dd className={styles.infoValue}>Within 5 working days</dd>
                  </div>
                </dl>
              </div>

              <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>Content editor</h3>
                <p className={styles.infoBody}>
                  For contributions to the digital archive, articles for the website, or editorial enquiries, please contact our content editor.
                </p>
                <a href="mailto:content@griermuseum.org" className={styles.infoLink}>
                  content@griermuseum.org
                </a>
              </div>

              <div className={styles.infoBox}>
                <h3 className={styles.infoTitle}>Old Griersons chapters</h3>
                <p className={styles.infoBody}>
                  Active Old Griersons chapters operate in Lagos, Ibadan, Abuja, Port Harcourt, London, Houston and Toronto. Contact us to be connected with your nearest chapter.
                </p>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
