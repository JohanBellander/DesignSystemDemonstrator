# Component-Level Restrictions

**Date**: October 15, 2025  
**Feature**: Component Restrictions for Dropdowns & Lists  
**Status**: ✅ Implemented

## Overview

Added support for component-level restrictions to the Design System Demonstrator. Design systems can now specify which component variants, sizes, and features are allowed, providing more granular control over the component library.

---

## What's New

### Type System Extensions

Added `components` property to `AllowedTokens` interface:

```typescript
components?: {
  dropdown?: {
    sizes?: ('small' | 'medium' | 'large')[];
    states?: ('default' | 'hover' | 'focus' | 'error' | 'disabled')[];
  };
  list?: {
    variants?: ('default' | 'bordered' | 'divided' | 'card')[];
    sizes?: ('small' | 'medium' | 'large')[];
    interactive?: boolean;
  };
}
```

### New Utility Function

Added `isComponentPropertyAllowed()` to check component restrictions:

```typescript
isComponentPropertyAllowed(
  allowedTokens: AllowedTokens | undefined,
  component: 'dropdown' | 'list',
  property: string,
  value: string | boolean
): boolean
```

---

## Dropdown Restrictions

### Available Restrictions

**Sizes:**
- `small` - Compact dropdowns
- `medium` - Standard size
- `large` - Large dropdowns

**States:**
- `default` - Normal state
- `hover` - Hover state
- `focus` - Focused state
- `error` - Error validation state
- `disabled` - Disabled state

### Example Configuration

```json
{
  "allowedTokens": {
    "components": {
      "dropdown": {
        "sizes": ["medium", "large"]
      }
    }
  }
}
```

**Result**: Only medium and large dropdowns will be shown in the showcase. Small dropdowns will be hidden.

---

## List Restrictions

### Available Restrictions

**Variants:**
- `default` - Simple list with spacing
- `bordered` - Contained with border
- `divided` - Items separated by dividers
- `card` - Each item as elevated card

**Sizes:**
- `small` - Compact lists
- `medium` - Standard size
- `large` - Spacious lists

**Interactive:**
- `true` - Allow interactive/hoverable mode
- `false` - Disable interactive features

### Example Configuration

```json
{
  "allowedTokens": {
    "components": {
      "list": {
        "variants": ["bordered", "card"],
        "sizes": ["medium", "large"],
        "interactive": true
      }
    }
  }
}
```

**Result**: 
- Only bordered and card variants shown
- Only medium and large sizes displayed
- Interactive list section is visible

---

## Implementation Details

### Component Showcase Updates

Both `DropdownShowcase` and `ListShowcase` now:

1. ✅ Import `useDesignSystem` hook
2. ✅ Import `isComponentPropertyAllowed` utility
3. ✅ Check restrictions before rendering
4. ✅ Conditionally show/hide variants and sizes
5. ✅ Respect design system constraints

### How It Works

```tsx
// Check if a size is allowed
const isSmallAllowed = isComponentPropertyAllowed(
  allowedTokens, 
  'dropdown', 
  'sizes', 
  'small'
);

// Conditionally render
{isSmallAllowed && (
  <Dropdown size="small" ... />
)}
```

---

## Example: Pliability Design System

Updated Pliability to demonstrate component restrictions:

```json
{
  "id": "pliability",
  "name": "Pliability",
  "allowedTokens": {
    "components": {
      "dropdown": {
        "sizes": ["medium", "large"]
      },
      "list": {
        "variants": ["bordered", "card"],
        "sizes": ["medium", "large"],
        "interactive": true
      }
    }
  }
}
```

**When viewing Pliability:**
- ❌ Small dropdowns hidden
- ✅ Medium and large dropdowns shown
- ❌ Default and divided list variants hidden
- ✅ Bordered and card list variants shown
- ❌ Small lists hidden
- ✅ Medium and large lists shown
- ✅ Interactive list section shown

---

## Benefits

### 1. Design System Consistency
- Enforce specific component patterns
- Limit component variations to maintain brand consistency
- Guide developers to approved variants

### 2. Simplified Component Library
- Remove unnecessary variants
- Focus on essential sizes
- Reduce decision fatigue

### 3. Brand Compliance
- Ensure only approved component styles are used
- Maintain design system integrity
- Prevent off-brand implementations

### 4. Clear Documentation
- Self-documenting restrictions
- Visual feedback of allowed components
- Easier onboarding for new developers

---

## Backwards Compatibility

✅ **Fully backwards compatible**

- If no `components` restrictions defined, all variants/sizes are shown
- Existing design systems work without modification
- Progressive enhancement approach

---

## Testing

### Test Scenarios

1. **No Restrictions** (default)
   - All dropdown sizes visible
   - All list variants visible
   - All list sizes visible
   - Interactive mode visible

2. **Partial Restrictions** (Pliability)
   - Small dropdown hidden
   - Default/divided lists hidden
   - Small lists hidden
   - Other variants visible

3. **Full Restrictions** (hypothetical)
   - Only specified sizes shown
   - Only specified variants shown
   - Interactive mode controlled

### How to Test

1. Select a design system with no component restrictions
2. Verify all dropdowns and lists appear
3. Switch to Pliability design system
4. Verify small dropdowns are hidden
5. Verify default/divided list variants are hidden
6. Verify small lists are hidden

---

## Future Enhancements

### Additional Components
- Button restrictions (variants, sizes)
- Input restrictions (types, sizes)
- Card restrictions (with/without headers/footers)
- Badge restrictions (variants, sizes)

### Additional Properties
- Dropdown: multi-select mode, search functionality
- List: drag-and-drop, expandable items
- General: animation restrictions, theme variations

### Visual Indicators
- Show restricted components in gray/disabled state
- Add tooltips explaining why components are hidden
- Badge showing "Not available in this system"

---

## Files Modified

```
src/types/design-system.ts           # Added components to AllowedTokens
src/utils/tokenRestrictions.ts       # Added isComponentPropertyAllowed()
src/components/demo/Dropdown.tsx     # Added restriction logic
src/components/demo/List.tsx         # Added restriction logic
public/design-systems/pliability.json # Added example restrictions
```

---

## Usage in Design Systems

To add component restrictions to a design system:

```json
{
  "id": "your-system",
  "name": "Your Design System",
  "allowedTokens": {
    // ... other token restrictions ...
    "components": {
      "dropdown": {
        "sizes": ["medium", "large"]
      },
      "list": {
        "variants": ["bordered", "divided"],
        "sizes": ["medium"],
        "interactive": false
      }
    }
  }
}
```

---

**Status**: Production Ready ✅  
**Version**: 1.1.0  
**Breaking Changes**: None
