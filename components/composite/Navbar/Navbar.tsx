import  Link  from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import styles from './Navbar.module.scss';

function Navbar(): JSX.Element {
  const { data: session } = useSession();
  return (
    <nav className={styles.container}>
      <ul className={styles.navList}>
        <li>News</li>
        <li>Community</li>
        <li>Help</li>
        {session ? null : <li className={styles.link}><Link href="/api/auth/signin/">Log in</Link></li>}
        {session && <li className={styles.link} onClick={() => signOut()}>Log out</li>}
      </ul>
    </nav>
  );
}

export default Navbar;
