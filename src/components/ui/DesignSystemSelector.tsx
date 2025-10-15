import { useDesignSystem } from '../../context/DesignSystemContext';
import styles from './DesignSystemSelector.module.css';

const getStatusLabel = (status?: string): string => {
  switch (status) {
    case 'deprecated':
      return '⚠️ Deprecated';
    case 'experimental':
      return '🧪 Experimental';
    default:
      return '';
  }
};

export function DesignSystemSelector() {
  const { selectedSystem, availableSystems, setSelectedSystem } = useDesignSystem();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const system = availableSystems.find(s => s.id === e.target.value);
    if (system) {
      setSelectedSystem(system);
    }
  };

  return (
    <div className={styles.selector}>
      <label htmlFor="design-system-select" className={styles.label}>
        Design System:
      </label>
      <div className={styles.selectWrapper}>
        <select
          id="design-system-select"
          className={styles.select}
          value={selectedSystem?.id || ''}
          onChange={handleChange}
        >
          {availableSystems.map((system) => (
            <option 
              key={system.id} 
              value={system.id}
            >
              {system.name}{system.status && ` ${getStatusLabel(system.status)}`}
            </option>
          ))}
        </select>
        {selectedSystem?.status && (
          <span className={`${styles.statusBadge} ${styles[selectedSystem.status]}`}>
            {getStatusLabel(selectedSystem.status)}
          </span>
        )}
      </div>
    </div>
  );
}
