import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import Prose from '@/components/common/Prose';
import { getContactPage } from '@/lib/content';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact the Grier Museum & Library, Government College Ibadan: email addresses, address, opening hours and the officers of Grier House.',
};

export default async function ContactPage() {
  const contact = await getContactPage();

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Grier House Museum &amp; Library</p>
          <h1 className={styles.title}>Contact Us</h1>
          {contact?.intro && <p className={styles.subtitle}>{contact.intro}</p>}
        </div>
      </section>

      {/* WHICH EMAIL ADDRESS TO USE */}
      {contact && contact.emails.length > 0 && (
        <section className={styles.emails} aria-label="Email addresses">
          <div className={styles.container}>
            <div className={styles.emailGrid}>
              {contact.emails.map((e) => (
                <div key={e.address} className={styles.emailCard}>
                  <h2 className={styles.emailTitle}>{e.title}</h2>
                  <a href={`mailto:${e.address}`} className={styles.emailAddress}>{e.address}</a>
                  {e.purpose && <p className={styles.emailPurpose}>{e.purpose}</p>}
                  {e.handledBy && <p className={styles.emailHandled}>Handled by {e.handledBy}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              {contact?.address && (
                <div className={styles.infoBox}>
                  <h3 className={styles.infoTitle}>Address</h3>
                  <address className={styles.address}>
                    {contact.address.split('\n').map((line, i) => (
                      <span key={i}>{line}</span>
                    ))}
                  </address>
                  {contact.mapQuery && (
                    <>
                      <iframe
                        title="Map showing Government College Ibadan"
                        className={styles.map}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`}
                        className={styles.infoLink}
                        target="_blank"
                        rel="noopener"
                      >
                        Open in Google Maps &rarr;
                      </a>
                    </>
                  )}
                </div>
              )}

              {contact?.openingHours && (
                <div className={styles.infoBox}>
                  <h3 className={styles.infoTitle}>Opening hours</h3>
                  <Prose markdown={contact.openingHours} className={styles.hours} />
                </div>
              )}

              {contact && contact.officers.length > 0 && (
                <div className={styles.infoBox}>
                  <h3 className={styles.infoTitle}>Officers</h3>
                  <ul className={styles.officers}>
                    {contact.officers.map((o) => (
                      <li key={o.name}>
                        <span className={styles.officerName}>{o.name}</span>
                        {o.set && <span className={styles.officerSet}>{o.set}</span>}
                        <span className={styles.officerRole}>{o.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
