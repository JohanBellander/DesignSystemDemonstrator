import { useDesignSystem } from '../../context/DesignSystemContext';
import styles from './DesignSystemSelector.module.css';

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
      <select
        id="design-system-select"
        className={styles.select}
        value={selectedSystem?.id || ''}
        onChange={handleChange}
      >
        {availableSystems.map((system) => (
          <option key={system.id} value={system.id}>
            {system.name}
          </option>
        ))}
      </select>
    </div>
  );
}
