/**
 * Animation Utility Functions
 * 
 * Helper functions for working with animation configurations in design systems.
 * These utilities help generate CSS class names and styles based on animation configs.
 */

import { 
  AnimationConfig, 
  AnimationType, 
  AnimationIntensity,
  Animations,
  ComponentAnimations,
  InteractionState
} from '../types/design-system';

/**
 * Get CSS class name for an animation configuration
 * Returns empty string if no animation or animation type is 'none'
 * 
 * @param config - Animation configuration object
 * @returns CSS class name in format: animation-{type}-{intensity}
 * 
 * @example
 * getAnimationClassName({ type: 'lift', intensity: 'medium' })
 * // returns: 'animation-lift-medium'
 */
export function getAnimationClassName(config?: AnimationConfig): string {
  if (!config || config.type === 'none') {
    return '';
  }
  
  const { type, intensity = 'medium' } = config;
  return `animation-${type}-${intensity}`;
}

/**
 * Generate CSS custom properties for an animation configuration
 * Useful for applying dynamic animation durations and easing functions
 * 
 * @param config - Animation configuration object
 * @returns React.CSSProperties object with CSS custom properties
 * 
 * @example
 * getAnimationStyles({ type: 'lift', duration: 'slow', easing: 'ease-out' })
 * // returns: { '--animation-duration': 'var(--transition-slow)', '--animation-easing': 'ease-out' }
 */
export function getAnimationStyles(config?: AnimationConfig): React.CSSProperties {
  if (!config) {
    return {};
  }
  
  const styles: Record<string, string> = {};
  
  if (config.duration) {
    // Map to transition token or use direct value
    // If duration is 'fast', 'base', or 'slow', use the transition token
    // Otherwise, assume it's a direct CSS value like '300ms' or '0.3s'
    const isDurationToken = ['fast', 'base', 'slow'].indexOf(config.duration) !== -1;
    styles['--animation-duration'] = isDurationToken
      ? `var(--transition-${config.duration})`
      : config.duration;
  }
  
  if (config.easing) {
    styles['--animation-easing'] = config.easing;
  }
  
  return styles as React.CSSProperties;
}

/**
 * Get animation config for a specific component and interaction state
 * Checks component-specific animations first, then falls back to defaults
 * 
 * @param animations - Complete animations system from design tokens
 * @param component - Component name (e.g., 'button', 'card')
 * @param state - Interaction state ('hover', 'active', 'focus')
 * @returns Animation configuration or undefined if not found
 * 
 * @example
 * getComponentAnimation(animations, 'button', 'hover')
 * // returns: { type: 'ripple', intensity: 'medium', duration: 'base' }
 */
export function getComponentAnimation(
  animations: Animations | undefined,
  component: keyof ComponentAnimations,
  state: InteractionState
): AnimationConfig | undefined {
  if (!animations) {
    return undefined;
  }
  
  // Check component-specific animation first
  const componentConfig = animations.components?.[component]?.[state];
  if (componentConfig) {
    return componentConfig;
  }
  
  // Fall back to default animation
  return animations.default?.[state];
}

/**
 * Get all animation class names for a component across all states
 * Returns an object with class names for hover, active, and focus states
 * 
 * @param animations - Complete animations system from design tokens
 * @param component - Component name
 * @returns Object with class names for each state
 * 
 * @example
 * getAllAnimationClasses(animations, 'button')
 * // returns: { hover: 'animation-ripple-medium', active: 'animation-scale-subtle', focus: 'animation-glow-medium' }
 */
export function getAllAnimationClasses(
  animations: Animations | undefined,
  component: keyof ComponentAnimations
): { hover: string; active: string; focus: string } {
  const hoverConfig = getComponentAnimation(animations, component, 'hover');
  const activeConfig = getComponentAnimation(animations, component, 'active');
  const focusConfig = getComponentAnimation(animations, component, 'focus');
  
  return {
    hover: getAnimationClassName(hoverConfig),
    active: getAnimationClassName(activeConfig),
    focus: getAnimationClassName(focusConfig),
  };
}

/**
 * Check if animations should be disabled based on user preferences
 * This should be used in conjunction with the CSS prefers-reduced-motion media query
 * 
 * @param animations - Complete animations system from design tokens
 * @returns true if animations should respect prefers-reduced-motion
 */
export function shouldReduceMotion(animations: Animations | undefined): boolean {
  return animations?.reduceMotion ?? true; // Default to true for accessibility
}

/**
 * Validate animation type
 * Checks if a given string is a valid animation type
 * 
 * @param type - String to validate
 * @returns true if valid animation type
 */
export function isValidAnimationType(type: string): type is AnimationType {
  const validTypes: AnimationType[] = [
    'none', 'ripple', 'lift', 'scale', 'glow', 'slide', 
    'bounce', 'fade', 'shimmer', 'rotate', 'pulse'
  ];
  return validTypes.indexOf(type as AnimationType) !== -1;
}

/**
 * Validate animation intensity
 * Checks if a given string is a valid animation intensity
 * 
 * @param intensity - String to validate
 * @returns true if valid animation intensity
 */
export function isValidAnimationIntensity(intensity: string): intensity is AnimationIntensity {
  const validIntensities: AnimationIntensity[] = ['subtle', 'medium', 'bold'];
  return validIntensities.indexOf(intensity as AnimationIntensity) !== -1;
}

/**
 * Merge animation configurations
 * Combines a base config with overrides, useful for extending animations
 * 
 * @param base - Base animation configuration
 * @param override - Configuration to merge on top
 * @returns Merged animation configuration
 */
export function mergeAnimationConfig(
  base?: AnimationConfig,
  override?: Partial<AnimationConfig>
): AnimationConfig | undefined {
  if (!base && !override) {
    return undefined;
  }
  
  if (!base) {
    return override as AnimationConfig;
  }
  
  if (!override) {
    return base;
  }
  
  return {
    ...base,
    ...override,
  };
}
