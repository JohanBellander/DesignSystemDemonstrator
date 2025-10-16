import { useTokenRestrictions } from '../../hooks/useTokenRestrictions';
import styles from './Typography.module.css';

export function Typography() {
  const { getTokenClass } = useTokenRestrictions();
  
  // Get computed typography values
  const getComputedTypography = (property: string) => {
    const rootStyles = getComputedStyle(document.documentElement);
    return rootStyles.getPropertyValue(`--${property}`).trim();
  };
  
  return (
    <div className={styles.typography}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Headings</h3>
        <h1 className={`${styles.h1} ${getTokenClass('typography', 'fontSize', '4xl')}`}>
          Heading 1
        </h1>
        <h2 className={`${styles.h2} ${getTokenClass('typography', 'fontSize', '3xl')}`}>
          Heading 2
        </h2>
        <h3 className={`${styles.h3} ${getTokenClass('typography', 'fontSize', '2xl')}`}>
          Heading 3
        </h3>
        <h4 className={`${styles.h4} ${getTokenClass('typography', 'fontSize', 'xl')}`}>
          Heading 4
        </h4>
        <h5 className={`${styles.h5} ${getTokenClass('typography', 'fontSize', 'lg')}`}>
          Heading 5
        </h5>
        <h6 className={`${styles.h6} ${getTokenClass('typography', 'fontSize', 'base')}`}>
          Heading 6
        </h6>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Body Text</h3>
        <p className={`${styles.bodyLarge} ${getTokenClass('typography', 'fontSize', 'lg')}`}>
          Large body text. The quick brown fox jumps over the lazy dog.
        </p>
        <p className={`${styles.body} ${getTokenClass('typography', 'fontSize', 'base')}`}>
          Regular body text. The quick brown fox jumps over the lazy dog.
        </p>
        <p className={`${styles.bodySmall} ${getTokenClass('typography', 'fontSize', 'sm')}`}>
          Small body text. The quick brown fox jumps over the lazy dog.
        </p>
        <p className={`${styles.caption} ${getTokenClass('typography', 'fontSize', 'xs')}`}>
          Caption text. The quick brown fox jumps over the lazy dog.
        </p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Font Weights</h3>
        <p className={styles.description}>
          Compare different font weight values side-by-side with the same text.
        </p>
        <div className={styles.weightGrid}>
          <div className={`${styles.weightCard} ${getTokenClass('typography', 'fontWeight', 'normal')}`}>
            <div className={styles.weightLabel}>
              <span className={styles.weightName}>Normal</span>
              <span className={styles.weightValue}>{getComputedTypography('font-weight-normal')}</span>
            </div>
            <div className={styles.weightNormal}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
          <div className={`${styles.weightCard} ${getTokenClass('typography', 'fontWeight', 'medium')}`}>
            <div className={styles.weightLabel}>
              <span className={styles.weightName}>Medium</span>
              <span className={styles.weightValue}>{getComputedTypography('font-weight-medium')}</span>
            </div>
            <div className={styles.weightMedium}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
          <div className={`${styles.weightCard} ${getTokenClass('typography', 'fontWeight', 'semibold')}`}>
            <div className={styles.weightLabel}>
              <span className={styles.weightName}>Semibold</span>
              <span className={styles.weightValue}>{getComputedTypography('font-weight-semibold')}</span>
            </div>
            <div className={styles.weightSemibold}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
          <div className={`${styles.weightCard} ${getTokenClass('typography', 'fontWeight', 'bold')}`}>
            <div className={styles.weightLabel}>
              <span className={styles.weightName}>Bold</span>
              <span className={styles.weightValue}>{getComputedTypography('font-weight-bold')}</span>
            </div>
            <div className={styles.weightBold}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Line Heights</h3>
        <p className={styles.description}>
          See how different line height values affect text readability and spacing between lines.
        </p>
        <div className={styles.lineHeightGrid}>
          <div className={`${styles.lineHeightCard} ${getTokenClass('typography', 'lineHeight', 'tight')}`}>
            <div className={styles.lineHeightLabel}>
              <span className={styles.lineHeightName}>Tight</span>
              <span className={styles.lineHeightValue}>{getComputedTypography('line-height-tight')}</span>
            </div>
            <p className={styles.lineHeightTight}>
              Typography is the art and technique of arranging type to make written language legible, 
              readable and appealing when displayed. The arrangement of type involves selecting typefaces, 
              point sizes, line lengths, line-spacing, and letter-spacing.
            </p>
          </div>
          <div className={`${styles.lineHeightCard} ${getTokenClass('typography', 'lineHeight', 'normal')}`}>
            <div className={styles.lineHeightLabel}>
              <span className={styles.lineHeightName}>Normal</span>
              <span className={styles.lineHeightValue}>{getComputedTypography('line-height-normal')}</span>
            </div>
            <p className={styles.lineHeightNormal}>
              Typography is the art and technique of arranging type to make written language legible, 
              readable and appealing when displayed. The arrangement of type involves selecting typefaces, 
              point sizes, line lengths, line-spacing, and letter-spacing.
            </p>
          </div>
          <div className={`${styles.lineHeightCard} ${getTokenClass('typography', 'lineHeight', 'relaxed')}`}>
            <div className={styles.lineHeightLabel}>
              <span className={styles.lineHeightName}>Relaxed</span>
              <span className={styles.lineHeightValue}>{getComputedTypography('line-height-relaxed')}</span>
            </div>
            <p className={styles.lineHeightRelaxed}>
              Typography is the art and technique of arranging type to make written language legible, 
              readable and appealing when displayed. The arrangement of type involves selecting typefaces, 
              point sizes, line lengths, line-spacing, and letter-spacing.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Font Families</h3>
        <p className={styles.description}>
          The typefaces used throughout the design system for different content types.
        </p>
        <div className={styles.fontFamilyGrid}>
          <div className={`${styles.fontFamilyCard} ${getTokenClass('typography', 'fontFamily', 'primary')}`}>
            <div className={styles.fontFamilyLabel}>
              <span className={styles.fontFamilyName}>Primary Font</span>
              <code className={styles.fontFamilyValue}>{getComputedTypography('font-family-primary')}</code>
            </div>
            <div className={styles.fontFamilyPrimary}>
              <h4>The Quick Brown Fox</h4>
              <p>
                Used for headings, body text, and most UI elements. This is the main typeface 
                that defines the visual character of the design system.
              </p>
              <div className={styles.alphabet}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
              </div>
            </div>
          </div>
          <div className={`${styles.fontFamilyCard} ${getTokenClass('typography', 'fontFamily', 'monospace')}`}>
            <div className={styles.fontFamilyLabel}>
              <span className={styles.fontFamilyName}>Monospace Font</span>
              <code className={styles.fontFamilyValue}>{getComputedTypography('font-family-monospace')}</code>
            </div>
            <div className={styles.fontFamilyMonospace}>
              <h4>The Quick Brown Fox</h4>
              <p>
                Used for code snippets, technical content, and data that requires fixed-width 
                characters for proper alignment and readability.
              </p>
              <div className={styles.alphabet}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
