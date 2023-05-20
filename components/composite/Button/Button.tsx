import { ReactNode } from 'react';
import styles from './Button.module.css';

interface Props {
  type: 'button' | 'submit' | 'reset';
  className?: React.CSSProperties
  onClick?: () => void;
  variant: string;
  children: ReactNode
}

function Button({ type, className, onClick, variant, children }: Props): JSX.Element {
  let style;
  switch (variant) {
    case 'primary':
      style = {
        backgroundColor: '#212A3E',
      };
      break;
    case 'secondary':
      style = {
        backgroundColor: '#394867',
      };
      break;
  }

  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

export { Button };
export default Button;
