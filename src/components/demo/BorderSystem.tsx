import { useTokenRestrictions } from '../../hooks/useTokenRestrictions';
import styles from './BorderSystem.module.css';

export function BorderSystem() {
  const { getTokenClass } = useTokenRestrictions();
  
  return (
    <div className={styles.container}>
      {/* Border Widths */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Border Widths</h3>
        <div className={styles.borderGrid}>
          <div className={`${styles.borderBox} ${getTokenClass('borders', 'widths', 'thin')}`}>
            <div className={`${styles.borderDemo} ${styles.thin}`}></div>
            <span className={styles.borderLabel}>Thin</span>
          </div>
          <div className={`${styles.borderBox} ${getTokenClass('borders', 'widths', 'medium')}`}>
            <div className={`${styles.borderDemo} ${styles.medium}`}></div>
            <span className={styles.borderLabel}>Medium</span>
          </div>
          <div className={`${styles.borderBox} ${getTokenClass('borders', 'widths', 'thick')}`}>
            <div className={`${styles.borderDemo} ${styles.thick}`}></div>
            <span className={styles.borderLabel}>Thick</span>
          </div>
        </div>
      </div>

      {/* Border Styles */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Border Styles</h3>
        <div className={styles.borderGrid}>
          <div className={`${styles.borderBox} ${getTokenClass('borders', 'styles', 'solid')}`}>
            <div className={`${styles.borderDemo} ${styles.solid}`}></div>
            <span className={styles.borderLabel}>Solid</span>
          </div>
          <div className={`${styles.borderBox} ${getTokenClass('borders', 'styles', 'dashed')}`}>
            <div className={`${styles.borderDemo} ${styles.dashed}`}></div>
            <span className={styles.borderLabel}>Dashed</span>
          </div>
          <div className={`${styles.borderBox} ${getTokenClass('borders', 'styles', 'dotted')}`}>
            <div className={`${styles.borderDemo} ${styles.dotted}`}></div>
            <span className={styles.borderLabel}>Dotted</span>
          </div>
        </div>
      </div>

      {/* Border Radius */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Border Radius</h3>
        <div className={styles.radiusGrid}>
          <div className={`${styles.radiusBox} ${styles.radiusNone} ${getTokenClass('borderRadius', null, 'none')}`}>
            <span>None</span>
          </div>
          <div className={`${styles.radiusBox} ${styles.radiusSm} ${getTokenClass('borderRadius', null, 'sm')}`}>
            <span>SM</span>
          </div>
          <div className={`${styles.radiusBox} ${styles.radiusMd} ${getTokenClass('borderRadius', null, 'md')}`}>
            <span>MD</span>
          </div>
          <div className={`${styles.radiusBox} ${styles.radiusLg} ${getTokenClass('borderRadius', null, 'lg')}`}>
            <span>LG</span>
          </div>
          <div className={`${styles.radiusBox} ${styles.radiusFull} ${getTokenClass('borderRadius', null, 'full')}`}>
            <span>Full</span>
          </div>
        </div>
      </div>
    </div>
  );
}
