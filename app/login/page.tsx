import LoginForm from '@/components/forms/Login/Login';
import styles from './login.module.scss';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
