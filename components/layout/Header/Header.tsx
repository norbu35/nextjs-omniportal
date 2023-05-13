import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Portal</h1>
    </div>
  );
}
