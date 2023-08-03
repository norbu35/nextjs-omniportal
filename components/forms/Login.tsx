'use client';

import { useState } from 'react';
import styles from './Login.module.scss';

export default function Login() {
  const [email, setEmail] = useState<string>(null);
  const [password, setPassword] = useState<string>(null);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <form className={styles.emailAuth}>
          <label className={styles.input}>
            <input type="email" placeholder='Email address' required />
          </label>
          <label className={styles.input}>
            <input type="password" placeholder='Password' required />
          </label>
          <button className={styles.submitButton} type="submit">Login</button>
        </form>
        <div className={styles.divider}>OR</div>
        <div className={styles.authProviders}>
          <div className={styles.providerButton}>
            <img
              className={styles.providerIcon}
              src="https://authjs.dev/img/providers/facebook.svg"
              alt="login service icon"
            />
            <div className="providerName">Continue with Facebook</div>
          </div>
          <div className={styles.providerButton}>
            <img
              className={styles.providerIcon}
              src="https://authjs.dev/img/providers/google.svg"
              alt="login service icon"
            />
            <div className="providerName">Continue with Google</div>
          </div>
          <div className={styles.providerButton}>
            <img
              className={styles.providerIcon}
              src="https://authjs.dev/img/providers/github.svg"
              alt="login service icon"
            />
            <div className="providerName">Continue with Github</div>
          </div>
        </div>
      </div>
    </div>
  );
}
