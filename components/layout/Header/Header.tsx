'use client';

import { Navbar } from '@/components/composite/Navbar/Navbar';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.banner}>OmniPortal</div>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
