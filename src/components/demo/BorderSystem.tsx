import styles from './BorderSystem.module.css';

export function BorderSystem() {
  return (
    <div className={styles.container}>
      {/* Border Widths */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Border Widths</h3>
        <div className={styles.borderGrid}>
          <div className={styles.borderBox}>
            <div className={`${styles.borderDemo} ${styles.thin}`}></div>
            <span className={styles.borderLabel}>Thin</span>
          </div>
          <div className={styles.borderBox}>
            <div className={`${styles.borderDemo} ${styles.medium}`}></div>
            <span className={styles.borderLabel}>Medium</span>
          </div>
          <div className={styles.borderBox}>
            <div className={`${styles.borderDemo} ${styles.thick}`}></div>
            <span className={styles.borderLabel}>Thick</span>
          </div>
        </div>
      </div>

      {/* Border Styles */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Border Styles</h3>
        <div className={styles.borderGrid}>
          <div className={styles.borderBox}>
            <div className={`${styles.borderDemo} ${styles.solid}`}></div>
            <span className={styles.borderLabel}>Solid</span>
          </div>
          <div className={styles.borderBox}>
            <div className={`${styles.borderDemo} ${styles.dashed}`}></div>
            <span className={styles.borderLabel}>Dashed</span>
          </div>
          <div className={styles.borderBox}>
            <div className={`${styles.borderDemo} ${styles.dotted}`}></div>
            <span className={styles.borderLabel}>Dotted</span>
          </div>
        </div>
      </div>

      {/* Border Radius Reminder */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Border Radius (from existing tokens)</h3>
        <div className={styles.radiusGrid}>
          <div className={`${styles.radiusBox} ${styles.radiusNone}`}>
            <span>None</span>
          </div>
          <div className={`${styles.radiusBox} ${styles.radiusSm}`}>
            <span>SM</span>
          </div>
          <div className={`${styles.radiusBox} ${styles.radiusMd}`}>
            <span>MD</span>
          </div>
          <div className={`${styles.radiusBox} ${styles.radiusLg}`}>
            <span>LG</span>
          </div>
          <div className={`${styles.radiusBox} ${styles.radiusFull}`}>
            <span>Full</span>
          </div>
        </div>
      </div>
    </div>
  );
}
