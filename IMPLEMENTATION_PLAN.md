# Implementation Plan - Design System Demonstrator

## Overview

This document outlines the step-by-step implementation plan for building the Design System Demonstrator MVP. The plan is organized into phases, with each phase building upon the previous one.

---

## Phase 1: Project Setup & Foundation
**Goal**: Create the basic project structure and configuration

**Estimated Time**: 30 minutes

### Steps

1. **Initialize Vite + React + TypeScript Project**
   - Create project with Vite template
   - Configure TypeScript (tsconfig.json)
   - Configure Vite (vite.config.ts)
   - Set up package.json with dependencies

2. **Create Project Structure**
   ```
   src/
   ├── components/
   │   ├── demo/
   │   └── ui/
   ├── context/
   ├── types/
   ├── hooks/
   ├── utils/
   ├── App.tsx
   └── main.tsx
   ```

3. **Create Git Repository**
   - Initialize git
   - Create .gitignore
   - Initial commit

**Deliverables**:
- ✅ Working Vite dev server
- ✅ TypeScript compilation without errors
- ✅ Clean project structure
- ✅ Git repository initialized

---

## Phase 2: Type Definitions & Schema
**Goal**: Define TypeScript interfaces for design systems

**Estimated Time**: 20 minutes

### Steps

1. **Create Design System Types** (`src/types/design-system.ts`)
   - Define DesignSystem interface
   - Define token categories (Colors, Typography, Spacing, etc.)
   - Define ColorPalette, SemanticColors, TextColors, BackgroundColors
   - Define Typography structure
   - Export all types

2. **Validate Schema Design**
   - Ensure all token categories are included
   - Verify extensibility
   - Check for type safety

**Deliverables**:
- ✅ Complete TypeScript interfaces
- ✅ Type-safe design system structure
- ✅ Documented type definitions

---

## Phase 3: Design System Definitions
**Goal**: Create JSON files for initial design systems

**Estimated Time**: 45 minutes

### Steps

1. **Create Material Design System** (`public/design-systems/material.json`)
   - Define Material color palette (primary, secondary, neutral)
   - Use Roboto font family
   - Set Material spacing scale
   - Define Material border radius (4px, 8px, 16px)
   - Add Material elevation shadows
   - Set transition durations

2. **Create Apple-Inspired Design System** (`public/design-systems/apple.json`)
   - Define Apple color palette (blue accent, grays)
   - Use SF Pro or system fonts
   - Set refined spacing scale
   - Define subtle border radius
   - Add minimal shadows
   - Set smooth transitions

3. **Create GitHub Primer Design System** (`public/design-systems/github.json`)
   - Define GitHub color palette (neutral-focused)
   - Use system font stack
   - Set developer-friendly spacing
   - Define border radius
   - Add subtle shadows
   - Set quick transitions

**Deliverables**:
- ✅ 3 complete design system JSON files
- ✅ All token categories populated
- ✅ Valid JSON structure

---

## Phase 4: Design System Context & Provider
**Goal**: Build state management for design system selection

**Estimated Time**: 30 minutes

### Steps

1. **Create Design System Context** (`src/context/DesignSystemContext.tsx`)
   - Create React Context
   - Define context value shape (selectedSystem, setSelectedSystem, availableSystems)
   - Create DesignSystemProvider component
   - Load all design systems from JSON files
   - Apply tokens as CSS custom properties
   - Handle loading and error states

2. **Create useDesignSystem Hook** (`src/hooks/useDesignSystem.ts`)
   - Custom hook to consume context
   - Provide type-safe access to design system
   - Handle null context errors

3. **Create Utility Functions**
   - `loadDesignSystems.ts`: Fetch and parse JSON files
   - `applyDesignTokens.ts`: Convert tokens to CSS custom properties

**Deliverables**:
- ✅ Working context provider
- ✅ Design systems load from JSON
- ✅ CSS custom properties applied to :root
- ✅ Type-safe context consumption

---

## Phase 5: Demo Components
**Goal**: Build showcase components that use design tokens

**Estimated Time**: 90 minutes

### Steps

1. **Create Typography Component** (`src/components/demo/Typography.tsx`)
   - Display h1-h6 headings
   - Show body text, small text
   - Use CSS custom properties for styling
   - Create Typography.module.css

2. **Create Button Component** (`src/components/demo/Button.tsx`)
   - Variants: primary, secondary, outline, ghost
   - Sizes: small, medium, large
   - States: default, hover, active, disabled
   - Create Button.module.css

3. **Create Input Component** (`src/components/demo/Input.tsx`)
   - Text input with label
   - States: default, focus, error, disabled
   - Use design tokens for styling
   - Create Input.module.css

4. **Create Card Component** (`src/components/demo/Card.tsx`)
   - Header, body, footer sections
   - Use background, border, shadow tokens
   - Create Card.module.css

5. **Create Alert Component** (`src/components/demo/Alert.tsx`)
   - Variants: success, warning, error, info
   - Use semantic colors
   - Create Alert.module.css

6. **Create Badge Component** (`src/components/demo/Badge.tsx`)
   - Small label/tag component
   - Color variants
   - Create Badge.module.css

7. **Create Avatar Component** (`src/components/demo/Avatar.tsx`)
   - Circular placeholder
   - Size variants
   - Create Avatar.module.css

8. **Create Divider Component** (`src/components/demo/Divider.tsx`)
   - Horizontal separator
   - Use border colors
   - Create Divider.module.css

**Deliverables**:
- ✅ 8 working demo components
- ✅ All components use design tokens via CSS custom properties
- ✅ Responsive to design system changes
- ✅ Proper styling with CSS Modules

---

## Phase 6: Application UI
**Goal**: Build the main application interface

**Estimated Time**: 45 minutes

### Steps

1. **Create DesignSystemSelector** (`src/components/ui/DesignSystemSelector.tsx`)
   - Dropdown select component
   - List all available design systems
   - Handle selection change
   - Style with current design tokens
   - Create DesignSystemSelector.module.css

2. **Create ComponentShowcase** (`src/components/ui/ComponentShowcase.tsx`)
   - Layout for displaying all demo components
   - Organized sections for each component type
   - Labels and descriptions
   - Create ComponentShowcase.module.css

3. **Create Main App Component** (`src/App.tsx`)
   - Wrap with DesignSystemProvider
   - Include DesignSystemSelector in header
   - Display ComponentShowcase
   - Create App.module.css for layout

4. **Style Global Elements** (`src/index.css`)
   - Reset/normalize styles
   - Base typography
   - Box-sizing border-box
   - Body background

5. **Setup Entry Point** (`src/main.tsx`)
   - Render App component
   - Import global styles

**Deliverables**:
- ✅ Working dropdown selector
- ✅ Component showcase displays all components
- ✅ Design system changes update entire UI
- ✅ Clean, organized layout

---

## Phase 7: Documentation & Polish
**Goal**: Complete documentation and final touches

**Estimated Time**: 30 minutes

### Steps

1. **Create README.md**
   - Project description
   - Features list
   - Setup instructions
   - Usage guide
   - How to add new design systems
   - Development commands
   - Technology stack
   - Project structure

2. **Add Code Comments**
   - Document complex functions
   - Add JSDoc comments to public APIs
   - Explain design token usage

3. **Test All Functionality**
   - Switch between all design systems
   - Verify all components render correctly
   - Check responsive behavior
   - Test in different browsers

4. **Final Cleanup**
   - Remove unused imports
   - Fix linting issues
   - Optimize bundle size
   - Verify TypeScript compilation

**Deliverables**:
- ✅ Comprehensive README
- ✅ Well-documented code
- ✅ All features working
- ✅ Clean, production-ready code

---

## Phase 8: GitHub Deployment
**Goal**: Push project to GitHub

**Estimated Time**: 15 minutes

### Steps

1. **Prepare Repository**
   - Review .gitignore
   - Stage all files
   - Create initial commit

2. **Create GitHub Repository**
   - Create new repository on GitHub (JohanBellander account)
   - Name: design-studio-demonstrator
   - Description: "A design system demonstrator for AI experimentation"
   - Public repository

3. **Push to GitHub**
   - Add GitHub remote
   - Push main branch
   - Verify all files uploaded

4. **Configure Repository**
   - Add topics/tags
   - Update repository description
   - Add README preview

**Deliverables**:
- ✅ Code on GitHub
- ✅ Repository properly configured
- ✅ README displays correctly

---

## Phase 9: Navigation Styling System ✅ COMPLETED
**Goal**: Add customizable navigation patterns for each design system

**Estimated Time**: 2-3 hours

### Steps

1. **Define NavigationStyle Interface** (`src/types/design-system.ts`)
   - Add 12 navigation properties (backgroundColor, textColor, activeColor, etc.)
   - Integrate into DesignTokens type
   - Export NavigationStyle interface

2. **Update Design Token Application** (`src/utils/applyDesignTokens.ts`)
   - Add navigation token processing
   - Convert camelCase to kebab-case for CSS variables
   - Apply as --nav-* custom properties

3. **Create Navigation Component** (`src/components/demo/Navigation.tsx`)
   - Build different navigation patterns (topbar, sidebar, minimal, etc.)
   - Use CSS custom properties for dynamic styling
   - Show examples for each pattern type

4. **Update CSS Modules**
   - Convert Navigation.module.css to use --nav-* variables
   - Update DesignSystemDemo.module.css sidebar styling
   - Ensure proper token application

5. **Configure All Design Systems**
   - Add navigation tokens to material.json
   - Add navigation tokens to apple.json
   - Add navigation tokens to github.json
   - Add navigation tokens to tokens-studio.json
   - Add navigation tokens to mailchimp.json
   - Define navigationPattern in allowedTokens

**Deliverables**:
- ✅ NavigationStyle interface with 12 properties
- ✅ Navigation tokens in all 5 design systems
- ✅ CSS custom properties for navigation styling
- ✅ Unique navigation appearance per design system
- ✅ Fixed visual artifacts (Mailchimp border)

---

## Phase 10: Optional Enhancements
**Goal**: Quick wins that improve the experience

**Estimated Time**: 30-60 minutes (optional)

### Potential Additions

1. **Add Favicon**
   - Create or use a simple icon
   - Add to public folder

2. **Add Loading State**
   - Show loader while design systems load
   - Improve perceived performance

3. **Add Error Handling**
   - Display user-friendly error messages
   - Handle missing design system files gracefully

4. **Add Keyboard Navigation**
   - Allow keyboard control of selector
   - Improve accessibility

5. **Add Simple Animation**
   - Fade transition between design systems
   - Smooth component updates

**Deliverables**:
- ✅ Enhanced user experience
- ✅ Better error handling
- ✅ Improved polish

---

## Testing Checklist

Before considering the project complete:

- [x] All design systems load without errors
- [x] Dropdown selector works and updates UI
- [x] All 14 components render correctly (including Navigation)
- [x] Navigation patterns are customizable per design system
- [x] Typography uses correct fonts
- [x] Colors apply correctly
- [x] Spacing is consistent
- [x] Shadows and borders render
- [x] TypeScript compiles with no errors
- [x] Dev server runs without warnings
- [x] Production build succeeds
- [x] Built files work when served
- [x] README is clear and complete
- [x] SPECIFICATION.md is accurate
- [x] Code is on GitHub
- [x] Repository is public and accessible
- [x] Navigation styling system implemented
- [x] Five design systems configured (Material, Apple, GitHub, Tokens Studio, Mailchimp)

---

## Timeline Summary

| Phase | Time | Cumulative |
|-------|------|------------|
| Phase 1: Project Setup | 30 min | 30 min |
| Phase 2: Type Definitions | 20 min | 50 min |
| Phase 3: Design Systems | 45 min | 1h 35min |
| Phase 4: Context & Provider | 30 min | 2h 5min |
| Phase 5: Demo Components | 90 min | 3h 35min |
| Phase 6: Application UI | 45 min | 4h 20min |
| Phase 7: Documentation | 30 min | 4h 50min |
| Phase 8: GitHub | 15 min | 5h 5min |
| **Total MVP** | **~5 hours** | |

---

## Success Metrics

The implementation is successful when:

1. ✅ Project runs without errors
2. ✅ All design systems are visually distinct
3. ✅ Switching is smooth and immediate
4. ✅ Components clearly demonstrate design tokens
5. ✅ New design systems can be added by creating JSON files
6. ✅ Code is type-safe and maintainable
7. ✅ Documentation is clear and complete
8. ✅ Project is on GitHub and accessible

---

## Future Roadmap (Post-MVP)

### Version 1.1
- Dark mode support for each design system
- Component state variations (hover effects, focus states)
- Improved mobile responsiveness

### Version 1.2
- Side-by-side comparison mode
- Export design tokens to CSS/SCSS/Tailwind
- Search and filter design systems

### Version 2.0
- AI integration for design system analysis
- Component code generation
- Accessibility audit features
- Performance monitoring

---

## Notes

- This is a living document - update as implementation progresses
- Track actual time spent vs. estimates
- Document any deviations from the plan
- Add notes about challenges and solutions
- Keep specification in sync with implementation

---

## Contact

Johan Bellander
GitHub: @JohanBellander
