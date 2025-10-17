import { useState } from 'react';
import { useDesignSystem } from '../../context/DesignSystemContext';
import { Button } from './Button';
import { Card } from './Card';
import { Input } from './Input';
import type { AnimationType, AnimationIntensity } from '../../types/design-system';
import styles from './AnimationShowcase.module.css';
import '../../styles/animations.css';

export function AnimationShowcase() {
  const { selectedSystem } = useDesignSystem();
  const [activeAnimation, setActiveAnimation] = useState<AnimationType>('scale');
  const selectedIntensity: AnimationIntensity = 'medium';

  const animationTypes: AnimationType[] = [
    'ripple', 'lift', 'scale', 'glow', 'slide', 
    'bounce', 'fade', 'shimmer', 'rotate', 'pulse', 'none'
  ];

  const intensities: AnimationIntensity[] = ['subtle', 'medium', 'bold'];
  
  const hasAnimations = selectedSystem?.tokens?.animations !== undefined;
  const respectsReducedMotion = selectedSystem?.tokens?.animations?.reduceMotion ?? true;

  // Get allowed animation types for current design system
  const getAllowedTypes = (): AnimationType[] => {
    const allowed = selectedSystem?.allowedTokens?.animations?.types;
    if (!allowed || allowed.length === 0) return animationTypes;
    return animationTypes.filter(type => allowed.indexOf(type) !== -1);
  };

  const allowedTypes = getAllowedTypes();

  return (
    <div className={styles.container}>
      {/* Animation System Status */}
      <div className={styles.section}>
        <div className={styles.statusCard}>
          <h3 className={styles.statusTitle}>Animation System Status</h3>
          <div className={styles.statusGrid}>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Animations Enabled:</span>
              <span className={`${styles.statusValue} ${hasAnimations ? styles.enabled : styles.disabled}`}>
                {hasAnimations ? 'Yes' : 'No'}
              </span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Respects Reduced Motion:</span>
              <span className={`${styles.statusValue} ${respectsReducedMotion ? styles.enabled : styles.disabled}`}>
                {respectsReducedMotion ? 'Yes' : 'No'}
              </span>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Allowed Types:</span>
              <span className={styles.statusValue}>{allowedTypes.length} of {animationTypes.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Type Grid */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Animation Types</h3>
        <p className={styles.description}>
          <strong>Hover over each card</strong> to see the animation in action. Available animations are based on the current design system.
        </p>

        <div className={styles.animationGrid}>
          {animationTypes.map((type) => {
            const isAllowed = allowedTypes.indexOf(type) !== -1;
            
            return (
              <div
                key={type}
                className={`${styles.animationCard} ${!isAllowed ? styles.disabled : ''}`}
              >
                <div className={styles.animationPreview}>
                  <div className={`${styles.previewBox} animation-${type}-${selectedIntensity}`}>
                    {type === 'none' ? '—' : '★'}
                  </div>
                </div>
                <div className={styles.animationInfo}>
                  <h4 className={styles.animationName}>{type}</h4>
                  {!isAllowed && <span className={styles.notAllowed}>Not allowed</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Intensity Comparison */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Intensity Levels</h3>
        <p className={styles.description}>
          Compare how the same animation looks at different intensity levels. <strong>Hover over each box</strong> to see the difference.
        </p>

        <div className={styles.intensityControls}>
          <label className={styles.label}>Animation Type:</label>
          <select 
            className={styles.select}
            value={activeAnimation}
            onChange={(e) => setActiveAnimation(e.target.value as AnimationType)}
          >
            {allowedTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className={styles.intensityGrid}>
          {intensities.map((intensity) => (
            <div key={intensity} className={styles.intensityCard}>
              <div className={styles.intensityLabel}>{intensity}</div>
              <div className={styles.intensityPreview}>
                <div 
                  className={`${styles.intensityBox} animation-${activeAnimation}-${intensity}`}
                >
                  Hover me
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interaction States */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Interaction States</h3>
        <p className={styles.description}>
          Different animations can be triggered for hover, active (click), and focus states. <strong>Try hovering, clicking, and tabbing</strong> to this box.
        </p>

        <div className={styles.stateDemo}>
          <div className={styles.stateDemoBox}>
            <button 
              className={`${styles.stateDemoElement} animation-scale-${selectedIntensity}`}
              tabIndex={0}
            >
              Interact with me
            </button>
            <p className={styles.stateHint}>Hover • Click • Tab to focus</p>
          </div>
        </div>
      </div>

      {/* Component Examples */}
      <div className={styles.section}>
        <h3 className={styles.subtitle}>Component Integration</h3>
        <p className={styles.description}>
          Real components using the animation system. Hover, click, and interact to see animations in action.
        </p>

        <div className={styles.componentGrid}>
          <div className={styles.componentExample}>
            <h4 className={styles.componentTitle}>Buttons</h4>
            <div className={styles.componentDemo}>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
          </div>

          <div className={styles.componentExample}>
            <h4 className={styles.componentTitle}>Cards</h4>
            <div className={styles.componentDemo}>
              <Card className={styles.demoCard}>
                <p>Hover over this card to see the animation effect.</p>
              </Card>
            </div>
          </div>

          <div className={styles.componentExample}>
            <h4 className={styles.componentTitle}>Input Fields</h4>
            <div className={styles.componentDemo}>
              <Input 
                label="Email Address"
                placeholder="you@example.com"
              />
              <Input 
                label="Password"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animation Configuration */}
      {hasAnimations && (
        <div className={styles.section}>
          <h3 className={styles.subtitle}>Current Configuration</h3>
          <p className={styles.description}>
            View the animation configuration for the current design system.
          </p>

          <div className={styles.configCard}>
            <pre className={styles.configCode}>
              {JSON.stringify(selectedSystem?.tokens?.animations, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Accessibility Note */}
      <div className={styles.section}>
        <div className={styles.accessibilityNote}>
          <h4 className={styles.accessibilityTitle}>♿ Accessibility</h4>
          <p className={styles.accessibilityText}>
            {respectsReducedMotion ? (
              <>
                This design system respects the <code>prefers-reduced-motion</code> setting. 
                Users who have enabled reduced motion in their system preferences will see minimal or no animations.
              </>
            ) : (
              <>
                This design system does not respect reduced motion preferences. 
                Consider enabling <code>respectReducedMotion</code> for better accessibility.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
