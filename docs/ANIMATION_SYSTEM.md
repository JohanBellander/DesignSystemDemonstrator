# Animation System Documentation

Complete guide to the animation system in the Design System Demonstrator.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Animation Types](#animation-types)
4. [Intensity Levels](#intensity-levels)
5. [Configuration](#configuration)
6. [Component Integration](#component-integration)
7. [Best Practices](#best-practices)
8. [Accessibility](#accessibility)
9. [API Reference](#api-reference)
10. [Examples](#examples)

## Overview

The animation system provides a flexible, type-safe way to add interaction animations to your design system. It includes:

- **11 animation types** (ripple, lift, scale, glow, etc.)
- **3 intensity levels** (subtle, medium, bold)
- **3 interaction states** (hover, active, focus)
- **Component-specific overrides**
- **Automatic accessibility support** (respects `prefers-reduced-motion`)
- **Design system awareness** (token restrictions)

### Architecture

```
┌─────────────────────────────────────────┐
│   Design System JSON Configuration     │
│   (animations section)                  │
└───────────────┬─────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────┐
│   TypeScript Type Definitions           │
│   (AnimationType, AnimationConfig, etc) │
└───────────────┬─────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────┐
│   Animation Utilities                   │
│   (animationUtils.ts)                   │
└───────────────┬─────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────┐
│   CSS Animation Classes                 │
│   (animations.module.css)               │
└───────────────┬─────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────┐
│   React Hook (useAnimation)             │
│   Provides animation props              │
└───────────────┬─────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────┐
│   Components (Button, Card, etc)        │
│   Apply animations via className/style  │
└─────────────────────────────────────────┘
```

## Quick Start

### 1. Add Animations to Your Design System

Edit your design system JSON file (e.g., `material.json`):

```json
{
  "id": "material",
  "name": "Material Design",
  "allowedTokens": {
    "animations": {
      "types": ["ripple", "lift", "glow"],
      "intensities": ["subtle", "medium", "bold"],
      "components": ["button", "card", "input"]
    }
  },
  "tokens": {
    "colors": { ... },
    "typography": { ... },
    "animations": {
      "default": {
        "hover": {
          "type": "ripple",
          "intensity": "medium"
        }
      },
      "components": {
        "button": {
          "hover": {
            "type": "lift",
            "intensity": "medium"
          },
          "active": {
            "type": "ripple",
            "intensity": "bold"
          }
        }
      },
      "reduceMotion": true
    }
  }
}
```

### 2. Use in Components

```tsx
import { useAnimation } from '../../hooks/useAnimation';

function MyButton() {
  const { getAnimationClasses, getAnimationProps } = useAnimation('button');
  const animationClasses = getAnimationClasses();
  const animationProps = getAnimationProps();

  return (
    <button
      className={`btn ${animationClasses.hover} ${animationClasses.active}`}
      style={animationProps}
    >
      Click me
    </button>
  );
}
```

### 3. See It Live

Navigate to the **Animations** tab in the Foundations section to see all animations in action!

## Animation Types

### 1. `ripple`
Material Design-style ripple effect expanding from the center.

**Best for:** Buttons, clickable cards, list items  
**Intensity impact:** Ripple size and speed  
**Visual effect:** Circular wave emanating from center

```json
{
  "type": "ripple",
  "intensity": "medium"
}
```

### 2. `lift`
Elevation increase with shadow and slight upward movement.

**Best for:** Cards, buttons, interactive containers  
**Intensity impact:** Lift distance and shadow depth  
**Visual effect:** Element appears to rise off the page

```json
{
  "type": "lift",
  "intensity": "subtle"
}
```

### 3. `scale`
Size increase (zoom in) effect.

**Best for:** Buttons, icons, thumbnails  
**Intensity impact:** Scale factor (1.02, 1.05, 1.1)  
**Visual effect:** Element grows slightly larger

```json
{
  "type": "scale",
  "intensity": "medium"
}
```

### 4. `glow`
Glowing border or shadow effect.

**Best for:** Focus states, inputs, active elements  
**Intensity impact:** Glow spread and opacity  
**Visual effect:** Soft light emanating from edges

```json
{
  "type": "glow",
  "intensity": "bold"
}
```

### 5. `slide`
Subtle horizontal movement.

**Best for:** List items, navigation links, menu items  
**Intensity impact:** Slide distance (2px, 4px, 8px)  
**Visual effect:** Element shifts to the right

```json
{
  "type": "slide",
  "intensity": "subtle"
}
```

### 6. `bounce`
Spring-like bouncy animation.

**Best for:** Playful UIs, success confirmations, notifications  
**Intensity impact:** Bounce amplitude  
**Visual effect:** Element bounces with spring physics

```json
{
  "type": "bounce",
  "intensity": "medium"
}
```

### 7. `fade`
Opacity change effect.

**Best for:** Overlays, tooltips, subtle interactions  
**Intensity impact:** Opacity change amount  
**Visual effect:** Element becomes slightly transparent

```json
{
  "type": "fade",
  "intensity": "subtle"
}
```

### 8. `shimmer`
Shine or shimmer effect moving across element.

**Best for:** Loading states, premium features, highlights  
**Intensity impact:** Shimmer brightness and speed  
**Visual effect:** Light sweep across the element

```json
{
  "type": "shimmer",
  "intensity": "medium"
}
```

### 9. `rotate`
Rotation animation.

**Best for:** Icons, loading indicators, refresh buttons  
**Intensity impact:** Rotation degrees (5°, 15°, 45°)  
**Visual effect:** Element rotates slightly

```json
{
  "type": "rotate",
  "intensity": "subtle"
}
```

### 10. `pulse`
Pulsing scale animation.

**Best for:** Notifications, badges, live indicators  
**Intensity impact:** Pulse size variation  
**Visual effect:** Element rhythmically grows and shrinks

```json
{
  "type": "pulse",
  "intensity": "bold"
}
```

### 11. `none`
No animation (explicit opt-out).

**Best for:** Minimal UIs, performance-critical elements  
**Visual effect:** No animation applied

```json
{
  "type": "none"
}
```

## Intensity Levels

### Subtle
**Use when:** Animations should be barely noticeable  
**Examples:**
- Professional/corporate design systems
- Minimal UI aesthetics
- Background interactions

**Characteristics:**
- Small scale changes (1.02x)
- Short distances (2-4px)
- Low opacity changes (5-10%)
- Quick duration (150-200ms)

### Medium
**Use when:** Balanced, noticeable but not distracting  
**Examples:**
- General-purpose design systems
- Standard web applications
- Balanced brand personalities

**Characteristics:**
- Moderate scale changes (1.05x)
- Medium distances (4-8px)
- Moderate opacity changes (10-20%)
- Standard duration (200-300ms)

### Bold
**Use when:** Animations should be prominent and expressive  
**Examples:**
- Playful/energetic brands
- Marketing websites
- Gamified interfaces

**Characteristics:**
- Large scale changes (1.1x+)
- Long distances (8-16px)
- High opacity changes (20-30%)
- Longer duration (300-400ms)

## Configuration

### Basic Configuration

Minimal animation setup:

```json
{
  "tokens": {
    "animations": {
      "default": {
        "hover": {
          "type": "scale",
          "intensity": "subtle"
        }
      },
      "reduceMotion": true
    }
  }
}
```

### Advanced Configuration

Full configuration with component overrides:

```json
{
  "allowedTokens": {
    "animations": {
      "types": ["ripple", "lift", "scale", "glow", "slide"],
      "intensities": ["subtle", "medium", "bold"],
      "components": ["button", "card", "input", "dropdown", "list", "navigation"]
    }
  },
  "tokens": {
    "animations": {
      "default": {
        "hover": {
          "type": "scale",
          "intensity": "medium"
        },
        "active": {
          "type": "scale",
          "intensity": "bold"
        },
        "focus": {
          "type": "glow",
          "intensity": "medium"
        }
      },
      "components": {
        "button": {
          "hover": {
            "type": "lift",
            "intensity": "medium"
          },
          "active": {
            "type": "ripple",
            "intensity": "bold"
          },
          "focus": {
            "type": "glow",
            "intensity": "bold"
          }
        },
        "card": {
          "hover": {
            "type": "lift",
            "intensity": "subtle"
          }
        },
        "input": {
          "focus": {
            "type": "glow",
            "intensity": "bold"
          }
        },
        "dropdown": {
          "hover": {
            "type": "fade",
            "intensity": "subtle"
          }
        },
        "list": {
          "hover": {
            "type": "slide",
            "intensity": "subtle"
          }
        },
        "navigation": {
          "hover": {
            "type": "fade",
            "intensity": "subtle"
          }
        }
      },
      "reduceMotion": true
    }
  }
}
```

### Configuration Options

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `default` | `StateAnimations` | No | Default animations for all components |
| `default.hover` | `AnimationConfig` | No | Animation on hover state |
| `default.active` | `AnimationConfig` | No | Animation on active/click state |
| `default.focus` | `AnimationConfig` | No | Animation on focus state |
| `components` | `ComponentAnimations` | No | Component-specific overrides |
| `components.button` | `StateAnimations` | No | Button animations |
| `components.card` | `StateAnimations` | No | Card animations |
| `components.input` | `StateAnimations` | No | Input animations |
| `components.dropdown` | `StateAnimations` | No | Dropdown animations |
| `components.list` | `StateAnimations` | No | List animations |
| `components.navigation` | `StateAnimations` | No | Navigation animations |
| `reduceMotion` | `boolean` | No | Respect prefers-reduced-motion (default: true) |

## Component Integration

### Using the `useAnimation` Hook

The `useAnimation` hook provides all animation functionality:

```tsx
import { useAnimation } from '../../hooks/useAnimation';

function MyComponent() {
  const {
    getAnimation,           // Get specific animation config
    getAnimationClasses,    // Get all CSS classes
    getAnimationClass,      // Get single state class
    getAnimationProps,      // Get CSS custom properties
    hasAnimations,          // Check if animations enabled
    isReducedMotion         // Check reduced motion preference
  } = useAnimation('button');

  // Use animations...
}
```

### Example: Button Component

```tsx
import { useAnimation } from '../../hooks/useAnimation';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  const { getAnimationClasses, getAnimationProps } = useAnimation('button');
  const animationClasses = getAnimationClasses();
  const animationProps = getAnimationProps();

  return (
    <button
      className={`
        ${styles.button} 
        ${styles[variant]}
        ${animationClasses.hover || ''}
        ${animationClasses.active || ''}
        ${animationClasses.focus || ''}
      `.trim()}
      style={animationProps}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Example: Card Component

```tsx
import { useAnimation } from '../../hooks/useAnimation';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className, style }: CardProps) {
  const { getAnimationClasses, getAnimationProps } = useAnimation('card');
  const animationClasses = getAnimationClasses();
  const animationProps = getAnimationProps();

  return (
    <div
      className={`
        ${styles.card}
        ${animationClasses.hover || ''}
        ${className || ''}
      `.trim()}
      style={{ ...animationProps, ...style }}
    >
      {children}
    </div>
  );
}
```

### Example: Input Component

```tsx
import { useAnimation } from '../../hooks/useAnimation';
import styles from './Input.module.css';

interface InputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ label, type = 'text', value, onChange }: InputProps) {
  const { getAnimationClasses, getAnimationProps } = useAnimation('input');
  const animationClasses = getAnimationClasses();
  const animationProps = getAnimationProps();

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`
          ${styles.input}
          ${animationClasses.focus || ''}
        `.trim()}
        style={animationProps}
      />
    </div>
  );
}
```

## Best Practices

### 1. Match Animations to Brand Personality

**Material Design** → Use `ripple` and `lift`  
**Apple/Minimal** → Use `scale` and `fade` with `subtle` intensity  
**Playful/Vibrant** → Use `bounce`, `shimmer`, `pulse`  
**Professional** → Use `fade` and `slide` with `subtle` intensity

### 2. Be Consistent Within a System

Don't mix too many animation types in one design system. Choose 2-4 core animations and use them consistently.

**Good:**
```json
{
  "button": { "hover": { "type": "lift" } },
  "card": { "hover": { "type": "lift" } },
  "list": { "hover": { "type": "lift" } }
}
```

**Avoid:**
```json
{
  "button": { "hover": { "type": "bounce" } },
  "card": { "hover": { "type": "shimmer" } },
  "list": { "hover": { "type": "rotate" } }
}
```

### 3. Reserve Bold Intensities for Key Actions

Use `bold` intensity sparingly for primary actions and important interactions.

```json
{
  "button": {
    "hover": { "type": "lift", "intensity": "bold" }  // Primary CTA
  },
  "card": {
    "hover": { "type": "lift", "intensity": "subtle" } // Secondary
  }
}
```

### 4. Prioritize Focus States for Accessibility

Always provide clear focus animations for keyboard navigation:

```json
{
  "input": {
    "focus": { "type": "glow", "intensity": "bold" }
  },
  "button": {
    "focus": { "type": "glow", "intensity": "medium" }
  }
}
```

### 5. Test with Reduced Motion

Always set `reduceMotion: true` and test with the accessibility setting enabled:

```json
{
  "animations": {
    "default": { ... },
    "reduceMotion": true  // Essential!
  }
}
```

### 6. Don't Overdo It

More animations ≠ better UX. Use animations purposefully:

- **Do:** Provide feedback for user actions
- **Do:** Guide attention to important elements
- **Don't:** Animate everything just because you can
- **Don't:** Use long durations that slow down interactions

## Accessibility

### Reduced Motion Support

The animation system automatically respects the `prefers-reduced-motion` CSS media query when `reduceMotion: true`:

```css
@media (prefers-reduced-motion: reduce) {
  .animation-ripple-medium,
  .animation-lift-medium,
  .animation-scale-medium {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}
```

### Testing Reduced Motion

**macOS:**
1. System Preferences → Accessibility → Display
2. Check "Reduce motion"

**Windows:**
1. Settings → Ease of Access → Display
2. Toggle "Show animations in Windows" off

**Browser DevTools:**
- Chrome/Edge: DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion
- Firefox: about:config → Set `ui.prefersReducedMotion` to 1

### Focus Indicators

Always provide visible focus animations for keyboard users:

```json
{
  "button": {
    "focus": {
      "type": "glow",
      "intensity": "bold"
    }
  }
}
```

### Color Contrast

Ensure glow and shimmer effects maintain sufficient color contrast:

- Glow color should be visible against background
- Test with color contrast tools
- Consider users with low vision

## API Reference

### TypeScript Types

```typescript
// Animation type
type AnimationType = 
  | 'none' | 'ripple' | 'lift' | 'scale' | 'glow' 
  | 'slide' | 'bounce' | 'fade' | 'shimmer' 
  | 'rotate' | 'pulse';

// Intensity level
type AnimationIntensity = 'subtle' | 'medium' | 'bold';

// Interaction state
type InteractionState = 'hover' | 'active' | 'focus';

// Animation configuration
interface AnimationConfig {
  type: AnimationType;
  intensity?: AnimationIntensity;
  duration?: string;
  easing?: string;
}

// State-specific animations
interface StateAnimations {
  hover?: AnimationConfig;
  active?: AnimationConfig;
  focus?: AnimationConfig;
}

// Component animations
interface ComponentAnimations {
  button?: StateAnimations;
  card?: StateAnimations;
  input?: StateAnimations;
  navigation?: StateAnimations;
  list?: StateAnimations;
  dropdown?: StateAnimations;
}

// Complete animation system
interface Animations {
  default?: StateAnimations;
  components?: ComponentAnimations;
  reduceMotion?: boolean;
  custom?: {
    [key: string]: {
      keyframes: string;
      config: AnimationConfig;
    };
  };
}
```

### `useAnimation` Hook

```typescript
function useAnimation(componentName: string): {
  // Get animation config for a specific state
  getAnimation: (state: InteractionState) => AnimationConfig | undefined;
  
  // Get all CSS classes for the component
  getAnimationClasses: () => {
    hover?: string;
    active?: string;
    focus?: string;
  };
  
  // Get CSS class for a specific state
  getAnimationClass: (state: InteractionState) => string | undefined;
  
  // Get CSS custom properties
  getAnimationProps: () => Record<string, string>;
  
  // Check if animations are enabled
  hasAnimations: () => boolean;
  
  // Check if reduced motion is preferred
  isReducedMotion: () => boolean;
}
```

### Utility Functions

```typescript
// Get CSS class name for animation
function getAnimationClassName(
  type: AnimationType, 
  intensity?: AnimationIntensity
): string;

// Get inline styles for animation
function getAnimationStyles(
  type: AnimationType, 
  intensity?: AnimationIntensity
): Record<string, string>;

// Get component-specific animation
function getComponentAnimation(
  animations: Animations | undefined,
  componentName: string,
  state: InteractionState
): AnimationConfig | undefined;

// Get all animation classes for states
function getAllAnimationClasses(
  animations: Animations | undefined,
  componentName: string
): {
  hover?: string;
  active?: string;
  focus?: string;
};

// Check if user prefers reduced motion
function shouldReduceMotion(): boolean;

// Validate animation type
function isValidAnimationType(type: string): type is AnimationType;

// Validate animation intensity
function isValidAnimationIntensity(
  intensity: string
): intensity is AnimationIntensity;

// Merge animation configurations
function mergeAnimationConfig(
  base: AnimationConfig | undefined,
  override: AnimationConfig | undefined
): AnimationConfig | undefined;
```

## Examples

### Example 1: Material Design Style

```json
{
  "id": "material-style",
  "name": "Material Style",
  "allowedTokens": {
    "animations": {
      "types": ["ripple", "lift", "glow"],
      "intensities": ["medium", "bold"]
    }
  },
  "tokens": {
    "animations": {
      "default": {
        "hover": { "type": "ripple", "intensity": "medium" },
        "active": { "type": "ripple", "intensity": "bold" }
      },
      "components": {
        "button": {
          "hover": { "type": "lift", "intensity": "medium" },
          "active": { "type": "ripple", "intensity": "bold" }
        },
        "card": {
          "hover": { "type": "lift", "intensity": "bold" }
        }
      },
      "reduceMotion": true
    }
  }
}
```

### Example 2: Minimal Apple-Inspired

```json
{
  "id": "minimal-apple",
  "name": "Minimal Apple",
  "allowedTokens": {
    "animations": {
      "types": ["scale", "fade", "glow"],
      "intensities": ["subtle"]
    }
  },
  "tokens": {
    "animations": {
      "default": {
        "hover": { "type": "scale", "intensity": "subtle" },
        "focus": { "type": "glow", "intensity": "subtle" }
      },
      "components": {
        "button": {
          "hover": { "type": "scale", "intensity": "subtle" }
        },
        "card": {
          "hover": { "type": "fade", "intensity": "subtle" }
        }
      },
      "reduceMotion": true
    }
  }
}
```

### Example 3: Playful Vibrant

```json
{
  "id": "playful-vibrant",
  "name": "Playful Vibrant",
  "allowedTokens": {
    "animations": {
      "types": ["bounce", "pulse", "shimmer"],
      "intensities": ["medium", "bold"]
    }
  },
  "tokens": {
    "animations": {
      "default": {
        "hover": { "type": "bounce", "intensity": "medium" },
        "active": { "type": "pulse", "intensity": "bold" }
      },
      "components": {
        "button": {
          "hover": { "type": "bounce", "intensity": "bold" },
          "active": { "type": "pulse", "intensity": "bold" }
        },
        "card": {
          "hover": { "type": "shimmer", "intensity": "medium" }
        }
      },
      "reduceMotion": true
    }
  }
}
```

### Example 4: No Animations (Explicit)

```json
{
  "id": "no-animations",
  "name": "No Animations",
  "tokens": {
    "animations": {
      "default": {
        "hover": { "type": "none" },
        "active": { "type": "none" },
        "focus": { "type": "glow", "intensity": "subtle" }
      },
      "reduceMotion": true
    }
  }
}
```

---

## Troubleshooting

### Animations Not Showing

1. **Check design system configuration**: Ensure `animations` section exists in `tokens`
2. **Verify allowed tokens**: Check `allowedTokens.animations` includes the type
3. **Check component integration**: Ensure component uses `useAnimation` hook
4. **Inspect CSS classes**: Verify animation classes are applied in DevTools
5. **Test reduced motion**: Disable `prefers-reduced-motion` in browser settings

### Wrong Animation Showing

1. **Check component name**: Ensure correct component name passed to `useAnimation`
2. **Verify override hierarchy**: Component-specific config overrides default
3. **Check state**: Ensure you're testing the right interaction state (hover/active/focus)

### Performance Issues

1. **Reduce animation count**: Limit number of simultaneously animated elements
2. **Use CSS transforms**: Avoid animating layout properties (width, height, top, left)
3. **Optimize selectors**: Keep CSS selectors simple
4. **Test on low-end devices**: Ensure smooth performance across devices

---

**Need help?** Check the [Animation Showcase](#) in the app or review the [examples](#examples) above!
