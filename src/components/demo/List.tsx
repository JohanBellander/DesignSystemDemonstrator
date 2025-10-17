import { useDesignSystem } from '../../context/DesignSystemContext';
import { useAnimation } from '../../hooks/useAnimation';
import { isComponentPropertyAllowed } from '../../utils/tokenRestrictions';
import styles from './List.module.css';
import animationStyles from '../../styles/animations.module.css';

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
  const { getAnimationClasses, getAnimationProps } = useAnimation('list');
  const animationClasses = getAnimationClasses();
  
  const listClasses = [
    styles.list,
    styles[variant],
    styles[size],
    interactive ? styles.interactive : ''
  ].filter(Boolean).join(' ');
  
  const itemClasses = [
    styles.listItem,
    interactive && animationClasses.hover ? animationStyles[animationClasses.hover] : '',
    interactive && animationClasses.active ? animationStyles[animationClasses.active] : '',
  ].filter(Boolean).join(' ');
  
  return (
    <ul className={listClasses}>
      {items.map((item) => (
        <li key={item.id} className={itemClasses} style={interactive ? getAnimationProps() : undefined}>
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
  const { selectedSystem } = useDesignSystem();
  const allowedTokens = selectedSystem?.allowedTokens;

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

  // Check which variants and sizes are allowed
  const isDefaultAllowed = isComponentPropertyAllowed(allowedTokens, 'list', 'variants', 'default');
  const isBorderedAllowed = isComponentPropertyAllowed(allowedTokens, 'list', 'variants', 'bordered');
  const isDividedAllowed = isComponentPropertyAllowed(allowedTokens, 'list', 'variants', 'divided');
  const isCardAllowed = isComponentPropertyAllowed(allowedTokens, 'list', 'variants', 'card');
  
  const isSmallAllowed = isComponentPropertyAllowed(allowedTokens, 'list', 'sizes', 'small');
  const isMediumAllowed = isComponentPropertyAllowed(allowedTokens, 'list', 'sizes', 'medium');
  const isLargeAllowed = isComponentPropertyAllowed(allowedTokens, 'list', 'sizes', 'large');
  
  const isInteractiveAllowed = isComponentPropertyAllowed(allowedTokens, 'list', 'interactive', true);

  return (
    <div className={styles.showcase}>
      <div className={styles.showcaseSection}>
        <h3 className={styles.showcaseTitle}>List Variants</h3>
        <div className={styles.showcaseGrid}>
          {isDefaultAllowed && (
            <div>
              <div className={styles.variantLabel}>Default</div>
              <List items={sampleItems} variant="default" />
            </div>
          )}
          {isBorderedAllowed && (
            <div>
              <div className={styles.variantLabel}>Bordered</div>
              <List items={sampleItems} variant="bordered" />
            </div>
          )}
          {isDividedAllowed && (
            <div>
              <div className={styles.variantLabel}>Divided</div>
              <List items={sampleItems} variant="divided" />
            </div>
          )}
          {isCardAllowed && (
            <div>
              <div className={styles.variantLabel}>Card</div>
              <List items={sampleItems} variant="card" />
            </div>
          )}
        </div>
      </div>

      <div className={styles.showcaseSection}>
        <h3 className={styles.showcaseTitle}>List Sizes</h3>
        <div className={styles.showcaseGrid}>
          {isSmallAllowed && (
            <div>
              <div className={styles.variantLabel}>Small</div>
              <List items={simpleItems} variant="bordered" size="small" />
            </div>
          )}
          {isMediumAllowed && (
            <div>
              <div className={styles.variantLabel}>Medium</div>
              <List items={simpleItems} variant="bordered" size="medium" />
            </div>
          )}
          {isLargeAllowed && (
            <div>
              <div className={styles.variantLabel}>Large</div>
              <List items={simpleItems} variant="bordered" size="large" />
            </div>
          )}
        </div>
      </div>

      {isInteractiveAllowed && (
        <div className={styles.showcaseSection}>
          <h3 className={styles.showcaseTitle}>Interactive List</h3>
          <div className={styles.showcaseGrid}>
            <div>
              <div className={styles.variantLabel}>Hoverable Items</div>
              <List items={sampleItems} variant="bordered" interactive />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
