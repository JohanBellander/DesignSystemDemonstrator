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

  // Apply border radius tokens (optional)
  if (tokens.borderRadius) {
    Object.entries(tokens.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--border-radius-${key}`, value);
    });
  }

  // Apply shadow tokens (optional)
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
  }

  // Apply transition tokens (optional)
  if (tokens.transitions) {
    Object.entries(tokens.transitions).forEach(([key, value]) => {
      root.style.setProperty(`--transition-${key}`, value);
    });
  }

  // Apply grid tokens (optional)
  if (tokens.grid) {
    root.style.setProperty(`--grid-columns`, String(tokens.grid.columns));
    root.style.setProperty(`--grid-gutter`, tokens.grid.gutter);
    root.style.setProperty(`--grid-margin`, tokens.grid.margin);
  }

  // Apply layout tokens (optional)
  if (tokens.layout) {
    Object.entries(tokens.layout.breakpoints).forEach(([key, value]) => {
      root.style.setProperty(`--breakpoint-${key}`, value);
    });
    Object.entries(tokens.layout.containers).forEach(([key, value]) => {
      root.style.setProperty(`--container-${key}`, value);
    });
  }

  // Apply elevation tokens (optional)
  if (tokens.elevation) {
    Object.entries(tokens.elevation.levels).forEach(([key, value]) => {
      root.style.setProperty(`--elevation-${key}`, value);
    });
    Object.entries(tokens.elevation.zIndex).forEach(([key, value]) => {
      root.style.setProperty(`--z-index-${key}`, String(value));
    });
  }

  // Apply opacity tokens (optional)
  if (tokens.opacity) {
    Object.entries(tokens.opacity).forEach(([key, value]) => {
      root.style.setProperty(`--opacity-${key}`, value);
    });
  }

  // Apply border system tokens (optional)
  if (tokens.borders) {
    Object.entries(tokens.borders.widths).forEach(([key, value]) => {
      root.style.setProperty(`--border-width-${key}`, value);
    });
    Object.entries(tokens.borders.styles).forEach(([key, value]) => {
      root.style.setProperty(`--border-style-${key}`, value);
    });
  }

  // Apply focus state tokens (optional)
  if (tokens.focusStates) {
    root.style.setProperty(`--focus-ring-width`, tokens.focusStates.ringWidth);
    root.style.setProperty(`--focus-ring-offset`, tokens.focusStates.ringOffset);
    root.style.setProperty(`--focus-ring-color`, tokens.focusStates.ringColor);
    root.style.setProperty(`--focus-outline-style`, tokens.focusStates.outlineStyle);
  }

  // Apply surface tokens (optional)
  if (tokens.surfaces) {
    Object.entries(tokens.surfaces.background).forEach(([key, value]) => {
      root.style.setProperty(`--surface-bg-${key}`, value);
    });
    Object.entries(tokens.surfaces.surface).forEach(([key, value]) => {
      root.style.setProperty(`--surface-${key}`, value);
    });
  }
}
