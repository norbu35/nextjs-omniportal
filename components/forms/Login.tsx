'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './Login.module.scss';

export default function Login() {
  const router = useRouter();
  const [formValues, setFormValues] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res = await signIn('credentials', {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setIsLoading(false);

      console.log(res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError('Invalid credentials');
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setError('');
    setFormValues({ ...formValues, [name]: value });
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <form className={styles.emailAuth} onSubmit={onSubmit}>
          <label className={styles.input}>
            <input
              type="email"
              required
              name='email'
              placeholder="Email address"
              value={formValues.email}
              onChange={handleChange}
            />
          </label>
          <label className={styles.input}>
            <input
              type="password"
              required
              name='password'
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </label>
          {error && <span>{error}</span>}
          <button className={styles.submitButton} type="submit">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className={styles.links}>
          <a href="/register" className={styles.link}>
            Register
          </a>
          <a href="/forgot" className={styles.link}>
            Forgot password?
          </a>
        </div>
        <div className={styles.divider}>OR</div>
        <div className={styles.authProviders}>
          <div className={styles.providerButton}>
            <Image
              className={styles.providerIcon}
              src="https://authjs.dev/img/providers/facebook.svg"
              alt="login service icon"
              width="30"
              height="30"
            />
            <div className="providerName">Continue with Facebook</div>
          </div>
          <div className={styles.providerButton}>
            <Image
              className={styles.providerIcon}
              src="https://authjs.dev/img/providers/google.svg"
              alt="login service icon"
              width="30"
              height="30"
            />
            <div className="providerName">Continue with Google</div>
          </div>
          <div className={styles.providerButton}>
            <Image
              className={styles.providerIcon}
              src="https://authjs.dev/img/providers/github.svg"
              alt="login service icon"
              width="30"
              height="30"
            />
            <div className="providerName">Continue with Github</div>
          </div>
        </div>
      </div>
    </div>
  );
}
