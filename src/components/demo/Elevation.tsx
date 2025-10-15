import styles from './Elevation.module.css';

export function Elevation() {
  const elevationLevels = ['0', '1', '2', '4', '6', '8', '12', '16', '24'];

  return (
    <div className={styles.container}>
      {/* Elevation Levels */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Shadow Levels</h3>
        <div className={styles.elevationGrid}>
          {elevationLevels.map((level) => (
            <div key={level} className={styles.elevationCard} data-elevation={level}>
              <div className={styles.elevationContent}>
                <span className={styles.elevationLevel}>{level}</span>
                <span className={styles.elevationLabel}>Elevation</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Z-Index Scale */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Z-Index Layering</h3>
        <div className={styles.zIndexList}>
          <div className={styles.zIndexItem}>
            <span className={styles.zIndexLabel}>Tooltip</span>
            <span className={styles.zIndexValue}>var(--z-index-tooltip)</span>
          </div>
          <div className={styles.zIndexItem}>
            <span className={styles.zIndexLabel}>Popover</span>
            <span className={styles.zIndexValue}>var(--z-index-popover)</span>
          </div>
          <div className={styles.zIndexItem}>
            <span className={styles.zIndexLabel}>Modal</span>
            <span className={styles.zIndexValue}>var(--z-index-modal)</span>
          </div>
          <div className={styles.zIndexItem}>
            <span className={styles.zIndexLabel}>Fixed</span>
            <span className={styles.zIndexValue}>var(--z-index-fixed)</span>
          </div>
          <div className={styles.zIndexItem}>
            <span className={styles.zIndexLabel}>Sticky</span>
            <span className={styles.zIndexValue}>var(--z-index-sticky)</span>
          </div>
          <div className={styles.zIndexItem}>
            <span className={styles.zIndexLabel}>Dropdown</span>
            <span className={styles.zIndexValue}>var(--z-index-dropdown)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
