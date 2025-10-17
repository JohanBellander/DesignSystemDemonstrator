import { ReactNode, CSSProperties } from 'react';
import { useAnimation } from '../../hooks/useAnimation';
import styles from './Card.module.css';
import '../../styles/animations.css';

interface CardProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Card({ title, children, footer, className, style }: CardProps) {
  const { getAnimationClasses, getAnimationProps } = useAnimation('card');
  const animationClasses = getAnimationClasses();
  
  const classNames = [
    styles.card,
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
    <div className={classNames} style={combinedStyle}>
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      )}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
}
