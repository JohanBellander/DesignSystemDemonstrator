import { useDesignSystem } from '../../context/DesignSystemContext';
import { isTokenAllowed } from '../../utils/tokenRestrictions';
import styles from './TokenRestrictions.module.css';

export function TokenRestrictions() {
  const { selectedSystem } = useDesignSystem();

  if (!selectedSystem || !selectedSystem.allowedTokens) {
    return null;
  }

  const { allowedTokens, tokens } = selectedSystem;

  return (
    <div className={styles.restrictions}>
      <h3 className={styles.title}>Token Restrictions in This System</h3>
      <p className={styles.description}>
        This design system restricts which tokens can be used. Restricted tokens are shown grayed out with ✕.
      </p>

      {/* Border Radius Restrictions */}
      {allowedTokens.borderRadius && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Border Radius</h4>
          <div className={styles.tokenGrid}>
            {Object.entries(tokens.borderRadius || {}).map(([key, value]) => {
              const allowed = isTokenAllowed(allowedTokens, 'borderRadius', null, key);
              return (
                <div 
                  key={key} 
                  className={`${styles.token} ${!allowed ? 'token-restricted' : ''}`}
                  title={allowed ? 'Allowed' : 'Not allowed in this system'}
                >
                  <div 
                    className={styles.radiusPreview} 
                    style={{ borderRadius: value }}
                  />
                  <div className={styles.tokenLabel}>{key}</div>
                  <div className={styles.tokenValue}>{value}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Spacing Restrictions */}
      {allowedTokens.spacing && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Spacing</h4>
          <div className={styles.tokenGrid}>
            {Object.entries(tokens.spacing || {}).map(([key, value]) => {
              const allowed = isTokenAllowed(allowedTokens, 'spacing', null, key);
              return (
                <div 
                  key={key} 
                  className={`${styles.token} ${!allowed ? 'token-restricted' : ''}`}
                  title={allowed ? 'Allowed' : 'Not allowed in this system'}
                >
                  <div 
                    className={styles.spacingPreview} 
                    style={{ width: value, height: value }}
                  />
                  <div className={styles.tokenLabel}>{key}</div>
                  <div className={styles.tokenValue}>{value}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Font Weight Restrictions */}
      {allowedTokens.typography?.fontWeight && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Font Weights</h4>
          <div className={styles.tokenGrid}>
            {Object.entries(tokens.typography.fontWeight || {}).map(([key, value]) => {
              const allowed = isTokenAllowed(allowedTokens, 'typography', 'fontWeight', key);
              return (
                <div 
                  key={key} 
                  className={`${styles.token} ${!allowed ? 'token-restricted' : ''}`}
                  title={allowed ? 'Allowed' : 'Not allowed in this system'}
                >
                  <div 
                    className={styles.weightPreview} 
                    style={{ fontWeight: value }}
                  >
                    Aa
                  </div>
                  <div className={styles.tokenLabel}>{key}</div>
                  <div className={styles.tokenValue}>{value}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Font Size Restrictions */}
      {allowedTokens.typography?.fontSize && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Font Sizes</h4>
          <div className={styles.tokenGrid}>
            {Object.entries(tokens.typography.fontSize || {}).map(([key, value]) => {
              const allowed = isTokenAllowed(allowedTokens, 'typography', 'fontSize', key);
              return (
                <div 
                  key={key} 
                  className={`${styles.token} ${!allowed ? 'token-restricted' : ''}`}
                  title={allowed ? 'Allowed' : 'Not allowed in this system'}
                >
                  <div 
                    className={styles.sizePreview} 
                    style={{ fontSize: value }}
                  >
                    Aa
                  </div>
                  <div className={styles.tokenLabel}>{key}</div>
                  <div className={styles.tokenValue}>{value}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Color Restrictions */}
      {(allowedTokens.colors?.primary || allowedTokens.colors?.secondary) && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Colors</h4>
          
          {allowedTokens.colors.primary && (
            <div className={styles.colorCategory}>
              <h5 className={styles.colorCategoryTitle}>Primary</h5>
              <div className={styles.tokenGrid}>
                {Object.entries(tokens.colors.primary || {}).map(([key, value]) => {
                  const allowed = isTokenAllowed(allowedTokens, 'colors', 'primary', key);
                  return (
                    <div 
                      key={key} 
                      className={`${styles.token} ${!allowed ? 'token-restricted' : ''}`}
                      title={allowed ? 'Allowed' : 'Not allowed in this system'}
                    >
                      <div 
                        className={styles.colorPreview} 
                        style={{ backgroundColor: value }}
                      />
                      <div className={styles.tokenLabel}>{key}</div>
                      <div className={styles.tokenValue}>{value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
