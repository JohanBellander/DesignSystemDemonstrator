import { useTokenRestrictions } from '../../hooks/useTokenRestrictions';
import styles from './Spacing.module.css';

export function Spacing() {
  const { getTokenClass } = useTokenRestrictions();
  
  const spacingValues = [
    { key: 'xs', label: 'XS' },
    { key: 'sm', label: 'SM' },
    { key: 'md', label: 'MD' },
    { key: 'lg', label: 'LG' },
    { key: 'xl', label: 'XL' },
    { key: '2xl', label: '2XL' },
    { key: '3xl', label: '3XL' },
    { key: '4xl', label: '4XL' },
  ];

  // Get computed spacing value from CSS custom property
  const getComputedSpacing = (key: string) => {
    if (typeof window === 'undefined') return '';
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(`--spacing-${key}`)
      .trim();
    
    // Convert rem to px for display
    if (value.endsWith('rem')) {
      const remValue = parseFloat(value);
      const pxValue = remValue * 16; // Assuming 1rem = 16px
      return `${value} (${pxValue}px)`;
    }
    return value;
  };

  return (
    <div className={styles.container}>
      {/* Visual Scale Section */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Spacing Scale</h3>
        <p className={styles.description}>
          A consistent spacing system creates rhythm and hierarchy in your layouts.
        </p>
        <div className={styles.scaleGrid}>
          {spacingValues.map(({ key, label }) => (
            <div 
              key={key} 
              className={`${styles.scaleItem} ${getTokenClass('spacing', null, key)}`}
            >
              <div className={styles.scaleLabel}>
                <span className={styles.scaleName}>{label}</span>
                <span className={styles.scaleValue}>{getComputedSpacing(key)}</span>
              </div>
              <div 
                className={styles.scaleBar}
                style={{ width: `var(--spacing-${key})` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Grid Section */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Spacing Comparison</h3>
        <p className={styles.description}>
          Compare spacing values side-by-side to understand their relative sizes.
        </p>
        <div className={styles.comparisonGrid}>
          {spacingValues.map(({ key, label }) => (
            <div 
              key={key}
              className={`${styles.comparisonItem} ${getTokenClass('spacing', null, key)}`}
            >
              <div 
                className={styles.comparisonBox}
                style={{ 
                  width: `var(--spacing-${key})`,
                  height: `var(--spacing-${key})`
                }}
              />
              <span className={styles.comparisonLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases Section */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Use Cases</h3>
        
        {/* Component Padding */}
        <div className={styles.useCase}>
          <h4 className={styles.useCaseTitle}>Component Padding</h4>
          <div className={styles.paddingExamples}>
            <div 
              className={`${styles.paddingBox} ${getTokenClass('spacing', null, 'sm')}`}
              style={{ padding: 'var(--spacing-sm)' }}
            >
              <span className={styles.paddingContent}>SM Padding</span>
            </div>
            <div 
              className={`${styles.paddingBox} ${getTokenClass('spacing', null, 'md')}`}
              style={{ padding: 'var(--spacing-md)' }}
            >
              <span className={styles.paddingContent}>MD Padding</span>
            </div>
            <div 
              className={`${styles.paddingBox} ${getTokenClass('spacing', null, 'lg')}`}
              style={{ padding: 'var(--spacing-lg)' }}
            >
              <span className={styles.paddingContent}>LG Padding</span>
            </div>
            <div 
              className={`${styles.paddingBox} ${getTokenClass('spacing', null, 'xl')}`}
              style={{ padding: 'var(--spacing-xl)' }}
            >
              <span className={styles.paddingContent}>XL Padding</span>
            </div>
          </div>
        </div>

        {/* Stack Spacing */}
        <div className={styles.useCase}>
          <h4 className={styles.useCaseTitle}>Stack Spacing (Vertical)</h4>
          <div className={styles.stackExamples}>
            {['xs', 'sm', 'md', 'lg'].map((key) => (
              <div key={key} className={styles.stackExample}>
                <div className={styles.stackLabel}>{key.toUpperCase()} Gap</div>
                <div 
                  className={`${styles.stackContainer} ${getTokenClass('spacing', null, key)}`}
                  style={{ gap: `var(--spacing-${key})` }}
                >
                  <div className={styles.stackItem}>Item 1</div>
                  <div className={styles.stackItem}>Item 2</div>
                  <div className={styles.stackItem}>Item 3</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inline Spacing */}
        <div className={styles.useCase}>
          <h4 className={styles.useCaseTitle}>Inline Spacing (Horizontal)</h4>
          <div className={styles.inlineExamples}>
            {['xs', 'sm', 'md', 'lg'].map((key) => (
              <div key={key} className={styles.inlineExample}>
                <div className={styles.inlineLabel}>{key.toUpperCase()} Gap</div>
                <div 
                  className={`${styles.inlineContainer} ${getTokenClass('spacing', null, key)}`}
                  style={{ gap: `var(--spacing-${key})` }}
                >
                  <button className={styles.inlineButton}>Button 1</button>
                  <button className={styles.inlineButton}>Button 2</button>
                  <button className={styles.inlineButton}>Button 3</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
