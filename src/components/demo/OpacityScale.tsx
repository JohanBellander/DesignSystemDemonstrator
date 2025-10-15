import styles from './OpacityScale.module.css';

export function OpacityScale() {
  return (
    <div className={styles.container}>
      <div className={styles.opacityGrid}>
        <div className={styles.opacityItem}>
          <div className={`${styles.opacityBox} ${styles.disabled}`}>
            <span className={styles.opacityLabel}>Disabled</span>
          </div>
          <span className={styles.opacityValue}>var(--opacity-disabled)</span>
        </div>

        <div className={styles.opacityItem}>
          <div className={`${styles.opacityBox} ${styles.hover}`}>
            <span className={styles.opacityLabel}>Hover</span>
          </div>
          <span className={styles.opacityValue}>var(--opacity-hover)</span>
        </div>

        <div className={styles.opacityItem}>
          <div className={`${styles.opacityBox} ${styles.active}`}>
            <span className={styles.opacityLabel}>Active</span>
          </div>
          <span className={styles.opacityValue}>var(--opacity-active)</span>
        </div>

        <div className={styles.opacityItem}>
          <div className={`${styles.opacityBox} ${styles.overlay}`}>
            <span className={styles.opacityLabel}>Overlay</span>
          </div>
          <span className={styles.opacityValue}>var(--opacity-overlay)</span>
        </div>

        <div className={styles.opacityItem}>
          <div className={`${styles.opacityBox} ${styles.divider}`}>
            <span className={styles.opacityLabel}>Divider</span>
          </div>
          <span className={styles.opacityValue}>var(--opacity-divider)</span>
        </div>
      </div>

      {/* Use Case Examples */}
      <div className={styles.examples}>
        <h3 className={styles.subtitle}>Use Cases</h3>
        <div className={styles.examplesList}>
          <div className={styles.exampleCard}>
            <div className={styles.exampleHeader}>Disabled Button</div>
            <button className={styles.disabledButton} disabled>
              Disabled State
            </button>
          </div>

          <div className={styles.exampleCard}>
            <div className={styles.exampleHeader}>Overlay Background</div>
            <div className={styles.overlayExample}>
              <div className={styles.overlayBg}></div>
              <div className={styles.overlayContent}>Modal Content</div>
            </div>
          </div>

          <div className={styles.exampleCard}>
            <div className={styles.exampleHeader}>Divider Lines</div>
            <div className={styles.dividerExample}>
              <span>Item 1</span>
              <div className={styles.dividerLine}></div>
              <span>Item 2</span>
              <div className={styles.dividerLine}></div>
              <span>Item 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
