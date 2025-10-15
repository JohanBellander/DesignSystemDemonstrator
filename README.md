# Design System Demonstrator

A frontend-only application for demonstrating and comparing different design systems. Built for AI experimentation with design systems, providing a standardized format for defining and viewing design tokens and components.

![Design System Demonstrator](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Purpose

This project serves as:
- An experimental platform for AI interaction with design systems
- A visual demonstrator for design system tokens and components
- A standardized format for defining design systems
- A tool for comparing different design approaches

## ✨ Features

- **No Backend Required**: Pure frontend application
- **Easy to Extend**: Add new design systems by creating JSON files
- **Live Switching**: Instantly switch between design systems
- **Comprehensive Components**: 8 common UI components showcased
- **Navigation Patterns**: Customizable navigation styling for each design system
- **Type-Safe**: Built with TypeScript for reliability
- **Design Tokens**: CSS custom properties for all design values

## 📦 Included Design Systems

1. **Material Design** - Google's design language with vibrant colors and topbar navigation
2. **Apple Inspired** - Clean, minimal aesthetic with refined spacing and subtle effects
3. **GitHub Primer** - Developer-focused with neutral colors and dark navigation
4. **Tokens Studio** - Vibrant, modern design with bold typography and bright accents
5. **Mailchimp** - Playful yellow branding with warm earth tones and friendly personality

## 🛠 Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS Modules** - Scoped styling
- **CSS Custom Properties** - Dynamic design token application

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JohanBellander/design-studio-demonstrator.git
cd design-studio-demonstrator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 📖 Usage

### Switching Design Systems

Use the dropdown in the top-right corner to select a design system. The entire UI will update instantly to reflect the new design tokens.

### Viewing Components

Scroll through the page to see all 9 component types:
- **Navigation** - Different navigation patterns (topbar, sidebar, minimal, etc.)
- **Typography** - Headings and body text
- **Buttons** - Various variants and sizes
- **Inputs** - Form fields with different states
- **Cards** - Content containers
- **Alerts** - Notification messages
- **Badges** - Small labels
- **Avatars** - User profile placeholders
- **Dividers** - Section separators

## 🎨 Adding a New Design System

**Quick Start:**
1. Copy `public/design-systems/template.json` to a new file
2. Customize the colors, typography, and other tokens
3. Add your file name to `src/utils/loadDesignSystems.ts`
4. Reload the app!

**Detailed Guide:**
See [Creating Design Systems Guide](docs/CREATING_DESIGN_SYSTEMS.md) for a comprehensive step-by-step tutorial including:
- Structure explanation
- Required vs optional properties
- Common pitfalls
- Validation checklist
- Complete examples

**Quick Reference Structure:**
```json
{
  "id": "custom",
  "name": "Custom Design",
  "description": "My custom design system",
  "allowedTokens": {
    "navigationPattern": "topbar"
  },
  "tokens": {
    "colors": { ... },
    "typography": { ... },
    "spacing": { ... },
    "borderRadius": { ... },
    "shadows": { ... },
    "transitions": { ... },
    "navigation": {
      "backgroundColor": "#FFFFFF",
      "textColor": "#000000",
      "activeColor": "#0066CC",
      "hoverColor": "rgba(0, 102, 204, 0.1)",
      "borderColor": "rgba(0, 0, 0, 0.1)",
      "height": "64px",
      "padding": "0 24px",
      "gap": "16px",
      "fontWeight": "500",
      "fontSize": "1rem",
      "borderRadius": "0",
      "shadow": "none"
    }
  }
}
```

3. Update `src/utils/loadDesignSystems.ts` to include your new system:
```typescript
const designSystemFiles = ['material', 'apple', 'github', 'custom'];
```

4. Refresh the app - your design system will appear in the dropdown!

For the complete schema, see [SPECIFICATION.md](./SPECIFICATION.md).

## 📚 Project Structure

```
design-studio-demonstrator/
├── public/
│   └── design-systems/          # Design system JSON files
│       ├── material.json
│       ├── apple.json
│       └── github.json
├── src/
│   ├── components/
│   │   ├── demo/                # Showcase components
│   │   └── ui/                  # App UI components
│   ├── context/                 # React context
│   ├── types/                   # TypeScript definitions
│   ├── utils/                   # Utility functions
│   ├── App.tsx
│   └── main.tsx
├── SPECIFICATION.md             # Detailed specification
├── IMPLEMENTATION_PLAN.md       # Development roadmap
└── README.md                    # This file
```

## 🏗 Build & Deploy

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deploy

The app can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

Simply upload the contents of the `dist/` directory.

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Component Development

All demo components use CSS custom properties for styling, making them automatically responsive to design system changes:

```css
.button {
  background-color: var(--color-primary-600);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  font-family: var(--font-family-primary);
}
```

## 📄 Documentation

- **[Creating Design Systems Guide](docs/CREATING_DESIGN_SYSTEMS.md)** - Step-by-step guide for adding new design systems
- **[Template JSON](public/design-systems/template.json)** - Annotated template with all properties explained
- **[Tokens Studio Experiment](TOKENS_STUDIO_EXPERIMENT.md)** - Real-world example of creating a design system
- [SPECIFICATION.md](./SPECIFICATION.md) - Complete technical specification
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Development phases and roadmap

## 🤝 Contributing

This is a personal experimental project, but suggestions and feedback are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests
- Fork and adapt for your own use

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 👤 Author

**Johan Bellander**
- GitHub: [@JohanBellander](https://github.com/JohanBellander)

## 🔮 Future Enhancements

Potential features for future versions:
- Dark mode support
- Side-by-side comparison
- Export to CSS/SCSS/Tailwind
- Component code generation
- AI-powered design system analysis
- Accessibility audit tools

## 🙏 Acknowledgments

- Inspired by Material Design, Apple HIG, and GitHub Primer
- Built with modern web technologies
- Created for AI and design system experimentation

---

**Note**: This project is part of an experiment for how to use design systems with AI. The standardized format makes it easy for both humans and AI agents to understand and work with design systems.
