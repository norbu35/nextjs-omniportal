'use client';

import { ChangeEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from './Register.module.scss';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

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

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
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
