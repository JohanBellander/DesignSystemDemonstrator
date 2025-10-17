import { InputHTMLAttributes } from 'react';
import { useAnimation } from '../../hooks/useAnimation';
import styles from './Input.module.css';
import '../../styles/animations.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, style, ...props }: InputProps) {
  const { getAnimationClasses, getAnimationProps } = useAnimation('input');
  const animationClasses = getAnimationClasses();
  
  const inputClasses = [
    styles.input,
    error ? styles.error : '',
    animationClasses.hover,
    animationClasses.active,
    animationClasses.focus,
    className
  ].filter(Boolean).join(' ');
  
  const combinedStyle = {
    ...getAnimationProps(),
    ...style
  };

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={inputClasses} style={combinedStyle} {...props} />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}
