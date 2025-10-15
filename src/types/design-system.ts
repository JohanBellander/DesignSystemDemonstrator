/**
 * Design System Type Definitions
 * 
 * This file contains all TypeScript interfaces and types for defining
 * design systems in a standardized, machine-readable format.
 */

/**
 * Color palette with scale from light (50) to dark (900)
 */
export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

/**
 * Semantic colors for common UI states
 */
export interface SemanticColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

/**
 * Text color variants
 */
export interface TextColors {
  primary: string;
  secondary: string;
  disabled: string;
}

/**
 * Background color variants
 */
export interface BackgroundColors {
  default: string;
  paper: string;
  elevated: string;
}

/**
 * Border color variants
 */
export interface BorderColors {
  default: string;
  light: string;
}

/**
 * Complete color system
 */
export interface Colors {
  primary: ColorPalette;
  secondary: ColorPalette;
  neutral: ColorPalette;
  semantic: SemanticColors;
  text: TextColors;
  background: BackgroundColors;
  border: BorderColors;
}

/**
 * Font family definitions
 */
export interface FontFamily {
  primary: string;
  monospace: string;
}

/**
 * Font size scale
 */
export interface FontSize {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

/**
 * Font weight scale
 */
export interface FontWeight {
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
}

/**
 * Line height scale
 */
export interface LineHeight {
  tight: number;
  normal: number;
  relaxed: number;
}

/**
 * Typography system
 */
export interface Typography {
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
}

/**
 * Spacing scale
 */
export interface Spacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

/**
 * Border radius scale
 */
export interface BorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  full: string;
}

/**
 * Shadow/elevation scale
 */
export interface Shadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

/**
 * Transition/animation durations
 */
export interface Transitions {
  fast: string;
  base: string;
  slow: string;
}

/**
 * All design tokens for a design system
 */
export interface DesignTokens {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  transitions: Transitions;
}

/**
 * Complete design system definition
 */
export interface DesignSystem {
  id: string;
  name: string;
  description: string;
  tokens: DesignTokens;
}

/**
 * Design system metadata (for listing)
 */
export interface DesignSystemMeta {
  id: string;
  name: string;
  description: string;
}
