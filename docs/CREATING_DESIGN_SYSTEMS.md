# Creating a New Design System

This guide will walk you through creating a new design system for the Design System Demonstrator.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Understanding the Structure](#understanding-the-structure)
3. [Step-by-Step Guide](#step-by-step-guide)
4. [Required Properties](#required-properties)
5. [Optional Properties](#optional-properties)
6. [Common Pitfalls](#common-pitfalls)
7. [Validation Checklist](#validation-checklist)
8. [Examples](#examples)

## Quick Start

The fastest way to create a new design system:

1. Copy `public/design-systems/template.json` to a new file
2. Rename it (e.g., `my-system.json`)
3. Update the metadata (`id`, `name`, `description`)
4. Customize the color palette
5. Remove comment lines (starting with `//`)
6. Remove optional sections you don't need
7. Add your file name to `src/utils/loadDesignSystems.ts`
8. Reload the app!

## Understanding the Structure

Every design system JSON file has this structure:

```json
{
  "id": "unique-identifier",           // Used in code
  "name": "Display Name",              // Shown in UI
  "description": "Brief description",  // Shown below selector
  "tokens": {                          // All design tokens
    "colors": { ... },                 // REQUIRED
    "typography": { ... },             // REQUIRED
    "spacing": { ... },                // REQUIRED
    "borderRadius": { ... },           // REQUIRED
    "shadows": { ... },                // REQUIRED
    "transitions": { ... },            // REQUIRED
    "grid": { ... },                   // OPTIONAL
    "layout": { ... },                 // OPTIONAL
    "elevation": { ... },              // OPTIONAL
    "opacity": { ... },                // OPTIONAL
    "borders": { ... },                // OPTIONAL
    "focusStates": { ... },            // OPTIONAL
    "surfaces": { ... }                // OPTIONAL
  }
}
```

### Key Principles

- **Everything must be inside the `tokens` object**
- **Use the exact property names** shown in the template
- **Data types matter**: numbers for weights/line heights, strings for colors/sizes
- **Color shades use keys**: `"50"`, `"100"`, `"200"`, ..., `"900"`
- **Optional sections can be completely omitted** (don't leave empty objects)

## Step-by-Step Guide

### Step 1: Create Your File

```bash
# Copy the template
cp public/design-systems/template.json public/design-systems/my-system.json
```

### Step 2: Set Metadata

Update the top-level properties:

```json
{
  "id": "my-system",
  "name": "My Design System",
  "description": "A modern, vibrant design system for web applications",
  "tokens": { ... }
}
```

**Rules for `id`:**
- Lowercase only
- Use hyphens for spaces
- No special characters
- Must be unique
- Will be used in URLs

### Step 3: Define Your Color Palette

This is the most important part! Start with your primary brand color.

#### Option A: Use a Color Scale Generator

If you have one main color (e.g., `#2196F3`), you can:
1. Visit a tool like [Smart Swatch](https://smart-swatch.netlify.app/)
2. Enter your color
3. Copy the generated scale
4. Paste into the primary colors section

#### Option B: Manual Creation

Create 10 shades from light to dark:

```json
"primary": {
  "50": "#E3F2FD",   // Lightest (backgrounds)
  "100": "#BBDEFB",  // Very light
  "200": "#90CAF9",  // Light
  "300": "#64B5F6",  // Light-medium
  "400": "#42A5F5",  // Medium-light
  "500": "#2196F3",  // Base color (most common)
  "600": "#1E88E5",  // Medium-dark
  "700": "#1976D2",  // Dark
  "800": "#1565C0",  // Very dark
  "900": "#0D47A1"   // Darkest (text on light)
}
```

**Tips:**
- `500` is your main brand color
- `50-200` for backgrounds
- `600-900` for text on light backgrounds
- Each step should be visually distinct

### Step 4: Customize Typography

```json
"typography": {
  "fontFamily": {
    "primary": "'Inter', 'Helvetica', sans-serif",
    "monospace": "'Fira Code', 'Consolas', monospace"
  },
  "fontSize": {
    "xs": "0.75rem",
    "sm": "0.875rem",
    "base": "1rem",
    "lg": "1.125rem",
    "xl": "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    "4xl": "2.5rem"
  },
  "fontWeight": {
    "normal": 400,    // ← Numbers, not strings!
    "medium": 500,
    "semibold": 600,
    "bold": 700
  },
  "lineHeight": {
    "tight": 1.25,    // ← Numbers, not strings!
    "normal": 1.5,
    "relaxed": 1.75
  }
}
```

**Common Mistakes:**
- ❌ `"fontWeight": { "bold": "700" }` (string)
- ✅ `"fontWeight": { "bold": 700 }` (number)
- ❌ `"lineHeight": { "normal": "1.5" }` (string)
- ✅ `"lineHeight": { "normal": 1.5 }` (number)

### Step 5: Set Spacing Scale

Use a consistent multiplier (usually 4px or 8px):

```json
"spacing": {
  "xs": "0.25rem",   // 4px
  "sm": "0.5rem",    // 8px
  "md": "1rem",      // 16px
  "lg": "1.5rem",    // 24px
  "xl": "2rem",      // 32px
  "2xl": "3rem",     // 48px
  "3xl": "4rem",     // 64px
  "4xl": "6rem"      // 96px
}
```

### Step 6: Configure Border Radius

```json
"borderRadius": {
  "none": "0px",
  "sm": "0.125rem",   // 2px
  "md": "0.25rem",    // 4px
  "lg": "0.5rem",     // 8px
  "full": "9999px"    // Fully rounded
}
```

### Step 7: Define Shadows

```json
"shadows": {
  "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
}
```

### Step 8: Set Transitions

```json
"transitions": {
  "fast": "150ms ease-in-out",
  "base": "250ms ease-in-out",
  "slow": "350ms ease-in-out"
}
```

### Step 9: Add Optional Properties

Only include sections you need! See [Optional Properties](#optional-properties) for details.

### Step 10: Clean Up

1. **Remove all comment lines** (lines starting with `//`)
2. **Remove optional sections** you're not using
3. **Validate JSON** using a tool like [JSONLint](https://jsonlint.com/)

### Step 11: Register Your Design System

Add your file name to the array in `src/utils/loadDesignSystems.ts`:

```typescript
export async function loadDesignSystems(): Promise<DesignSystem[]> {
  const designSystemFiles = [
    'material', 
    'apple', 
    'github', 
    'tokens-studio',
    'my-system'  // ← Add your ID here
  ];
  // ...
}
```

### Step 12: Test

1. Reload the application
2. Select your design system from the dropdown
3. Check all components
4. Look for console errors
5. Verify colors, typography, and spacing

## Required Properties

These sections MUST be present in every design system:

### Metadata
- ✅ `id` - Unique identifier (string)
- ✅ `name` - Display name (string)
- ✅ `description` - Brief description (string)
- ✅ `tokens` - Object containing all tokens

### Token Categories (inside `tokens`)
- ✅ `colors` - All color sub-categories required
  - ✅ `primary` - With shades 50-900
  - ✅ `secondary` - With shades 50-900
  - ✅ `neutral` - With shades 50-900
  - ✅ `semantic` - success, warning, error, info
  - ✅ `text` - primary, secondary, disabled
  - ✅ `background` - default, paper, elevated
  - ✅ `border` - default, light
- ✅ `typography` - With fontFamily, fontSize, fontWeight, lineHeight
- ✅ `spacing` - At least xs, sm, md, lg, xl
- ✅ `borderRadius` - At least none, sm, md, lg, full
- ✅ `shadows` - At least sm, md, lg, xl
- ✅ `transitions` - At least fast, base, slow

## Optional Properties

These sections can be omitted entirely if you don't need them:

### Grid System
```json
"grid": {
  "columns": 12,
  "gutter": "16px",
  "margin": "16px"
}
```

### Layout & Breakpoints
```json
"layout": {
  "breakpoints": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1536px"
  },
  "containers": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1536px"
  }
}
```

### Elevation System
```json
"elevation": {
  "levels": {
    "0": "0 0 0 0 rgba(0, 0, 0, 0)",
    "1": "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    "2": "0 2px 6px 0 rgba(0, 0, 0, 0.1)",
    // ... more levels ...
    "24": "0 24px 64px 0 rgba(0, 0, 0, 0.22)"
  },
  "zIndex": {
    "dropdown": 1000,
    "sticky": 1100,
    "fixed": 1200,
    "modal": 1400,
    "popover": 1500,
    "tooltip": 1600
  }
}
```

### Opacity Values
```json
"opacity": {
  "disabled": "0.38",
  "hover": "0.08",
  "active": "0.16",
  "overlay": "0.5",
  "divider": "0.12"
}
```

### Border System
```json
"borders": {
  "widths": {
    "thin": "1px",
    "medium": "2px",
    "thick": "4px"
  },
  "styles": {
    "solid": "solid",
    "dashed": "dashed",
    "dotted": "dotted"
  }
}
```

### Focus States
```json
"focusStates": {
  "ringWidth": "2px",
  "ringOffset": "2px",
  "ringColor": "#2196F3",
  "outlineStyle": "solid"
}
```

### Surfaces & Backgrounds
```json
"surfaces": {
  "background": {
    "primary": "#FFFFFF",
    "secondary": "#FAFAFA",
    "tertiary": "#F5F5F5"
  },
  "surface": {
    "base": "#FFFFFF",
    "raised": "#FAFAFA",
    "overlay": "#FFFFFF"
  }
}
```

## Common Pitfalls

### 1. Wrong Data Types ❌

```json
// WRONG
"fontWeight": {
  "bold": "700"  // String
}
"lineHeight": {
  "normal": "1.5"  // String
}

// CORRECT
"fontWeight": {
  "bold": 700  // Number
}
"lineHeight": {
  "normal": 1.5  // Number
}
```

### 2. Missing `tokens` Wrapper ❌

```json
// WRONG
{
  "id": "my-system",
  "name": "My System",
  "colors": { ... }  // Directly at root
}

// CORRECT
{
  "id": "my-system",
  "name": "My System",
  "tokens": {  // Wrapped in tokens object
    "colors": { ... }
  }
}
```

### 3. Wrong Color Structure ❌

```json
// WRONG
"primary": {
  "main": "#2196F3",
  "light": "#64B5F6",
  "dark": "#1976D2"
}

// CORRECT
"primary": {
  "50": "#E3F2FD",
  "100": "#BBDEFB",
  // ... all 10 shades ...
  "900": "#0D47A1"
}
```

### 4. Missing Required Color Categories ❌

```json
// WRONG - Missing neutral
"colors": {
  "primary": { ... },
  "secondary": { ... }
  // Missing neutral!
}

// CORRECT
"colors": {
  "primary": { ... },
  "secondary": { ... },
  "neutral": { ... }  // Required!
}
```

### 5. Incorrect ID Format ❌

```json
// WRONG
"id": "My System"      // Has spaces
"id": "my_system"      // Uses underscore
"id": "MySystem"       // Has capitals

// CORRECT
"id": "my-system"      // Lowercase with hyphens
```

### 6. Leaving JSON Comments ❌

```json
// WRONG - JSON doesn't support comments
{
  "id": "my-system",  // This will break
  "//": "This comment format works in template only"
}

// CORRECT - Remove all comments
{
  "id": "my-system"
}
```

## Validation Checklist

Before submitting your design system, check:

- [ ] Valid JSON (no syntax errors)
- [ ] All comment lines removed
- [ ] `id` is lowercase-with-hyphens
- [ ] `name` and `description` are present
- [ ] All content is inside `tokens` object
- [ ] All required color categories present
  - [ ] primary (50-900)
  - [ ] secondary (50-900)
  - [ ] neutral (50-900)
  - [ ] semantic (success, warning, error, info)
  - [ ] text (primary, secondary, disabled)
  - [ ] background (default, paper, elevated)
  - [ ] border (default, light)
- [ ] Typography uses numbers for weights and line heights
- [ ] Spacing has at least xs, sm, md, lg, xl
- [ ] BorderRadius has at least none, sm, md, lg, full
- [ ] Shadows has at least sm, md, lg, xl
- [ ] Transitions has at least fast, base, slow
- [ ] File added to `loadDesignSystems.ts`
- [ ] Tested in the application
- [ ] No console errors

## Examples

### Minimal Design System

This is the absolute minimum required:

```json
{
  "id": "minimal",
  "name": "Minimal System",
  "description": "A bare-bones design system",
  "tokens": {
    "colors": {
      "primary": {
        "50": "#E8F4F8", "100": "#C1E0EC", "200": "#96CBE0",
        "300": "#6BB6D4", "400": "#4BA6CA", "500": "#2A96C1",
        "600": "#2588B4", "700": "#1F76A3", "800": "#196593", "900": "#0F4673"
      },
      "secondary": {
        "50": "#FFF3E0", "100": "#FFE0B2", "200": "#FFCC80",
        "300": "#FFB74D", "400": "#FFA726", "500": "#FF9800",
        "600": "#FB8C00", "700": "#F57C00", "800": "#EF6C00", "900": "#E65100"
      },
      "neutral": {
        "50": "#FAFAFA", "100": "#F5F5F5", "200": "#EEEEEE",
        "300": "#E0E0E0", "400": "#BDBDBD", "500": "#9E9E9E",
        "600": "#757575", "700": "#616161", "800": "#424242", "900": "#212121"
      },
      "semantic": {
        "success": "#4CAF50",
        "warning": "#FF9800",
        "error": "#F44336",
        "info": "#2196F3"
      },
      "text": {
        "primary": "#212121",
        "secondary": "#757575",
        "disabled": "#BDBDBD"
      },
      "background": {
        "default": "#FFFFFF",
        "paper": "#FAFAFA",
        "elevated": "#FFFFFF"
      },
      "border": {
        "default": "#E0E0E0",
        "light": "#F5F5F5"
      }
    },
    "typography": {
      "fontFamily": {
        "primary": "system-ui, sans-serif",
        "monospace": "monospace"
      },
      "fontSize": {
        "xs": "12px", "sm": "14px", "base": "16px", "lg": "18px",
        "xl": "20px", "2xl": "24px", "3xl": "30px", "4xl": "36px"
      },
      "fontWeight": {
        "normal": 400,
        "medium": 500,
        "semibold": 600,
        "bold": 700
      },
      "lineHeight": {
        "tight": 1.25,
        "normal": 1.5,
        "relaxed": 1.75
      }
    },
    "spacing": {
      "xs": "4px", "sm": "8px", "md": "16px", "lg": "24px",
      "xl": "32px", "2xl": "48px", "3xl": "64px", "4xl": "96px"
    },
    "borderRadius": {
      "none": "0", "sm": "2px", "md": "4px", "lg": "8px", "full": "9999px"
    },
    "shadows": {
      "sm": "0 1px 2px rgba(0,0,0,0.05)",
      "md": "0 4px 6px rgba(0,0,0,0.1)",
      "lg": "0 10px 15px rgba(0,0,0,0.1)",
      "xl": "0 20px 25px rgba(0,0,0,0.1)"
    },
    "transitions": {
      "fast": "150ms ease",
      "base": "250ms ease",
      "slow": "350ms ease"
    }
  }
}
```

### Comprehensive Design System

With all optional properties:

```json
{
  "id": "comprehensive",
  "name": "Comprehensive System",
  "description": "A design system with all features",
  "tokens": {
    "colors": { /* ... required colors ... */ },
    "typography": { /* ... required typography ... */ },
    "spacing": { /* ... required spacing ... */ },
    "borderRadius": { /* ... required border radius ... */ },
    "shadows": { /* ... required shadows ... */ },
    "transitions": { /* ... required transitions ... */ },
    "grid": {
      "columns": 12,
      "gutter": "24px",
      "margin": "24px"
    },
    "layout": {
      "breakpoints": {
        "sm": "640px", "md": "768px", "lg": "1024px",
        "xl": "1280px", "2xl": "1536px"
      },
      "containers": {
        "sm": "640px", "md": "768px", "lg": "1024px",
        "xl": "1280px", "2xl": "1400px"
      }
    },
    "elevation": {
      "levels": {
        "0": "0 0 0 0 rgba(0,0,0,0)",
        "1": "0 1px 3px rgba(0,0,0,0.12)",
        "2": "0 2px 6px rgba(0,0,0,0.12)",
        "4": "0 4px 12px rgba(0,0,0,0.12)",
        "6": "0 6px 16px rgba(0,0,0,0.12)",
        "8": "0 8px 24px rgba(0,0,0,0.15)",
        "12": "0 12px 32px rgba(0,0,0,0.15)",
        "16": "0 16px 48px rgba(0,0,0,0.18)",
        "24": "0 24px 64px rgba(0,0,0,0.22)"
      },
      "zIndex": {
        "dropdown": 1000, "sticky": 1100, "fixed": 1200,
        "modalBackdrop": 1300, "modal": 1400,
        "popover": 1500, "tooltip": 1600
      }
    },
    "opacity": {
      "disabled": "0.38",
      "hover": "0.08",
      "active": "0.16",
      "overlay": "0.5",
      "divider": "0.12"
    },
    "borders": {
      "widths": { "thin": "1px", "medium": "2px", "thick": "4px" },
      "styles": { "solid": "solid", "dashed": "dashed", "dotted": "dotted" }
    },
    "focusStates": {
      "ringWidth": "2px",
      "ringOffset": "2px",
      "ringColor": "#2196F3",
      "outlineStyle": "solid"
    },
    "surfaces": {
      "background": {
        "primary": "#FFFFFF",
        "secondary": "#FAFAFA",
        "tertiary": "#F5F5F5"
      },
      "surface": {
        "base": "#FFFFFF",
        "raised": "#FAFAFA",
        "overlay": "#FFFFFF"
      }
    }
  }
}
```

## Need Help?

- Check the `TOKENS_STUDIO_EXPERIMENT.md` for real-world example
- Look at existing design systems in `public/design-systems/`
- Validate your JSON at [JSONLint](https://jsonlint.com/)
- Check browser console for specific error messages

## Contributing

Have suggestions for improving this guide? Please submit a pull request or open an issue!
