import { useState } from 'react';
import { useDesignSystem } from '../../context/DesignSystemContext';
import styles from './DesignSystemSelector.module.css';

export function DesignSystemSelector() {
  const { selectedSystem, availableSystems, setSelectedSystem, isLoading } = useDesignSystem();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const system = availableSystems.find(s => s.id === e.target.value);
    if (system) {
      setIsTransitioning(true);
      // Add a small delay to show loading state
      setTimeout(() => {
        setSelectedSystem(system);
        setTimeout(() => setIsTransitioning(false), 300);
      }, 150);
    }
  };

  const showLoading = isLoading || isTransitioning;

  return (
    <div className={styles.selector}>
      <label htmlFor="design-system-select" className={styles.label}>
        Design System:
      </label>
      <div className={styles.selectWrapper}>
        <select
          id="design-system-select"
          className={`${styles.select} ${showLoading ? styles.loading : ''}`}
          value={selectedSystem?.id || ''}
          onChange={handleChange}
          disabled={showLoading}
        >
          {availableSystems.map((system) => (
            <option 
              key={system.id} 
              value={system.id}
            >
              {system.name}
            </option>
          ))}
        </select>
        {showLoading && (
          <div className={styles.spinner}>
            <div className={styles.spinnerCircle}></div>
          </div>
        )}
      </div>
    </div>
  );
}
