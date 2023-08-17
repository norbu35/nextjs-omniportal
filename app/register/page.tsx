import RegisterForm from '@/components/forms/Register/Register';
import styles from './register.module.scss';

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <RegisterForm />
    </div>
  );
}
