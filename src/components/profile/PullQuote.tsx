import styles from './PullQuote.module.css';

interface Props {
  text: string;
  attribution: string;
  source: string;
}

export default function PullQuote({ text, attribution, source }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.quote}>
        <p className={styles.text}>{text}</p>
        <p className={styles.attr}>
          {attribution} &nbsp;&middot;&nbsp; <span className={styles.source}>{source}</span>
        </p>
      </div>
    </div>
  );
}
