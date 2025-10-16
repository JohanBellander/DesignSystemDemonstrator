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

  const colorGroups: ColorGroup[] = [];

  // Organize colors by category (primary, secondary, neutral, etc.)
  Object.entries(colors).forEach(([category, shades]) => {
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

  return (
    <div className={styles.colorPalette}>
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
    </div>
  );
}

// Compact version for demo area or smaller displays
export function ColorPaletteCompact() {
  const { selectedSystem } = useDesignSystem();
  const { getTokenClass } = useTokenRestrictions();
  const colors = selectedSystem?.tokens.colors;
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  if (!colors) {
    return null;
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
