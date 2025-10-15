import styles from './List.module.css';

interface ListItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  badge?: string;
}

interface ListProps {
  items: ListItem[];
  variant?: 'default' | 'bordered' | 'divided' | 'card';
  size?: 'small' | 'medium' | 'large';
  interactive?: boolean;
}

export function List({ 
  items, 
  variant = 'default', 
  size = 'medium',
  interactive = false 
}: ListProps) {
  return (
    <ul className={`${styles.list} ${styles[variant]} ${styles[size]} ${interactive ? styles.interactive : ''}`}>
      {items.map((item) => (
        <li key={item.id} className={styles.listItem}>
          {item.icon && <span className={styles.icon}>{item.icon}</span>}
          <div className={styles.content}>
            <div className={styles.title}>{item.title}</div>
            {item.subtitle && <div className={styles.subtitle}>{item.subtitle}</div>}
          </div>
          {item.badge && (
            <span className={styles.badge}>{item.badge}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function ListShowcase() {
  const sampleItems: ListItem[] = [
    { 
      id: '1', 
      title: 'Dashboard', 
      subtitle: 'View your analytics', 
      badge: 'New'
    },
    { 
      id: '2', 
      title: 'Projects', 
      subtitle: 'Manage your work', 
      badge: '5'
    },
    { 
      id: '3', 
      title: 'Team', 
      subtitle: 'Collaborate with others'
    },
    { 
      id: '4', 
      title: 'Settings', 
      subtitle: 'Configure your account'
    },
  ];

  const simpleItems: ListItem[] = [
    { id: '1', title: 'First Item' },
    { id: '2', title: 'Second Item' },
    { id: '3', title: 'Third Item' },
    { id: '4', title: 'Fourth Item' },
  ];

  return (
    <div className={styles.showcase}>
      <div className={styles.showcaseSection}>
        <h3 className={styles.showcaseTitle}>List Variants</h3>
        <div className={styles.showcaseGrid}>
          <div>
            <div className={styles.variantLabel}>Default</div>
            <List items={sampleItems} variant="default" />
          </div>
          <div>
            <div className={styles.variantLabel}>Bordered</div>
            <List items={sampleItems} variant="bordered" />
          </div>
          <div>
            <div className={styles.variantLabel}>Divided</div>
            <List items={sampleItems} variant="divided" />
          </div>
          <div>
            <div className={styles.variantLabel}>Card</div>
            <List items={sampleItems} variant="card" />
          </div>
        </div>
      </div>

      <div className={styles.showcaseSection}>
        <h3 className={styles.showcaseTitle}>List Sizes</h3>
        <div className={styles.showcaseGrid}>
          <div>
            <div className={styles.variantLabel}>Small</div>
            <List items={simpleItems} variant="bordered" size="small" />
          </div>
          <div>
            <div className={styles.variantLabel}>Medium</div>
            <List items={simpleItems} variant="bordered" size="medium" />
          </div>
          <div>
            <div className={styles.variantLabel}>Large</div>
            <List items={simpleItems} variant="bordered" size="large" />
          </div>
        </div>
      </div>

      <div className={styles.showcaseSection}>
        <h3 className={styles.showcaseTitle}>Interactive List</h3>
        <div className={styles.showcaseGrid}>
          <div>
            <div className={styles.variantLabel}>Hoverable Items</div>
            <List items={sampleItems} variant="bordered" interactive />
          </div>
        </div>
      </div>
    </div>
  );
}
