import { useState } from 'react';
import { useDesignSystem } from '../../context/DesignSystemContext';
import { isComponentPropertyAllowed } from '../../utils/tokenRestrictions';
import styles from './Dropdown.module.css';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  size?: 'small' | 'medium' | 'large';
}

export function Dropdown({ 
  label, 
  options, 
  placeholder = 'Select an option...', 
  disabled = false,
  error,
  size = 'medium'
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`${styles.dropdownWrapper} ${disabled ? styles.disabled : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div 
        className={`${styles.dropdown} ${styles[size]} ${error ? styles.error : ''} ${isOpen ? styles.open : ''}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`${styles.selected} ${!selectedOption ? styles.placeholder : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>▼</span>
      </div>
      {isOpen && (
        <ul className={`${styles.dropdownMenu} ${styles[size]}`} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${selectedOption?.value === option.value ? styles.selectedOption : ''}`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={selectedOption?.value === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

export function DropdownShowcase() {
  const { selectedSystem } = useDesignSystem();
  const allowedTokens = selectedSystem?.allowedTokens;

  const sampleOptions = [
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option' },
    { value: 'option4', label: 'Fourth Option' },
    { value: 'option5', label: 'Fifth Option' },
  ];

  // Check which sizes are allowed
  const isSmallAllowed = isComponentPropertyAllowed(allowedTokens, 'dropdown', 'sizes', 'small');
  const isMediumAllowed = isComponentPropertyAllowed(allowedTokens, 'dropdown', 'sizes', 'medium');
  const isLargeAllowed = isComponentPropertyAllowed(allowedTokens, 'dropdown', 'sizes', 'large');

  return (
    <div className={styles.showcase}>
      <div className={styles.showcaseRow}>
        <Dropdown 
          label="Default Dropdown"
          options={sampleOptions}
          placeholder="Choose one..."
        />
      </div>
      
      <div className={styles.showcaseRow}>
        {isSmallAllowed && (
          <Dropdown 
            label="Small Size"
            options={sampleOptions}
            size="small"
          />
        )}
        {isMediumAllowed && (
          <Dropdown 
            label="Medium Size"
            options={sampleOptions}
            size="medium"
          />
        )}
        {isLargeAllowed && (
          <Dropdown 
            label="Large Size"
            options={sampleOptions}
            size="large"
          />
        )}
      </div>

      <div className={styles.showcaseRow}>
        <Dropdown 
          label="With Error"
          options={sampleOptions}
          error="Please select a valid option"
        />
        <Dropdown 
          label="Disabled"
          options={sampleOptions}
          disabled
        />
      </div>
    </div>
  );
}
