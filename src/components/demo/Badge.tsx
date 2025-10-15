import { ReactNode } from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  children: ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  const className = `${styles.badge} ${styles[variant]}`;
  
  return <span className={className}>{children}</span>;
}
