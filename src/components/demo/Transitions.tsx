import { useState } from 'react';
import { useTokenRestrictions } from '../../hooks/useTokenRestrictions';
import styles from './Transitions.module.css';

export function Transitions() {
  const { getTokenClass } = useTokenRestrictions();
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeExample, setActiveExample] = useState<'hover' | 'modal' | 'slide' | null>(null);

  const transitionValues = [
    { key: 'fast', label: 'Fast', value: '150ms' },
    { key: 'base', label: 'Base', value: '250ms' },
    { key: 'slow', label: 'Slow', value: '350ms' },
  ];

  // Get computed transition value from CSS custom property
  const getComputedTransition = (key: string) => {
    if (typeof window === 'undefined') return '';
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(`--transition-${key}`)
      .trim();
    return value;
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleExampleClick = (example: 'hover' | 'modal' | 'slide') => {
    setActiveExample(example);
    setTimeout(() => setActiveExample(null), 1000);
  };

  return (
    <div className={styles.container}>
      {/* Speed Comparison Section */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Transition Speed Comparison</h3>
        <p className={styles.description}>
          Compare transition speeds side-by-side. Click the button to see all three speeds animate simultaneously.
        </p>
        
        <button 
          className={styles.triggerButton}
          onClick={triggerAnimation}
        >
          {isAnimating ? 'Animating...' : 'Trigger Animation'}
        </button>

        <div className={styles.comparisonGrid}>
          {transitionValues.map(({ key, label }) => (
            <div 
              key={key}
              className={`${styles.comparisonItem} ${getTokenClass('transitions', null, key)}`}
            >
              <div className={styles.comparisonLabel}>
                <span className={styles.comparisonName}>{label}</span>
                <span className={styles.comparisonValue}>{getComputedTransition(key)}</span>
              </div>
              <div className={styles.animationTrack}>
                <div 
                  className={`${styles.animationBox} ${styles[`box-${key}`]} ${isAnimating ? styles.animated : ''}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Easing Functions Section */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Easing Function</h3>
        <p className={styles.description}>
          All transitions use <code>ease-in-out</code> for smooth acceleration and deceleration.
        </p>
        
        <div className={styles.easingDemo}>
          <div className={styles.easingGraph}>
            <svg viewBox="0 0 200 100" className={styles.easingSvg}>
              {/* Grid lines */}
              <line x1="0" y1="100" x2="200" y2="100" stroke="var(--border-default)" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="100" stroke="var(--border-default)" strokeWidth="1" />
              
              {/* Ease-in-out curve */}
              <path
                d="M 0 100 C 30 100, 30 0, 100 0 C 170 0, 170 100, 200 100"
                fill="none"
                stroke="var(--color-primary-500)"
                strokeWidth="3"
                transform="scale(1, -1) translate(0, -100)"
              />
            </svg>
            <div className={styles.easingLabels}>
              <span>Time →</span>
              <span>↑ Progress</span>
            </div>
          </div>
          
          <div className={styles.easingDescription}>
            <p><strong>ease-in-out</strong> starts slow, speeds up in the middle, then slows down at the end.</p>
            <p>This creates natural, comfortable animations that feel responsive without being jarring.</p>
          </div>
        </div>
      </div>

      {/* Real-World Examples Section */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Real-World Examples</h3>
        <p className={styles.description}>
          See how different transition speeds are used in common UI patterns.
        </p>

        <div className={styles.examplesGrid}>
          {/* Fast - Button Hover */}
          <div className={`${styles.exampleCard} ${getTokenClass('transitions', null, 'fast')}`}>
            <h4 className={styles.exampleTitle}>
              <span className={styles.exampleSpeed}>Fast</span>
              <span className={styles.exampleTiming}>150ms</span>
            </h4>
            <p className={styles.exampleDesc}>Button hover states</p>
            <div className={styles.exampleDemo}>
              <button 
                className={`${styles.demoButton} ${styles.fastTransition}`}
                onClick={() => handleExampleClick('hover')}
              >
                Hover or Click Me
              </button>
            </div>
            <p className={styles.exampleNote}>
              Quick feedback for interactive elements that respond to user actions.
            </p>
          </div>

          {/* Base - Modal Open */}
          <div className={`${styles.exampleCard} ${getTokenClass('transitions', null, 'base')}`}>
            <h4 className={styles.exampleTitle}>
              <span className={styles.exampleSpeed}>Base</span>
              <span className={styles.exampleTiming}>250ms</span>
            </h4>
            <p className={styles.exampleDesc}>Modal/Dialog animations</p>
            <div className={styles.exampleDemo}>
              <button 
                className={styles.modalTrigger}
                onClick={() => handleExampleClick('modal')}
              >
                Open Modal
              </button>
              {activeExample === 'modal' && (
                <div className={styles.modalOverlay}>
                  <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>Modal Dialog</div>
                    <p>Opening with base transition</p>
                  </div>
                </div>
              )}
            </div>
            <p className={styles.exampleNote}>
              Balanced speed for panels, dropdowns, and overlays.
            </p>
          </div>

          {/* Slow - Panel Slide */}
          <div className={`${styles.exampleCard} ${getTokenClass('transitions', null, 'slow')}`}>
            <h4 className={styles.exampleTitle}>
              <span className={styles.exampleSpeed}>Slow</span>
              <span className={styles.exampleTiming}>350ms</span>
            </h4>
            <p className={styles.exampleDesc}>Panel slide animations</p>
            <div className={styles.exampleDemo}>
              <button 
                className={styles.panelTrigger}
                onClick={() => handleExampleClick('slide')}
              >
                Toggle Panel
              </button>
              <div className={`${styles.slidePanel} ${activeExample === 'slide' ? styles.panelOpen : ''}`}>
                <div className={styles.panelContent}>
                  <p>Sliding panel</p>
                  <p>with slow transition</p>
                </div>
              </div>
            </div>
            <p className={styles.exampleNote}>
              Smooth, deliberate motion for larger UI changes.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices Section */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Best Practices</h3>
        <div className={styles.practicesGrid}>
          <div className={styles.practiceCard}>
            <div className={styles.practiceIcon}>⚡</div>
            <h4>Fast Transitions</h4>
            <ul>
              <li>Button hover states</li>
              <li>Toggle switches</li>
              <li>Checkbox/radio states</li>
              <li>Focus indicators</li>
            </ul>
          </div>

          <div className={styles.practiceCard}>
            <div className={styles.practiceIcon}>⚖️</div>
            <h4>Base Transitions</h4>
            <ul>
              <li>Dropdowns & menus</li>
              <li>Tooltips & popovers</li>
              <li>Modal dialogs</li>
              <li>Tab switching</li>
            </ul>
          </div>

          <div className={styles.practiceCard}>
            <div className={styles.practiceIcon}>🎬</div>
            <h4>Slow Transitions</h4>
            <ul>
              <li>Sidebars & drawers</li>
              <li>Accordion panels</li>
              <li>Page transitions</li>
              <li>Complex animations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
