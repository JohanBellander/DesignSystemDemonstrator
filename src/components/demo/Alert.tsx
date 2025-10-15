import { ReactNode } from 'react';
import styles from './Alert.module.css';

interface AlertProps {
  variant: 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
}

export function Alert({ variant, children }: AlertProps) {
  const className = `${styles.alert} ${styles[variant]}`;
  
  return <div className={className}>{children}</div>;
}
