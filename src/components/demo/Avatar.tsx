import styles from './Avatar.module.css';

interface AvatarProps {
  size?: 'small' | 'medium' | 'large';
  initials?: string;
}

export function Avatar({ size = 'medium', initials = 'JD' }: AvatarProps) {
  const className = `${styles.avatar} ${styles[size]}`;
  
  return <div className={className}>{initials}</div>;
}
