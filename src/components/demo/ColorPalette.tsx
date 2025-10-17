import { useState } from 'react';
import { useDesignSystem } from '../../context/DesignSystemContext';
import { useTokenRestrictions } from '../../hooks/useTokenRestrictions';
import styles from './ColorPalette.module.css';

interface ColorShade {
  shade: string;
  value: string;
}

interface ColorGroup {
  name: string;
  shades: ColorShade[];
}

export function ColorPalette() {
  const { selectedSystem } = useDesignSystem();
  const { getTokenClass } = useTokenRestrictions();
  const colors = selectedSystem?.tokens.colors;
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  if (!colors) {
    return <div>No colors defined</div>;
  }

  const copyToClipboard = async (value: string, identifier: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedColor(identifier);
      setTimeout(() => setCopiedColor(null), 1500);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  // Get computed color values (currently unused but kept for potential future use)
  // const getComputedColor = (property: string) => {
  //   const rootStyles = getComputedStyle(document.documentElement);
  //   return rootStyles.getPropertyValue(`--color-${property}`).trim();
  // };

  const colorGroups: ColorGroup[] = [];

  // Organize colors by category (primary, secondary, neutral, etc.)
  Object.entries(colors).forEach(([category, shades]) => {
    // Skip semantic, text, background, and border as they'll be shown separately
    if (category === 'semantic' || category === 'text' || category === 'background' || category === 'border') {
      return;
    }

    if (typeof shades === 'object' && shades !== null) {
      const colorShades: ColorShade[] = [];
      
      Object.entries(shades).forEach(([shade, value]) => {
        if (typeof value === 'string') {
          colorShades.push({ shade, value });
        }
      });

      if (colorShades.length > 0) {
        colorGroups.push({
          name: category,
          shades: colorShades
        });
      }
    }
  });

  // Extract semantic colors
  const semanticColors = colors.semantic as unknown as Record<string, string> | undefined;
  const textColors = colors.text as unknown as Record<string, string> | undefined;
  const backgroundColors = colors.background as unknown as Record<string, string> | undefined;
  const borderColors = colors.border as unknown as Record<string, string> | undefined;

  return (
    <div className={styles.colorPalette}>
      {/* Existing color scales */}
      {colorGroups.map((group) => (
        <div key={group.name} className={styles.colorGroup}>
          <h3 className={styles.colorGroupTitle}>
            {group.name.charAt(0).toUpperCase() + group.name.slice(1)}
          </h3>
          <div className={styles.colorGrid}>
            {group.shades.map((shade) => {
              const restrictionClass = getTokenClass('colors', group.name, shade.shade);
              const colorId = `${group.name}-${shade.shade}`;
              return (
                <div 
                  key={shade.shade} 
                  className={`${styles.colorSwatch} ${restrictionClass}`}
                  onClick={() => copyToClipboard(shade.value, colorId)}
                  title={`Click to copy ${shade.value}`}
                >
                  <div
                    className={styles.colorBox}
                    style={{ backgroundColor: shade.value }}
                  />
                  <div className={styles.colorInfo}>
                    <div className={styles.colorShade}>{shade.shade}</div>
                    <div className={styles.colorValue}>{shade.value}</div>
                  </div>
                  {copiedColor === colorId && (
                    <div className={styles.copiedFeedback}>Copied!</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Semantic Colors Section */}
      {semanticColors && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Semantic Colors</h3>
          <p className={styles.sectionDescription}>
            Colors that convey meaning and status in the interface.
          </p>
          <div className={styles.semanticGrid}>
            {Object.entries(semanticColors).map(([name, value]) => {
              const restrictionClass = getTokenClass('colors', 'semantic', name);
              const colorId = `semantic-${name}`;
              return (
                <div 
                  key={name} 
                  className={`${styles.semanticCard} ${restrictionClass}`}
                  onClick={() => copyToClipboard(value, colorId)}
                >
                  <div className={styles.semanticColor} style={{ backgroundColor: value }} />
                  <div className={styles.semanticInfo}>
                    <div className={styles.semanticName}>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
                    <div className={styles.semanticValue}>{value}</div>
                    <div className={styles.semanticUsage}>
                      {name === 'success' && 'Confirmations, completed tasks'}
                      {name === 'warning' && 'Cautions, pending actions'}
                      {name === 'error' && 'Errors, destructive actions'}
                      {name === 'info' && 'Information, neutral alerts'}
                    </div>
                  </div>
                  {copiedColor === colorId && (
                    <div className={styles.copiedFeedback}>Copied!</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Text Colors Section */}
      {textColors && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Text Colors</h3>
          <p className={styles.sectionDescription}>
            Text color hierarchy shown on different background surfaces.
          </p>
          <div className={styles.textColorDemo}>
            {Object.entries(textColors).map(([name, value]) => {
              const restrictionClass = getTokenClass('colors', 'text', name);
              const colorId = `text-${name}`;
              return (
                <div key={name} className={`${styles.textColorRow} ${restrictionClass}`}>
                  <div className={styles.textColorLabel}>
                    <span className={styles.textColorName}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                    <code 
                      className={styles.textColorValue}
                      onClick={() => copyToClipboard(value, colorId)}
                      title="Click to copy"
                    >
                      {value}
                      {copiedColor === colorId && <span className={styles.inlineCopied}> ✓</span>}
                    </code>
                  </div>
                  <div className={styles.textColorSamples}>
                    <div className={styles.textSample} style={{ backgroundColor: '#FFFFFF', color: value }}>
                      Sample text on white
                    </div>
                    <div className={styles.textSample} style={{ backgroundColor: '#F5F5F5', color: value }}>
                      Sample text on gray
                    </div>
                    <div className={styles.textSample} style={{ backgroundColor: '#E0E0E0', color: value }}>
                      Sample text on darker
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Background Colors Section */}
      {backgroundColors && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Background Colors</h3>
          <p className={styles.sectionDescription}>
            Surface colors that create depth and hierarchy through layering.
          </p>
          <div className={styles.backgroundDemo}>
            {Object.entries(backgroundColors).map(([name, value]) => {
              const restrictionClass = getTokenClass('colors', 'background', name);
              const colorId = `background-${name}`;
              return (
                <div 
                  key={name} 
                  className={`${styles.backgroundCard} ${restrictionClass}`}
                  style={{ backgroundColor: value }}
                  onClick={() => copyToClipboard(value, colorId)}
                >
                  <div className={styles.backgroundLabel}>
                    <span className={styles.backgroundName}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                    <code className={styles.backgroundValue}>{value}</code>
                  </div>
                  <div className={styles.backgroundContent}>
                    <div className={styles.backgroundBox}>
                      <p>Sample content on {name} background</p>
                      <p className={styles.backgroundSubtext}>
                        {name === 'default' && 'Base page background'}
                        {name === 'paper' && 'Card and panel surfaces'}
                        {name === 'elevated' && 'Elevated components like modals'}
                      </p>
                    </div>
                  </div>
                  {copiedColor === colorId && (
                    <div className={styles.copiedFeedback}>Copied!</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Border Colors Section */}
      {borderColors && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Border Colors</h3>
          <p className={styles.sectionDescription}>
            Border colors for dividers, input fields, and component outlines.
          </p>
          <div className={styles.borderDemo}>
            {Object.entries(borderColors).map(([name, value]) => {
              const restrictionClass = getTokenClass('colors', 'border', name);
              const colorId = `border-${name}`;
              return (
                <div 
                  key={name} 
                  className={`${styles.borderCard} ${restrictionClass}`}
                  onClick={() => copyToClipboard(value, colorId)}
                >
                  <div className={styles.borderLabel}>
                    <span className={styles.borderName}>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                    <code className={styles.borderValue}>{value}</code>
                  </div>
                  <div className={styles.borderSamples}>
                    <div className={styles.borderBox} style={{ borderColor: value }}>
                      Box with {name} border
                    </div>
                    <div className={styles.borderDivider} style={{ borderTopColor: value }} />
                    <div className={styles.borderInput} style={{ borderColor: value }}>
                      Input field example
                    </div>
                  </div>
                  <div className={styles.borderUsage}>
                    {name === 'default' && 'Cards, inputs, dividers'}
                    {name === 'light' && 'Subtle dividers, hover states'}
                  </div>
                  {copiedColor === colorId && (
                    <div className={styles.copiedFeedback}>Copied!</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Compact version for demo area or smaller displays
export function ColorPaletteCompact() {
  const { selectedSystem } = useDesignSystem();
  const { getTokenClass } = useTokenRestrictions();
  const colors = selectedSystem?.tokens.colors;
  // const [copiedColor, setCopiedColor] = useState<string | null>(null);

  if (!colors) {
    return null;
  }

  const copyToClipboard = async (value: string, _identifier: string) => {
    try {
      await navigator.clipboard.writeText(value);
      // setCopiedColor(identifier);
      // setTimeout(() => setCopiedColor(null), 1500);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  return (
    <div className={styles.colorPaletteCompact}>
      {Object.entries(colors).map(([category, shades]) => {
        if (typeof shades !== 'object' || shades === null) return null;
        
        return (
          <div key={category} className={styles.compactGroup}>
            <div className={styles.compactLabel}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
            <div className={styles.compactSwatches}>
              {Object.entries(shades).map(([shade, value]) => {
                if (typeof value !== 'string') return null;
                const restrictionClass = getTokenClass('colors', category, shade);
                const colorId = `compact-${category}-${shade}`;
                return (
                  <div
                    key={shade}
                    className={`${styles.compactSwatch} ${restrictionClass}`}
                    style={{ backgroundColor: value }}
                    title={`Click to copy ${category}-${shade}: ${value}`}
                    onClick={() => copyToClipboard(value, colorId)}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
