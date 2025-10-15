import { Typography } from '../demo/Typography';
import { Button } from '../demo/Button';
import { Input } from '../demo/Input';
import { Card } from '../demo/Card';
import { Alert } from '../demo/Alert';
import { Badge } from '../demo/Badge';
import { Avatar } from '../demo/Avatar';
import { Divider } from '../demo/Divider';
import styles from './ComponentShowcase.module.css';

export function ComponentShowcase() {
  return (
    <div className={styles.showcase}>
      {/* Typography Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Typography</h2>
        <p className={styles.sectionDescription}>
          Font families, sizes, weights, and line heights that define the text hierarchy and readability.
        </p>
        <Typography />
      </section>

      <Divider />

      {/* Buttons Section */}
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

      <Divider />

      {/* Inputs Section */}
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

      <Divider />

      {/* Cards Section */}
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

      <Divider />

      {/* Alerts Section */}
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

      <Divider />

      {/* Badges Section */}
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

      <Divider />

      {/* Avatars Section */}
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
    </div>
  );
}
