import styles from './Navbar.module.scss';

function Navbar(): JSX.Element {
  return (
    <nav className={styles.container}>
      <ul className={styles.navList}>
        <li>News</li>
        <li>Help</li>
        <li>Community</li>
      </ul>
    </nav>
  );
}

export { Navbar };
