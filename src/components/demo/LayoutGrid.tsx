import styles from './LayoutGrid.module.css';

export function LayoutGrid() {
  return (
    <div className={styles.container}>
      {/* Grid System */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Grid System</h3>
        <div className={styles.gridDemo}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={styles.gridColumn}>
              <div className={styles.columnContent}>{i + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Container Sizes */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Container Widths</h3>
        <div className={styles.containerDemo}>
          <div className={`${styles.containerBox} ${styles.containerSm}`}>
            <span className={styles.containerLabel}>SM</span>
          </div>
          <div className={`${styles.containerBox} ${styles.containerMd}`}>
            <span className={styles.containerLabel}>MD</span>
          </div>
          <div className={`${styles.containerBox} ${styles.containerLg}`}>
            <span className={styles.containerLabel}>LG</span>
          </div>
          <div className={`${styles.containerBox} ${styles.containerXl}`}>
            <span className={styles.containerLabel}>XL</span>
          </div>
          <div className={`${styles.containerBox} ${styles.container2xl}`}>
            <span className={styles.containerLabel}>2XL</span>
          </div>
        </div>
      </div>

      {/* Breakpoints */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Breakpoints</h3>
        <div className={styles.breakpointsList}>
          <div className={styles.breakpointItem}>
            <span className={styles.breakpointLabel}>SM</span>
            <span className={styles.breakpointValue}>≥ var(--breakpoint-sm)</span>
          </div>
          <div className={styles.breakpointItem}>
            <span className={styles.breakpointLabel}>MD</span>
            <span className={styles.breakpointValue}>≥ var(--breakpoint-md)</span>
          </div>
          <div className={styles.breakpointItem}>
            <span className={styles.breakpointLabel}>LG</span>
            <span className={styles.breakpointValue}>≥ var(--breakpoint-lg)</span>
          </div>
          <div className={styles.breakpointItem}>
            <span className={styles.breakpointLabel}>XL</span>
            <span className={styles.breakpointValue}>≥ var(--breakpoint-xl)</span>
          </div>
          <div className={styles.breakpointItem}>
            <span className={styles.breakpointLabel}>2XL</span>
            <span className={styles.breakpointValue}>≥ var(--breakpoint-2xl)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
