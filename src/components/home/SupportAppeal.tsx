import type { HomePage } from '@/lib/content';
import Prose from '@/components/common/Prose';
import CopyButton from './CopyButton';
import styles from './SupportAppeal.module.css';

/* "Please support the Grier Museum & Library": books and cash donations */
export default function SupportAppeal({ home }: { home: HomePage }) {
  const bank = home.supportBank;
  if (!home.supportBooks && !home.supportMoney && !bank) return null;

  return (
    <section className={styles.support} id="support" aria-labelledby="support-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Donations</p>
        <h2 id="support-title" className={styles.title}>{home.supportTitle}</h2>
        {home.supportIntro && <p className={styles.intro}>{home.supportIntro}</p>}

        <div className={styles.grid}>
          {home.supportBooks && (
            <div className={styles.card}>
              <h3 className={styles.cardTitle}><span className={styles.num}>1</span> Books</h3>
              <Prose markdown={home.supportBooks} className={styles.prose} />
            </div>
          )}
          {home.supportMoney && (
            <div className={styles.card}>
              <h3 className={styles.cardTitle}><span className={styles.num}>2</span> Money</h3>
              <Prose markdown={home.supportMoney} className={styles.prose} />
            </div>
          )}
        </div>

        {bank && (
          <div className={styles.bank}>
            <p className={styles.bankLabel}>Cash donations for the Grier Museum and Library project should be sent to:</p>
            <dl className={styles.bankDetails}>
              <div>
                <dt>Account name</dt>
                <dd>{bank.accountName}</dd>
              </div>
              <div>
                <dt>Bank</dt>
                <dd>{bank.bankName}</dd>
              </div>
              <div>
                <dt>Account number</dt>
                <dd className={styles.accountNumber}>
                  {bank.accountNumber}
                  <CopyButton text={bank.accountNumber} label="Copy account number" />
                </dd>
              </div>
            </dl>
          </div>
        )}

        {home.supportSignature && (
          <p className={styles.signature}>
            {home.supportSignature.split('\n').map((line, i) => (
              <span key={i} className={i === 0 ? styles.signName : undefined}>{line}</span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
