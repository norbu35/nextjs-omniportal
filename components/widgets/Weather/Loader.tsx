import { Spinner } from '@/components/layout/Loaders/Spinner/Spinner';
import styles from './Weather.module.scss';

function Loader() {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: "url('/widgets/Weather/clear-day.jpg')",
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '348.2px',
      }}
    >
      <Spinner />
    </div>
  );
}

export { Loader };
