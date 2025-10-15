import JSZip from 'jszip';
import type { DesignSystem } from '../types/design-system';

/**
 * Export design system to CSS custom properties
 */
export function exportToCSS(system: DesignSystem): string {
  const { tokens, allowedTokens } = system;
  let css = `/**
 * ${system.name} Design System - CSS Custom Properties
 * ${system.description}
 * 
 * Generated from Design System Demonstrator
 * Only the allowed tokens for this design system are included.
 */

:root {
  /* ========================================
     COLORS
     ======================================== */
  
  /* Primary Colors */
`;

  // Primary colors
  if (tokens.colors?.primary) {
    const allowedShades = allowedTokens?.colors?.primary || Object.keys(tokens.colors.primary);
    Object.entries(tokens.colors.primary).forEach(([shade, value]) => {
      if (allowedShades.includes(shade)) {
        css += `  --color-primary-${shade}: ${value};\n`;
      }
    });
  }

  // Secondary colors
  if (tokens.colors?.secondary) {
    css += `\n  /* Secondary Colors */\n`;
    const allowedShades = allowedTokens?.colors?.secondary || Object.keys(tokens.colors.secondary);
    Object.entries(tokens.colors.secondary).forEach(([shade, value]) => {
      if (allowedShades.includes(shade)) {
        css += `  --color-secondary-${shade}: ${value};\n`;
      }
    });
  }

  // Neutral colors
  if (tokens.colors?.neutral) {
    css += `\n  /* Neutral Colors */\n`;
    const allowedShades = allowedTokens?.colors?.neutral || Object.keys(tokens.colors.neutral);
    Object.entries(tokens.colors.neutral).forEach(([shade, value]) => {
      if (allowedShades.includes(shade)) {
        css += `  --color-neutral-${shade}: ${value};\n`;
      }
    });
  }

  // Semantic colors
  if (tokens.colors?.semantic) {
    css += `\n  /* Semantic Colors */\n`;
    Object.entries(tokens.colors.semantic).forEach(([name, value]) => {
      css += `  --color-${name}: ${value};\n`;
    });
  }

  // Text colors
  if (tokens.colors?.text) {
    css += `\n  /* Text Colors */\n`;
    Object.entries(tokens.colors.text).forEach(([name, value]) => {
      css += `  --color-text-${name}: ${value};\n`;
    });
  }

  // Background colors
  if (tokens.colors?.background) {
    css += `\n  /* Background Colors */\n`;
    Object.entries(tokens.colors.background).forEach(([name, value]) => {
      css += `  --color-background-${name}: ${value};\n`;
    });
  }

  // Border colors
  if (tokens.colors?.border) {
    css += `\n  /* Border Colors */\n`;
    Object.entries(tokens.colors.border).forEach(([name, value]) => {
      css += `  --color-border-${name}: ${value};\n`;
    });
  }

  // Typography
  css += `\n  /* ========================================
     TYPOGRAPHY
     ======================================== */\n`;

  if (tokens.typography?.fontFamily) {
    css += `\n  /* Font Families */\n`;
    Object.entries(tokens.typography.fontFamily).forEach(([name, value]) => {
      css += `  --font-family-${name}: ${value};\n`;
    });
  }

  if (tokens.typography?.fontSize) {
    css += `\n  /* Font Sizes */\n`;
    const allowedSizes = allowedTokens?.typography?.fontSize || Object.keys(tokens.typography.fontSize);
    Object.entries(tokens.typography.fontSize).forEach(([name, value]) => {
      if (allowedSizes.includes(name)) {
        css += `  --font-size-${name}: ${value};\n`;
      }
    });
  }

  if (tokens.typography?.fontWeight) {
    css += `\n  /* Font Weights */\n`;
    const allowedWeights = allowedTokens?.typography?.fontWeight || Object.keys(tokens.typography.fontWeight);
    Object.entries(tokens.typography.fontWeight).forEach(([name, value]) => {
      if (allowedWeights.includes(name)) {
        css += `  --font-weight-${name}: ${value};\n`;
      }
    });
  }

  if (tokens.typography?.lineHeight) {
    css += `\n  /* Line Heights */\n`;
    const allowedHeights = allowedTokens?.typography?.lineHeight || Object.keys(tokens.typography.lineHeight);
    Object.entries(tokens.typography.lineHeight).forEach(([name, value]) => {
      if (allowedHeights.includes(name)) {
        css += `  --line-height-${name}: ${value};\n`;
      }
    });
  }

  // Spacing
  if (tokens.spacing) {
    css += `\n  /* ========================================
     SPACING
     ======================================== */\n`;
    const allowedSpacing = allowedTokens?.spacing || Object.keys(tokens.spacing);
    Object.entries(tokens.spacing).forEach(([name, value]) => {
      if (allowedSpacing.includes(name)) {
        css += `  --spacing-${name}: ${value};\n`;
      }
    });
  }

  // Border Radius
  if (tokens.borderRadius) {
    css += `\n  /* ========================================
     BORDER RADIUS
     ======================================== */\n`;
    const allowedRadius = allowedTokens?.borderRadius || Object.keys(tokens.borderRadius);
    Object.entries(tokens.borderRadius).forEach(([name, value]) => {
      if (allowedRadius.includes(name)) {
        css += `  --border-radius-${name}: ${value};\n`;
      }
    });
  }

  // Shadows
  if (tokens.shadows) {
    css += `\n  /* ========================================
     SHADOWS
     ======================================== */\n`;
    const allowedShadows = allowedTokens?.shadows || Object.keys(tokens.shadows);
    Object.entries(tokens.shadows).forEach(([name, value]) => {
      if (allowedShadows.includes(name)) {
        css += `  --shadow-${name}: ${value};\n`;
      }
    });
  }

  // Transitions
  if (tokens.transitions) {
    css += `\n  /* ========================================
     TRANSITIONS
     ======================================== */\n`;
    const allowedTransitions = allowedTokens?.transitions || Object.keys(tokens.transitions);
    Object.entries(tokens.transitions).forEach(([name, value]) => {
      if (allowedTransitions.includes(name)) {
        css += `  --transition-${name}: ${value};\n`;
      }
    });
  }

  // Navigation
  if (tokens.navigation) {
    css += `\n  /* ========================================
     NAVIGATION
     ======================================== */\n`;
    Object.entries(tokens.navigation).forEach(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      css += `  --nav-${cssKey}: ${value};\n`;
    });
  }

  // Borders (optional)
  if (tokens.borders) {
    css += `\n  /* ========================================
     BORDERS
     ======================================== */\n`;
    if (tokens.borders.widths) {
      css += `\n  /* Border Widths */\n`;
      Object.entries(tokens.borders.widths).forEach(([name, value]) => {
        css += `  --border-width-${name}: ${value};\n`;
      });
    }
  }

  // Opacity (optional)
  if (tokens.opacity) {
    css += `\n  /* ========================================
     OPACITY
     ======================================== */\n`;
    Object.entries(tokens.opacity).forEach(([name, value]) => {
      css += `  --opacity-${name}: ${value};\n`;
    });
  }

  css += `}\n`;
  return css;
}

/**
 * Export design system to SCSS variables
 */
export function exportToSCSS(system: DesignSystem): string {
  const { tokens, allowedTokens } = system;
  let scss = `//
// ${system.name} Design System - SCSS Variables
// ${system.description}
//
// Generated from Design System Demonstrator
// Only the allowed tokens for this design system are included.
//

// ========================================
// COLORS
// ========================================

// Primary Colors
`;

  // Primary colors
  if (tokens.colors?.primary) {
    const allowedShades = allowedTokens?.colors?.primary || Object.keys(tokens.colors.primary);
    Object.entries(tokens.colors.primary).forEach(([shade, value]) => {
      if (allowedShades.includes(shade)) {
        scss += `$color-primary-${shade}: ${value};\n`;
      }
    });
  }

  // Secondary colors
  if (tokens.colors?.secondary) {
    scss += `\n// Secondary Colors\n`;
    const allowedShades = allowedTokens?.colors?.secondary || Object.keys(tokens.colors.secondary);
    Object.entries(tokens.colors.secondary).forEach(([shade, value]) => {
      if (allowedShades.includes(shade)) {
        scss += `$color-secondary-${shade}: ${value};\n`;
      }
    });
  }

  // Neutral colors
  if (tokens.colors?.neutral) {
    scss += `\n// Neutral Colors\n`;
    const allowedShades = allowedTokens?.colors?.neutral || Object.keys(tokens.colors.neutral);
    Object.entries(tokens.colors.neutral).forEach(([shade, value]) => {
      if (allowedShades.includes(shade)) {
        scss += `$color-neutral-${shade}: ${value};\n`;
      }
    });
  }

  // Semantic colors
  if (tokens.colors?.semantic) {
    scss += `\n// Semantic Colors\n`;
    Object.entries(tokens.colors.semantic).forEach(([name, value]) => {
      scss += `$color-${name}: ${value};\n`;
    });
  }

  // Typography
  scss += `\n// ========================================\n// TYPOGRAPHY\n// ========================================\n`;

  if (tokens.typography?.fontFamily) {
    scss += `\n// Font Families\n`;
    Object.entries(tokens.typography.fontFamily).forEach(([name, value]) => {
      scss += `$font-family-${name}: ${value};\n`;
    });
  }

  if (tokens.typography?.fontSize) {
    scss += `\n// Font Sizes\n`;
    const allowedSizes = allowedTokens?.typography?.fontSize || Object.keys(tokens.typography.fontSize);
    Object.entries(tokens.typography.fontSize).forEach(([name, value]) => {
      if (allowedSizes.includes(name)) {
        scss += `$font-size-${name}: ${value};\n`;
      }
    });
  }

  if (tokens.typography?.fontWeight) {
    scss += `\n// Font Weights\n`;
    const allowedWeights = allowedTokens?.typography?.fontWeight || Object.keys(tokens.typography.fontWeight);
    Object.entries(tokens.typography.fontWeight).forEach(([name, value]) => {
      if (allowedWeights.includes(name)) {
        scss += `$font-weight-${name}: ${value};\n`;
      }
    });
  }

  // Spacing
  if (tokens.spacing) {
    scss += `\n// ========================================\n// SPACING\n// ========================================\n`;
    const allowedSpacing = allowedTokens?.spacing || Object.keys(tokens.spacing);
    Object.entries(tokens.spacing).forEach(([name, value]) => {
      if (allowedSpacing.includes(name)) {
        scss += `$spacing-${name}: ${value};\n`;
      }
    });
  }

  // Border Radius
  if (tokens.borderRadius) {
    scss += `\n// ========================================\n// BORDER RADIUS\n// ========================================\n`;
    const allowedRadius = allowedTokens?.borderRadius || Object.keys(tokens.borderRadius);
    Object.entries(tokens.borderRadius).forEach(([name, value]) => {
      if (allowedRadius.includes(name)) {
        scss += `$border-radius-${name}: ${value};\n`;
      }
    });
  }

  // Shadows
  if (tokens.shadows) {
    scss += `\n// ========================================\n// SHADOWS\n// ========================================\n`;
    const allowedShadows = allowedTokens?.shadows || Object.keys(tokens.shadows);
    Object.entries(tokens.shadows).forEach(([name, value]) => {
      if (allowedShadows.includes(name)) {
        scss += `$shadow-${name}: ${value};\n`;
      }
    });
  }

  // Transitions
  if (tokens.transitions) {
    scss += `\n// ========================================\n// TRANSITIONS\n// ========================================\n`;
    const allowedTransitions = allowedTokens?.transitions || Object.keys(tokens.transitions);
    Object.entries(tokens.transitions).forEach(([name, value]) => {
      if (allowedTransitions.includes(name)) {
        scss += `$transition-${name}: ${value};\n`;
      }
    });
  }

  // Navigation
  if (tokens.navigation) {
    scss += `\n// ========================================\n// NAVIGATION\n// ========================================\n`;
    Object.entries(tokens.navigation).forEach(([key, value]) => {
      const scssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      scss += `$nav-${scssKey}: ${value};\n`;
    });
  }

  return scss;
}

/**
 * Export design system to Tailwind config
 */
export function exportToTailwind(system: DesignSystem): string {
  const { tokens, allowedTokens } = system;
  
  let config = `/**
 * ${system.name} Design System - Tailwind Configuration
 * ${system.description}
 * 
 * Generated from Design System Demonstrator
 * Only the allowed tokens for this design system are included.
 * 
 * Usage: Extend your existing tailwind.config.js with these values
 */

module.exports = {
  theme: {
    extend: {
      colors: {\n`;

  // Primary colors
  if (tokens.colors?.primary) {
    config += `        primary: {\n`;
    const allowedShades = allowedTokens?.colors?.primary || Object.keys(tokens.colors.primary);
    Object.entries(tokens.colors.primary).forEach(([shade, value]) => {
      if (allowedShades.includes(shade)) {
        config += `          '${shade}': '${value}',\n`;
      }
    });
    config += `        },\n`;
  }

  // Secondary colors
  if (tokens.colors?.secondary) {
    config += `        secondary: {\n`;
    const allowedShades = allowedTokens?.colors?.secondary || Object.keys(tokens.colors.secondary);
    Object.entries(tokens.colors.secondary).forEach(([shade, value]) => {
      if (allowedShades.includes(shade)) {
        config += `          '${shade}': '${value}',\n`;
      }
    });
    config += `        },\n`;
  }

  // Neutral colors
  if (tokens.colors?.neutral) {
    config += `        neutral: {\n`;
    const allowedShades = allowedTokens?.colors?.neutral || Object.keys(tokens.colors.neutral);
    Object.entries(tokens.colors.neutral).forEach(([shade, value]) => {
      if (allowedShades.includes(shade)) {
        config += `          '${shade}': '${value}',\n`;
      }
    });
    config += `        },\n`;
  }

  // Semantic colors
  if (tokens.colors?.semantic) {
    Object.entries(tokens.colors.semantic).forEach(([name, value]) => {
      config += `        ${name}: '${value}',\n`;
    });
  }

  config += `      },\n`;

  // Font families
  if (tokens.typography?.fontFamily) {
    config += `      fontFamily: {\n`;
    Object.entries(tokens.typography.fontFamily).forEach(([name, value]) => {
      config += `        ${name}: ${value},\n`;
    });
    config += `      },\n`;
  }

  // Font sizes
  if (tokens.typography?.fontSize) {
    config += `      fontSize: {\n`;
    const allowedSizes = allowedTokens?.typography?.fontSize || Object.keys(tokens.typography.fontSize);
    Object.entries(tokens.typography.fontSize).forEach(([name, value]) => {
      if (allowedSizes.includes(name)) {
        config += `        '${name}': '${value}',\n`;
      }
    });
    config += `      },\n`;
  }

  // Font weights
  if (tokens.typography?.fontWeight) {
    config += `      fontWeight: {\n`;
    const allowedWeights = allowedTokens?.typography?.fontWeight || Object.keys(tokens.typography.fontWeight);
    Object.entries(tokens.typography.fontWeight).forEach(([name, value]) => {
      if (allowedWeights.includes(name)) {
        config += `        ${name}: ${value},\n`;
      }
    });
    config += `      },\n`;
  }

  // Spacing
  if (tokens.spacing) {
    config += `      spacing: {\n`;
    const allowedSpacing = allowedTokens?.spacing || Object.keys(tokens.spacing);
    Object.entries(tokens.spacing).forEach(([name, value]) => {
      if (allowedSpacing.includes(name)) {
        config += `        '${name}': '${value}',\n`;
      }
    });
    config += `      },\n`;
  }

  // Border radius
  if (tokens.borderRadius) {
    config += `      borderRadius: {\n`;
    const allowedRadius = allowedTokens?.borderRadius || Object.keys(tokens.borderRadius);
    Object.entries(tokens.borderRadius).forEach(([name, value]) => {
      if (allowedRadius.includes(name)) {
        config += `        '${name}': '${value}',\n`;
      }
    });
    config += `      },\n`;
  }

  // Box shadow
  if (tokens.shadows) {
    config += `      boxShadow: {\n`;
    const allowedShadows = allowedTokens?.shadows || Object.keys(tokens.shadows);
    Object.entries(tokens.shadows).forEach(([name, value]) => {
      if (allowedShadows.includes(name)) {
        config += `        '${name}': '${value}',\n`;
      }
    });
    config += `      },\n`;
  }

  // Transitions
  if (tokens.transitions) {
    config += `      transitionDuration: {\n`;
    const allowedTransitions = allowedTokens?.transitions || Object.keys(tokens.transitions);
    Object.entries(tokens.transitions).forEach(([name, value]) => {
      if (allowedTransitions.includes(name)) {
        // Extract just the duration from the transition value
        const duration = value.toString().match(/\d+ms/)?.[0] || value;
        config += `        '${name}': '${duration}',\n`;
      }
    });
    config += `      },\n`;
  }

  config += `    },
  },
  plugins: [],
};\n`;

  return config;
}

/**
 * Export design system to JavaScript/TypeScript module
 */
export function exportToJavaScript(system: DesignSystem): string {
  const { tokens, allowedTokens } = system;
  
  let js = `/**
 * ${system.name} Design System - JavaScript/TypeScript Tokens
 * ${system.description}
 * 
 * Generated from Design System Demonstrator
 * Only the allowed tokens for this design system are included.
 */

export const designTokens = {\n`;

  // Colors
  js += `  colors: {\n`;
  
  if (tokens.colors?.primary) {
    js += `    primary: {\n`;
    const allowedShades = allowedTokens?.colors?.primary || Object.keys(tokens.colors.primary);
    Object.entries(tokens.colors.primary).forEach(([shade, value]) => {
      if (allowedShades.includes(shade)) {
        js += `      '${shade}': '${value}',\n`;
      }
    });
    js += `    },\n`;
  }

  if (tokens.colors?.secondary) {
    js += `    secondary: {\n`;
    const allowedShades = allowedTokens?.colors?.secondary || Object.keys(tokens.colors.secondary);
    Object.entries(tokens.colors.secondary).forEach(([shade, value]) => {
      if (allowedShades.includes(shade)) {
        js += `      '${shade}': '${value}',\n`;
      }
    });
    js += `    },\n`;
  }

  if (tokens.colors?.neutral) {
    js += `    neutral: {\n`;
    const allowedShades = allowedTokens?.colors?.neutral || Object.keys(tokens.colors.neutral);
    Object.entries(tokens.colors.neutral).forEach(([shade, value]) => {
      if (allowedShades.includes(shade)) {
        js += `      '${shade}': '${value}',\n`;
      }
    });
    js += `    },\n`;
  }

  if (tokens.colors?.semantic) {
    js += `    semantic: {\n`;
    Object.entries(tokens.colors.semantic).forEach(([name, value]) => {
      js += `      ${name}: '${value}',\n`;
    });
    js += `    },\n`;
  }

  if (tokens.colors?.text) {
    js += `    text: {\n`;
    Object.entries(tokens.colors.text).forEach(([name, value]) => {
      js += `      ${name}: '${value}',\n`;
    });
    js += `    },\n`;
  }

  if (tokens.colors?.background) {
    js += `    background: {\n`;
    Object.entries(tokens.colors.background).forEach(([name, value]) => {
      js += `      ${name}: '${value}',\n`;
    });
    js += `    },\n`;
  }

  if (tokens.colors?.border) {
    js += `    border: {\n`;
    Object.entries(tokens.colors.border).forEach(([name, value]) => {
      js += `      ${name}: '${value}',\n`;
    });
    js += `    },\n`;
  }

  js += `  },\n`;

  // Typography
  js += `  typography: {\n`;
  
  if (tokens.typography?.fontFamily) {
    js += `    fontFamily: {\n`;
    Object.entries(tokens.typography.fontFamily).forEach(([name, value]) => {
      js += `      ${name}: ${value},\n`;
    });
    js += `    },\n`;
  }

  if (tokens.typography?.fontSize) {
    js += `    fontSize: {\n`;
    const allowedSizes = allowedTokens?.typography?.fontSize || Object.keys(tokens.typography.fontSize);
    Object.entries(tokens.typography.fontSize).forEach(([name, value]) => {
      if (allowedSizes.includes(name)) {
        js += `      ${name}: '${value}',\n`;
      }
    });
    js += `    },\n`;
  }

  if (tokens.typography?.fontWeight) {
    js += `    fontWeight: {\n`;
    const allowedWeights = allowedTokens?.typography?.fontWeight || Object.keys(tokens.typography.fontWeight);
    Object.entries(tokens.typography.fontWeight).forEach(([name, value]) => {
      if (allowedWeights.includes(name)) {
        js += `      ${name}: ${value},\n`;
      }
    });
    js += `    },\n`;
  }

  if (tokens.typography?.lineHeight) {
    js += `    lineHeight: {\n`;
    const allowedHeights = allowedTokens?.typography?.lineHeight || Object.keys(tokens.typography.lineHeight);
    Object.entries(tokens.typography.lineHeight).forEach(([name, value]) => {
      if (allowedHeights.includes(name)) {
        js += `      ${name}: ${value},\n`;
      }
    });
    js += `    },\n`;
  }

  js += `  },\n`;

  // Spacing
  if (tokens.spacing) {
    js += `  spacing: {\n`;
    const allowedSpacing = allowedTokens?.spacing || Object.keys(tokens.spacing);
    Object.entries(tokens.spacing).forEach(([name, value]) => {
      if (allowedSpacing.includes(name)) {
        js += `    ${name}: '${value}',\n`;
      }
    });
    js += `  },\n`;
  }

  // Border Radius
  if (tokens.borderRadius) {
    js += `  borderRadius: {\n`;
    const allowedRadius = allowedTokens?.borderRadius || Object.keys(tokens.borderRadius);
    Object.entries(tokens.borderRadius).forEach(([name, value]) => {
      if (allowedRadius.includes(name)) {
        js += `    ${name}: '${value}',\n`;
      }
    });
    js += `  },\n`;
  }

  // Shadows
  if (tokens.shadows) {
    js += `  shadows: {\n`;
    const allowedShadows = allowedTokens?.shadows || Object.keys(tokens.shadows);
    Object.entries(tokens.shadows).forEach(([name, value]) => {
      if (allowedShadows.includes(name)) {
        js += `    ${name}: '${value}',\n`;
      }
    });
    js += `  },\n`;
  }

  // Transitions
  if (tokens.transitions) {
    js += `  transitions: {\n`;
    const allowedTransitions = allowedTokens?.transitions || Object.keys(tokens.transitions);
    Object.entries(tokens.transitions).forEach(([name, value]) => {
      if (allowedTransitions.includes(name)) {
        js += `    ${name}: '${value}',\n`;
      }
    });
    js += `  },\n`;
  }

  // Navigation
  if (tokens.navigation) {
    js += `  navigation: {\n`;
    Object.entries(tokens.navigation).forEach(([key, value]) => {
      js += `    ${key}: '${value}',\n`;
    });
    js += `  },\n`;
  }

  js += `};\n\nexport default designTokens;\n`;

  return js;
}

/**
 * Generate AI implementation guide for React
 */
export function generateAIGuide(system: DesignSystem): string {
  const { allowedTokens } = system;
  
  let guide = `# ${system.name} - AI Implementation Guide

## Overview
${system.description}

**Navigation Pattern**: ${allowedTokens?.navigationPattern || 'Not specified'}

This design system export contains all the design tokens you need to implement the ${system.name} design system in a React application.

---

## 🚨 IMPORTANT: Token Restrictions

**This design system has specific token restrictions.** Only the tokens included in this export are allowed to be used. Do not use tokens that are not present in these files.

### Allowed Tokens:

`;

  // Document allowed colors
  if (allowedTokens?.colors) {
    guide += `#### Colors:\n`;
    if (allowedTokens.colors.primary) {
      guide += `- **Primary shades**: ${allowedTokens.colors.primary.join(', ')}\n`;
    }
    if (allowedTokens.colors.secondary) {
      guide += `- **Secondary shades**: ${allowedTokens.colors.secondary.join(', ')}\n`;
    }
    if (allowedTokens.colors.neutral) {
      guide += `- **Neutral shades**: ${allowedTokens.colors.neutral.join(', ')}\n`;
    }
    guide += `\n`;
  }

  // Document allowed typography
  if (allowedTokens?.typography) {
    guide += `#### Typography:\n`;
    if (allowedTokens.typography.fontWeight) {
      guide += `- **Font weights**: ${allowedTokens.typography.fontWeight.join(', ')}\n`;
    }
    if (allowedTokens.typography.fontSize) {
      guide += `- **Font sizes**: ${allowedTokens.typography.fontSize.join(', ')}\n`;
    }
    if (allowedTokens.typography.lineHeight) {
      guide += `- **Line heights**: ${allowedTokens.typography.lineHeight.join(', ')}\n`;
    }
    guide += `\n`;
  }

  // Document allowed spacing
  if (allowedTokens?.spacing) {
    guide += `#### Spacing:\n`;
    guide += `- **Allowed values**: ${allowedTokens.spacing.join(', ')}\n\n`;
  }

  // Document allowed border radius
  if (allowedTokens?.borderRadius) {
    guide += `#### Border Radius:\n`;
    guide += `- **Allowed values**: ${allowedTokens.borderRadius.join(', ')}\n\n`;
  }

  // Document allowed shadows
  if (allowedTokens?.shadows) {
    guide += `#### Shadows:\n`;
    guide += `- **Allowed values**: ${allowedTokens.shadows.join(', ')}\n\n`;
  }

  // Document allowed transitions
  if (allowedTokens?.transitions) {
    guide += `#### Transitions:\n`;
    guide += `- **Allowed values**: ${allowedTokens.transitions.join(', ')}\n\n`;
  }

  guide += `---

## 📦 What's Included

This export package contains:

1. \`design-tokens.json\` - Original design system definition
2. \`css-variables.css\` - CSS custom properties (use in any project)
3. \`scss-variables.scss\` - SCSS variables (for SCSS projects)
4. \`tailwind.config.js\` - Tailwind configuration (for Tailwind projects)
5. \`design-tokens.js\` - JavaScript/TypeScript module
6. \`AI-IMPLEMENTATION-GUIDE.md\` - This file

---

## 🎯 Implementation Guide for React

### Option 1: CSS Custom Properties (Recommended)

1. **Import the CSS file** in your main React file:

\`\`\`tsx
// src/index.tsx or src/App.tsx
import './css-variables.css';
\`\`\`

2. **Use the variables** in your component styles:

\`\`\`tsx
// Button.tsx
import styles from './Button.module.css';

export function Button({ children }: { children: React.ReactNode }) {
  return <button className={styles.button}>{children}</button>;
}
\`\`\`

\`\`\`css
/* Button.module.css */
.button {
  background-color: var(--color-primary-600);
  color: var(--color-text-primary);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);
}

.button:hover {
  background-color: var(--color-primary-700);
  box-shadow: var(--shadow-md);
}
\`\`\`

### Option 2: Tailwind CSS

1. **Merge the exported config** with your \`tailwind.config.js\`:

\`\`\`js
// tailwind.config.js
const designSystemConfig = require('./tailwind.config.js');

module.exports = {
  ...designSystemConfig,
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
};
\`\`\`

2. **Use Tailwind classes** with your design tokens:

\`\`\`tsx
export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-primary-600 hover:bg-primary-700 text-white px-spacing-lg py-spacing-sm rounded-md shadow-sm hover:shadow-md transition-base font-medium">
      {children}
    </button>
  );
}
\`\`\`

### Option 3: JavaScript Module (CSS-in-JS)

1. **Import the tokens**:

\`\`\`tsx
import { designTokens } from './design-tokens';

export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        backgroundColor: designTokens.colors.primary['600'],
        color: designTokens.colors.text.primary,
        padding: \`\${designTokens.spacing.sm} \${designTokens.spacing.lg}\`,
        borderRadius: designTokens.borderRadius.md,
        fontFamily: designTokens.typography.fontFamily.primary,
        fontSize: designTokens.typography.fontSize.base,
        fontWeight: designTokens.typography.fontWeight.medium,
        boxShadow: designTokens.shadows.sm,
        transition: \`all \${designTokens.transitions.base}\`,
      }}
    >
      {children}
    </button>
  );
}
\`\`\`

### Option 4: Styled-Components / Emotion

\`\`\`tsx
import styled from 'styled-components';
import { designTokens } from './design-tokens';

const StyledButton = styled.button\`
  background-color: \${designTokens.colors.primary['600']};
  color: \${designTokens.colors.text.primary};
  padding: \${designTokens.spacing.sm} \${designTokens.spacing.lg};
  border-radius: \${designTokens.borderRadius.md};
  font-family: \${designTokens.typography.fontFamily.primary};
  font-size: \${designTokens.typography.fontSize.base};
  font-weight: \${designTokens.typography.fontWeight.medium};
  box-shadow: \${designTokens.shadows.sm};
  transition: all \${designTokens.transitions.base};

  &:hover {
    background-color: \${designTokens.colors.primary['700']};
    box-shadow: \${designTokens.shadows.md};
  }
\`;

export function Button({ children }: { children: React.ReactNode }) {
  return <StyledButton>{children}</StyledButton>;
}
\`\`\`

---

## 🎨 Design Principles

When implementing components with this design system:

1. **Use only the allowed tokens** - Don't use tokens not present in the export
2. **Follow the navigation pattern** - Implement navigation as specified: ${allowedTokens?.navigationPattern || 'Not specified'}
3. **Maintain consistency** - Use the same token for the same purpose across all components
4. **Respect the hierarchy** - Use color shades appropriately (lighter for backgrounds, darker for text)
5. **Consider states** - Implement hover, focus, and active states using darker/lighter shades

---

## 📝 Token Naming Convention

This design system follows a consistent naming pattern:

- **Colors**: \`--color-{category}-{shade}\` (e.g., \`--color-primary-600\`)
- **Typography**: \`--font-{property}-{value}\` (e.g., \`--font-size-base\`)
- **Spacing**: \`--spacing-{size}\` (e.g., \`--spacing-md\`)
- **Border Radius**: \`--border-radius-{size}\` (e.g., \`--border-radius-lg\`)
- **Shadows**: \`--shadow-{size}\` (e.g., \`--shadow-md\`)
- **Navigation**: \`--nav-{property}\` (e.g., \`--nav-background-color\`)

---

## ✅ Best Practices

1. **Don't hardcode values** - Always use design tokens
2. **Use semantic color names** - Prefer \`--color-text-primary\` over \`--color-neutral-900\`
3. **Respect token restrictions** - Only use the allowed tokens documented above
4. **Test in different states** - Verify hover, focus, active, disabled states
5. **Check accessibility** - Ensure sufficient color contrast (WCAG AA minimum)

---

## 🚀 Quick Start Checklist

- [ ] Choose your implementation method (CSS variables, Tailwind, JS module, or CSS-in-JS)
- [ ] Import the appropriate file(s) into your React project
- [ ] Create a sample Button component using design tokens
- [ ] Verify tokens are applied correctly
- [ ] Implement hover/focus states
- [ ] Build remaining components (Input, Card, etc.)
- [ ] Ensure you're only using allowed tokens
- [ ] Test responsive behavior
- [ ] Check accessibility

---

## 📚 Additional Resources

- **Design System Demonstrator**: https://github.com/JohanBellander/DesignSystemDemonstrator
- **Original JSON**: See \`design-tokens.json\` for the complete design system definition

---

## ❓ Questions or Issues?

If you encounter any issues or have questions about implementing this design system, refer to the original Design System Demonstrator repository or the design system documentation.

**Remember**: Only use the tokens that are included in this export. This design system has been configured with specific restrictions to maintain consistency and brand guidelines.
`;

  return guide;
}

/**
 * Create a ZIP package with all export formats
 */
export async function createExportPackage(system: DesignSystem): Promise<Blob> {
  const zip = new JSZip();

  // Add original JSON
  zip.file('design-tokens.json', JSON.stringify(system, null, 2));

  // Add CSS variables
  zip.file('css-variables.css', exportToCSS(system));

  // Add SCSS variables
  zip.file('scss-variables.scss', exportToSCSS(system));

  // Add Tailwind config
  zip.file('tailwind.config.js', exportToTailwind(system));

  // Add JavaScript module
  zip.file('design-tokens.js', exportToJavaScript(system));

  // Add AI implementation guide
  zip.file('AI-IMPLEMENTATION-GUIDE.md', generateAIGuide(system));

  // Generate and return the ZIP file
  return await zip.generateAsync({ type: 'blob' });
}

/**
 * Download a ZIP file
 */
export function downloadZip(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
