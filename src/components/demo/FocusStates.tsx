import styles from './FocusStates.module.css';

export function FocusStates() {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        Click on each element to see the focus ring styling
      </div>

      <div className={styles.focusGrid}>
        <button className={styles.focusButton}>
          Button Focus
        </button>

        <input
          type="text"
          className={styles.focusInput}
          placeholder="Input Focus"
        />

        <div className={styles.focusCard} tabIndex={0}>
          <span>Focusable Card</span>
        </div>

        <a href="#" className={styles.focusLink}>
          Link Focus
        </a>

        <button className={styles.focusButtonSecondary}>
          Secondary Focus
        </button>

        <div className={styles.focusCustom} tabIndex={0}>
          <span>Custom Focus Ring</span>
        </div>
      </div>

      {/* Focus Properties */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Focus Properties</h3>
        <div className={styles.propertiesList}>
          <div className={styles.propertyItem}>
            <span className={styles.propertyLabel}>Ring Width</span>
            <span className={styles.propertyValue}>var(--focus-ring-width)</span>
          </div>
          <div className={styles.propertyItem}>
            <span className={styles.propertyLabel}>Ring Offset</span>
            <span className={styles.propertyValue}>var(--focus-ring-offset)</span>
          </div>
          <div className={styles.propertyItem}>
            <span className={styles.propertyLabel}>Ring Color</span>
            <span className={styles.propertyValue}>var(--focus-ring-color)</span>
          </div>
          <div className={styles.propertyItem}>
            <span className={styles.propertyLabel}>Outline Style</span>
            <span className={styles.propertyValue}>var(--focus-outline-style)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
