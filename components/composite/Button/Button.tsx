import { ReactNode } from 'react';
import styles from './Button.module.scss';

interface Props {
  type: 'button' | 'submit' | 'reset';
  className?: React.CSSProperties
  onClick?: () => void;
  variant: string;
  children: ReactNode
}

function Button({ type, className, onClick, variant,  children }: Props): JSX.Element {

  return (
    <button
      className={`${className} ${styles.button} ${styles[variant]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export { Button };
export default Button;
