import styles from './Button.module.css';

interface Props {
  label: string;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
  variant: string;
}

function Button({ label, type, onClick, variant }: Props): JSX.Element {
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
      className={styles.button}
      type={type}
      onClick={onClick}
      style={style}
    >
      {label}
    </button>
  );
}

export { Button };
export default Button;
