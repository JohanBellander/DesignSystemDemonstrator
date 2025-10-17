# Animation System Implementation Plan

**Created**: October 17, 2025  
**Purpose**: Add comprehensive mouse over/click animation support to design systems  
**Status**: Planning Phase - Not Started

---

## 🎯 Overview

This plan outlines the implementation of a flexible animation system that allows each design system to define and showcase different interaction animations (hover, click, focus) for components. The system will be token-based, allowing design systems to configure animation behaviors just like they configure colors and spacing.

---

## 📊 Current State Analysis

### What Exists Today
- **Basic Transitions**: `transitions` tokens (fast/base/slow) with timing values
- **Hardcoded Animations**: Some components have fixed animations (e.g., Button ripple effect, Card hover elevation)
- **Opacity Tokens**: `opacity` tokens for hover/active states exist in some design systems
- **Interactive States**: CSS `:hover`, `:active`, `:focus-visible` are used but not systematically

### Gaps Identified
1. **No Animation Token Schema**: No standardized way to define animation types in JSON
2. **Limited Animation Variety**: Only 1-2 animation styles hardcoded (ripple, lift)
3. **No Per-System Customization**: All design systems get the same animations
4. **No Animation Showcase**: No dedicated demo to compare animation styles
5. **Missing Animation Types**: No scale, slide, glow, bounce, or other common effects

---

## 🎨 Proposed Solution

### Core Concept
Add an **`animations`** token category to the design system schema that defines:
- **Types of animations** available (ripple, lift, scale, glow, slide, etc.)
- **Configuration per animation** (intensity, duration, easing)
- **Component-specific mappings** (which animation for buttons, cards, inputs, etc.)
- **State-specific behaviors** (different animations for hover vs. click)

---

## 📋 Implementation Phases

### **Phase 1: Design System Schema Extension**

#### 1.1 Type Definitions (`src/types/design-system.ts`)

Add new interfaces:

```typescript
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
```

Add to `DesignTokens` interface:
```typescript
export interface DesignTokens {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  // ... existing tokens ...
  animations?: Animations; // NEW - Optional for backwards compatibility
}
```

#### 1.2 Template Update (`public/design-systems/template.json`)

Add animation section example:

```json
{
  "tokens": {
    // ... existing tokens ...
    
    "animations": {
      "default": {
        "hover": {
          "type": "lift",
          "intensity": "subtle",
          "duration": "base",
          "easing": "ease-out"
        },
        "active": {
          "type": "scale",
          "intensity": "subtle",
          "duration": "fast",
          "easing": "ease-in-out"
        },
        "focus": {
          "type": "glow",
          "intensity": "medium",
          "duration": "base"
        }
      },
      "components": {
        "button": {
          "hover": {
            "type": "ripple",
            "intensity": "medium",
            "duration": "base"
          },
          "active": {
            "type": "scale",
            "intensity": "subtle",
            "duration": "fast"
          }
        },
        "card": {
          "hover": {
            "type": "lift",
            "intensity": "medium",
            "duration": "slow"
          }
        }
      },
      "reduceMotion": true
    }
  }
}
```

---

### **Phase 2: Animation Utility System**

#### 2.1 Create Animation Utilities (`src/utils/animationUtils.ts`)

```typescript
import { AnimationConfig, AnimationType, AnimationIntensity } from '../types/design-system';

/**
 * Get CSS class name for an animation configuration
 */
export function getAnimationClassName(config?: AnimationConfig): string {
  if (!config || config.type === 'none') return '';
  
  const { type, intensity = 'medium' } = config;
  return `animation-${type}-${intensity}`;
}

/**
 * Generate CSS custom properties for an animation
 */
export function getAnimationStyles(config?: AnimationConfig): React.CSSProperties {
  if (!config) return {};
  
  const styles: React.CSSProperties = {};
  
  if (config.duration) {
    // Map to transition token or use direct value
    styles['--animation-duration' as any] = 
      config.duration.includes('ms') || config.duration.includes('s')
        ? config.duration
        : `var(--transition-${config.duration})`;
  }
  
  if (config.easing) {
    styles['--animation-easing' as any] = config.easing;
  }
  
  return styles;
}

/**
 * Get animation config for a component and state
 */
export function getComponentAnimation(
  animations: Animations | undefined,
  component: keyof ComponentAnimations,
  state: InteractionState
): AnimationConfig | undefined {
  if (!animations) return undefined;
  
  // Check component-specific first
  const componentConfig = animations.components?.[component]?.[state];
  if (componentConfig) return componentConfig;
  
  // Fall back to default
  return animations.default?.[state];
}
```

#### 2.2 Create Animation CSS Module (`src/styles/animations.module.css`)

Global animation definitions:

```css
/* ===== LIFT ANIMATIONS ===== */
.animation-lift-subtle {
  transition: transform var(--animation-duration, var(--transition-base)),
              box-shadow var(--animation-duration, var(--transition-base));
}

.animation-lift-subtle:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.animation-lift-medium {
  transition: transform var(--animation-duration, var(--transition-base)),
              box-shadow var(--animation-duration, var(--transition-base));
}

.animation-lift-medium:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.animation-lift-bold {
  transition: transform var(--animation-duration, var(--transition-base)),
              box-shadow var(--animation-duration, var(--transition-base));
}

.animation-lift-bold:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

/* ===== SCALE ANIMATIONS ===== */
.animation-scale-subtle {
  transition: transform var(--animation-duration, var(--transition-fast));
}

.animation-scale-subtle:hover {
  transform: scale(1.02);
}

.animation-scale-subtle:active {
  transform: scale(0.98);
}

.animation-scale-medium {
  transition: transform var(--animation-duration, var(--transition-fast));
}

.animation-scale-medium:hover {
  transform: scale(1.05);
}

.animation-scale-medium:active {
  transform: scale(0.95);
}

.animation-scale-bold {
  transition: transform var(--animation-duration, var(--transition-fast));
}

.animation-scale-bold:hover {
  transform: scale(1.1);
}

.animation-scale-bold:active {
  transform: scale(0.9);
}

/* ===== GLOW ANIMATIONS ===== */
.animation-glow-subtle {
  transition: box-shadow var(--animation-duration, var(--transition-base));
}

.animation-glow-subtle:hover,
.animation-glow-subtle:focus-visible {
  box-shadow: 0 0 0 2px var(--color-primary-200);
}

.animation-glow-medium {
  transition: box-shadow var(--animation-duration, var(--transition-base));
}

.animation-glow-medium:hover,
.animation-glow-medium:focus-visible {
  box-shadow: 0 0 0 3px var(--color-primary-300),
              0 0 12px var(--color-primary-300);
}

.animation-glow-bold {
  transition: box-shadow var(--animation-duration, var(--transition-base));
}

.animation-glow-bold:hover,
.animation-glow-bold:focus-visible {
  box-shadow: 0 0 0 4px var(--color-primary-400),
              0 0 20px var(--color-primary-400);
}

/* ===== RIPPLE ANIMATIONS ===== */
.animation-ripple-subtle,
.animation-ripple-medium,
.animation-ripple-bold {
  position: relative;
  overflow: hidden;
}

.animation-ripple-subtle::after,
.animation-ripple-medium::after,
.animation-ripple-bold::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width var(--animation-duration, 0.6s) ease-out,
              height var(--animation-duration, 0.6s) ease-out,
              opacity var(--animation-duration, 0.6s) ease-out;
  pointer-events: none;
  opacity: 0;
}

.animation-ripple-subtle:active::after {
  width: 200px;
  height: 200px;
  opacity: 0.3;
}

.animation-ripple-medium:active::after {
  width: 300px;
  height: 300px;
  opacity: 0.4;
}

.animation-ripple-bold:active::after {
  width: 400px;
  height: 400px;
  opacity: 0.6;
}

/* ===== SLIDE ANIMATIONS ===== */
.animation-slide-subtle {
  transition: transform var(--animation-duration, var(--transition-base));
}

.animation-slide-subtle:hover {
  transform: translateX(2px);
}

.animation-slide-medium {
  transition: transform var(--animation-duration, var(--transition-base));
}

.animation-slide-medium:hover {
  transform: translateX(4px);
}

.animation-slide-bold {
  transition: transform var(--animation-duration, var(--transition-base));
}

.animation-slide-bold:hover {
  transform: translateX(8px);
}

/* ===== BOUNCE ANIMATIONS ===== */
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes bounce-medium {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes bounce-bold {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.animation-bounce-subtle:hover {
  animation: bounce-subtle 0.5s ease-in-out;
}

.animation-bounce-medium:hover {
  animation: bounce-medium 0.6s ease-in-out;
}

.animation-bounce-bold:hover {
  animation: bounce-bold 0.7s ease-in-out;
}

/* ===== FADE ANIMATIONS ===== */
.animation-fade-subtle {
  transition: opacity var(--animation-duration, var(--transition-base));
}

.animation-fade-subtle:hover {
  opacity: 0.8;
}

.animation-fade-medium {
  transition: opacity var(--animation-duration, var(--transition-base));
}

.animation-fade-medium:hover {
  opacity: 0.7;
}

.animation-fade-bold {
  transition: opacity var(--animation-duration, var(--transition-base));
}

.animation-fade-bold:hover {
  opacity: 0.5;
}

/* ===== SHIMMER ANIMATIONS ===== */
@keyframes shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}

.animation-shimmer-subtle,
.animation-shimmer-medium,
.animation-shimmer-bold {
  position: relative;
  overflow: hidden;
}

.animation-shimmer-subtle::before,
.animation-shimmer-medium::before,
.animation-shimmer-bold::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.animation-shimmer-subtle:hover::before {
  opacity: 0.3;
}

.animation-shimmer-medium:hover::before {
  opacity: 0.5;
}

.animation-shimmer-bold:hover::before {
  opacity: 0.8;
}

/* ===== PULSE ANIMATIONS ===== */
@keyframes pulse-subtle {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.02); opacity: 0.9; }
}

@keyframes pulse-medium {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.85; }
}

@keyframes pulse-bold {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
}

.animation-pulse-subtle:hover {
  animation: pulse-subtle 1s ease-in-out infinite;
}

.animation-pulse-medium:hover {
  animation: pulse-medium 1s ease-in-out infinite;
}

.animation-pulse-bold:hover {
  animation: pulse-bold 1s ease-in-out infinite;
}

/* ===== ROTATE ANIMATIONS ===== */
.animation-rotate-subtle {
  transition: transform var(--animation-duration, var(--transition-base));
}

.animation-rotate-subtle:hover {
  transform: rotate(2deg);
}

.animation-rotate-medium {
  transition: transform var(--animation-duration, var(--transition-base));
}

.animation-rotate-medium:hover {
  transform: rotate(5deg);
}

.animation-rotate-bold {
  transition: transform var(--animation-duration, var(--transition-base));
}

.animation-rotate-bold:hover {
  transform: rotate(10deg);
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .animation-lift-subtle,
  .animation-lift-medium,
  .animation-lift-bold,
  .animation-scale-subtle,
  .animation-scale-medium,
  .animation-scale-bold,
  .animation-glow-subtle,
  .animation-glow-medium,
  .animation-glow-bold,
  .animation-ripple-subtle,
  .animation-ripple-medium,
  .animation-ripple-bold,
  .animation-slide-subtle,
  .animation-slide-medium,
  .animation-slide-bold,
  .animation-bounce-subtle,
  .animation-bounce-medium,
  .animation-bounce-bold,
  .animation-fade-subtle,
  .animation-fade-medium,
  .animation-fade-bold,
  .animation-shimmer-subtle,
  .animation-shimmer-medium,
  .animation-shimmer-bold,
  .animation-pulse-subtle,
  .animation-pulse-medium,
  .animation-pulse-bold,
  .animation-rotate-subtle,
  .animation-rotate-medium,
  .animation-rotate-bold {
    animation: none !important;
    transition: none !important;
  }
  
  .animation-lift-subtle:hover,
  .animation-lift-medium:hover,
  .animation-lift-bold:hover,
  .animation-scale-subtle:hover,
  .animation-scale-medium:hover,
  .animation-scale-bold:hover,
  .animation-slide-subtle:hover,
  .animation-slide-medium:hover,
  .animation-slide-bold:hover,
  .animation-rotate-subtle:hover,
  .animation-rotate-medium:hover,
  .animation-rotate-bold:hover {
    transform: none !important;
  }
}

/* ===== NONE (No Animation) ===== */
.animation-none-subtle,
.animation-none-medium,
.animation-none-bold {
  /* Explicitly no animations */
}
```

---

### **Phase 3: Component Integration**

#### 3.1 Create Animation Hook (`src/hooks/useAnimation.ts`)

```typescript
import { useDesignSystem } from '../context/DesignSystemContext';
import { InteractionState, ComponentAnimations } from '../types/design-system';
import { getComponentAnimation, getAnimationClassName, getAnimationStyles } from '../utils/animationUtils';

export function useAnimation(component: keyof ComponentAnimations) {
  const { selectedSystem } = useDesignSystem();
  const animations = selectedSystem?.tokens.animations;
  
  /**
   * Get animation configuration for a specific state
   */
  const getAnimation = (state: InteractionState) => {
    return getComponentAnimation(animations, component, state);
  };
  
  /**
   * Get CSS class names for all states
   */
  const getAnimationClasses = () => {
    const hoverConfig = getAnimation('hover');
    const activeConfig = getAnimation('active');
    const focusConfig = getAnimation('focus');
    
    return {
      hover: getAnimationClassName(hoverConfig),
      active: getAnimationClassName(activeConfig),
      focus: getAnimationClassName(focusConfig),
    };
  };
  
  /**
   * Get inline styles for animation configurations
   */
  const getAnimationProps = () => {
    const hoverConfig = getAnimation('hover');
    return getAnimationStyles(hoverConfig);
  };
  
  return {
    getAnimation,
    getAnimationClasses,
    getAnimationProps,
  };
}
```

#### 3.2 Update Button Component (`src/components/demo/Button.tsx`)

```typescript
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { useAnimation } from '../../hooks/useAnimation';
import styles from './Button.module.css';
import animationStyles from '../../styles/animations.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  className,
  style,
  ...props 
}: ButtonProps) {
  const { getAnimationClasses, getAnimationProps } = useAnimation('button');
  const animationClasses = getAnimationClasses();
  
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    animationClasses.hover && animationStyles[animationClasses.hover],
    animationClasses.active && animationStyles[animationClasses.active],
    animationClasses.focus && animationStyles[animationClasses.focus],
    className
  ].filter(Boolean).join(' ');
  
  const combinedStyle = {
    ...getAnimationProps(),
    ...style
  };

  return (
    <button className={classNames} style={combinedStyle} {...props}>
      {children}
    </button>
  );
}
```

#### 3.3 Update Card Component (Similar Pattern)

Apply the same pattern to other interactive components:
- `Card.tsx`
- `Input.tsx`
- `Dropdown.tsx`
- `List.tsx`
- `Navigation.tsx`

---

### **Phase 4: Animation Showcase Component**

#### 4.1 Create Animation Demo (`src/components/demo/AnimationShowcase.tsx`)

A comprehensive component that:
1. **Shows All Available Animation Types** - Grid of cards demonstrating each animation
2. **Interactive Playground** - Users can click/hover to see animations
3. **Side-by-Side Comparison** - Compare different intensities
4. **Component Examples** - Show how animations apply to different components
5. **Configuration Display** - Show JSON config for current animation

```typescript
import { useState } from 'react';
import { useDesignSystem } from '../../context/DesignSystemContext';
import { AnimationType, AnimationIntensity } from '../../types/design-system';
import styles from './AnimationShowcase.module.css';

export function AnimationShowcase() {
  const { selectedSystem } = useDesignSystem();
  const animations = selectedSystem?.tokens.animations;
  
  // Component implementation
  // ... (detailed implementation)
}
```

#### 4.2 Add to ComponentShowcase

Update `src/components/ui/ComponentShowcase.tsx`:
- Add "Animations" tab
- Import and render `AnimationShowcase`

---

### **Phase 5: Design System Examples**

#### 5.1 Material Design Animation Profile

Update `public/design-systems/material.json`:

```json
{
  "animations": {
    "default": {
      "hover": {
        "type": "lift",
        "intensity": "medium",
        "duration": "base"
      },
      "active": {
        "type": "ripple",
        "intensity": "medium",
        "duration": "base"
      },
      "focus": {
        "type": "glow",
        "intensity": "medium",
        "duration": "base"
      }
    },
    "components": {
      "button": {
        "hover": {
          "type": "lift",
          "intensity": "medium",
          "duration": "base"
        },
        "active": {
          "type": "ripple",
          "intensity": "bold",
          "duration": "fast"
        }
      },
      "card": {
        "hover": {
          "type": "lift",
          "intensity": "medium",
          "duration": "slow"
        }
      }
    },
    "reduceMotion": true
  }
}
```

#### 5.2 Apple Inspired Animation Profile

Update `public/design-systems/apple.json`:

```json
{
  "animations": {
    "default": {
      "hover": {
        "type": "scale",
        "intensity": "subtle",
        "duration": "slow"
      },
      "active": {
        "type": "scale",
        "intensity": "subtle",
        "duration": "fast"
      },
      "focus": {
        "type": "glow",
        "intensity": "subtle",
        "duration": "base"
      }
    },
    "components": {
      "button": {
        "hover": {
          "type": "scale",
          "intensity": "subtle",
          "duration": "slow"
        },
        "active": {
          "type": "fade",
          "intensity": "subtle",
          "duration": "fast"
        }
      },
      "card": {
        "hover": {
          "type": "lift",
          "intensity": "subtle",
          "duration": "slow"
        }
      }
    },
    "reduceMotion": true
  }
}
```

#### 5.3 Create Playful Animation Profile

Create new design system showcasing bold animations:
`public/design-systems/playful.json`:

```json
{
  "id": "playful",
  "name": "Playful Animations",
  "description": "Bold, fun animations with bounce and shimmer effects",
  "animations": {
    "default": {
      "hover": {
        "type": "bounce",
        "intensity": "medium",
        "duration": "base"
      },
      "active": {
        "type": "pulse",
        "intensity": "medium",
        "duration": "fast"
      }
    },
    "components": {
      "button": {
        "hover": {
          "type": "shimmer",
          "intensity": "medium",
          "duration": "base"
        },
        "active": {
          "type": "bounce",
          "intensity": "bold",
          "duration": "fast"
        }
      }
    }
  }
  // ... rest of tokens
}
```

---

### **Phase 6: Documentation & Testing**

#### 6.1 Update Documentation

**Create**: `docs/ANIMATION_SYSTEM.md`
- Explain animation token structure
- List all available animation types
- Show configuration examples
- Best practices for choosing animations
- Accessibility considerations

**Update**: `docs/CREATING_DESIGN_SYSTEMS.md`
- Add animation section
- Show how to configure animations
- Provide examples

**Update**: `README.md`
- Mention animation system feature
- Link to animation documentation

#### 6.2 Update Template

**Update**: `public/design-systems/template.json`
- Add comprehensive animation examples
- Add comments explaining each option

#### 6.3 Testing Checklist

- [ ] All animation types render correctly
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Animations work across all design systems
- [ ] Performance is acceptable (no jank)
- [ ] Backward compatibility (systems without animations still work)
- [ ] Animation showcase displays all options
- [ ] Mobile/touch interactions work properly

---

## 🎯 Success Criteria

1. **Extensible**: Easy to add new animation types without code changes
2. **Flexible**: Design systems can fully customize animations per component
3. **Performant**: Animations run at 60fps with no janky motion
4. **Accessible**: Respects `prefers-reduced-motion` and provides alternatives
5. **Discoverable**: Animation showcase makes it easy to see all options
6. **Backwards Compatible**: Existing design systems work without animation configs
7. **Well Documented**: Clear docs for creating custom animations

---

## 📊 Animation Type Reference

| Animation | Best For | Intensity Levels | States |
|-----------|----------|------------------|--------|
| **none** | Minimal designs | N/A | All |
| **ripple** | Material Design, buttons | subtle, medium, bold | active |
| **lift** | Cards, elevated surfaces | subtle, medium, bold | hover |
| **scale** | Buttons, interactive items | subtle, medium, bold | hover, active |
| **glow** | Focus states, highlights | subtle, medium, bold | hover, focus |
| **slide** | Navigation, lists | subtle, medium, bold | hover |
| **bounce** | Playful UIs, success states | subtle, medium, bold | hover, active |
| **fade** | Overlays, subtle interactions | subtle, medium, bold | hover, active |
| **shimmer** | Loading, premium feel | subtle, medium, bold | hover |
| **rotate** | Icons, playful elements | subtle, medium, bold | hover, active |
| **pulse** | Attention, notifications | subtle, medium, bold | hover |

---

## 🔄 Migration Strategy

### For Existing Design Systems

1. **Optional Migration**: Animations are completely optional
2. **Gradual Adoption**: Can start with just default animations
3. **Override Protection**: Existing hardcoded animations in components will be replaced by system animations
4. **Fallback Behavior**: If no animation defined, components use basic CSS transitions

### For New Design Systems

1. **Template Includes Examples**: template.json has comprehensive animation examples
2. **Recommended Defaults**: Documentation suggests sensible defaults per design language
3. **Copy-Paste Ready**: Can copy animation configs from similar design systems

---

## 🚀 Future Enhancements (Post-MVP)

1. **Animation Builder UI**: Visual tool to configure animations without JSON editing
2. **Custom Keyframes**: Support for user-defined @keyframes in JSON
3. **Animation Sequences**: Chain multiple animations together
4. **Gesture Support**: Different animations for touch vs. mouse
5. **Performance Monitoring**: Track animation performance metrics
6. **Animation Presets**: Library of pre-configured animation styles
7. **3D Transforms**: Support for 3D rotation and perspective effects
8. **Spring Physics**: Spring-based animations with configurable physics

---

## 📝 Notes

- All animations must be CSS-based for performance (no JS animation libraries)
- Use `will-change` sparingly and only when necessary
- Ensure animations don't interfere with assistive technologies
- Test on lower-end devices to ensure smooth performance
- Consider battery impact on mobile devices
- Follow Material Design motion guidelines for timing and easing curves

---

## ✅ Implementation Checklist

### Phase 1: Schema Extension
- [ ] Add animation types to `design-system.ts`
- [ ] Add `Animations` interface
- [ ] Add `AnimationConfig`, `StateAnimations`, `ComponentAnimations`
- [ ] Update `DesignTokens` to include optional `animations`
- [ ] Update template.json with animation examples

### Phase 2: Animation Utilities
- [ ] Create `src/utils/animationUtils.ts`
- [ ] Implement `getAnimationClassName()`
- [ ] Implement `getAnimationStyles()`
- [ ] Implement `getComponentAnimation()`
- [ ] Create `src/styles/animations.module.css`
- [ ] Implement all 11 animation types × 3 intensities
- [ ] Add `prefers-reduced-motion` media query

### Phase 3: Component Integration
- [ ] Create `src/hooks/useAnimation.ts`
- [ ] Update `Button.tsx` to use animations
- [ ] Update `Card.tsx` to use animations
- [ ] Update `Input.tsx` to use animations
- [ ] Update `Dropdown.tsx` to use animations
- [ ] Update `List.tsx` to use animations
- [ ] Update `Navigation.tsx` to use animations

### Phase 4: Animation Showcase
- [ ] Create `AnimationShowcase.tsx`
- [ ] Create `AnimationShowcase.module.css`
- [ ] Add interactive demo for each animation type
- [ ] Add intensity comparison section
- [ ] Add component-specific examples
- [ ] Add configuration JSON display
- [ ] Integrate into `ComponentShowcase.tsx`

### Phase 5: Design System Examples
- [ ] Update `material.json` with animations
- [ ] Update `apple.json` with animations
- [ ] Update `github.json` with animations
- [ ] Update `fitness-tracker.json` with animations
- [ ] Create `playful.json` design system
- [ ] Test all design systems with animations

### Phase 6: Documentation
- [ ] Create `docs/ANIMATION_SYSTEM.md`
- [ ] Update `docs/CREATING_DESIGN_SYSTEMS.md`
- [ ] Update `README.md`
- [ ] Add inline code comments
- [ ] Create animation selection guide
- [ ] Test all code examples in docs

### Phase 7: Testing & Polish
- [ ] Test all animation types
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Test `prefers-reduced-motion`
- [ ] Performance profiling
- [ ] Accessibility audit
- [ ] Code review
- [ ] Final polish and bug fixes

---

**End of Plan**
