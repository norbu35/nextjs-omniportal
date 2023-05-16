import { Widgets } from '@/components/layout/Widgets/Widgets';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'normalize.css/normalize.css';

export default function Home(): JSX.Element {
  return (
    <>
      <main style={{ height: '100vh' }}>
        <Widgets />
      </main>
    </>
  );
}
