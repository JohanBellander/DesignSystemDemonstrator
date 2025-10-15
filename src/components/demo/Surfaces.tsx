import styles from './Surfaces.module.css';

export function Surfaces() {
  return (
    <div className={styles.container}>
      {/* Background Hierarchy */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Background Hierarchy</h3>
        <div className={styles.backgroundStack}>
          <div className={styles.bgPrimary}>
            <span className={styles.bgLabel}>Primary Background</span>
            <div className={styles.bgSecondary}>
              <span className={styles.bgLabel}>Secondary Background</span>
              <div className={styles.bgTertiary}>
                <span className={styles.bgLabel}>Tertiary Background</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Surface Elevations */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Surface Elevations</h3>
        <div className={styles.surfaceGrid}>
          <div className={styles.surfaceCard}>
            <div className={styles.surfaceBase}>
              <span className={styles.surfaceLabel}>Base Surface</span>
              <p className={styles.surfaceDesc}>Default surface level</p>
            </div>
          </div>

          <div className={styles.surfaceCard}>
            <div className={styles.surfaceRaised}>
              <span className={styles.surfaceLabel}>Raised Surface</span>
              <p className={styles.surfaceDesc}>Elevated above base</p>
            </div>
          </div>

          <div className={styles.surfaceCard}>
            <div className={styles.surfaceOverlay}>
              <span className={styles.surfaceLabel}>Overlay Surface</span>
              <p className={styles.surfaceDesc}>Modal/dialog level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Layering Example */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Layering Example</h3>
        <div className={styles.layeringDemo}>
          <div className={styles.layerBase}>
            <div className={styles.layerContent}>
              <h4>Base Layer</h4>
              <p>Main content area with primary background</p>
            </div>
            <div className={styles.layerRaised}>
              <div className={styles.layerContent}>
                <h4>Raised Layer</h4>
                <p>Cards and panels on raised surface</p>
              </div>
              <div className={styles.layerOverlay}>
                <div className={styles.layerContent}>
                  <h4>Overlay Layer</h4>
                  <p>Modals and dialogs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
