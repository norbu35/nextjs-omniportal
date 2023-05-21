import { Spinner } from '@/components/layout/Loaders/Spinner/Spinner';
import styles from './Weather.module.scss';

function Loader(): JSX.Element {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: "url('/widgets/Weather/clear-day.jpg')",
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'inherit',
        height: 'inherit',
      }}
    >
      <Spinner />
    </div>
  );
}

export { Loader };
export default Loader;
