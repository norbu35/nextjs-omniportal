import styles from './Login.module.scss';

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
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
        <hr className={styles.divider} />
        <div className={styles.dividerText}>OR</div>
        <div className="emailAuth"></div>
      </div>
    </div>
  );
}
