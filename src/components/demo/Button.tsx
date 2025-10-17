import { ReactNode, ButtonHTMLAttributes } from 'react';
import { useAnimation } from '../../hooks/useAnimation';
import styles from './Button.module.css';
import animationStyles from '../../styles/animations.module.css';

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
    animationClasses.hover && animationStyles[animationClasses.hover],
    animationClasses.active && animationStyles[animationClasses.active],
    animationClasses.focus && animationStyles[animationClasses.focus],
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
