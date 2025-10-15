import { DesignSystem } from '../types/design-system';

/**
 * Apply design tokens as CSS custom properties to the document root
 */
export function applyDesignTokens(designSystem: DesignSystem): void {
  const root = document.documentElement;
  const { tokens } = designSystem;

  // Apply color tokens
  Object.entries(tokens.colors.primary).forEach(([key, value]) => {
    root.style.setProperty(`--color-primary-${key}`, value);
  });

  Object.entries(tokens.colors.secondary).forEach(([key, value]) => {
    root.style.setProperty(`--color-secondary-${key}`, value);
  });

  Object.entries(tokens.colors.neutral).forEach(([key, value]) => {
    root.style.setProperty(`--color-neutral-${key}`, value);
  });

  Object.entries(tokens.colors.semantic).forEach(([key, value]) => {
    root.style.setProperty(`--color-semantic-${key}`, value);
  });

  Object.entries(tokens.colors.text).forEach(([key, value]) => {
    root.style.setProperty(`--color-text-${key}`, value);
  });

  Object.entries(tokens.colors.background).forEach(([key, value]) => {
    root.style.setProperty(`--color-background-${key}`, value);
  });

  Object.entries(tokens.colors.border).forEach(([key, value]) => {
    root.style.setProperty(`--color-border-${key}`, value);
  });

  // Apply typography tokens
  Object.entries(tokens.typography.fontFamily).forEach(([key, value]) => {
    root.style.setProperty(`--font-family-${key}`, value);
  });

  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    root.style.setProperty(`--font-size-${key}`, value);
  });

  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    root.style.setProperty(`--font-weight-${key}`, String(value));
  });

  Object.entries(tokens.typography.lineHeight).forEach(([key, value]) => {
    root.style.setProperty(`--line-height-${key}`, String(value));
  });

  // Apply spacing tokens
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });

  // Apply border radius tokens
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    root.style.setProperty(`--border-radius-${key}`, value);
  });

  // Apply shadow tokens
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--shadow-${key}`, value);
  });

  // Apply transition tokens
  Object.entries(tokens.transitions).forEach(([key, value]) => {
    root.style.setProperty(`--transition-${key}`, value);
  });
}
