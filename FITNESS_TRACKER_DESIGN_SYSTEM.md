# Fitness Tracker Design System

**Created**: October 15, 2025  
**ID**: `fitness-tracker`  
**Status**: ✅ Active

## Overview

A vibrant, data-focused design system inspired by modern fitness and activity tracking apps. Features a clean white base with bold orange/red and blue accent colors, modern rounded cards, and strong emphasis on data visualization and metrics.

## Design Inspiration

This design system draws inspiration from contemporary fitness tracking applications that prioritize:
- **Clear data visualization** with bold, readable metrics
- **Energetic color palette** using orange/red for action and blue for information
- **Rounded, card-based layouts** for content organization
- **White base** for a clean, modern, accessible interface
- **Strong visual hierarchy** with large numbers and clear labels

## Color Philosophy

### Primary Color - Energetic Orange (#FF6B35)
The primary color is a vibrant orange-red that conveys:
- Energy and motivation
- Action and progress
- Warmth and encouragement
- Athletic performance

Used for:
- Primary action buttons
- Active states
- Progress indicators
- Call-to-action elements

### Secondary Color - Trust Blue (#4E7FD9)
A balanced, confident blue that represents:
- Data and information
- Reliability and trust
- Calmness and focus
- Secondary metrics

Used for:
- Informational cards
- Secondary actions
- Data visualization
- Alternative states

### Neutral Scale - Clean Grays
A refined grayscale palette from pure white to deep charcoal:
- Creates excellent readability
- Provides subtle hierarchy
- Maintains clean, modern aesthetic
- Supports accessibility standards

## Typography

### Font Stack
```
-apple-system, BlinkMacSystemFont, 'SF Pro Display', 
'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif
```

Modern system fonts optimized for:
- Crisp rendering at all sizes
- Excellent readability in data displays
- Professional, clean appearance
- Wide device compatibility

### Type Scale
- **Tight line-heights** (1.15-1.3) for data-heavy displays
- **Bold weights** (600-800) for metrics and numbers
- **Varied sizes** from 0.6875rem to 3.75rem for hierarchy
- **Compact spacing** for information density

## Spacing & Layout

### Compact but Comfortable
- **Base spacing**: 0.75rem (12px)
- **Card padding**: 1rem to 1.25rem
- **Section gaps**: 1.75rem to 2.5rem

Designed for:
- Information density
- Mobile-first layouts
- Card-based interfaces
- Data dashboards

## Border Radius

### Rounded & Modern
- **Medium (0.625rem)**: Standard cards and buttons
- **Large (1rem)**: Feature cards and containers
- **Extra Large (1.25-1.5rem)**: Hero cards and prominent elements
- **Full**: Pills and circular avatars

Creates a:
- Friendly, approachable feel
- Modern, iOS-inspired aesthetic
- Clear visual boundaries
- Soft, inviting interface

## Shadows & Elevation

### Subtle but Present
Soft shadows with minimal opacity for:
- Clear hierarchy without heaviness
- Clean, modern appearance
- Works well on white backgrounds
- Maintains lightness

## Key Features

### ✅ Data-First Design
- Large, readable metrics
- Clear visual hierarchy
- Strong contrast for numbers
- Easy-to-scan layouts

### ✅ Vibrant but Professional
- Bold accent colors
- Clean white base
- Balanced color usage
- Professional appearance

### ✅ Card-Based Organization
- Clear content separation
- Easy to scan
- Mobile-friendly
- Flexible layouts

### ✅ Accessibility
- High contrast text
- Clear focus states
- Readable font sizes
- WCAG compliant colors

## Component Guidelines

### Buttons
- **Primary**: Orange (#FF6B35) with white text
- **Secondary**: Blue (#4E7FD9) with white text
- **Tertiary**: Neutral outline with dark text
- **Border radius**: 1rem for rounded, friendly buttons

### Cards
- **Background**: Pure white (#FFFFFF)
- **Border radius**: 1rem to 1.5rem
- **Shadow**: Medium (elevation 2-3)
- **Padding**: 1rem to 1.25rem

### Progress Indicators
- **Active/High**: Orange for goals and achievements
- **Informational**: Blue for tracking and data
- **Neutral**: Gray for completed or inactive
- **Large numbers**: Bold, extrabold weights

### Data Visualization
- **Primary data**: Orange bars/graphs
- **Secondary data**: Blue bars/graphs
- **Background**: Light neutral or white
- **Labels**: Small, medium weight text

## Best Practices

### Do ✅
- Use large, bold numbers for key metrics
- Apply generous border radius to cards
- Maintain high contrast for readability
- Use orange for action, blue for information
- Keep white space clean and uncluttered

### Don't ❌
- Overuse bright colors (let white breathe)
- Use small fonts for important numbers
- Create busy, cluttered layouts
- Mix too many accent colors
- Sacrifice readability for style

## Token Restrictions

This design system uses `allowedTokens` to maintain consistency:

### Colors
- **Primary**: 400-700 range only
- **Secondary**: 400-700 range only
- **Neutral**: Full range (50-900)

### Typography
- **Weights**: normal, medium, semibold, bold
- **Sizes**: xs through 4xl

### Spacing
- **Scale**: xs through 3xl (compact but comfortable)

### Border Radius
- **Scale**: md through full (modern, rounded)

## Use Cases

Perfect for:
- 🏃‍♂️ Fitness and activity tracking apps
- 📊 Health and wellness dashboards
- 🎯 Goal tracking applications
- 📈 Personal analytics platforms
- ⚡ Performance monitoring tools
- 🏋️ Workout and exercise apps

## Technical Details

- **Base background**: `#FFFFFF` (pure white)
- **Text color**: `#171717` (near black)
- **Primary action**: `#FF6B35` (vibrant orange)
- **Information**: `#4E7FD9` (trust blue)
- **Shadows**: Soft, low opacity (0.08-0.12)
- **Focus ring**: Orange with 40% opacity

## Accessibility

- ✅ WCAG AA compliant color contrast
- ✅ Clear focus indicators
- ✅ Readable font sizes (minimum 0.6875rem)
- ✅ Distinct interactive states
- ✅ High contrast text on backgrounds

## Related Design Systems

- **Apple**: Similar clean, modern aesthetic
- **Material**: Shared emphasis on elevation
- **Pliability**: Similar fitness/performance focus (but dark theme)

---

**Version**: 1.0.0  
**Status**: Production Ready  
**Maintained By**: Design System Demonstrator Project
