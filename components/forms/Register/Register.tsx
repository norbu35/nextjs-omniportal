'use client';

import { ChangeEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from './Register.module.scss';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    repeat: '',
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!passwordError) {
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          body: JSON.stringify(formValues),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setLoading(false);
        if (!res.ok) {
          alert((await res.json()).message);
          return;
        }

        signIn(undefined, { callbackUrl: '/' });
      } catch (error: any) {
        setLoading(false);
        console.error(error);
        alert(error.message);
      }
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues.password, formValues.repeat);
    if (formValues.password !== formValues.repeat) {
      setPasswordError('Passwords don\'t match');
    } else {
      setPasswordError('');
    }
  }

  const router = useRouter();

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <label className={styles.label} htmlFor="name">
        Name
      </label>
      <input
        className={styles.input}
        required
        type="text"
        name="name"
        value={formValues.name}
        onChange={handleChange}
      />
      <label className={styles.label} htmlFor="email">
        Email
      </label>
      <input
        className={styles.input}
        required
        type="email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
      />
      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <input
        className={styles.input}
        required
        type="password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
      />
      <label className={styles.label} htmlFor="repeat">
        Confirm Password
      </label>
      {passwordError && <span className={styles.error}>{passwordError}</span>}
      <input
        className={styles.input}
        required
        type="password"
        name="repeat"
        value={formValues.repeat}
        onChange={handleChange}
      />
      <button className={styles.submitButton} disabled={loading} type="submit">
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
      <div className={styles.subtext} onClick={() => router.push('/login')}>
        <span>Already a member?</span>
        <a href="/login" className={styles.link}>
          Sign In
        </a>
      </div>
    </form>
  );
}
