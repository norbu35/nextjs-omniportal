import { Widgets } from '@/components/layout/Widgets/Widgets';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'normalize.css/normalize.css';

function Home(): JSX.Element {
  return (
    <>
      <main style={{ height: '100vh' }}>
        <Widgets />
      </main>
    </>
  );
}

export { Home };
export default Home;
