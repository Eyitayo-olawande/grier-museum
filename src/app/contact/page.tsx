import type { Metadata } from 'next';
import Image from 'next/image';
import ContactForm from '@/components/contact/ContactForm';
import Prose from '@/components/common/Prose';
import { getContactPage } from '@/lib/content';
import styles from './page.module.css';
import ArtStrip from '@/components/art/ArtStrip';

const TEAM = [
  { name: 'Oladele Olusanya',          role: 'Chairman, Grier House History and Traditions Committee', photo: 'oladele-olusanya.jpeg' },
  { name: 'Oladele Jegede',            role: 'Overseer, Grier Museum & Library',                      photo: 'oladele-jegede.jpeg' },
  { name: 'Gboyega Akin-Deko',         role: 'Grier House Governor',                                  photo: 'gboyega-akin-deko.jpeg' },
  { name: 'Bimbo Akinyemi',            role: 'Deputy Governor, Grier House',                          photo: 'bimbo-akinyemi.jpeg' },
  { name: 'Kazeem Olanrewaju Faniyi',  role: 'Grier Housemaster',                                     photo: 'kazeem-faniyi.jpeg' },
  { name: 'Kingsley Raymond',          role: 'Grier House Warden',                                    photo: 'kingsley-raymond.jpeg' },
  { name: 'Isiak Busari',              role: 'Head of House 2026–27',                                 photo: 'isiak-busari.jpeg' },
  { name: 'Kenny Oladipo',             role: 'Website Creator and Sponsor',                           photo: 'kenny-oladipo.jpeg' },
] as const;

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

      {/* MANAGEMENT TEAM */}
      <section className={styles.team} aria-labelledby="team-heading">
        <div className={styles.teamInner}>
          <header className={styles.teamHeader}>
            <div className={styles.teamRule} aria-hidden="true" />
            <div className={styles.teamTitleBlock}>
              <p className={styles.teamEyebrow}>Grier Museum and Library</p>
              <h2 id="team-heading" className={styles.teamTitle}>Management Team</h2>
            </div>
            <div className={styles.teamRule} aria-hidden="true" />
          </header>

          <ul className={styles.teamGrid}>
            {TEAM.map((member) => (
              <li key={member.name} className={styles.teamCard}>
                <div className={styles.teamPortrait}>
                  <Image
                    src={`/team/${member.photo}`}
                    alt={member.name}
                    fill
                    sizes="(max-width: 600px) 50vw, (max-width: 1024px) 25vw, 200px"
                    className={styles.teamPhoto}
                  />
                  <span className={styles.teamInitials} aria-hidden="true">
                    {member.name.split(' ').slice(0, 2).map(w => w[0]).join('')}
                  </span>
                </div>
                <div className={styles.teamInfo}>
                  <p className={styles.teamName}>{member.name}</p>
                  <p className={styles.teamRole}>{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ORIGINAL ART WORKS FROM THE MUSEUM */}
      <ArtStrip start={10} />
    </>
  );
}
