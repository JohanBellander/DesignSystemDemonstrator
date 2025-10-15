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
 * Grid system configuration
 */
export interface Grid {
  columns: number;
  gutter: string;
  margin: string;
}

/**
 * Layout breakpoints and container widths
 */
export interface Layout {
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  containers: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}

/**
 * Elevation system with z-index and shadow levels
 */
export interface Elevation {
  levels: {
    '0': string;
    '1': string;
    '2': string;
    '4': string;
    '6': string;
    '8': string;
    '12': string;
    '16': string;
    '24': string;
  };
  zIndex: {
    dropdown: number;
    sticky: number;
    fixed: number;
    modal: number;
    popover: number;
    tooltip: number;
  };
}

/**
 * Opacity scale for various transparency needs
 */
export interface OpacityScale {
  disabled: string;
  hover: string;
  active: string;
  overlay: string;
  divider: string;
}

/**
 * Border system configuration
 */
export interface BorderSystem {
  widths: {
    thin: string;
    medium: string;
    thick: string;
  };
  styles: {
    solid: string;
    dashed: string;
    dotted: string;
  };
}

/**
 * Focus state styling
 */
export interface FocusStates {
  ringWidth: string;
  ringOffset: string;
  ringColor: string;
  outlineStyle: string;
}

/**
 * Surface and background colors for layering
 */
export interface Surfaces {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  surface: {
    base: string;
    raised: string;
    overlay: string;
  };
}

/**
 * All design tokens for a design system
 * Note: All properties except colors, typography, and spacing are optional
 * to allow flexibility in design system definitions
 */
export interface DesignTokens {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  borderRadius?: BorderRadius;
  shadows?: Shadows;
  transitions?: Transitions;
  grid?: Grid;
  layout?: Layout;
  elevation?: Elevation;
  opacity?: OpacityScale;
  borders?: BorderSystem;
  focusStates?: FocusStates;
  surfaces?: Surfaces;
}

/**
 * Design system status
 */
export type DesignSystemStatus = 'active' | 'deprecated' | 'experimental';

/**
 * Complete design system definition
 */
export interface DesignSystem {
  id: string;
  name: string;
  description: string;
  status?: DesignSystemStatus;
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
