import styles from './Spinner.module.scss';

function Spinner(): JSX.Element {
  return (
    <div className={styles.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export { Spinner };
