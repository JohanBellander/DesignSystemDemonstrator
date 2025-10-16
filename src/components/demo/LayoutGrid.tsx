import { useDesignSystem } from '../../context/DesignSystemContext';
import styles from './LayoutGrid.module.css';

export function LayoutGrid() {
  const { selectedSystem } = useDesignSystem();
  const grid = selectedSystem?.tokens.grid;

  return (
    <div className={styles.container}>
      {/* Enhanced Grid System with Gutter Visualization */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Grid System with Gutter & Margin</h3>
        <p className={styles.sectionDescription}>
          12-column grid with visual indicators showing gutter spacing between columns and margin spacing around the container.
        </p>
        
        <div className={styles.enhancedGridWrapper}>
          {/* Margin Indicators */}
          {grid?.margin && (
            <>
              <div className={styles.marginIndicatorLeft}>
                <span className={styles.marginLabel}>Margin</span>
                <span className={styles.marginValue}>{grid.margin}</span>
              </div>
              <div className={styles.marginIndicatorRight}>
                <span className={styles.marginLabel}>Margin</span>
                <span className={styles.marginValue}>{grid.margin}</span>
              </div>
            </>
          )}
          
          <div 
            className={styles.enhancedGridDemo}
            style={{
              margin: grid?.margin || 'var(--spacing-md)',
              gap: grid?.gutter || 'var(--spacing-md)'
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className={styles.enhancedGridColumn}>
                <div className={styles.enhancedColumnContent}>{i + 1}</div>
                {/* Gutter Indicator - show between columns */}
                {i < 11 && grid?.gutter && (
                  <div className={styles.gutterIndicator}>
                    <span className={styles.gutterLabel}>Gutter</span>
                    <span className={styles.gutterValue}>{grid.gutter}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Grid Token Values */}
        {grid && (
          <div className={styles.gridTokens}>
            <div className={styles.tokenItem}>
              <span className={styles.tokenLabel}>Columns:</span>
              <code className={styles.tokenValue}>{grid.columns}</code>
            </div>
            <div className={styles.tokenItem}>
              <span className={styles.tokenLabel}>Gutter:</span>
              <code className={styles.tokenValue}>{grid.gutter}</code>
            </div>
            <div className={styles.tokenItem}>
              <span className={styles.tokenLabel}>Margin:</span>
              <code className={styles.tokenValue}>{grid.margin}</code>
            </div>
          </div>
        )}
      </div>

      {/* Original Grid System */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Basic Grid System</h3>
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
