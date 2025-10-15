import styles from './Typography.module.css';

export function Typography() {
  return (
    <div className={styles.typography}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Headings</h3>
        <h1 className={styles.h1}>Heading 1</h1>
        <h2 className={styles.h2}>Heading 2</h2>
        <h3 className={styles.h3}>Heading 3</h3>
        <h4 className={styles.h4}>Heading 4</h4>
        <h5 className={styles.h5}>Heading 5</h5>
        <h6 className={styles.h6}>Heading 6</h6>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Body Text</h3>
        <p className={styles.bodyLarge}>
          Large body text. The quick brown fox jumps over the lazy dog.
        </p>
        <p className={styles.body}>
          Regular body text. The quick brown fox jumps over the lazy dog.
        </p>
        <p className={styles.bodySmall}>
          Small body text. The quick brown fox jumps over the lazy dog.
        </p>
        <p className={styles.caption}>
          Caption text. The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    </div>
  );
}
