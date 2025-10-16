import { useState } from 'react';
import { DesignSystemDemo } from './DesignSystemDemo';
import { Typography } from '../demo/Typography';
import { Button } from '../demo/Button';
import { Input } from '../demo/Input';
import { Card } from '../demo/Card';
import { Alert } from '../demo/Alert';
import { Badge } from '../demo/Badge';
import { Avatar } from '../demo/Avatar';
import { Divider } from '../demo/Divider';
import { DropdownShowcase } from '../demo/Dropdown';
import { ListShowcase } from '../demo/List';
import { LayoutGrid } from '../demo/LayoutGrid';
import { Elevation } from '../demo/Elevation';
import { OpacityScale } from '../demo/OpacityScale';
import { BorderSystem } from '../demo/BorderSystem';
import { FocusStates } from '../demo/FocusStates';
import { Surfaces } from '../demo/Surfaces';
import { NavigationDemo } from '../demo/Navigation';
import { ColorPalette } from '../demo/ColorPalette';
import styles from './ComponentShowcase.module.css';

type TabId = 'typography' | 'buttons' | 'inputs' | 'cards' | 'alerts' | 'badges' | 'avatars' | 'dropdowns' | 'lists' | 'layout' | 'elevation' | 'opacity' | 'borders' | 'focus' | 'surfaces' | 'colors' | 'navigation';

interface Tab {
  id: TabId;
  label: string;
  category: 'foundations' | 'components' | 'layout';
}

const tabs: Tab[] = [
  // Foundations
  { id: 'typography', label: 'Typography', category: 'foundations' },
  { id: 'colors', label: 'Color Palette', category: 'foundations' },
  { id: 'elevation', label: 'Elevation', category: 'foundations' },
  { id: 'opacity', label: 'Opacity', category: 'foundations' },
  { id: 'borders', label: 'Border System', category: 'foundations' },
  { id: 'surfaces', label: 'Surfaces', category: 'foundations' },
  // Components
  { id: 'buttons', label: 'Buttons', category: 'components' },
  { id: 'inputs', label: 'Inputs', category: 'components' },
  { id: 'cards', label: 'Cards', category: 'components' },
  { id: 'alerts', label: 'Alerts', category: 'components' },
  { id: 'badges', label: 'Badges', category: 'components' },
  { id: 'avatars', label: 'Avatars', category: 'components' },
  { id: 'dropdowns', label: 'Dropdowns', category: 'components' },
  { id: 'lists', label: 'Lists', category: 'components' },
  // Layout
  { id: 'layout', label: 'Layout & Grid', category: 'layout' },
  { id: 'navigation', label: 'Navigation', category: 'layout' },
  { id: 'focus', label: 'Focus States', category: 'layout' },
];

const tabCategories = [
  { key: 'foundations', label: 'Foundations' },
  { key: 'components', label: 'Components' },
  { key: 'layout', label: 'Layout' },
] as const;

export function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>('typography');

  return (
    <div className={styles.showcase}>
      {/* Design System Preview */}
      <DesignSystemDemo />

      <Divider />

      {/* Tab Navigation */}
      <div className={styles.tabNav}>
        {tabCategories.map((category) => (
          <div key={category.key} className={styles.tabGroup}>
            <div className={styles.tabGroupLabel}>{category.label}</div>
            <div className={styles.tabGroupButtons}>
              {tabs
                .filter((tab) => tab.category === category.key)
                .map((tab) => (
                  <button
                    key={tab.id}
                    className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Typography Section */}
        {activeTab === 'typography' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Typography</h2>
            <p className={styles.sectionDescription}>
              Font families, sizes, weights, and line heights that define the text hierarchy and readability.
            </p>
            <Typography />
          </section>
        )}

        {/* Buttons Section */}
        {activeTab === 'buttons' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Buttons</h2>
            <p className={styles.sectionDescription}>
              Primary actions with multiple variants, sizes, and states. Demonstrates colors, spacing, borders, shadows, and transitions.
            </p>
            <div className={styles.buttonGroup}>
              <div>
                <div className={styles.buttonRowLabel}>Variants</div>
                <div className={styles.buttonRow}>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>
              <div>
                <div className={styles.buttonRowLabel}>Sizes</div>
                <div className={styles.buttonRow}>
                  <Button variant="primary" size="small">Small</Button>
                  <Button variant="primary" size="medium">Medium</Button>
                  <Button variant="primary" size="large">Large</Button>
                </div>
              </div>
              <div>
                <div className={styles.buttonRowLabel}>States</div>
                <div className={styles.buttonRow}>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Inputs Section */}
        {activeTab === 'inputs' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Inputs</h2>
            <p className={styles.sectionDescription}>
              Form fields with labels, placeholders, and error states. Shows focus indicators, disabled styling, and validation feedback.
            </p>
            <div className={styles.componentColumn}>
              <Input label="Username" placeholder="Enter your username" />
              <Input label="Email" type="email" placeholder="Enter your email" />
              <Input label="Password" type="password" placeholder="Enter your password" />
              <Input label="With Error" error="This field is required" placeholder="Error state" />
              <Input label="Disabled" disabled placeholder="Disabled input" />
            </div>
          </section>
        )}

        {/* Cards Section */}
        {activeTab === 'cards' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Cards</h2>
            <p className={styles.sectionDescription}>
              Content containers with optional headers and footers. Demonstrates background colors, borders, shadows, and structured layouts.
            </p>
            <div className={styles.componentGrid}>
              <Card title="Card Title">
                This is the card body content. Cards are great for grouping related information.
              </Card>
              <Card 
                title="Card with Footer" 
                footer={<Button variant="primary" size="small">Action</Button>}
              >
                This card has a footer section with an action button.
              </Card>
            </div>
          </section>
        )}

        {/* Alerts Section */}
        {activeTab === 'alerts' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Alerts</h2>
            <p className={styles.sectionDescription}>
              Notification messages using semantic colors for success, warning, error, and info states.
            </p>
            <div className={styles.componentColumn}>
              <Alert variant="success">This is a success message!</Alert>
              <Alert variant="warning">This is a warning message!</Alert>
              <Alert variant="error">This is an error message!</Alert>
              <Alert variant="info">This is an info message!</Alert>
            </div>
          </section>
        )}

        {/* Badges Section */}
        {activeTab === 'badges' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Badges</h2>
            <p className={styles.sectionDescription}>
              Small labels for tags, status indicators, and counts. Demonstrates compact typography and color variants.
            </p>
            <div className={styles.componentGrid}>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </div>
          </section>
        )}

        {/* Avatars Section */}
        {activeTab === 'avatars' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Avatars</h2>
            <p className={styles.sectionDescription}>
              User profile placeholders in multiple sizes. Shows circular shapes and consistent sizing scales.
            </p>
            <div className={styles.componentGrid}>
              <Avatar size="small" initials="SM" />
              <Avatar size="medium" initials="MD" />
              <Avatar size="large" initials="LG" />
            </div>
          </section>
        )}

        {/* Dropdowns Section */}
        {activeTab === 'dropdowns' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Dropdowns</h2>
            <p className={styles.sectionDescription}>
              Select menus with options, sizes, states, and error handling. Demonstrates interactive elements with keyboard navigation support.
            </p>
            <DropdownShowcase />
          </section>
        )}

        {/* Lists Section */}
        {activeTab === 'lists' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Lists</h2>
            <p className={styles.sectionDescription}>
              Organized collections of items with icons, subtitles, and badges. Shows different variants including bordered, divided, and card layouts.
            </p>
            <ListShowcase />
          </section>
        )}

        {/* Layout & Grid Section */}
        {activeTab === 'layout' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Layout & Grid System</h2>
            <p className={styles.sectionDescription}>
              Grid columns, container widths, and responsive breakpoints that define the page structure and layout behavior across different screen sizes.
            </p>
            <LayoutGrid />
          </section>
        )}

        {/* Elevation Section */}
        {activeTab === 'elevation' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Elevation System</h2>
            <p className={styles.sectionDescription}>
              Shadow levels and z-index layering that create depth and visual hierarchy. Higher elevations indicate elements that are closer to the user.
            </p>
            <Elevation />
          </section>
        )}

        {/* Opacity Section */}
        {activeTab === 'opacity' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Opacity Scale</h2>
            <p className={styles.sectionDescription}>
              Transparency values for various UI states like disabled, hover, active, overlays, and dividers. Controls element visibility and layering effects.
            </p>
            <OpacityScale />
          </section>
        )}

        {/* Border System Section */}
        {activeTab === 'borders' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Border System</h2>
            <p className={styles.sectionDescription}>
              Border widths, styles, and radius values that define element outlines and rounded corners. Includes solid, dashed, and dotted patterns.
            </p>
            <BorderSystem />
          </section>
        )}

        {/* Focus States Section */}
        {activeTab === 'focus' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Focus States</h2>
            <p className={styles.sectionDescription}>
              Focus ring styling for accessibility and keyboard navigation. Shows ring width, offset, color, and outline styles for interactive elements.
            </p>
            <FocusStates />
          </section>
        )}

        {/* Surfaces Section */}
        {activeTab === 'surfaces' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Surfaces & Backgrounds</h2>
            <p className={styles.sectionDescription}>
              Background hierarchies and surface elevations that create visual depth. Includes primary, secondary, and tertiary background levels with overlay support.
            </p>
            <Surfaces />
          </section>
        )}

        {/* Color Palette Section */}
        {activeTab === 'colors' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Color Palette</h2>
            <p className={styles.sectionDescription}>
              Complete color system organized by category (primary, secondary, neutral). Shows all shades from light to dark with hex values for each color token.
            </p>
            <ColorPalette />
          </section>
        )}

        {/* Navigation Section */}
        {activeTab === 'navigation' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Navigation Patterns</h2>
            <p className={styles.sectionDescription}>
              Common navigation patterns for websites and applications: top bar, sidebar, hamburger menu, and combinations. Shows how navigation adapts across different layouts and screen sizes.
            </p>
            <NavigationDemo />
          </section>
        )}
      </div>
    </div>
  );
}
