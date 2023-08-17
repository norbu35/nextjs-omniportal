'use client';

import { Rnd } from 'react-rnd';
import Navbar from '@/components/composite/Navbar/Navbar';
import styles from './Header.module.scss';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 'auto',
        height: '3.125rem',
      }}
      enableResizing={false}
      dragAxis="x"
      style={{
        zIndex: 10,
        position: 'fixed',
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        borderRadius: '0 0 1rem 1rem',
        padding: '0 2rem',
        color: 'white',
      }}
    >
        <header className={styles.container}>
          <div className={styles.innerContainer}>
            <div className={styles.banner} onClick={() => router.push('/')}>OmniPortal</div>
            <Navbar />
          </div>
        </header>
    </Rnd>
  );
}
