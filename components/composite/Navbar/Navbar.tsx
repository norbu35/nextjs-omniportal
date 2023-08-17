import { useSession, signOut, signIn } from 'next-auth/react';
import styles from './Navbar.module.scss';

export default function Navbar(): JSX.Element {
  const { data: session } = useSession();
  return (
    <nav className={styles.container}>
      <ul className={styles.navList}>
        <li>News</li>
        <li>Community</li>
        <li>Help</li>
        {session ? null : <li className={styles.link} onClick={() => signIn}>Sign In</li>}
        {session && <li className={styles.link} onClick={() => signOut()}>Sign out</li>}
      </ul>
    </nav>
  );
}
