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
  accent?: ColorPalette;
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
 * Navigation styling configuration
 */
export interface NavigationStyle {
  backgroundColor?: string;
  textColor?: string;
  activeColor?: string;
  hoverColor?: string;
  borderColor?: string;
  height?: string;
  padding?: string;
  gap?: string;
  fontWeight?: string;
  fontSize?: string;
  borderRadius?: string;
  shadow?: string;
}

/**
 * Animation effect type
 */
export type AnimationType = 
  | 'none'           // No animation
  | 'ripple'         // Material-style ripple effect
  | 'lift'           // Elevation increase (transform + shadow)
  | 'scale'          // Scale up/down
  | 'glow'           // Glowing border/shadow
  | 'slide'          // Subtle slide movement
  | 'bounce'         // Bouncy spring animation
  | 'fade'           // Opacity change
  | 'shimmer'        // Shimmer/shine effect
  | 'rotate'         // Rotation effect
  | 'pulse';         // Pulsing scale/opacity

/**
 * Animation intensity level
 */
export type AnimationIntensity = 'subtle' | 'medium' | 'bold';

/**
 * Interaction state
 */
export type InteractionState = 'hover' | 'active' | 'focus';

/**
 * Configuration for a single animation
 */
export interface AnimationConfig {
  type: AnimationType;
  intensity?: AnimationIntensity;
  duration?: string; // Reference to transition token or custom value
  easing?: string;   // CSS easing function
}

/**
 * State-specific animation mapping
 */
export interface StateAnimations {
  hover?: AnimationConfig;
  active?: AnimationConfig;
  focus?: AnimationConfig;
}

/**
 * Component-specific animation configurations
 */
export interface ComponentAnimations {
  button?: StateAnimations;
  card?: StateAnimations;
  input?: StateAnimations;
  navigation?: StateAnimations;
  list?: StateAnimations;
  dropdown?: StateAnimations;
}

/**
 * Complete animation system for a design system
 */
export interface Animations {
  // Default animations for all components (can be overridden)
  default?: StateAnimations;
  
  // Component-specific overrides
  components?: ComponentAnimations;
  
  // Global animation settings
  reduceMotion?: boolean; // Honor prefers-reduced-motion
  
  // Custom animation definitions (advanced)
  custom?: {
    [key: string]: {
      keyframes: string; // CSS keyframe definition
      config: AnimationConfig;
    };
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
  navigation?: NavigationStyle;
  animations?: Animations;
}

/**
 * Specifies which tokens are allowed to be used in this design system.
 * If specified, only the listed tokens should be used. Others are considered "not part of the system".
 */
export interface AllowedTokens {
  colors?: {
    primary?: string[];      // e.g., ["500", "600", "700"] - only these shades allowed
    secondary?: string[];
    neutral?: string[];
    semantic?: string[];      // e.g., ["success", "error"] - only these semantic colors
    text?: string[];          // e.g., ["primary", "secondary"] - only these text colors
    background?: string[];    // e.g., ["default", "paper"] - only these background colors
    border?: string[];        // e.g., ["default"] - only these border colors
  };
  typography?: {
    fontFamily?: string[];    // e.g., ["primary"] - only primary font allowed
    fontSize?: string[];      // e.g., ["sm", "base", "lg"] - only these sizes
    fontWeight?: string[];    // e.g., ["normal", "bold"] - only these weights
    lineHeight?: string[];    // e.g., ["normal", "relaxed"] - only these line heights
  };
  spacing?: string[];         // e.g., ["sm", "md", "lg"] - only these spacing values
  borderRadius?: string[];    // e.g., ["md", "lg"] - only these radii allowed
  shadows?: string[];         // e.g., ["sm", "md"] - only these shadows
  transitions?: string[];     // e.g., ["base", "slow"] - only these transitions
  grid?: {
    columns?: boolean;        // Allow/disallow grid columns
    gutter?: boolean;         // Allow/disallow grid gutter
    margin?: boolean;         // Allow/disallow grid margin
  };
  layout?: {
    breakpoints?: string[];   // e.g., ["md", "lg", "xl"] - only these breakpoints
    containers?: string[];    // e.g., ["md", "lg", "xl"] - only these containers
  };
  elevation?: {
    levels?: string[];        // e.g., ["0", "1", "2", "4"] - only these elevation levels
    zIndex?: string[];        // e.g., ["dropdown", "modal"] - only these z-index values
  };
  opacity?: string[];         // e.g., ["disabled", "hover"] - only these opacity values
  borders?: {
    widths?: string[];        // e.g., ["thin", "medium"] - only these border widths
    styles?: string[];        // e.g., ["solid"] - only these border styles
  };
  focusStates?: {
    ringWidth?: boolean;
    ringOffset?: boolean;
    ringColor?: boolean;
    outlineStyle?: boolean;
  };
  surfaces?: {
    background?: string[];    // e.g., ["primary", "secondary"] - only these surface backgrounds
    surface?: string[];       // e.g., ["base", "raised"] - only these surface types
  };
  navigationPattern?: 'topbar' | 'sidebar' | 'hamburger' | 'topbar-hamburger' | 'sidebar-topbar' | 'minimal';
  animations?: {
    types?: AnimationType[];         // e.g., ["lift", "scale", "glow"] - only these animation types allowed
    intensities?: AnimationIntensity[]; // e.g., ["subtle", "medium"] - only these intensities
    components?: string[];           // e.g., ["button", "card"] - only these components can have custom animations
  };
  components?: {
    dropdown?: {
      sizes?: ('small' | 'medium' | 'large')[];     // e.g., ["medium", "large"] - only these sizes
      states?: ('default' | 'hover' | 'focus' | 'error' | 'disabled')[];  // allowed states
    };
    list?: {
      variants?: ('default' | 'bordered' | 'divided' | 'card')[];  // e.g., ["bordered", "card"]
      sizes?: ('small' | 'medium' | 'large')[];     // e.g., ["medium", "large"]
      interactive?: boolean;                         // Allow/disallow interactive mode
    };
  };
}

/**
 * Complete design system definition
 */
export interface DesignSystem {
  id: string;
  name: string;
  description: string;
  allowedTokens?: AllowedTokens;
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
