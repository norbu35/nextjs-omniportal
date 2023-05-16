import styles from './Header.module.scss';

function Header() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Portal</h1>
    </div>
  );
}

export { Header };
