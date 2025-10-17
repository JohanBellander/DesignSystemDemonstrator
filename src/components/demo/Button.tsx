import { ReactNode, ButtonHTMLAttributes } from 'react';
import { useAnimation } from '../../hooks/useAnimation';
import styles from './Button.module.css';
import '../../styles/animations.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  className,
  style,
  ...props 
}: ButtonProps) {
  const { getAnimationClasses, getAnimationProps } = useAnimation('button');
  const animationClasses = getAnimationClasses();
  
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
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
    <button className={classNames} style={combinedStyle} {...props}>
      {children}
    </button>
  );
}
