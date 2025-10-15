import { useTokenRestrictions } from '../../hooks/useTokenRestrictions';
import styles from './Typography.module.css';

export function Typography() {
  const { getTokenClass } = useTokenRestrictions();
  
  return (
    <div className={styles.typography}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Headings</h3>
        <h1 className={`${styles.h1} ${getTokenClass('typography', 'fontSize', '4xl')}`}>
          Heading 1
        </h1>
        <h2 className={`${styles.h2} ${getTokenClass('typography', 'fontSize', '3xl')}`}>
          Heading 2
        </h2>
        <h3 className={`${styles.h3} ${getTokenClass('typography', 'fontSize', '2xl')}`}>
          Heading 3
        </h3>
        <h4 className={`${styles.h4} ${getTokenClass('typography', 'fontSize', 'xl')}`}>
          Heading 4
        </h4>
        <h5 className={`${styles.h5} ${getTokenClass('typography', 'fontSize', 'lg')}`}>
          Heading 5
        </h5>
        <h6 className={`${styles.h6} ${getTokenClass('typography', 'fontSize', 'base')}`}>
          Heading 6
        </h6>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Body Text</h3>
        <p className={`${styles.bodyLarge} ${getTokenClass('typography', 'fontSize', 'lg')}`}>
          Large body text. The quick brown fox jumps over the lazy dog.
        </p>
        <p className={`${styles.body} ${getTokenClass('typography', 'fontSize', 'base')}`}>
          Regular body text. The quick brown fox jumps over the lazy dog.
        </p>
        <p className={`${styles.bodySmall} ${getTokenClass('typography', 'fontSize', 'sm')}`}>
          Small body text. The quick brown fox jumps over the lazy dog.
        </p>
        <p className={`${styles.caption} ${getTokenClass('typography', 'fontSize', 'xs')}`}>
          Caption text. The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    </div>
  );
}
