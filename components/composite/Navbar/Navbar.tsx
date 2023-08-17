import { useSession, signOut } from 'next-auth/react';
import styles from './Navbar.module.scss';
import { useRouter } from 'next/navigation';

export default function Navbar(): JSX.Element {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <nav className={styles.container}>
      <ul className={styles.navList}>
        <li>News</li>
        <li>Community</li>
        <li>Help</li>
        {session ? null : <li className={styles.link} onClick={() => router.push('/login')}>Sign In</li>}
        {session && <li className={styles.link} onClick={() => signOut()}>Sign out</li>}
      </ul>
    </nav>
  );
}
