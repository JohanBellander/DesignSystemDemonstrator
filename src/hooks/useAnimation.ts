/**
 * useAnimation Hook
 * 
 * Custom React hook for applying animations to components based on design system configuration.
 * This hook simplifies the integration of animations by providing class names and styles
 * that can be directly applied to components.
 * 
 * @example
 * ```tsx
 * function MyButton() {
 *   const { getAnimationClasses, getAnimationProps } = useAnimation('button');
 *   const classes = getAnimationClasses();
 *   
 *   return (
 *     <button 
 *       className={classes.hover}
 *       style={getAnimationProps()}
 *     >
 *       Click me!
 *     </button>
 *   );
 * }
 * ```
 */

import { useDesignSystem } from '../context/DesignSystemContext';
import { ComponentAnimations, InteractionState } from '../types/design-system';
import { 
  getComponentAnimation, 
  getAnimationClassName, 
  getAnimationStyles,
  getAllAnimationClasses 
} from '../utils/animationUtils';

/**
 * Hook for managing component animations
 * 
 * @param component - The component type (e.g., 'button', 'card', 'input')
 * @returns Object with animation utilities
 */
export function useAnimation(component: keyof ComponentAnimations) {
  const { selectedSystem } = useDesignSystem();
  const animations = selectedSystem?.tokens.animations;
  
  /**
   * Get animation configuration for a specific interaction state
   * 
   * @param state - The interaction state ('hover', 'active', 'focus')
   * @returns Animation configuration or undefined
   */
  const getAnimation = (state: InteractionState) => {
    return getComponentAnimation(animations, component, state);
  };
  
  /**
   * Get CSS class names for all interaction states
   * 
   * @returns Object with class names for hover, active, and focus states
   * 
   * @example
   * ```tsx
   * const classes = getAnimationClasses();
   * // { hover: 'animation-ripple-medium', active: 'animation-scale-subtle', focus: 'animation-glow-medium' }
   * ```
   */
  const getAnimationClasses = () => {
    return getAllAnimationClasses(animations, component);
  };
  
  /**
   * Get CSS class name for a specific interaction state
   * 
   * @param state - The interaction state
   * @returns CSS class name string
   * 
   * @example
   * ```tsx
   * const hoverClass = getAnimationClass('hover');
   * // 'animation-ripple-medium'
   * ```
   */
  const getAnimationClass = (state: InteractionState) => {
    const config = getAnimation(state);
    return getAnimationClassName(config);
  };
  
  /**
   * Get inline styles for animation configurations
   * Useful for applying custom duration and easing values
   * 
   * @param state - Optional specific state, defaults to 'hover'
   * @returns React.CSSProperties object with CSS custom properties
   * 
   * @example
   * ```tsx
   * const styles = getAnimationProps();
   * // { '--animation-duration': 'var(--transition-base)', '--animation-easing': 'ease-out' }
   * ```
   */
  const getAnimationProps = (state: InteractionState = 'hover') => {
    const config = getAnimation(state);
    return getAnimationStyles(config);
  };
  
  /**
   * Check if animations are enabled for this component
   * 
   * @returns true if component has any animations defined
   */
  const hasAnimations = () => {
    const classes = getAnimationClasses();
    return !!(classes.hover || classes.active || classes.focus);
  };
  
  /**
   * Check if reduced motion is enabled in the design system
   * 
   * @returns true if animations should respect prefers-reduced-motion
   */
  const isReducedMotion = () => {
    return animations?.reduceMotion ?? true;
  };
  
  return {
    getAnimation,
    getAnimationClasses,
    getAnimationClass,
    getAnimationProps,
    hasAnimations,
    isReducedMotion,
  };
}
